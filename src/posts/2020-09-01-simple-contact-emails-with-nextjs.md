---
title: Super Simple Contact Forms in NextJS
date: "2020-09-01"
description: "On easily implementing a contact form with NextJS's API routes"
---

NextJS is a pretty cool React framework that I'm using to power this site. I wanted to build a contact form that would send me an email whenever it's filled out, and, if I'm being honest, I wanted to overengineer the solution a little bit.

Here's the key file:

(`/pages/api/email.ts`)

```js
import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: "smtp.sendgrid.net",
  port: 465,
  secure: true,
  auth: {
    user: "apikey",
    pass: process.env.SG_PASSWORD,
  },
});

export default async (req, res) => {
  const info = await transporter.sendMail({
    from: `${req.body.name} <notifier@austinzentz.com>`,
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
```

More to come.
