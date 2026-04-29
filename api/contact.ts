import type { VercelRequest, VercelResponse } from "@vercel/node";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { name, email, phone, type, message } = req.body;

  if (!name || !email || !type || !message) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  try {
    await resend.emails.send({
      from: "Mrs Gray Website <noreply@mrsgray.agency>",
      to: "info@mrsgray.agency",
      replyTo: email,
      subject: `${type} — ${name}`,
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 32px; background: #0a0805; color: #fff;">
          <h2 style="color: #c4a470; font-size: 24px; margin: 0 0 24px;">New Enquiry — Mrs Gray Agency</h2>
          <table style="width: 100%; border-collapse: collapse;">
            <tr><td style="padding: 8px 0; color: #999; width: 120px;">Name</td><td style="padding: 8px 0;">${name}</td></tr>
            <tr><td style="padding: 8px 0; color: #999;">Email</td><td style="padding: 8px 0;"><a href="mailto:${email}" style="color: #c4a470;">${email}</a></td></tr>
            <tr><td style="padding: 8px 0; color: #999;">Phone</td><td style="padding: 8px 0;">${phone || "—"}</td></tr>
            <tr><td style="padding: 8px 0; color: #999;">Type</td><td style="padding: 8px 0;">${type}</td></tr>
          </table>
          <hr style="border: none; border-top: 1px solid rgba(255,255,255,0.1); margin: 24px 0;" />
          <p style="color: #999; margin: 0 0 8px; font-size: 12px; text-transform: uppercase; letter-spacing: 2px;">Message</p>
          <p style="margin: 0; line-height: 1.7; color: #ddd;">${message.replace(/\n/g, "<br/>")}</p>
        </div>
      `,
    });

    return res.status(200).json({ success: true });
  } catch (err) {
    console.error("Email send error:", err);
    return res.status(500).json({ error: "Failed to send email" });
  }
}
