const nodemailer = require("nodemailer");

export async function mailer(from, to, subject, link, html){
  let testAccount = await nodemailer.createTestAccount();

  let transporter = nodemailer.createTransport({
    host: "smtp.ethereal.email",
    port: 587,
    secure: false,
    auth: {
      user: testAccount.user,
      pass: testAccount.pass,
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
