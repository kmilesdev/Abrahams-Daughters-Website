# Abrahams Daughters - Nonprofit Donation Website

## Overview
A clean, modern nonprofit donation website for "Abrahams Daughters" built with plain HTML, CSS, and JavaScript (no frameworks). Features a soft pink theme, mobile-first responsive design, and multiple pages for services, donations, and community engagement.

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
- Soft pink color scheme (HSL 340 hue)
- White background with pink accents
- Inter font for body, Playfair Display for headings
- Mobile-first responsive design

## File Structure

```
public/
├── index.html          # Home page
├── about.html          # About Us page
├── services.html       # Services + help request form
├── events.html         # Upcoming events
├── gallery.html        # Photo gallery
├── donate.html         # Donation page
├── blog.html           # Blog posts
├── contact.html        # Contact form
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

## Pages

1. **Home** (index.html) - Hero section, mission, services preview, stats, CTA
2. **About** (about.html) - Organization story, mission/vision, values, impact
3. **Services** (services.html) - Service details + help request form
4. **Events** (events.html) - Upcoming community events
5. **Gallery** (gallery.html) - Photo gallery with modal lightbox
6. **Donate** (donate.html) - Donation form with amount selection
7. **Blog** (blog.html) - Blog posts and categories
8. **Contact** (contact.html) - Contact form and info

## Key Features
1. Sticky navigation with Donate button
2. Mobile hamburger menu
3. Contact form with backend integration
4. Help/Appointment request form
5. Newsletter signup on multiple pages
6. Donation form with preset amounts
7. Live chat widget placeholder
8. Photo gallery with lightbox
9. Toast notifications for form feedback
10. Fully responsive (mobile-first)

## Editing Content

All content is directly in HTML files for easy editing:
- Update text in the HTML files
- Modify styles in `/public/css/styles.css`
- Change JavaScript behavior in `/public/js/main.js`

## Running the Project
```bash
npm run dev
```
Starts the Express server on port 5000.

## Recent Changes
- **January 2025:** Complete rebuild from React/TypeScript to plain HTML/CSS/JS
- All 8 pages created with consistent design
- Forms connected to backend API endpoints
- Mobile-responsive navigation
- Soft pink theme (HSL 340) implemented
- Toast notifications for form feedback

## User Preferences
- Plain HTML/CSS/JS (no TypeScript or React frameworks)
- Mobile-first responsive design
- Clean, accessible UI
- Easy to edit content directly
