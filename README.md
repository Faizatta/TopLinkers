# TopLinkers — Real Estate, Construction & Solar Platform

A modern, production-quality real estate website built with **Vue 3** (Composition API, `<script setup>`), **Vite**, **Vue Router 4**, **Pinia**, **Tailwind CSS**, **Swiper.js**, and **Leaflet**.

The layout follows the clean luxury property architecture inspired by the **Houzez Demo 47** theme, tailored specifically for **TopLinkers** in **Islamabad & Rawalpindi, Pakistan** with official company branding, PKR pricing (Lacs & Crores), Marla/SqFt measurements, and integrated architectural project assets.

---

## 🌟 Key Features & Highlights

### 1. Brand Identity & Design System
- **Company Name:** **TopLinkers** (`- REAL ESTATE & MARKETING -`)
- **Navy (Headings, Stats Band, Dark Buttons):** `#0F2A44`
- **Accent Cyan (Highlighted Words, CTAs, Links):** `#16B4E8`
- **Badges:**
  - `#6CC24A` ("FEATURED")
  - `rgba(0,0,0,0.6)` ("FOR SALE" / "FOR RENT")
  - `#E53935` ("HOT OFFER")
- **Container:** `max-w-[1280px]` with generous vertical section spacing (~100px).
- **Typography:** Plus Jakarta Sans & Manrope with bold hero headlines (`~56px`) and section titles (`~36px`) featuring cyan keyword highlights and small uppercase cyan eyebrow labels.

