# Abrahams Daughters - Nonprofit Donation Website

A clean, modern nonprofit donation website with a soft pink theme, built with React and Express.

## Quick Start

The application runs automatically. Visit the site to see all pages:
- **Home** - Hero section, mission summary, donation CTA
- **About Us** - Organization story and impact stats
- **Services** - Resources and "Need Help / Request Appointment" form
- **Events** - Upcoming event cards
- **Gallery** - Photo gallery with lightbox
- **Donate** - Donation page with suggested amounts
- **Blog** - Blog layout with posts
- **Contact** - Contact form and business information

## How to Update Content

All website text content is stored in a single JSON file for easy editing:

### Edit Site Content
**File:** `client/src/content/site-content.json`

This file contains:
- Organization info (name, phone, email, hours, address)
- Hero section text
- Mission statement and values
- Services descriptions
- Donation page content
- Events list
- Blog posts
- Footer links

Simply edit this JSON file to update any text on the website. Changes will appear after refreshing the page.

### Update Logo
The logo placeholder is in the Header component. To add your logo:
1. Place your logo image in `client/public/` (e.g., `logo.png`)
2. Update `client/src/components/Header.tsx`:
   - Replace the Heart icon with an `<img>` tag
   - Example: `<img src="/logo.png" alt="Abrahams Daughters" className="h-10 w-10" />`

### Update Colors
The pink theme colors are defined in `client/src/index.css`:
- Look for the `:root` section for light mode colors
- Look for the `.dark` section for dark mode colors
- The primary color is set using HSL values (340 for pink hue)

## Connect Payment Processing (Stripe)

To enable real donation processing:

1. Set up a Stripe account at https://stripe.com
2. Use Replit's Stripe integration to connect securely
3. Update the Donate page to use Stripe Elements or Checkout

The donation form is already structured to collect:
- Donation amount (suggested: $25, $50, $100, $250, $500, or custom)
- One-time or monthly frequency
- Donor information (name, email, anonymous option)

## Connect Newsletter (Mailchimp)

To connect newsletter signups to Mailchimp:

1. Create a Mailchimp account and audience list
2. Get your Mailchimp API key
3. Add the API key as a secret in Replit
4. Update `server/routes.ts` to call Mailchimp's API in the `/api/newsletter` endpoint

Currently, newsletter signups are stored in memory. The endpoint is ready to be extended.

## Live Chat Widget

A live chat placeholder is included. To connect a real chat service:

1. Choose a service (Intercom, Drift, Crisp, etc.)
2. Replace `client/src/components/LiveChatWidget.tsx` with the service's provided widget code
3. Or embed their script in `client/index.html`

## Forms Included

1. **Contact Form** (`/contact`)
   - Name, email, phone, subject, message
   - Submissions stored via `/api/contact`

2. **Help Request Form** (`/services`)
   - Name, email, phone, service type, preferred date, message
   - Submissions stored via `/api/help-request`

3. **Newsletter Signup**
   - Email subscription
   - Submissions stored via `/api/newsletter`

4. **Donation Form** (`/donate`)
   - Amount selection, frequency, donor info
   - Submissions stored via `/api/donations`

## API Endpoints

All form submissions are accessible via API (for admin purposes):

- `GET /api/contact` - Get all contact form submissions
- `GET /api/help-request` - Get all help requests
- `GET /api/newsletter` - Get all newsletter subscriptions
- `GET /api/donations` - Get all donation records

## Business Hours

As specified: Monday - Friday, 9:00 AM - 5:00 PM
Phone: 919-605-1214

## Tech Stack

- **Frontend:** React, TypeScript, Tailwind CSS, Shadcn UI
- **Backend:** Express.js, Node.js
- **Styling:** Custom soft pink theme with dark mode support
- **Forms:** React Hook Form with Zod validation
- **State:** TanStack Query for API calls

## File Structure

```
client/
├── src/
│   ├── components/     # Reusable UI components
│   │   ├── Header.tsx  # Sticky navigation
│   │   ├── Footer.tsx  # Footer with links
│   │   ├── LiveChatWidget.tsx
│   │   └── NewsletterSection.tsx
│   ├── content/        # Editable content
│   │   └── site-content.json
│   ├── pages/          # Page components
│   │   ├── Home.tsx
│   │   ├── About.tsx
│   │   ├── Services.tsx
│   │   ├── Events.tsx
│   │   ├── Gallery.tsx
│   │   ├── Donate.tsx
│   │   ├── Blog.tsx
│   │   └── Contact.tsx
│   └── index.css       # Theme colors
server/
├── routes.ts           # API endpoints
└── storage.ts          # In-memory data storage
```

## Accessibility

- Semantic HTML structure
- Keyboard navigation support
- Screen reader friendly labels
- Color contrast compliant
- Mobile-responsive design

## License

This project is created for Abrahams Daughters nonprofit organization.
