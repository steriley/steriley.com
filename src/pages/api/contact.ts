import { type APIRoute } from 'astro';
import { getSecret } from 'astro:env/server';
import FormData from 'form-data';
import Mailgun from 'mailgun.js';

const json = (obj: Record<string, any>) => new Response(JSON.stringify(obj));

export const POST: APIRoute = async ({ params, request }) => {
  const { name, email, subject, message, comments } = await request.json();
  const success = json({ message: 'Your message has been sent!' });

  if (comments !== '') return success;

  const mailgun = new Mailgun(FormData);
  const mg = mailgun.client({
    username: 'api',
    key: getSecret('MAILGUN_API_KEY')!,
  });

  const text = `${message}
    \n---------------------------------------------
    \nMail sent by: ${name}: ${email} from steriley.com
  `;

  const data = {
    from: `${name} <${email}>`,
    to: [`Stephen Riley <${getSecret('EMAIL_ADDRESS')}>`],
    subject: subject,
    text,
  };

  try {
    await mg.messages.create(getSecret('MAILGUN_DOMAIN')!, data);
    return success;
  } catch (error) {
    return json({ error: 'Failed to send email.' });
  }
};
