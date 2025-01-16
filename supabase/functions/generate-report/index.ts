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
    console.log('Starting generate-report function');
    const { name, birthDate, birthPlace, birthTime, profileId, reportId } = await req.json();
    
    console.log('Received data:', { name, birthDate, birthPlace, birthTime, profileId, reportId });

    if (!profileId || !reportId) {
      throw new Error('Missing required profileId or reportId');
    }

    // Initialize Supabase client first to ensure connection
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const supabase = createClient(supabaseUrl, supabaseKey);

    console.log('Initialized Supabase client');

    // Call OpenAI API
    console.log('Preparing OpenAI API call...');
    const systemPrompt = `Tu es un expert en astrologie qui fournit des lectures astrologiques personnalisées en français.
    Tu dois ABSOLUMENT retourner une réponse au format JSON avec la structure suivante:
    {
      "personality_analysis": "analyse détaillée de la personnalité",
      "opportunities": "opportunités à venir",
      "challenges": "défis à surmonter",
      "love_insights": "perspectives amoureuses",
      "career_guidance": "conseils de carrière",
      "spiritual_growth": "développement spirituel"
    }
    Ne retourne RIEN d'autre que ce JSON.`;

    const userPrompt = `Génère un rapport astrologique pour ${name || 'Jean'}, 
    né(e) le ${birthDate || '2000-01-01'} à ${birthTime || '12:00'} 
    à ${birthPlace || 'Paris'}. 
    Inclus une analyse détaillée pour chaque section du JSON.`;

    console.log('Calling OpenAI API with model: gpt-4o-mini');
    const openAIResponse = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${Deno.env.get('OPENAI_API_KEY')}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: userPrompt }
        ],
        temperature: 0.7,
        max_tokens: 2000
      }),
    });

    console.log('OpenAI API response status:', openAIResponse.status);

    if (!openAIResponse.ok) {
      const errorText = await openAIResponse.text();
      console.error('OpenAI API error:', errorText);
      throw new Error(`OpenAI API error: ${openAIResponse.status} ${errorText}`);
    }

    const openAIData = await openAIResponse.json();
    console.log('Received OpenAI response:', openAIData);

    if (!openAIData.choices?.[0]?.message?.content) {
      console.error('Invalid OpenAI response format:', openAIData);
      throw new Error('Invalid response format from OpenAI');
    }

    console.log('Raw OpenAI response content:', openAIData.choices[0].message.content);

    let reportContent;
    try {
      reportContent = JSON.parse(openAIData.choices[0].message.content);
      console.log('Successfully parsed report content into JSON:', reportContent);

      // Validate JSON structure
      const requiredFields = [
        'personality_analysis',
        'opportunities',
        'challenges',
        'love_insights',
        'career_guidance',
        'spiritual_growth'
      ];

      const missingFields = requiredFields.filter(field => !reportContent[field]);
      if (missingFields.length > 0) {
        throw new Error(`Missing required fields in JSON: ${missingFields.join(', ')}`);
      }
    } catch (error) {
      console.error('Error parsing or validating OpenAI response:', error);
      console.log('Raw content that failed to parse:', openAIData.choices[0].message.content);
      throw new Error('Failed to parse OpenAI response as valid JSON with required fields');
    }

    // Update report in database
    console.log('Updating report in database with content:', reportContent);
    const { error: updateError } = await supabase
      .from('reports')
      .update({
        personality_analysis: reportContent.personality_analysis,
        opportunities: reportContent.opportunities,
        challenges: reportContent.challenges,
        love_insights: reportContent.love_insights,
        career_guidance: reportContent.career_guidance,
        spiritual_growth: reportContent.spiritual_growth,
        content: reportContent
      })
      .eq('id', reportId);

    if (updateError) {
      console.error('Error updating report:', updateError);
      throw updateError;
    }

    console.log('Report updated successfully in database');

    return new Response(JSON.stringify({ 
      success: true,
      message: 'Report generated and saved successfully',
      reportContent 
    }), {
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