### 2. Authentic TopLinkers Assets & Integration
- **Official Brand Logo:** [`/public/toplinkers-logo.jpg`](file:///C:/Users/faiiz/.gemini/antigravity/scratch/topliker/public/toplinkers-logo.jpg) featured in the sticky header, footer, modals, and contact channels.
- **Head Office:** Office # 02, Ground Floor, Opal Square, D Markaz, Gulberg Islamabad, Pakistan (`33.6015, 73.1360`).
- **Contact Helplines:** `0323-596-3375` (WhatsApp direct), `0334-952-2157`, `0332-400-4884`, `toplinkers12@gmail.com`.
- **Social Handles:** `@Linkerstop` (X/Twitter), `/Top-Linkers` (LinkedIn), `Top.Linkers` (Facebook/Instagram).
- **Executive Project Flyer Modal (`FlyerModal.vue`):**
  - **Tab 1: Project Flyer & Services** ([`toplinkers-flyer-plan.jpg`](file:///C:/Users/faiiz/.gemini/antigravity/scratch/topliker/public/toplinkers-flyer-plan.jpg)) showcasing **H&R Suites**, **Faisal Town Phase 2 (FT-II)**, **TopCity-1** (10 Marla PKR 2.5 Cr / 75 Lac), **PECHS** (5 Marla PKR 25 Lac), **Blue World City**, **B-17**, and **Bano Qadeer**.
  - **Tab 2: PHA Flat Floor Plans** ([`toplinkers-pha-floorplans.jpg`](file:///C:/Users/faiiz/.gemini/antigravity/scratch/topliker/public/toplinkers-pha-floorplans.jpg)) with architectural specs for **PHA I-12 C-Type (1,100 sq ft, 2 bed)**, **I-12 D-Type (870 sq ft, 2 bed)**, **I-16 C-Type (912 sq ft, 2 bed)**, and **I-16 B-Type (1,496 sq ft, 3 bed with attached washrooms)**.
  - Three core service divisions: **Real Estate**, **Turnkey Construction**, and **Solar Net Metering (10kW, 20kW, 50kW)**.

---

## 🏛️ Page Architecture & Layout

### 1. Home Page (`/`)
1. **Hero Section (Full Screen):** Sunset villa with soft left white gradient for readability, eyebrow `"FIND YOUR NEXT PROPERTY"`, headline `"Where Great Properties Meet The Right Buyers"` (with `"Great Properties"` in cyan), and `"Start Exploring →"` CTA.
2. **Search Box (Overlapping bottom of hero):**
   - Status Tabs: **All**, **For Rent**, **For Sale**
   - 4 Labeled Selects: **Type**, **Where (City / Sector)**, **Rooms (Bedrooms)**, **Budget (Max PKR)**
   - Cyan **Search Button** with sliding arrow transition on hover
3. **Feature Highlights Row:** 4 items with rounded images (`"Wide Range of Properties"`, `"Trusted by Thousands"`, `"Great Locations"`, `"Expert Support"`).
4. **"Handpicked Properties For You" (Eyebrow: FEATURED PROPERTIES):** Swiper carousel with 4 cards on desktop, outlined Prev/Next controls, dot pagination, mini hover carousel, badges, gradient price overlay, and 3 quick actions (lightbox, favorite, compare).
5. **About Section:** `"Making Real Estate Simpler"` checklist with cyan check-circles and large interior photo with animated count-up card (`56,000+ Satisfied Clients`).
6. **Stats Band:** Navy bar with 4 animated count-up metrics (`1,850+ Listed Properties`, `12+ Top Societies`, `250+ Turnkey Homes`, `99.2% Client Trust`).
7. **"Trusted By Thousands" (Eyebrow: WHAT OUR CLIENTS SAY):** 3 testimonial cards with cyan bottom borders.
8. **"Find A Home That Fits Your Lifestyle" (Eyebrow: EXPLORE BY LIFESTYLE):** Horizontal type cards with count and photos.
9. **"Why TopLinkers" (Eyebrow: WHY CHOOSE TOPLINKERS):** Real Estate, Turnkey Construction, and Solar divisions grid.
10. **"Explore Properties In Top Locations":** Tall photo cards for Gulberg Islamabad, DHA & Bahria Town, Faisal Town Phase 2, and CDA I-Sectors.
11. **CTA Banner:** Dark photo banner with `"Ready To Find Your Dream Property?"` and cyan button.

### 2. Listings Page (`/listings`)
- **Houzez 47 Half-Map Layout:**
  - **Left Half:** Sticky full-height Leaflet map with custom pill price markers, cluster support, and zoom controls.
  - **Right Half:** Scrollable filter panel (Keyword, Type, City, Status, Beds, Baths, Price Range slider, Features checklist), results header with active filters and sort dropdown, responsive 2-column property card grid, and pagination.
  - **Mobile:** Interactive toggle button to flip between Listings Grid and Map View.

### 3. Property Details Page (`/property/:slug`)
- Media gallery with 3-way toggle (Photos / Map / Street View) and thumbnail scroller.
- Full PKR price header (`PKR 2.5 Crore`, `PKR 60 Lac`, `PKR 85,000/mo`).
- Property specifications (Beds, Baths, Area in Marla & Sq Ft, Society, NOC Status).
- Direct PHA Floor Plan button triggering the user-uploaded architectural drawing popup.
- Localized PKR Mortgage & Installment Financing Calculator.
- Sticky Agent Card with direct **WhatsApp link** (`wa.me/923235963375`).
- Similar listings carousel.

### 4. About Page (`/about`)
- Company mission and values.
- Comprehensive breakdown of all 3 business pillars: **Real Estate Sales & Marketing**, **Turnkey Construction**, and **Solar Energy (10kW/20kW/50kW)**.
- Verified agent leadership directory.

### 5. Blog & Article Pages (`/blog` and `/blog/:slug`)
- 6 localized market update articles (PHA flat payment schedules, Faisal Town Phase 2 progress, TopCity-1 plot ballots, Solar Net Metering payback in Pakistan).
- Search, categories filter, and reading time.
- Dedicated standalone article view with author bio and quick access to project floor plans.

### 6. Contact Page (`/contact`)
- Office address at Opal Square, Gulberg Islamabad.
- Interactive Leaflet map centered at `[33.6015, 73.1360]`.
- Direct telephone lines, WhatsApp link, and social channels.
- Fully validated contact form communicating with the API service layer.

### 7. Saved Favorites (`/favorites`) & Property Comparison (`/compare`)
- Favorites and side-by-side comparison (up to 4 properties) saved with `localStorage` persistence.
- Aligned table comparing prices, areas, rooms, society clearance, and amenities.

---

## 🛠️ Tech Stack & Directory Structure

```
topliker/
├── public/
│   ├── favicon.svg
│   ├── toplinkers-logo.jpg            # User provided logo
│   ├── toplinkers-flyer-plan.jpg      # User provided project flyer
│   └── toplinkers-pha-floorplans.jpg  # User provided PHA floor plans
├── src/
│   ├── assets/
│   │   └── main.css                   # Tailwind imports, Swiper styles, custom Leaflet pills
│   ├── components/
│   │   ├── home/                      # All 11 Home Page sections in exact Houzez 47 order
│   │   ├── layout/                    # AppHeader, AppFooter, FlyerModal, FloatingActions, etc.
│   │   ├── property/                  # PropertyCard, ListingsMap, FilterPanel, MortgageCalculator
│   │   └── ui/                        # BaseButton, Badge, SectionHeading, CountUp, Toast
│   ├── data/
│   │   ├── properties.json            # 40 Islamabad/Rawalpindi properties with PKR prices & coords
│   │   ├── agents.json                # 4 verified TopLinkers consultants
│   │   ├── locations.json             # Islamabad hubs (Gulberg, FT-II, TopCity, CDA Sectors)
│   │   ├── posts.json                 # Market update articles
│   │   ├── testimonials.json          # Verified client reviews
│   │   └── types.json                 # Villas, Apartments, Plots, Commercial, Penthouses
│   ├── pages/                         # Route views (HomePage, ListingsPage, PropertyPage, etc.)
│   ├── router/                        # Vue Router 4 configuration with lazy loading & SEO titles
│   ├── services/
│   │   └── api.js                     # Mock API layer ready to be swapped with a real backend
│   ├── stores/
│   │   ├── properties.js              # Pinia store for listings, filters, sorting & pagination
│   │   └── ui.js                      # Pinia store for favorites, compare, modals, flyer & toasts
│   ├── App.vue
│   └── main.js
├── index.html
├── package.json
├── tailwind.config.js
└── vite.config.js
```

---

## 🚀 Getting Started

### 1. Prerequisites
- Node.js (v18 or higher recommended)
- npm or yarn

### 2. Installation
```bash
cd topliker
npm install
```

### 3. Development Server
```bash
npm run dev
```
Open `http://localhost:5173` in your browser.

### 4. Production Build
```bash
npm run build
```
Generates a minified, code-split production build in `dist/`.

---

## 🔌 Connecting to a Real Backend

The entire data layer is centralized in `src/services/api.js`. To switch from mock JSON data to a live REST or GraphQL backend:

1. Update the `BASE_URL` in `src/services/api.js`:
```javascript
const API_BASE = import.meta.env.VITE_API_BASE || 'https://api.toplinkers.com/v1'
```
2. Replace the JSON filter logic with standard `fetch` or `axios` calls matching the exact parameters already supplied (`status`, `type`, `city`, `beds`, `baths`, `minPrice`, `maxPrice`, `sort`, `page`).
