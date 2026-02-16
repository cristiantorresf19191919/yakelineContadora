# Yakeline Contadora - Next.js Codebase Architecture

## High-Level Overview

This is a modern Next.js 16.1 application for Yakeline Contadora, a Colombian accounting and tax consulting services website. The project uses React 19, TypeScript, Material-UI (MUI), Emotion CSS-in-JS, and Framer Motion for animations.

Live Site: https://yakelinecontadora.com
Hosting: Netlify
Framework: Next.js 16.1 (App Router)

---

## 1. Project Structure

Key directories:
- app/ - Next.js App Router with all routes
- lib/ - blogData.ts, Firebase, newsletter utilities
- data/ - services.ts, instagramVideos.ts
- public/ - Static assets (images)

Pages: home (/), /blog, /blog/[slug], /services, /about, /book, /mentorship, /videos

Components: Located in app/components/ with 25+ components including FloatingChat, SmartPopup, Hero, BlogListing, NewsletterSection, etc.

---

## 2. Key Architectural Patterns

App Router: Uses Next.js 16 App Router (not Pages Router) with Server and Client Components

Server Components: Layouts, API routes

Client Components (marked with "use client"): Home, Blog pages, Hero, FloatingChat, SmartPopup, and all interactive components

Suspense: BlogListing and LanguageSwitch wrapped in Suspense for async operations

---

## 3. State Management

Pattern: React hooks only - no Redux, Zustand, or global stores

Providers:
- EmotionCacheProvider: Handles CSS-in-JS caching for SSR
- ThemeProvider: MUI theme with custom colors and typography

Local State: FloatingChat (messages, drawer), SmartPopup (visibility), Components use useCallback/useMemo

Data: Blog articles in lib/blogData.ts, Services in data/services.ts, Newsletter via Firebase

---

## 4. API Routes & Data Fetching

API Routes:
- /api/chat (POST): AI chat using Google Gemini API
  Input: { message: string, history: array }
  Output: { response: string, timestamp: string, messageId: string }

Data: Blog articles are TypeScript objects (in-memory). Services imported from data/. Newsletter emails stored in Firebase Firestore. No SQL database.

---

## 5. Styling Approach

Multi-layer styling:
1. CSS-in-JS: Emotion + TSS React (makeStyles in .styles.ts files)
2. Material-UI: Components with theme customization
3. CSS Modules: FloatingChat.module.css, FloatingButtonsContainer.module.css
4. Inline Styles: MUI sx prop and Framer Motion

Theme Configuration (ThemeProvider.tsx):
- Primary: #5D3FD3 (Purple)
- Secondary: #F59E0B (Amber)
- Headings: Playfair Display (serif)
- Body: Outfit (sans-serif)

Responsive: Material-UI breakpoints (xs, sm, md, lg, xl), mobile-first approach

---

## 6. Firebase Integration

Purpose: Newsletter subscription only (no auth)

Setup:
- Initialization: lib/firebase/clientApp.ts
- Config: NEXT_PUBLIC_FIREBASE_* environment variables
- Browser-only execution

Firestore:
- Collection: newsletterSubscribers
- Fields: email, subscribedAt (server timestamp)

Implementation: NewsletterSection component -> subscribeToNewsletter() -> adds to Firestore

Required Env Vars:
NEXT_PUBLIC_FIREBASE_API_KEY
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN
NEXT_PUBLIC_FIREBASE_PROJECT_ID
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID
NEXT_PUBLIC_FIREBASE_APP_ID
NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID

---

## 7. Internationalization

Current: URL query parameter approach (?lang=en or ?lang=es)

LanguageSwitch component: Only on /blog page
Default: Spanish (es)

No translation files or i18n framework - content hardcoded in Spanish

---

## 8. Configuration Files

next.config.ts: Currently minimal (default config)

tsconfig.json:
- Target: ES2017
- Path aliases: @/* -> ./*
- Strict mode: on
- JSX: react-jsx

.netlify.toml: Deployment configuration

---

## 9. Key Dependencies

next (16.1.1) - Framework
react (19.2.0) - UI
@mui/material (6.0.0) - Components
@emotion/react (11.13.0) - CSS-in-JS
tss-react (4.9.19) - Styling hooks
framer-motion (12.24.0) - Animations
firebase (12.5.0) - Firestore
@google/genai (1.29.0) - Gemini AI

---

## 10. Key Components

Hero: Framer Motion animations, staggered text, floating particles, animated blobs

FloatingChat: AI chatbot (Gemini), drawer interface, message history, service detection, WhatsApp CTA, idle animations, activity tracking

SmartPopup: Marketing popup, shows at 30s or 70% scroll, once per day (localStorage), radial animation

Blog: TypeScript objects, markdown content, SEO fields, dynamic routing, suggested articles

---

## 11. Development

NPM Scripts:
npm run dev - Local development (port 3000)
npm run build - Production build
npm run start - Production server
npm run lint - Linting

Environment:
GEMINI_API_KEY or NEXT_PUBLIC_GEMINI_API_KEY (for AI)
NEXT_PUBLIC_FIREBASE_* (multiple keys)
NEXT_PUBLIC_SITE_URL (for metadata)

---

## 12. Performance

Image Optimization: Next.js Image component with priority flag

Code Splitting: Suspense boundaries for lazy loading

Animations: Framer Motion (performant), useCallback/useMemo optimization

Server Components: App Router leverages SSR, reduces client JS

---

## 13. Deployment

Platform: Netlify
Domain: yakelinecontadora.com
Config: .netlify.toml

Build: npm run build -> .next directory -> Netlify detects and deploys

---

## 14. Common Tasks

Add Blog Article: Edit lib/blogData.ts, add object to array, auto-appears on /blog

Add Service: Edit data/services.ts, add object with keywords, detected in chat

Add Page: Create /app/newpage/, add layout.tsx and page.tsx

Modify Theme: Edit app/ThemeProvider.tsx, update MUI theme

---

## 15. Limitations & Future

Current Limitations:
- No i18n framework
- Blog hardcoded (no CMS)
- Newsletter stores only (no sending)
- No authentication
- No SQL database
- No API rate limiting

Future:
- Headless CMS integration
- Proper i18n
- Authentication (NextAuth)
- Email service
- Analytics database
- API rate limiting
- Enhanced SEO

---

## Summary

Modern Next.js 16 content-marketing website:
- App Router for type-safe routing
- Server + Client Components for performance
- Material-UI + Emotion for responsive design
- Framer Motion for animations
- Firebase for email storage
- Google Gemini AI for chatbot
- Netlify for deployment

Focus: User experience, responsiveness, SEO, clean TypeScript code.

