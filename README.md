# Northlight Education — Landing Page

A premium, responsive single-page website for an education consultancy, built with React and Vite. The page includes service pathways, the consultancy's process, testimonials, FAQs, a validated callback form, and a footer with an embedded Google Map.

## Run locally

```bash
npm install
npm run dev
```

Open the URL printed by Vite (usually `http://localhost:5173`).

```bash
npm run build    # production build
npm run preview  # preview the production build
npm run lint     # lint with oxlint
```

## What to customise

| What | Where |
| --- | --- |
| Brand name, navigation, contact details, map location, social placeholders | `src/data/site.js` |
| Service pathways, imagery, descriptions, highlights, CTAs | `src/data/services.js` |
| "Why choose us" features | `src/data/features.js` |
| Process steps | `src/data/steps.js` |
| Sample testimonials | `src/data/testimonials.js` |
| FAQ content | `src/data/faq.js` |
| Logo mark and wordmark | `src/components/ui/Logo.jsx` |
| Brand colours, type, spacing, radii | `src/styles/variables.css` |

All contact details, the address, map query, and social profiles are placeholders. Replace them before launch.

### Google Map

The footer map uses a query-based Google Maps embed. Update `contact.mapQuery`, `contact.mapEmbed`, and `contact.mapLink` in `src/data/site.js` with your office location. Using the Google Maps Embed API is optional; the current query embed does not require an API key.

### Form behaviour

The callback form is front-end only. It validates in the browser, shows inline errors, and displays a confirmation state on success. It does **not** send or store data anywhere. The confirmation copy states this explicitly. Connect it to your preferred form service or backend when going live.

### Testimonials

The three stories are labelled as illustrative sample content and are not presented as verified customer reviews. Replace names, programme labels, quotes, and initials with approved testimonials before launch. Avoid adding ratings or verification claims unless you can substantiate them.

## Notes

- Built with Vite, React (JSX), custom CSS, and Lucide React icons.
- No router, backend, authentication, or CMS is included.
- All in-page navigation and CTAs work within this single page.
- Local photography is sourced from Unsplash and bundled in `src/assets/images/`. Replace with your own licensed imagery as needed.
- The design respects `prefers-reduced-motion` and includes keyboard focus styles, a skip link, semantic landmarks, and accessible accordions and navigation.
- Privacy Policy, Terms & Conditions, and social profile items open placeholder dialogs rather than linking to missing pages.

## Structure

```
src/
  assets/images/       Optimised local photography
  components/          Page sections and reusable UI
    ui/                Logo, Button, SectionHeading, Reveal, Accordion, Modal
  data/                Editable content
  hooks/               Active-section navigation observer
  styles/              variables.css + global.css
  App.jsx
  main.jsx
```
