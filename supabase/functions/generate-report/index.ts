import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'
import { corsHeaders } from "../_shared/cors.ts"

serve(async (req) => {
  // Handle CORS
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    // Vérifier l'en-tête apikey
    const apikey = req.headers.get('apikey')
    if (!apikey) {
      console.error('No apikey provided')
      return new Response(
        JSON.stringify({ error: 'No apikey provided' }),
        { 
          status: 401,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        }
      )
    }

    const { profileId, reportId, reportContent } = await req.json()

    // Validate required fields
    if (!profileId || !reportId || !reportContent) {
      console.error('Missing required fields:', { profileId, reportId, reportContent })
      return new Response(
        JSON.stringify({ error: 'Missing required fields' }),
        { 
          status: 400,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        }
      )
    }

    // Create client with the provided apikey
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      apikey
    )

    // Update report in database
    const { data, error } = await supabaseClient
      .from('reports')
      .update({
        content: reportContent
      })
      .eq('id', reportId)
      .eq('profile_id', profileId)
      .select()
      .single()

    if (error) {
      console.error('Error updating report:', error)
      throw error
    }

    console.log('Report updated successfully:', data)
    return new Response(
      JSON.stringify({ success: true, data }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )

  } catch (error) {
    console.error('Error in generate-report function:', error)
    return new Response(
      JSON.stringify({ error: error.message }),
      { 
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      }
    )
  }
})