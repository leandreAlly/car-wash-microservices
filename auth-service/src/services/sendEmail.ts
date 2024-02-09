import sgMail from '@sendgrid/mail';

const apiKey = process.env.SENDGRID_API_KEY!;

sgMail.setApiKey(apiKey);

const sendEmail = (sendToEmail: string, subject: string, HTMLText: string) => {
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
    .then((res) => console.log('email sent...'))
    .catch((error) => {
      console.log(error.message);
    });
};

export default sendEmail;
