import { after } from 'next/server';
import nodemailer from 'nodemailer';
import path from 'path';

const emailPalette = {
  background: '#f5efe7',
  surface: '#fffaf4',
  surfaceAlt: '#efe4d5',
  text: '#1f1712',
  muted: '#66584d',
  accent: '#8e7964',
  accentLight: '#c1ad97',
  deep: '#221a16'
};

const emailBaseStyles = `
  body {
    font-family: Arial, Helvetica, sans-serif;
    line-height: 1.6;
    color: ${emailPalette.text};
    margin: 0;
    padding: 0;
    background:
      radial-gradient(circle at top, rgba(255,255,255,0.92), rgba(245,239,231,0.98) 40%),
      ${emailPalette.background};
  }
  .shell {
    max-width: 680px;
    margin: 0 auto;
    padding: 24px 14px 36px;
  }
  .container {
    background: ${emailPalette.surface};
    border: 1px solid rgba(143, 121, 100, 0.16);
    border-radius: 28px;
    overflow: hidden;
    box-shadow: 0 22px 70px rgba(31, 23, 18, 0.12);
  }
  .hero {
    background: linear-gradient(135deg, rgba(34, 26, 22, 0.98), rgba(68, 54, 44, 0.92));
    color: white;
    padding: 42px 36px 36px;
  }
  .eyebrow {
    display: inline-block;
    text-transform: uppercase;
    letter-spacing: 0.22em;
    font-size: 11px;
    color: rgba(255,255,255,0.72);
    margin-bottom: 14px;
  }
  .hero h1 {
    margin: 0;
    font-size: 34px;
    line-height: 1.15;
    letter-spacing: -0.03em;
  }
  .hero p {
    margin: 14px 0 0;
    max-width: 520px;
    color: rgba(255,255,255,0.82);
    font-size: 16px;
  }
  .content {
    padding: 34px 36px 14px;
  }
  .greeting {
    font-size: 18px;
    color: ${emailPalette.deep};
    margin: 0 0 14px;
  }
  .lead {
    margin: 0 0 22px;
    color: ${emailPalette.muted};
  }
  .stats {
    display: grid;
    grid-template-columns: repeat(3, minmax(0, 1fr));
    gap: 12px;
    margin: 24px 0 28px;
  }
  .stat {
    background: linear-gradient(180deg, #fff, ${emailPalette.surfaceAlt});
    border: 1px solid rgba(143, 121, 100, 0.14);
    border-radius: 18px;
    padding: 16px;
  }
  .stat-label {
    display: block;
    font-size: 11px;
    text-transform: uppercase;
    letter-spacing: 0.18em;
    color: ${emailPalette.accent};
    margin-bottom: 6px;
  }
  .stat-value {
    font-size: 15px;
    font-weight: 700;
    color: ${emailPalette.deep};
    word-break: break-word;
  }
  .section {
    background: linear-gradient(180deg, rgba(255,255,255,0.9), rgba(248,242,235,0.95));
    border: 1px solid rgba(143, 121, 100, 0.14);
    border-radius: 22px;
    padding: 22px;
    margin: 0 0 22px;
  }
  .section h2 {
    margin: 0 0 12px;
    color: ${emailPalette.deep};
    font-size: 20px;
  }
  .section p {
    margin: 0;
    color: ${emailPalette.muted};
  }
  .details {
    background: ${emailPalette.surfaceAlt};
    border-radius: 18px;
    padding: 22px;
    margin: 20px 0 28px;
  }
  .details h3 {
    margin: 0 0 16px;
    color: ${emailPalette.accent};
    font-size: 13px;
    text-transform: uppercase;
    letter-spacing: 0.2em;
  }
  .details-grid {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 14px 18px;
  }
  .detail {
    min-width: 0;
  }
  .detail-label {
    display: block;
    font-size: 11px;
    text-transform: uppercase;
    letter-spacing: 0.16em;
    color: ${emailPalette.accent};
    margin-bottom: 4px;
  }
  .detail-value {
    color: ${emailPalette.deep};
    font-size: 14px;
    font-weight: 600;
    word-break: break-word;
  }
  .button-row {
    margin: 22px 0 0;
  }
  .cta-button {
    display: inline-block;
    background: linear-gradient(135deg, ${emailPalette.accent} 0%, ${emailPalette.accentLight} 100%);
    color: white !important;
    padding: 14px 22px;
    text-decoration: none;
    border-radius: 999px;
    font-weight: 700;
    font-size: 14px;
    margin: 8px 10px 8px 0;
    letter-spacing: 0.01em;
  }
  .ghost-button {
    display: inline-block;
    background: transparent;
    color: ${emailPalette.deep} !important;
    padding: 13px 21px;
    text-decoration: none;
    border-radius: 999px;
    border: 1px solid rgba(143, 121, 100, 0.26);
    font-weight: 700;
    font-size: 14px;
    margin: 8px 10px 8px 0;
  }
  .footer {
    background: ${emailPalette.deep};
    color: rgba(255,255,255,0.88);
    padding: 24px 36px 28px;
    text-align: center;
  }
  .footer p {
    margin: 6px 0;
  }
  .footer strong {
    color: white;
  }
  .social-links {
    margin-top: 14px;
  }
  .social-links a {
    color: white;
    text-decoration: none;
    font-weight: 600;
  }
  @media only screen and (max-width: 640px) {
    .shell {
      padding: 0;
    }
    .container {
      border-radius: 0;
    }
    .hero,
    .content,
    .footer {
      padding-left: 22px;
      padding-right: 22px;
    }
    .hero h1 {
      font-size: 28px;
    }
    .stats,
    .details-grid {
      grid-template-columns: 1fr;
    }
  }
`;

