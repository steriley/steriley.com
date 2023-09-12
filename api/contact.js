import formData from 'form-data';
import Mailgun from 'mailgun.js';

export default async function handler(request, response) {
  const mailgun = new Mailgun(formData);
  const mg = mailgun.client({
    username: 'api',
    key: process.env.MAILGUN_API_KEY,
  });

  const { body } = request;
  const { name, email, subject, message, comments, timestamp } = body;

  const text = `${comments}
    \n---------------------------------------------
    \nMail sent by: ${name}: ${email} from steriley.com
  `;

  const now = +new Date();
  const validTime = now - timestamp > 10000;
  const success = { message: 'Your message has been sent!' };
  const data = {
    from: process.env.EMAIL_ADDRESS,
    to: [process.env.EMAIL_ADDRESS],
    subject,
    text,
    html: `<pre style="font-family:Arial;font-size:16px">${text}</pre>`,
  };

  try {
    if (validTime && message === '') {
      await mg.messages.create(process.env.MAILGUN_DOMAIN, data);
    }
    response.json(success);
  } catch (error) {
    response.json(error);
  }
}
