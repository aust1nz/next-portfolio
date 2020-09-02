---
title: Simple Email Contact Forms with NextJS
date: "2020-09-01"
description: "Here's a really simple way to build out a contact me form that sends you an email. This could be a good solution for a portfolio-style site without a ton of back-end presence."
---

This site is built with [NextJS](https://nextjs.org), a React framework that gives you a bunch of features on top of React, out of the box, most notably static generation and server-side rendering, which make for a crisp loading experience for users (and search engines!)

Next also has this cool feature for [API Routes](https://nextjs.org/docs/api-routes/introduction), which allow you to build out some back-end logic in a special `/pages/api` folder. This allows you to do things like use sensitive keys/passwords without exposing them to your front-end users.

Using the API route, we can build out a contact me form and send the contents to yourself without leaving your NextJS app. Nice!

## Before you begin

I think the _easiest_ way to build a contact me form is to use this cool service called [Formspree](https://formspree.io/). It lets you build a form, POST it to their API, and then they'll send you an email. No back-end necessary. So I'll point you there if that's your priority.

Actually, scratch that. The easiest way is _definitely_ to just list your email. Duh.

But this method isn't much harder. Plus, it gives you some structure that you can use when someone is reaching out, and keeps your personal email private. If you're interested, read on!

## Prerequisites

If you've gotten this far, I'll assume you're using NextJS and are familiar enough with it and React. We'll also be using [Formik](https://github.com/formium/formik) (to help us build out the forms), [Yup](https://github.com/jquense/yup) (for easy form validation), and [Nodemailer](https://github.com/nodemailer/nodemailer) (to send the actual email) here, so go ahead and install those in your project.

```bash
npm install formik yup nodemailer
```

You'll also need to sign up for an email service that supports sending emails through SMTP. I'm using [SendGrid](https://sendgrid.com/), which has a generous free tier of 100 emails/day, but you can choose whatever works for you. Whatever service you sign up for, you'll need to do some configuration that allows you to send emails, and that typically involves updating CNAME records for your domain name service provider. The specifics there vary, so I'll let you handle that on your own!

### Forming our Contact... Form

In this example, I want to build a contact form that asks for a person's name, email, and a short message. You can see my live version at the [Contact](/contact) link. You don't _need_ to use Formik to build out a form, but it's my favorite form library for React. I recommend taking a look at their [overview](https://formik.org/docs/overview) and getting familiar with it. Here's a basic contact component that includes everything we need.

```jsx
/* /pages/contact.jsx */
import { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

export default function Contact() {
  const [submitted, setSubmitted] = useState(false);

  return submitted ? (
    <p>Message Received! I'll get back to you soon.</p>
  ) : (
    <Formik
      initialValues={{
        name: "",
        email: "",
        message: "",
      }}
      validationSchema={Yup.object({
        name: Yup.string().required("Required"),
        email: Yup.string().email("Invalid email address").required("Required"),
        message: Yup.string().required("Required"),
      })}
      onSubmit={async (values) => {
        // We'll get to this part next!
        const response = await fetch("/api/email", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(values),
        });
        setSubmitted(true);
      }}
    >
      {(formik) => (
        <Form>
          <Field type="text" name="name" />
          <ErrorMessage name="name" />
          <Field type="email" name="email" />
          <ErrorMessage name="email" />
          <Field as="textarea" name="message" />
          <ErrorMessage name="message" />
          {formik.submitCount > 0 && !formik.isValid && (
            <p>Some fields are missing/invalid.</p>
          )}
          <button type="submit" disabled={formik.isSubmitting}>
            Send
          </button>
        </Form>
      )}
    </Formik>
  );
}
```

Here we're creating a contact page with a state variable called `submitted`. Then we're building our Formik component with a simple validation, and using Formik's built-in `<Field>` and `<ErrorMessage>` components to very quickly create our form. When the form is submitted, we set our `submitted` variable to true and display a success message.

You'll probably want to style things up a bit, and maybe include some instructions. I leave that as an exercise. But let's come back to our submit handler:

```js
const response = await fetch("/api/email", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify(values),
});
```

Here we're using the built-in fetch API to make a POST request to an `/api/email` path, and sending our form values to the request. Of course, that route doesn't exist yet, so we'll have to build it out!

### API Route

We're going to have a really simple strategy for our API route: Read the request body and send ourselves an email. To start, create a page at `/pages/api/email.js`. Let's create a Nodemailer transport that we can use to send ourselves an email.

```js
/* /pages/api/email.js */
import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: "smtp.sendgrid.net", // Use your email providers' SMTP
  port: 465,
  secure: true,
  auth: {
    user: "apikey", // This may vary by email provider
    pass: process.env.SMTP_PASSWORD,
  },
});
```

That process.env.SMTP_PASSWORD won't do anything yet. At your project's root, create or open your `.env.local` file. Create a variable called SMTP_PASSWORD and paste your email provider's SMTP password here.

```env
SMTP_PASSWORD=SG.asdcsdlckzj34.zsdclkj341lk3jczldkcjasfd
```

By using an environmental variable here, you avoid exposing your password to Github or your version control provider, and you can also set different passwords in different environments. (You may want to set an invalid SMTP password when you're testing, and a real one for your production site.)

Finally, we're ready to build our route handler. Let's head back to the `/pages/api/email.js` file we created earlier, and add a handler.

```js
import nodemailer from "nodemailer";

...

export default async (req, res) => {
  const info = await transporter.sendMail({
    from: `${req.body.name} <notifier@yourwebsite.com>`,
    replyTo: `${req.body.name} <${req.body.email}>`,
    to: "your.email@provider.com",
    subject: "Message from Your Site",
    text: req.body.message,
    html: `<p>${req.body.message}</p>`,
  });
  res.statusCode = 200;
  res.setHeader("Content-Type", "application/json");
  res.end();
};
```

That's it! If you're familiar with Express, this should be a familiar signature, but it's specific to the NextJS framework here. We're just pulling out the name, email and message from the form we built earlier, and sending ourselves an email. With both pages saved, your app should be in business! You can try submitting the form now, and you should get an email at the to address you listed.

**Note:** Be careful with your from address. It needs to be from a validated email address, or your message either won't send at all or may get routed to a spam folder. Again, the method to validate a domain are specific to your mail provider.

### Next Steps/Cautions

If spammers or bots find your site, you could wind up sending yourself some spam. Yikes! Consider a honeypot field that's rendered but hidden through CSS. If this field is filled out, your API route can ignore the request, and avoid spam, though the form will look submitted to your users.

If you wind up implementing this or something like it, let me know through that good old [Contact Form](/contact)!
