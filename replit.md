# Abrahams Daughters - Nonprofit Donation Website

## Overview
A modern, mobile-first nonprofit donation website for "Abrahams Daughters" featuring a soft pink theme, multiple pages, forms for contact/help requests, and donation functionality.

## Project Architecture

### Frontend (React + TypeScript)
- **Framework:** React with TypeScript
- **Routing:** Wouter
- **Styling:** Tailwind CSS with Shadcn UI components
- **State Management:** TanStack Query for server state
- **Forms:** React Hook Form with Zod validation

### Backend (Express + Node.js)
- **Server:** Express.js
- **Storage:** In-memory storage (MemStorage class)
- **Validation:** Zod schemas shared between frontend and backend

### Theme
- Soft pink color scheme (HSL 340 hue)
- White background with pink accents
- Full dark mode support
- Inter font for body, Playfair Display for headings

## File Structure

```
client/src/
├── components/
│   ├── Header.tsx          # Sticky navigation with mobile menu
│   ├── Footer.tsx          # Site footer with contact info
│   ├── LiveChatWidget.tsx  # Chat widget placeholder
│   ├── NewsletterSection.tsx # Email signup component
│   └── ui/                 # Shadcn UI components
├── content/
│   └── site-content.json   # Editable site content
├── pages/
│   ├── Home.tsx            # Landing page with hero
│   ├── About.tsx           # Organization story/mission
│   ├── Services.tsx        # Services + help request form
│   ├── Events.tsx          # Event listings
│   ├── Gallery.tsx         # Photo gallery with lightbox
│   ├── Donate.tsx          # Donation page
│   ├── Blog.tsx            # Blog posts
│   └── Contact.tsx         # Contact form
├── App.tsx                 # Main app with routing
└── index.css               # Theme variables

server/
├── routes.ts               # API endpoints
└── storage.ts              # In-memory storage

shared/
└── schema.ts               # Shared Zod schemas
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

## Content Management

All editable content is in `client/src/content/site-content.json`:
- Organization info (name, phone, email, hours)
- Hero section text
- Mission and values
- Services descriptions
- Events list
- Blog posts
- Footer links

## Key Features
1. Sticky navigation with prominent Donate button
2. Mobile-responsive design
3. Contact form with validation
4. Help/Appointment request form
5. Newsletter signup (Mailchimp-ready)
6. Donation form with suggested amounts
7. Live chat widget placeholder
8. Photo gallery with lightbox
9. Blog section
10. Dark mode support

## Running the Project
```bash
npm run dev
```
This starts both the Express backend and Vite dev server.

## Recent Changes
- January 2025: Per-page SEO with react-helmet-async - unique titles/meta for each route
- January 2025: Forms refactored to shadcn Form + useForm + zodResolver pattern
- January 2025: Expanded site-content.json with all page content (SEO, services details, gallery items, blog posts, events)
- January 2025: Accessibility fix for Gallery dialog (DialogTitle/DialogDescription)
- Initial build: Complete nonprofit website with all pages and forms
- Pink theme implemented with HSL 340 hue
- All forms connected to backend API
- In-memory storage for form submissions

## User Preferences
- Mobile-first responsive design
- Clean, accessible UI
- Fast loading performance
- Admin-friendly content structure in JSON
