const sgMail = require('@sendgrid/mail');

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

module.exports.send = obj =>
  new Promise((resolve, reject) => {
    const text = `${obj.comments}
      \n---------------------------------------------
      \nMail sent by: ${obj.name}: ${obj.email} from steriley.com
    `;

    const msg = {
      to: process.env.SENDGRID_EMAIL,
      from: process.env.SENDGRID_EMAIL,
      subject: obj.subject,
      text,
      html: `<pre style="font-family:Arial;font-size:16px">${text}</pre>`,
    };

    const { timestamp } = obj;
    const now = +new Date();
    const validTime = now - timestamp > 10000;
    const success = { message: 'Your message has been sent!' };

    if (validTime && obj.message === '') {
      return sgMail
        .send(msg)
        .then(() => resolve(success))
        .catch(error => reject(error));
    }

    return resolve(success);
  });
