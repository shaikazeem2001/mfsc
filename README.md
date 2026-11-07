# Moving Forward Solutions Co. — Website

A static website, ready to deploy on Netlify. It has no build step and no dependencies.

## Deploy

**New site:** sign in at app.netlify.com, open **Sites → Add new site → Deploy manually**, and drag this whole folder onto the page.

**Updating the existing site:** open the site in Netlify, go to **Deploys**, and drag this folder onto the deploy area.

**From GitHub (this repo):** in Netlify choose **Add new site → Import an existing project**, then pick the `Moving-Forward-Staffing-co` repo. Set **Base directory** to `MFSC`, leave the build command empty, and set the publish directory to `MFSC`. After that, every push to the repo redeploys the site automatically.

**Custom domain:** in **Site configuration → Domain management**, add `www.mfscsolutions.com` and follow Netlify's DNS steps.

## Pages

| File | Page | In the main menu |
|---|---|---|
| `index.html` | Home | Yes |
| `business.html` | Business Solutions | Yes |
| `individuals.html` | Individual Solutions & Memberships | Yes |
| `resources.html` | Community Resources & Partners | Yes |
| `about.html` | About & Contact | Yes |
| `assessment.html` | Business Solutions Assessment | No. It's a landing page reached from the CTA buttons on every page. |
| `404.html` | Not-found page | No |

Netlify serves these at clean URLs too, for example `/resources`.

Every page uses one responsive layout (`css/site.css`, no inline styles). Headings use Archivo and body text uses Public Sans, loaded from Google Fonts.

## Forms (Netlify Forms)

Netlify detects three forms automatically on deploy. Submissions show up under **Forms** in the Netlify dashboard. To get them by email, open **Forms → Form notifications**.

- **mailing-list:** the footer signup on every page.
- **contact:** the contact form on the About page.
- **assessment:** the lead form at the end of the assessment. Each submission includes the contact details, the business context, a score for each area, the diagnosis, the recommended solution and every answer.

Forms only submit once the site is on Netlify. A local preview will show a submit error, and that's expected.

## Still to fill in

- **Booking calendar:** every "Book a Consult" button opens the contact form on the About page (topic and message are pre-filled). When the client has a calendar URL, point those buttons at it and see the TODO comment in `about.html`.
- **Membership checkout:** "Join Basic" and "Join Plus" open the contact form with the plan pre-filled. Replace them with the payment link when it exists.
- **Social icons:** removed from the footer until the real profile URLs exist.
- **Resources listings and partner logos:** removed the empty `[Organization name]` and `[Partner logo]` placeholders. Add real entries using the comment template in `resources.html`.
- **Video tiles:** the home page video section was removed because there are no videos yet.

## Notes

- **Business Development Partner:** removed from the site for now, because it isn't a public service yet. A Growth result on the assessment now recommends a Business Solutions Consultation instead.
- **Photos:** the photos that came from the brand guide's mood board should be license-checked, or replaced with real MFSC photography.
