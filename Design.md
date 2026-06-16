# Design.md — Crisis Ready Solutions (crisisreadysolutions.com)

## Project Overview

**Site:** [crisisreadysolutions.com](https://crisisreadysolutions.com)  
**Business:** Crisis Ready Solutions LLC  
**Type:** Service business / Lead generation website  
**Owner:** George Roat — Retired Firefighter/Paramedic, Veteran  
**Service Area:** Central Florida  
**Primary Goal:** Drive training inquiries and schedule bookings for on-site CPR & First Aid training  

---

## Brand Identity

### Voice & Tone
- **Authoritative but approachable** — 30+ years of real emergency experience
- **Urgent yet reassuring** — "Every second counts" messaging without fear-mongering
- **Community-focused** — Veteran-owned, serving local businesses, schools, and individuals
- **Professional credentialing** — HSI Certified, AHA Standards, nationally recognized certs

### Brand Values
- Preparedness
- Accessibility (we come to you)
- Real-world experience
- Integrity (Veteran-owned)

### Color Palette

| Role | Color | Hex |
|------|-------|-----|
| Primary | Emergency Red | `#C0392B` |
| Secondary | Deep Navy | `#1A2A4A` |
| Accent | Safety White | `#FFFFFF` |
| Background | Light Gray | `#F5F5F5` |
| Text | Charcoal | `#2C2C2C` |
| CTA Button | Bright Red | `#E74C3C` |

### Typography

| Role | Font | Weight |
|------|------|--------|
| Headings | Montserrat | 700 Bold |
| Body | Open Sans | 400 / 600 |
| Taglines/CTA | Montserrat | 600 SemiBold |

---

## Site Structure

```
/                   → Home (Hero, Services Overview, Instructor Bio, Testimonials, CTA)
/services           → Services (CPR/AED, First Aid, Group/Corporate Training)
/about              → About (George Roat bio, mission, why choose us, certifications)
/contact            → Contact (booking form, phone, email, Facebook)
```

---

## Page-by-Page Design Specs

### Home (`/`)

**Hero Section**
- Full-width background: dramatic paramedic/CPR action photo (dark overlay)
- H1: `Be Prepared When Every Second Counts`
- Subheading: `Professional CPR & First Aid Training at Your Location`
- Two CTAs side-by-side:
  - Primary: `Schedule Training Now` → `/contact`
  - Secondary: `Our Services` → `/services`
- Trust badges below hero: Veteran Owned | HSI Certified | AHA Standards

**Services Strip**
- 3-column card layout (responsive → 1 col mobile)
- Cards: CPR/AED Training | First Aid Training | Group & Corporate Training
- Each card: icon, title, 1-2 sentence description, link arrow

**Instructor Bio Section**
- 2-column: photo left, text right (stacks on mobile)
- Name: George Roat | Title: Firefighter/Paramedic (Retired)
- Short bio paragraph emphasizing real-world credibility
- Icon badges: Veteran Owned | HSI Certified | AHA Standards

**Testimonials**
- 3-card testimonial carousel or static row
- Star rating (5 stars), quote, name, title

**Bottom CTA Banner**
- Full-width colored banner (Primary Red background)
- Headline: `Ready to Get CPR and First Aid Certified?`
- Subtext: `No class too small. Group discounts for classes over 6.`
- Button: `Schedule Your Training`

---

### Services (`/services`)

**Page Hero**
- Smaller banner, H1 `Our Services`, breadcrumb nav

**Service Cards (detailed)**
- Expanded cards for each service with:
  - Icon or photo
  - Title, full description
  - Who it's for (individuals, HR teams, daycares, etc.)
  - Certification validity: 2-year HSI/AHA recognized cert

**Services at a Glance Table**

| Service | Audience | Duration | Certification |
|---------|----------|----------|---------------|
| CPR/AED Training | Individuals, Teams | ~2–3 hrs | HSI/AHA (2 yr) |
| First Aid Training | Workplace, Organizations | ~2–3 hrs | HSI/AHA (2 yr) |
| Group/Corporate | Businesses 6+ | Custom | HSI/AHA (2 yr) |

**Group Discount Callout Box**
- Highlighted box: `Classes of 6 or more receive special group pricing`
- CTA: `Get a Quote`

---

### About (`/about`)

**Instructor Profile**
- Large photo with navy overlay border
- Full bio: 30+ years Fire/EMS experience, founded CRS to bring training to community
- Emphasis on hands-on, scenario-based learning philosophy

**Mission Statement Block**
- Centered callout with quote styling:
  > "Our mission is to equip the public with needed skills to achieve the best outcome when a crisis arises — because most emergencies do not occur in the hospital, but where you work and live."

**Why Choose Us Grid (6-up)**
- On-Site Training
- Experienced Instructor
- Personalized Approach
- Recognized Certification
- Hands-On Learning
- Veteran Owned

**Client Testimonials**
- Full-length quotes, matching home page style

---

### Contact (`/contact`)

**Layout:** 2-column — Form left, info right (stacks on mobile)

**Form Fields**
- Name (required)
- Email (required)
- Phone
- Organization/Company
- Training Type (dropdown: CPR/AED | First Aid | Group/Corporate | Unsure)
- Preferred Date(s)
- Group Size
- Message / Special Requirements
- Submit: `Request Training`

**Contact Info Panel**
- 📧 info@crisisreadysolutions.com
- 📞 (740) 334-7077
- 🏢 Central Florida (On-site, we come to you)
- 🔗 [Facebook](https://www.facebook.com/Crisis-Ready-Solutions-llc-61569373581001/)

---

## Responsive Design

| Breakpoint | Layout Notes |
|------------|-------------|
| Mobile (<768px) | Single column, hamburger nav, stacked cards |
| Tablet (768–1024px) | 2-column cards, condensed hero |
| Desktop (>1024px) | Full 3-column, side-by-side sections |

---

## Components

### Navigation Bar
- Logo (left): 150px width container with inline Firefighter SVG (e.g., `<div class="logo" style="color: #C0392B;">`)
- Sticky on scroll with slight box-shadow
- Mobile: hamburger menu with slide-down drawer
- CTA button in nav: `Schedule Training` (red background, white text)

### CTA Buttons
- Primary: Red background (`#E74C3C`), white text, rounded corners (4px), bold
- Secondary: Transparent with red border, red text
- Hover: darken 10%, slight scale transform

### Cards
- White background, light drop-shadow
- 8px border-radius
- Icon (top or left) in red or navy
- Title, body text, optional link arrow at bottom

### Trust Badges
- Inline row of icon + label pairs:
  - 🎖️ Veteran Owned
  - ✅ HSI Certified
  - ❤️ AHA Standards

### Footer
- 3-column: Logo (150px Inline SVG) / tagline | Quick Links | Contact Info
- Dark Navy background, white text
- Copyright: `© 2023 Crisis Ready Solutions LLC. All rights reserved.`
- Privacy Policy | Terms of Service links

---

## SEO & Meta

| Page | Title Tag | Meta Description |
|------|-----------|-----------------|
| Home | Crisis Ready Solutions – CPR & First Aid Training Central Florida | On-site CPR and First Aid training in Central Florida. HSI/AHA certified. Veteran-owned. Schedule training at your location today. |
| Services | CPR & First Aid Training Services – Crisis Ready Solutions | Explore CPR/AED, First Aid, and Group Corporate training services from Crisis Ready Solutions. Nationally recognized certifications. |
| About | About George Roat – Crisis Ready Solutions | Meet George Roat, retired firefighter/paramedic with 30+ years of EMS experience, bringing life-saving training to Central Florida. |
| Contact | Schedule CPR Training – Crisis Ready Solutions | Contact Crisis Ready Solutions to schedule on-site CPR and First Aid training for your team or organization in Central Florida. |

---

## Accessibility

- WCAG 2.1 AA compliance target
- Alt text on all images
- Keyboard-navigable forms and nav
- Minimum contrast ratio: 4.5:1 (text on backgrounds)
- Focus indicators on interactive elements

---

## Tech Stack Recommendations

| Layer | Recommendation |
|-------|---------------|
| Framework | Static HTML/CSS/JS or Next.js |
| Styling | Tailwind CSS |
| Forms | Netlify Forms or Formspree (no backend required) |
| Hosting | Netlify or Vercel (static) |
| Analytics | Google Analytics 4 |
| Maps (optional) | Google Maps embed for service area |

---

## Assets Needed

- [ ] Professional headshot or action photo of George Roat
- [ ] CPR training action photos (hands-on, diverse workplace settings)
- [ ] Logo (SVG preferred) — red cross + text lockup
- [ ] Trust/certification badge graphics (HSI, AHA, Veteran-Owned)
- [ ] Favicon (32×32 ICO / SVG)

---

*Last updated: May 2026 | Document version: 1.0*
