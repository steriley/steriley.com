const sgMail = require('@sendgrid/mail');

const API_KEY = process.env.SENDGRID_API_KEY;

sgMail.setApiKey(API_KEY);

module.exports.send = obj =>
  new Promise((resolve, reject) => {
    const { timestamp } = obj;
    const now = +new Date();
    const validTime = now - timestamp > 10000;
    const success = { message: 'Your message has been sent!' };
    let text = obj.comments;

    text += `\n\n---------------------------------------------\n`;
    text += `Mail sent by: ${obj.name} <${obj.email}> from steriley.com`;

    if (validTime && obj.message === '') {
      return sgMail
        .send({
          to: process.env.SENDGRID_EMAIL,
          from: `${obj.name} <${obj.email}>`,
          subject: obj.subject,
          text,
          html: `<pre>${text}<pre>`,
        })
        .then(() => resolve(success))
        .catch(error => reject(error));
    }

    return resolve(success);
  });
