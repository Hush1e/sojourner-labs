# Vanguard Cyber Labs: Workforce Risk Shield

Landing page, interactive training demo, and sales proposal for a B2B workforce training offer covering cybersecurity awareness, AI awareness, and compliance. Hosted free on GitHub Pages.

## Files

| File | Purpose |
|---|---|
| `index.html` | Landing page: offering, about, founder bio, pricing, call to action |
| `training.html` | The three-part locked escape room plus printable completion certificate |
| `proposal.md` | Sales proposal template to send to prospective clients |
| `assets/styles.css` | Shared styling for both pages |

## Before You Share the Site

1. Replace `PAYMENT_LINK` in `index.html` with a Stripe Payment Link.
2. Replace `CONTACT_EMAIL` in `index.html` with a business email address.
3. Confirm the brand name and check that it is not already in use (search the USPTO trademark database and your state business registry).
4. Review your employer's outside employment and conflict of interest policy.

## Turning On GitHub Pages

Settings, then Pages, then under "Build and deployment" choose **Deploy from a branch**, branch `main`, folder `/ (root)`, and Save. The site appears at `https://<username>.github.io/<repo-name>/` within a few minutes.

## Changing a Puzzle Answer

Answers are stored as SHA-256 hashes in `training.html` (the `KEYS` object) so they cannot be read in the page source. To change an answer, hash the new answer in lowercase and paste the result in. Any online SHA-256 tool works, or in a browser console:

```js
crypto.subtle.digest("SHA-256", new TextEncoder().encode("new-answer"))
  .then(b => console.log([...new Uint8Array(b)].map(x => x.toString(16).padStart(2,"0")).join("")))
```

The answer key is kept out of this public repository on purpose.

## Known Limits

The locks run in the browser, so they prevent skipping ahead but are not a security control. Completion certificates are generated on the employee's screen and are not recorded centrally. If clients need verified completion tracking, the next step is adding a form submission (for example Google Forms or Formspree) on the certificate page.
