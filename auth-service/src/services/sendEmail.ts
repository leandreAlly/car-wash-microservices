import sgMail from '@sendgrid/mail';
import dotenv from 'dotenv';

dotenv.config();

const apiKey = process.env.SENDGRID_API_KEY!;

const sendEmail = (sendToEmail: string, subject: string, HTMLText: string) => {
  // Check if running in a testing environment
  if (process.env.NODE_ENV === 'test') {
    console.log('Mock email sent...');
    return; // Exit function
  }

  // Actual email sending logic
  const sgMail = require('@sendgrid/mail');
  sgMail.setApiKey(apiKey);

  const message = {
    to: sendToEmail,
    from: {
      name: 'CAR WASH SERVICE',
      email: process.env.SEND_GRID_EMAIL!,
    },
    subject,
    html: HTMLText,
  };

  sgMail
    .send(message)
    .then((res: any) => console.log('email sent...'))
    .catch((error: any) => {
      console.error(error.message);
    });
};

export default sendEmail;
