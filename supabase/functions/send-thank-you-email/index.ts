// Follow this setup guide to integrate the Deno language server with your editor:
// https://deno.land/manual/getting_started/setup_your_environment
// This enables autocomplete, go to definition, etc.

// Setup type definitions for built-in Supabase Runtime APIs
import "jsr:@supabase/functions-js/edge-runtime.d.ts"
import { Resend } from "npm:resend@3.2.0"

const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY")!
const resend = new Resend(RESEND_API_KEY)

const whatsappNumber = Deno.env.get("WHATSAPP_NUMBER") || "+92 321 4244140"
const address = "15-A Hajvery Center Opposite Gerry's Visa Center, Queens Road Lahore"

Deno.serve(async (req) => {
  try {
    const { name, email, message } = await req.json()

    const emailHtml = `
      <!DOCTYPE html>
      <html>
        <head>
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background-color: #1e3a5f; color: white; padding: 20px; text-align: center; }
            .content { padding: 20px; background-color: #f9f9f9; }
            .footer { margin-top: 20px; padding: 10px; text-align: center; font-size: 12px; color: #666; }
            .info-box { background-color: #e8f4f8; padding: 15px; border-left: 4px solid #1e3a5f; margin: 15px 0; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>Thank You for Contacting Us!</h1>
            </div>
            <div class="content">
              <p>Dear ${name || 'Valued Client'},</p>
              <p>Thank you for reaching out to SIR CONSULTANTS. We have received your message and our team will get back to you shortly.</p>
              
              ${message ? `<div class="info-box"><strong>Your Message:</strong><br>${message}</div>` : ''}
              
              <p>We look forward to assisting you with your visa consultancy needs.</p>
              
              <div class="info-box">
                <strong>Contact Information:</strong><br>
                📞 ${whatsappNumber}<br>
                📧 info@sirconsultant.com<br>
                📍 ${address}
              </div>
              
              <p><strong>Visiting Hours:</strong><br>
              Monday – Saturday: 9:00 AM – 5:00 PM</p>
              
              <p>Feel free to visit us in person or contact us via WhatsApp for immediate assistance!</p>
              
              <p>Best regards,<br>Team SIR CONSULTANTS</p>
            </div>
            <div class="footer">
              © ${new Date().getFullYear()} SIR CONSULTANTS. All rights reserved.
            </div>
          </div>
        </body>
      </html>
    `

    const { data, error } = await resend.emails.send({
      from: "SIR CONSULTANTS <onboarding@resend.dev>",
      to: [email],
      subject: "Thank You for Contacting SIR CONSULTANTS",
      html: emailHtml,
    })

    if (error) {
      return new Response(JSON.stringify({ error: error.message }), {
        headers: { "Content-Type": "application/json" },
        status: 400,
      })
    }

    return new Response(JSON.stringify(data), {
      headers: { "Content-Type": "application/json" },
      status: 200,
    })
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      headers: { "Content-Type": "application/json" },
      status: 500,
    })
  }
})