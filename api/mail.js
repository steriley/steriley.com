import FormData from "form-data";
import Mailgun from "mailgun.js";

export const send = async ({ comments = '', name = '', email = '', subject = '' }) => {
  const mailgun = new Mailgun(FormData);
  const mg = mailgun.client({ username: "api", key: process.env.MAILGUN_API_KEY });

  const text = `${comments}
    \n---------------------------------------------
    \nMail sent by: ${name}: ${email} from steriley.com
  `;

  const data = {
    from: `${name} <${email}>`,
    to: [`Stephen Riley <${process.env.EMAIL_ADDRESS}>`],
    subject: subject,
    text,
  };

  try {
    await mg.messages.create(process.env.MAILGUN_DOMAIN, data);
    return { message: "Your message has been sent!" };
  } catch (error) {
    console.error(error);
    return { error: "Failed to send email." };
  }
}
