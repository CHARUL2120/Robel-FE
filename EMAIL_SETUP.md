# Contact Form Email Setup with Gmail SMTP

## Email Configuration

The contact form sends mail through **Gmail SMTP** using `nodemailer`.

### **Setup Steps:**

1. **Use a Gmail account**:
   - Choose the Gmail inbox that should send website confirmations
   - Turn on 2-Step Verification for that Google account

2. **Create an App Password**:
   - Open https://myaccount.google.com/apppasswords
   - Generate a password for "Mail"
   - Copy the 16-character app password

3. **Update Environment Variables**:
   - Open `.env.local` file
   - Set `EMAIL_USER` to the Gmail address
   - Set `EMAIL_PASS` to the Gmail app password
   - Optional: set `EMAIL_TO` if owner notifications should go to a different inbox

## Vercel Deployment

`.env.local` works only on your local machine. When you deploy to Vercel, those values are **not** copied automatically.

Add these variables in **Vercel Dashboard -> Project -> Settings -> Environment Variables**:

- `EMAIL_USER` = your Gmail address
- `EMAIL_PASS` = your Gmail app password
- Optional: `EMAIL_TO` = inbox that should receive owner notifications

The API also accepts these aliases if you already used different names in Vercel:

- `SMTP_USER` or `GMAIL_USER`
- `SMTP_PASS` or `GMAIL_APP_PASSWORD`

After adding the variables, redeploy the project so the new deployment picks them up.

## How it works

- When a user submits the contact form, two emails are sent:
  1. A beautifully designed confirmation email to the user with catalog previews
  2. A notification email to Redecorindia206@gmail.com with the inquiry details

- The confirmation email includes:
  - Professional HTML design matching the brand
  - User's inquiry details
  - Three PDF catalogs as attachments
  - Links to view the full catalog
  - Contact information and social links

## Security Notes

- Never commit the `.env.local` file to version control
- The Gmail app password is only used server-side
- All form data is validated on both client and server side
