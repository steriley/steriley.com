import { type APIRoute } from 'astro';
import { getSecret } from 'astro:env/server';
import FormData from 'form-data';
import Mailgun from 'mailgun.js';

export const POST: APIRoute = async ({ params, request }) => {
  const { name, email, subject, comments } = await request.json();

  const mailgun = new Mailgun(FormData);
  const mg = mailgun.client({
    username: 'api',
    key: getSecret('MAILGUN_API_KEY')!,
  });

  const text = `${comments}
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
    return new Response(
      JSON.stringify({ message: 'Your message has been sent!' }),
    );
  } catch (error) {
    return new Response(JSON.stringify({ error: 'Failed to send email.' }));
  }
};
