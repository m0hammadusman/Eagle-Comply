# EagleComply — Institutional Regulatory Advisory & Compliance Intelligence Platform

[![Build & Deploy](https://img.shields.io/badge/Build-Passing-emerald?style=flat-square&logo=vite)](https://github.com/m0hammadusman/Eagle-Comply)
[![Vite](https://img.shields.io/badge/Vite-6.4-646CFF?style=flat-square&logo=vite&logoColor=white)](https://vitejs.dev/)
[![React](https://img.shields.io/badge/React-18.3-61DAFB?style=flat-square&logo=react&logoColor=black)](https://react.dev/)
[![TailwindCSS](https://img.shields.io/badge/TailwindCSS-3.4-38B2AC?style=flat-square&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![Localization](https://img.shields.io/badge/i18n-10%20Languages-334DAF?style=flat-square&logo=google-translate&logoColor=white)](#-multilingual-architecture--localization)
[![License](https://img.shields.io/badge/License-Proprietary-slate?style=flat-square)](#-statutory-disclaimers--governance)

EagleComply is an enterprise-grade digital advisory platform and regulatory intelligence portal designed for regulated financial institutions, challenger banks, Electronic Money Institutions (EMIs), Payment Service Providers (PSPs), Crypto-Asset Service Providers (CASPs), asset managers, and institutional market infrastructures.

---

## 📑 Table of Contents

- [Core Capabilities & Architectural Pillars](#-core-capabilities--architectural-pillars)
- [Multilingual Architecture & Localization](#-multilingual-architecture--localization)
- [Interactive Systems & Technical Architecture](#-interactive-systems--technical-architecture)
- [Project Directory Structure](#-project-directory-structure)
- [Environment Variables Configuration](#-environment-variables-configuration)
- [Getting Started & Local Development](#-getting-started--local-development)
- [Build, Testing & Production Deployment](#-build-testing--production-deployment)
- [Integrations & Form Protocols](#-integrations--form-protocols)
- [Statutory Disclaimers & Governance](#-statutory-disclaimers--governance)

---

## 🏛 Core Capabilities & Architectural Pillars

### 1. Multi-Jurisdictional Regulatory Frameworks
- **Comprehensive Entity Matrices**: Deep coverage for the United Kingdom (**FCA / PRA**), European Union (**MiFID II, MiCA, DORA, AMLD6, BaFin, ACPR, CSSF**), Middle East (**ADGM, DIFC / DFSA, CBUAE**), and South Asia (**SECP, SBP**).
- **Specialized Industry Verticals**: Tailored compliance architectures for Institutional Banking, FinTech, Payment Infrastructure, Remittance/MSBs, Digital Assets & Blockchain, and Regulated Investment Management.
- **Statutory Gap Analysis & Remediation**: Section 166 reviews, Skilled Person remediation, KYC/EDD workflows, and Enterprise-Wide Risk Assessment (EWRA) frameworks.

### 2. Senior Practice Directors & Executive Dossiers
- **Physical Pass & Executive Profile System**: Complete career portfolios, practice mandates, regulatory admissions, publications, and LinkedIn verifications for all senior counsel and practice directors.
- **Direct Engagement Protocols**: One-click consultation booking, bilateral non-disclosure agreement (NDA) initiation, and custom Scope of Work (SOW) drafting.

### 3. Regulatory Newsroom & Contentful Headless CMS
- **Live Editorial Engine**: In-depth commentary, technical blueprints, and white papers synchronized with Contentful CMS.
- **Supervisory Dispatches**: Real-time tracking of statutory deadlines, regulatory enforcement actions, and international financial crime intelligence.

---

## 🌐 Multilingual Architecture & Localization

The platform provides **100% native localization across 10 global languages**, including seamless **Right-to-Left (RTL)** layout mirroring:

| Language | Code | Script Direction | Coverage |
| :--- | :---: | :---: | :---: |
| **English** | `en` | LTR | 100% (Native Master) |
| **العربية (Arabic)** | `ar` | **RTL** | 100% (Complete RTL Mirroring) |
| **Français (French)** | `fr` | LTR | 100% Full Site |
| **Deutsch (German)** | `de` | LTR | 100% Full Site |
| **Español (Spanish)** | `es` | LTR | 100% Full Site |
| **Italiano (Italian)** | `it` | LTR | 100% Full Site |
| **Português (Portuguese)** | `pt` | LTR | 100% Full Site |
| **日本語 (Japanese)** | `ja` | LTR | 100% Full Site |
| **简体中文 (Simplified Chinese)** | `zh` | LTR | 100% Full Site |
| **한국어 (Korean)** | `ko` | LTR | 100% Full Site |

### Key i18n Features:
- **Automatic Browser Detection**: Detects user browser locale with fallback to `en` and persists user language selection in `localStorage`.
- **Bidirectional UI Support**: Dynamic HTML `dir="rtl"` and `dir="ltr"` attribute switching with automated arrow glyph flipping (`rtl:rotate-180`) and text alignment (`text-left rtl:text-right`).
- **Dynamic Entity Merging**: `src/data/localizedData.js` provides recursive deep-merging of data collections (solutions, industries, regulations, badges, FAQs) so that data-driven components react instantly to language changes.

---

## ⚡ Interactive Systems & Technical Architecture

- **Interactive 3D Three.js Globe**: Visualizes global financial corridors, supervisory authorities, and cross-border regulatory transfer nodes.
- **Cal.com Embedded Partner Scheduler**: Real-time month-view booking with dynamic brand tokens, multi-calendar synchronization, and automated video conferencing links.
- **Enterprise Contact Dispatcher**: Web3Forms API integrated with honeypot security, structured multipart forms, and direct forwarding to `info@eaglecomply.com`.
- **Knowledge Base Search & Filter**: Instant client-side fuzzy search across all regulatory handbooks, FAQ categories, and downloadable compliance toolkits.

---

## 📂 Project Directory Structure

```
eagle-compliance/
├── public/
│   ├── assets/images/          # Optimized boardroom, team, and infrastructure imagery
│   ├── favicon.ico             # Brand favicon
│   └── 404.html                # GitHub Pages SPA single-page redirect handler
├── src/
│   ├── components/
│   │   ├── canvas/             # Three.js 3D globe and interactive map visualizers
│   │   ├── common/             # Navigation, Footer, Breadcrumbs, Badges, SearchModal
│   │   ├── modals/             # Consultation, Quote, and Authentication dialogs
│   │   └── workflows/          # Cal.com scheduler and OrderServiceModal workflows
│   ├── context/
│   │   ├── LanguageContext.jsx # 10-language state, detector, and RTL manager
│   │   └── ThemeContext.jsx    # Executive dark/light theme provider
│   ├── data/
│   │   ├── complianceData.js   # Institutional master data catalog
│   │   ├── localizedData.json  # Complete multilingual entity translations
│   │   └── localizedData.js    # Deep data merging and reactive getters
│   ├── hooks/
│   │   └── useContentful.js    # Contentful headless CMS GraphQL/REST hooks
│   ├── locales/                # 10 JSON translation dictionaries (en, ar, fr, de, ...)
│   ├── pages/
│   │   ├── admin/              # Portal & administrative dashboards
│   │   └── public/             # Public pages (Home, About, Solutions, Industries, Team, etc.)
│   ├── utils/
│   │   └── contactDispatcher.js# Web3Forms API and transactional email dispatcher
│   ├── App.jsx                 # Main application shell and route controller
│   └── main.jsx                # Application root entry point
├── package.json                # Dependencies, build scripts, and gh-pages config
├── vite.config.js              # Vite bundler configuration & base path settings
└── tailwind.config.js          # Corporate color palette, fonts, and dark mode rules
```

---

## 🔑 Environment Variables Configuration

Create a `.env` file in the root directory for production credentials and external service integrations:

```env
# Cal.com Partner Scoping Embed Link
VITE_CAL_LINK=eagle-comply/strategic-compliance-consultation

# Web3Forms Transactional Contact API Key
VITE_WEB3FORMS_ACCESS_KEY=82d704f5-ba44-4790-b41d-55dd4cd644c4

# Contentful Headless CMS (Optional: for live editorial newsroom)
VITE_CONTENTFUL_SPACE_ID=your_contentful_space_id
VITE_CONTENTFUL_ACCESS_TOKEN=your_contentful_delivery_token
VITE_CONTENTFUL_ENVIRONMENT=master
```

---

## 🚀 Getting Started & Local Development

### Prerequisites
- **Node.js**: v18.0.0 or higher
- **npm**: v9.0.0 or higher

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/m0hammadusman/Eagle-Comply.git
   cd Eagle-Comply
   ```

2. **Install project dependencies:**
   ```bash
   npm install
   ```

3. **Start the local development server:**
   ```bash
   npm run dev
   ```

4. **Open in browser:**
   Navigate to the local URL (typically `http://localhost:5173/`).

---

## 📦 Build, Testing & Production Deployment

### Production Compilation
To compile and minify the entire project into the `dist/` directory:

```bash
npm run build
```

### Local Preview of Production Build
To test the generated production build locally:

```bash
npm run preview
```

### GitHub Pages Automated Deployment
The project is pre-configured with `gh-pages` deployment:

```bash
npm run deploy
```

---

## 📬 Integrations & Form Protocols

### 1. Transactional Inquiry Dispatch (Web3Forms)
- Direct submission via `https://api.web3forms.com/submit`
- Delivery Destination: `info@eaglecomply.com`
- Includes spam prevention honeypot fields, subject line scoping, and client verification.

### 2. Direct Practice WhatsApp Lines
- **UK Regional Hub**: `+44 7706 413233`
- **Italy & EU Hub**: `+39 348 818 4787`

---

## ⚖️ Statutory Disclaimers & Governance

1. **UK Financial Promotions Notice**: EagleComply does not issue or approve financial promotions under Section 21 of the UK Financial Services and Markets Act 2000 (FSMA). Nothing on this platform constitutes an invitation or inducement to engage in investment activity.
2. **Accountancy & Tax Services**: EagleComply focuses exclusively on regulatory compliance advisory, financial crime risk management, licensing dossiers, and legal compliance. We do not provide formal statutory accountancy or tax advisory services.
3. **Professional Privilege & NDA**: Initial consultations and project scoping are conducted under bilateral mutual confidentiality agreements.

---

## 📄 Intellectual Property & Governance

© 2026 **EagleComply Compliance & Regulatory Advisory Practice**. All Rights Reserved.
