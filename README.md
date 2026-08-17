# EagleComply Website

EagleComply is a React/Vite compliance advisory website covering AML/CFT, regulatory compliance, risk & governance, and legal/compliance advisory.

## Run locally

```bash
npm install
npm run dev
```

Then open the Vite URL shown in the terminal.

## Production build

```bash
npm run build
npm run preview
```

## Main routes

- `/`
- `/about/`
- `/services/`
- `/services/<service-id>/`
- `/industries/`
- `/industries/<industry-id>/`
- `/jurisdictions/<country-id>/`
- `/regulations/`
- `/regulations/<regulation-id>/`
- `/insights/`
- `/resources/`
- `/experts/`
- `/case-studies/`
- `/careers/`
- `/contact/`
- `/legal/`

## Notes

- Consultation booking is a client-side workflow and stores the request in the app state. Connect it to a production scheduling/CRM/email provider before launch.
- The chatbot is a local knowledge-base assistant. It matches questions against the project's services, industries, jurisdictions and regulations and provides guidance plus conversion actions. A production LLM/API can be connected later without changing the UI contract.
- The project includes multilingual UI/data for English, French, German, Spanish, Italian, Portuguese, Arabic, Japanese, Simplified Chinese and Korean.
- Replace or verify professional credentials, biographies, social links and any regulatory claims before production publication.
- Configure HTTPS, spam protection, analytics, Search Console, backups and server-side form handling in the production environment.
