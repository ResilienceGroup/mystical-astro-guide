import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.39.3';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { name, birthDate, birthPlace, birthTime, profileId, reportId } = await req.json();

    // Initialize Supabase client
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const supabase = createClient(supabaseUrl, supabaseKey);

    // Generate report using OpenAI
    const openAIResponse = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${Deno.env.get('OPENAI_API_KEY')}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4o',
        messages: [
          {
            role: 'system',
            content: 'You are an expert astrologer providing personalized astrological readings. Format your response in JSON with the following fields: personality_analysis, opportunities, challenges, love_insights, career_guidance, and spiritual_growth.'
          },
          {
            role: 'user',
            content: `Generate an astrological report for ${name}, born on ${birthDate} at ${birthTime} in ${birthPlace}. Include personality analysis, opportunities, challenges, love insights, career guidance, and spiritual growth.`
          }
        ],
      }),
    });

    const openAIData = await openAIResponse.json();
    const reportContent = JSON.parse(openAIData.choices[0].message.content);

    // Update report in database
    const { error: updateError } = await supabase
      .from('reports')
      .update({
        personality_analysis: reportContent.personality_analysis,
        opportunities: reportContent.opportunities,
        challenges: reportContent.challenges,
        love_insights: reportContent.love_insights,
        career_guidance: reportContent.career_guidance,
        spiritual_growth: reportContent.spiritual_growth
      })
      .eq('id', reportId);

    if (updateError) throw updateError;

    return new Response(JSON.stringify({ success: true }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error in generate-report function:', error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});