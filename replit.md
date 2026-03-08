# Abraham's Daughters - Nonprofit Event Planning Website

## Overview
A clean, modern nonprofit event planning website for "Abraham's Daughters" built with plain HTML, CSS, and JavaScript (no frameworks). Features a burgundy theme (#824242), Sora/Space Grotesk fonts, mobile-first responsive design, and 6 pages focused on event planning services with proceeds supporting women in the community. Includes a Stripe-powered Donate page.

## Organization Info
- **Established:** 2014
- **Location:** Garner, North Carolina
- **Mission:** Event planning and design services with proceeds supporting financially unstable women in the community

## Project Architecture

### Frontend (Plain HTML/CSS/JS)
- **Structure:** Static HTML pages served from `/public` folder
- **Styling:** Custom CSS with CSS variables for theming
- **Interactivity:** Vanilla JavaScript for forms, navigation, and UI interactions
- **No frameworks:** No React, TypeScript, or build tools needed

### Backend (Express + Node.js)
- **Server:** Express.js serving static files + API endpoints
- **Storage:** In-memory storage (MemStorage class)
- **Validation:** Zod schemas for API request validation

### Theme
- **Primary Color:** Burgundy (#824242)
- **Fonts:** Sora (headings), Space Grotesk (body)
- **Buttons:** Primary buttons have 50px border-radius (pill), secondary buttons have 0px border-radius (square)
- White background with burgundy accents
- Mobile-first responsive design

## File Structure

```
public/
├── index.html          # Home page (hero, images, bible verse, social links, contact form)
├── about.html          # About Us page
├── team.html           # Meet the Team page
├── gallery.html        # Photo gallery (Weddings, Events, Design & Decorate)
├── events.html         # Upcoming events
├── donate.html         # Donate page (Stripe Checkout)
├── donate-success.html # Donation success/thank you page
├── donate-cancel.html  # Donation cancelled page
├── images/
│   └── logo.png        # Organization logo
├── css/
│   └── styles.css      # All CSS styles
└── js/
    └── main.js         # JavaScript for forms, navigation, etc.

server/
├── index.ts            # Express server setup
├── routes.ts           # API endpoints
├── storage.ts          # In-memory storage
└── static.ts           # Static file serving

shared/
└── schema.ts           # Zod validation schemas
```

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | /api/contact | Submit contact form |
| GET | /api/contact | Get all contact submissions |
| POST | /api/help-request | Submit help request |
| GET | /api/help-request | Get all help requests |
| POST | /api/newsletter | Subscribe to newsletter |
| GET | /api/newsletter | Get all subscriptions |
| POST | /api/donations | Submit donation |
| GET | /api/donations | Get all donations |
| POST | /api/create-checkout-session | Create Stripe Checkout session |

## Pages

1. **Home** (index.html) - Hero section, image gallery placeholders, bible verse (Jeremiah 29:11), social links (FB/IG), contact form
2. **About Us** (about.html) - Organization story, mission, services list, why choose us
3. **Meet the Team** (team.html) - Team member cards with placeholder photos
4. **Gallery** (gallery.html) - Photo gallery organized by categories (Weddings, Events, Design & Decorate)
5. **Events** (events.html) - Upcoming community events and fundraisers
6. **Donate** (donate.html) - Stripe Checkout donation page with suggested amounts ($10/$25/$50/$100/$250), custom amount, optional name/email/message, monthly recurring option
   - **Success** (donate-success.html) - Thank you page after successful donation
   - **Cancel** (donate-cancel.html) - Page shown when donation is cancelled

## Key Features
1. Sticky navigation with Contact Us button
2. Mobile hamburger menu
3. Contact form on home page (integrated with backend)
4. Bible verse section on home page
5. Facebook and Instagram social links
6. Photo gallery with category sections
7. Team member cards
8. Toast notifications for form feedback
9. Fully responsive (mobile-first)
10. Image placeholders throughout (ready for actual images to be uploaded)
11. Stripe Checkout integration for donations (one-time + monthly recurring)

## Environment Variables
- **STRIPE_SECRET_KEY** (secret) - Required for Stripe Checkout integration on the donate page

## Editing Content

All content is directly in HTML files for easy editing:
- Update text in the HTML files
- Modify styles in `/public/css/styles.css`
- Change JavaScript behavior in `/public/js/main.js`
- Replace image placeholders by adding images to `/public/images/`

## Running the Project
```bash
npm run dev
```
Starts the Express server on port 5000.

## Recent Changes
- **March 2026:** Added Donate page with Stripe Checkout integration (one-time + monthly recurring), success/cancel pages, soft pink/white theme
- **February 2025:** Complete rebrand to event planning focus
- Updated branding: Burgundy theme (#824242), Sora/Space Grotesk fonts
- Reduced to 5 pages (Home, About Us, Meet the Team, Gallery, Events)
- Added bible verse section (Jeremiah 29:11 placeholder)
- Added Facebook/Instagram social links
- Contact form integrated into home page
- Logo added throughout site
- About page content from organization's Wix site
- Gallery organized into categories (Weddings, Events, Design & Decorate)

## User Preferences
- Plain HTML/CSS/JS (no TypeScript or React frameworks)
- Mobile-first responsive design
- Clean, accessible UI
- Easy to edit content directly
- Focus on event planning services (not just weddings)
- Burgundy color scheme (#824242)
