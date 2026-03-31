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