function buildUserEmail({ name, phone, email, projectType, requirement }) {
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Robel - Inquiry Confirmation</title>
      <style>${emailBaseStyles}</style>
    </head>
    <body>
      <div class="shell">
        <div class="container">
          <div class="hero">
            <div class="eyebrow">Robel</div>
            <h1>Thank You for Your Inquiry</h1>
            <p>Your request has been received, and our team is preparing a tailored recommendation for your project.</p>
          </div>

          <div class="content">
            <p class="greeting">Dear ${name},</p>
            <p class="lead">Thank you for reaching out to Robel. We have received your inquiry and our team will get back to you within 24 hours with detailed information about our premium surface materials.</p>

            <div class="stats">
              <div class="stat">
                <span class="stat-label">Response Time</span>
                <span class="stat-value">Within 24 hours</span>
              </div>
              <div class="stat">
                <span class="stat-label">Catalogs</span>
                <span class="stat-value">3 PDFs attached</span>
              </div>
              <div class="stat">
                <span class="stat-label">Project Type</span>
                <span class="stat-value">${projectType}</span>
              </div>
            </div>

            <div class="details">
              <h3>Your Inquiry Details</h3>
              <div class="details-grid">
                <div class="detail">
                  <span class="detail-label">Name</span>
                  <div class="detail-value">${name}</div>
                </div>
                <div class="detail">
                  <span class="detail-label">Phone</span>
                  <div class="detail-value">${phone}</div>
                </div>
                <div class="detail">
                  <span class="detail-label">Email</span>
                  <div class="detail-value">${email}</div>
                </div>
                <div class="detail">
                  <span class="detail-label">Project Type</span>
                  <div class="detail-value">${projectType}</div>
                </div>
                <div class="detail" style="grid-column: 1 / -1;">
                  <span class="detail-label">Requirements</span>
                  <div class="detail-value">${requirement}</div>
                </div>
              </div>
            </div>

            <div class="section">
              <h2>Catalogs attached to this email</h2>
              <p>We have included the product catalogs with this email so you can review finishes and collections right away.</p>

              <div class="button-row">
                <a href="https://robel-surface-studio.vercel.app/laminates" class="cta-button">View Full Catalog</a>
              </div>
            </div>

            <div class="section">
              <h2>Explore the collections online</h2>
              <p>While we prepare your personalized quote, browse the complete catalog experience on our website.</p>

              <div class="button-row">
                <a href="https://robel-surface-studio.vercel.app/contact" class="ghost-button">Contact Our Team</a>
              </div>
            </div>

            <p class="lead">Our design team will review your requirements and suggest the most suitable materials for your project. We are excited to help bring your vision to life.</p>
            <p class="lead">Best regards,<br>The Robel Team</p>
          </div>

          <div class="footer">
            <p><strong>Robel</strong></p>
            <p>Premium laminates, acrylic sheets, PVC sheets, and WPC boards</p>
            <p>+91 94279 08150 | Redecorindia206@gmail.com</p>
            <div class="social-links">
              <a href="https://www.instagram.com/robel_india">Instagram</a> | <a href="https://wa.me/919427908150">WhatsApp</a>
            </div>
          </div>
        </div>
      </div>
    </body>
    </html>
  `;
}

function buildOwnerEmail({ name, phone, email, projectType, requirement }) {
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>New Inquiry - Robel</title>
      <style>${emailBaseStyles}</style>
    </head>
    <body>
      <div class="shell">
        <div class="container">
          <div class="hero">
            <div class="eyebrow">New lead from website</div>
            <h1>New Customer Inquiry</h1>
            <p>A customer has submitted a new inquiry through the website contact form.</p>
          </div>

          <div class="content">
            <p class="lead">You have received a new inquiry from your website. Here are the details.</p>

            <div class="details">
              <h3>Customer Information</h3>
              <div class="details-grid">
                <div class="detail">
                  <span class="detail-label">Name</span>
                  <div class="detail-value">${name}</div>
                </div>
                <div class="detail">
                  <span class="detail-label">Phone</span>
                  <div class="detail-value">${phone}</div>
                </div>
                <div class="detail">
                  <span class="detail-label">Email</span>
                  <div class="detail-value">${email}</div>
                </div>
                <div class="detail">
                  <span class="detail-label">Project Type</span>
                  <div class="detail-value">${projectType}</div>
                </div>
                <div class="detail" style="grid-column: 1 / -1;">
                  <span class="detail-label">Requirements</span>
                  <div class="detail-value">${requirement}</div>
                </div>
              </div>
            </div>

            <p class="lead">Please respond to this inquiry as soon as possible to provide the customer with detailed information about your premium surface materials.</p>

            <div class="button-row">
              <a href="mailto:${email}" class="cta-button">Reply to Customer</a>
            </div>
          </div>

          <div class="footer">
            <p><strong>Robel</strong></p>
            <p>Premium laminates, acrylic sheets, PVC sheets, and WPC boards</p>
          </div>
        </div>
      </div>
    </body>
    </html>
  `;
}

