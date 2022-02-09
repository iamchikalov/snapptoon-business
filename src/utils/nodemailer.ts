const nodemailer = require("nodemailer");

export async function mailer(from, to, subject, link, html){
  let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
      user: 'test.snapptoon@gmail.com',
      pass: 'y8MM75Nwxs',
    }
  });

  await transporter.sendMail({
    from: from,
    to: to,
    subject: subject,
    link: link,
    html: html
  });
}
