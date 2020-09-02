---
title: Solid User Authentication in Javascript Apps
date: "2019-02-26"
description: "Considering JWTs for user authentication, and how to implement them. (Now, I think I'd go with sessions by default.)"
---

This is adapted from a [reddit post](https://www.reddit.com/r/webdev/comments/aur49e/best_options_for_secure_user_authentication_in/) I made (that didn't really get any traction. After [googling](https://stormpath.com/blog/where-to-store-your-jwts-cookies-vs-html5-web-storage) for a [few](https://auth0.com/docs/security/store-tokens) [hours](https://stackoverflow.com/questions/34817617/should-jwt-be-stored-in-localstorage-or-cookie) about user authentication in modern Javascript apps, I think I've got a decent handle on it. So I wanted to share my findings for anyone who happens across this post in their own google searches. Note that the details below apply best where you or your organization can make decisions for the client-side app **and** the server/API.

With user accounts, you introduce yourself and your users to a bunch of security threats, so you need a good way to authenticate users and keep track of their authentication so that they're not typing in their username/password every time they want to view a protected page.

The first choice is whether to have **stateful** or **stateless** authentication cookies/tokens. The web is leaning toward stateless cookies, so I'll assume we're using stateless tokens like [JWT](https://jwt.io/). The second choice is where to store the JWT token -- in **http-only cookies** or **localstorage**.

As of 2019, both options involve trade-offs. To summarize them:

- **Cookies** are sent by my browser along with every request to a certain domain, so they're vulnerable to cross-site request forgery (CSRF.) For example, imagine I'm logged into my bank at coolbank.com, and my authorization is saved as an http-only cookie. When I go to hacker-fakebook.com and accidentally start clicking around, the malicious operator of that website could create a link, image or form which actually sends a data-changing action to another site and counts on my cookies to be sent along automatically. So when I load up an image and it winds up making a post request to coolbank.com/transfer-to-scammer/, I could find myself in trouble. To protect against this, sites using cookies typically include a cross-site-request forgery (CSRF) prevention: for requests which may change data, an un-guessable header or value should be sent to legitimate users, returned on POST/PATCH requests, and inspected by the API.
- **localstorage** data is never sent automatically in requests, so it's immune to CSRF. However, it's vulnerable to malicious javascript. There are two main avenues through which this might happen.
  - First, my application may execute malicious user input as HTML or Javascript via an XSS attack. For example, I might fill out a rich-text box on a social media site with a section that includes `<script>sendSessionDataToMe();</script>` before my mom's favorite pasta recipe, and start harvesting user session data. Client-side apps like React are decently well protected against this by showing HTML directly unless the developer uses a technique like [dangerouslySetInnerHTML](https://reactjs.org/docs/dom-elements.html).
  - Second, if I'm building a modern app with other people's code using NPM, code I copied online, or downloaded from a CDN, it's possible that one of my dependencies, or the dependencies of my dependencies, includes malicious code as well. As with above, this malicious actor may start scraping user data. This can't be as easily prevented by my front-end framework, because it's code that I (unintentionally) told the framework to run. Instead, you have to audit dependencies carefully and hope that the folks running NPM are also doing so through their prevention efforts.

Anyhow, with that defined, here's what I believe is a good approach to keep an application generally safe.

1. When my user signs in, the server should send back a response a cookie and a body:
   1. A secure JWT token which is attached as an http-only cookie. The JWT's payload should expire relatively quickly (within fifteen minutes to a few hours) and may include my user's ID and role. In this example, it should also have a CSRF protection field which has randomly generated text.
   2. The body of my request should have whatever user data I want the front-end client to access, like email address, role, and maybe name. It should also include the CSRF protection value that was shared in the token above.
2. My client-side app should save the CSRF-protection value in localstorage.
3. Whenever my logged-in users saves data and my client-side app wants to send a post/patch request back to my server, I should include a header like 'myapp-csrf-protection' with my CSRF-protection value.
4. Finally, back on the server side, I'll verify the JWT token from the http-only cookie sent along with my request. If the method will change data (POST/PATCH/PUT), my API will also make sure that the CSRF-protection header is included and matches the value in the decoded JWT token before it does anything else with the request.
5. If the app refreshes the user's JWT token, the csrf-protection value should be updated on the client side as well.

This protects me against the attacks outlined above.

- By requiring the CSRF-protection value, the bank scammer would be prevented from tricking me into submitting the form since his site doesn't know the necessary CSRF-protection headers. I've mitigated the downside of a cookie.
- By hiding the JWT in an http-only cookie, I've mitigated the risks I face when an attacker can run Javascript on my site. Even if they steal my CSRF-protection data from localstorage, it's just random text. It won't grant them access to the API without the information hiding in my cookie.
- However, the malicious code vulnerability is more difficult to really defeat. If malicious Javascript is running as part of my React app, there's nothing to stop them from keylogging my users, which will give them username/password combinations directly. In that case, they won't need the JWT data.

This leads some folks to say that **localstorage is enough for JWT** since [XSS vulnerabilites can defeat all known CSRF proventions](https://github.com/OWASP/CheatSheetSeries/blob/master/cheatsheets/Cross-Site_Request_Forgery_Prevention_Cheat_Sheet.md#warning-no-cross-site-scripting-xss-vulnerabilities). Localstorage defeats CSRF, and many frameworks work with you to defeat user-entered XSS. If you're running malicious code, your CSRF protections are at risk.

So. What should you do?

- If your workflow can handle it, store your JWT in an http-only cookie and use an CSRF-protection token as well. The one I outlined above is a good plan for a client-rendered Javascript app. It's not a whole lot more effort than JWT-in-localstorage but gives _some_ additional protection agains malicious scripts.
- If you can't do the above, you can store your JWTs in localstorage. The best way to protect yourself and your users is to minimize the chances of malicious user-entered data, and to use JWTs with a short expiration time. (That way, even if an attacker steals localstorage data it may expire before they can make use of it.) This is only marginally less secure than the above, but many web developers [recommend against it](https://auth0.com/docs/security/store-tokens#don-t-store-tokens-in-local-storage), and your team might as well.
- In both cases, audit the code you depend on and areas where you trust user input. Neither of these prevention methods is going to save you or your users if an upstream dependency is performing malicious actions or if you've allowed user input to execute javascript.

I hope this is an informative set of options for developers building APIs and javascript applications. Disagree with the above? Send me an email and let me know why.