function getEmailConfig() {
  const fallbackUser = 'Redecorindia206@gmail.com';
  const fallbackPass = 'bdpnvlurwfbaltgx';

  const user =
    process.env.EMAIL_USER || process.env.SMTP_USER || process.env.GMAIL_USER || fallbackUser;
  const pass =
    process.env.EMAIL_PASS || process.env.SMTP_PASS || process.env.GMAIL_APP_PASSWORD || fallbackPass;
  const ownerInbox = process.env.EMAIL_TO || user || fallbackUser;

  const missing = [];

  if (!user) {
    missing.push('EMAIL_USER (or SMTP_USER / GMAIL_USER)');
  }

  if (!pass) {
    missing.push('EMAIL_PASS (or SMTP_PASS / GMAIL_APP_PASSWORD)');
  }

  return { user, pass, ownerInbox, missing };
}

export async function POST(request) {
  try {
    const { name, phone, email, projectType, requirement } = await request.json();

    if (!name || !phone || !email || !projectType || !requirement) {
      return Response.json({ error: 'All fields are required' }, { status: 400 });
    }

    const emailConfig = getEmailConfig();

    if (!emailConfig.user || !emailConfig.pass) {
      console.error('Missing email credentials:', emailConfig.missing.join(', '));
      return Response.json({
        success: true,
        emailSkipped: true,
        message: 'Inquiry received successfully. Email sending is temporarily disabled.'
      });
    }

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: emailConfig.user,
        pass: emailConfig.pass
      }
    });

    const userMailOptions = {
      from: `"Robel" <${emailConfig.user}>`,
      to: email,
      subject: 'Thank You for Your Inquiry - Robel',
      html: buildUserEmail({ name, phone, email, projectType, requirement })
    };

    const ownerMailOptions = {
      from: `"Robel" <${emailConfig.user}>`,
      to: emailConfig.ownerInbox,
      replyTo: email,
      subject: `New Inquiry from ${name} - ${projectType}`,
      html: buildOwnerEmail({ name, phone, email, projectType, requirement })
    };

    const attachments = [
      {
        filename: 'Robel_PVC_Catalog.pdf',
        path: path.join(process.cwd(), 'Robel.pdf')
      },
      {
        filename: 'Robel_ASA_Catalog.pdf',
        path: path.join(process.cwd(), 'ROBEL_ASA.pdf')
      },
      {
        filename: 'Robel_Acrylic_Catalog.pdf',
        path: path.join(process.cwd(), 'Robel Acrylic laminate .pdf')
      }
    ];

    after(async () => {
      try {
        const [userResult] = await Promise.all([
          transporter.sendMail({
            ...userMailOptions,
            attachments
          }),
          transporter.sendMail(ownerMailOptions)
        ]);

        console.log('Confirmation email sent to:', email, userResult?.messageId || '');
        console.log('Owner notification sent to:', emailConfig.ownerInbox);
      } catch (deferredError) {
        console.error('Deferred email sending error:', deferredError);
      }
    });

    return Response.json({
      success: true,
      message: 'Inquiry received successfully. Your request is being processed.'
    });
  } catch (error) {
    console.error('Email sending error:', error);
    const message = error?.message || 'Failed to send email';
    const details = error?.response || error?.stack || null;
    return Response.json(
      {
        error: 'Failed to send email',
        message,
        details
      },
      { status: 500 }
    );
  }
}
