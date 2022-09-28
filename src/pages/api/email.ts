import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: "smtp.sendgrid.net",
  port: 465,
  secure: true,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

export default async (req, res) => {
  const info = await transporter.sendMail({
    from: `${req.body.name} <notifier@mail.austinzentz.com>`,
    replyTo: `${req.body.name} <${req.body.email}>`,
    to: "austin.zentz@hey.com",
    subject: "Message from austinzentz.com",
    text: req.body.message,
    html: `<p>${req.body.message}</p>`,
  });
  res.statusCode = 200;
  res.setHeader("Content-Type", "application/json");
  res.end();
};
