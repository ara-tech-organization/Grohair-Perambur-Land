# Master Prompt - Advanced GroHair, Perambur Landing Page

## Role
You are a senior front-end engineer and conversion-focused UI designer. Build a single-page, mobile-first lead-generation landing page for **Advanced GroHair, Perambur, Chennai** (hair treatment and hair restoration clinic).

## Stack
- Vite + React 19 (existing project), plain CSS (no UI framework).
- Font: **Poppins** only (Google Fonts, weights 300-800).
- Icons: **lucide-react** only. **No emojis anywhere** (UI, copy, alt text, console).
- Animation: CSS transitions + IntersectionObserver (no heavy animation library).

## Brand (analysed from adgrohairgloskinperambalur.com)
- Logo: red/black "grohair" wordmark with hair-follicle "o" and tagline "Hair Regrowth Forever", with "ADVANCED" above. The source logo carries a "PERAMBALUR" banner (a different branch), so the page uses a cropped GroHair-only mark plus a typeset "ADVANCED" and "PERAMBUR" label.
- Palette: primary red `#ec0a1d`, hover `#c70615`, deep red `#860c17`, light tint `#ffe1e3`, ink `#1f1f29`, grey `#9ca3af`, white backgrounds with soft red-tint alternate sections.
- Tone: clean, clinical, calm, trustworthy. Generous whitespace, rounded 16-20px cards, soft shadows.

## Content rules
- Use the supplied copy verbatim (11 sections: Hero + lead form, Introduction, Hair Concerns, Treatments, Why Choose Us, Hair Transplant, GFC, How It Works, Local, FAQ, Final CTA + form).
- Compliance-safe wording: no guarantees, no "best", no before/after claims, no prices.

## Layout
1. Sticky header: logo, anchor links, Call Now button (becomes solid after scroll).
2. Hero: two columns (headline, subheadline, 4 trust chips, CTA | lead form card). Form first on mobile after headline.
3. Alternating white / tint sections, max width 1200px, 16px mobile gutter.
4. Concerns and treatments as icon cards in responsive grids (1 / 2 / 3 columns).
5. How It Works as numbered 4-step timeline with connecting line.
6. FAQ as accessible accordion (button + aria-expanded, animated height).
7. Final CTA band in brand red with second lead form and Call Now.
8. Footer + mobile sticky bottom bar (Call / Book).

## Animation (smooth, subtle, 60fps)
- Scroll-reveal: fade + translateY(24px) with stagger (80ms) via IntersectionObserver, run once.
- Hero: soft floating gradient blobs, staggered entrance of headline, chips, form.
- Cards: lift + icon colour swap on hover; buttons: shine sweep + arrow nudge.
- Accordion: grid-template-rows 0fr to 1fr transition; chevron rotates.
- Header: shadow and blur on scroll.
- Easing `cubic-bezier(.22,1,.36,1)`; honour `prefers-reduced-motion`.

## Forms
- Hero form: Full Name, Mobile Number (10-digit Indian mobile validation), Hair Concern (select: Hair Fall, Hair Thinning, Baldness, Hair Transplant, GFC Treatment, Other Hair Concerns), Preferred Appointment Date (optional). Button "BOOK MY CONSULTATION" + disclaimer.
- Final form: Full Name, Mobile Number, Hair Concern, Preferred Appointment Date. Button "REQUEST AN APPOINTMENT".
- Inline validation, labels linked to inputs, loading then success state. Submission is a stub (`submitLead`) to be wired to the CMS/API.

## Accessibility and quality
- Semantic landmarks, visible focus rings, contrast AA, 44px touch targets, lucide icons `aria-hidden`.
- Smooth anchor scrolling with header offset. Lighthouse target 90+.

## Deliverables
`index.html` (Poppins, meta, favicon), `src/index.css` (tokens + styles), `src/content.js` (all copy), `src/App.jsx` (components), logo assets in `src/assets`.
