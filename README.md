# Sojourner Labs

Website, escape room training missions, and sales proposal for Sojourner Labs, which sells cybersecurity awareness, AI awareness, and compliance training to small and midsize businesses. Hosted free on GitHub Pages.

## Pages
- `index.html` landing page with risk check, pricing calculator, founder bio, FAQ
- `missions.html` mission catalog
- `missions/*.html` five missions: The Brightline Breach (free demo), Voice of the CEO, The AI Policy, Locked Out, The First Hour
- `onboarding.html`, `contact.html`, `verify.html`, `terms.html`, `privacy.html`
- `proposal.md` sales proposal template

## Settings
Edit `assets/config.js` to add your business email, Stripe Payment Links, and a form endpoint (for example Formspree) that receives completion records and contact messages.

## Customer links
Give each customer `https://hush1e.github.io/sojourner-labs/missions.html?org=CompanyName` style links. Add `?org=CompanyName` to any mission URL to prefill the company on certificates.

Answers are stored only as SHA-256 hashes. The mission source with plain answers is kept out of this public repository on purpose.

© 2026 Sojourner Labs. All rights reserved. See LICENSE.
