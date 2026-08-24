import fs from 'fs';
import path from 'path';

// Read .env file
function loadEnv() {
  try {
    const envPath = path.resolve(process.cwd(), '.env');
    const content = fs.readFileSync(envPath, 'utf8');
    const env = {};
    content.split('\n').forEach(line => {
      const trimmed = line.trim();
      if (trimmed && !trimmed.startsWith('#')) {
        const [key, ...rest] = trimmed.split('=');
        if (key && rest.length > 0) {
          env[key.trim()] = rest.join('=').trim();
        }
      }
    });
    return env;
  } catch (e) {
    return {};
  }
}

const env = loadEnv();
const spaceId = env.VITE_CONTENTFUL_SPACE_ID || 'hhcyea97g1z3';
const environment = env.VITE_CONTENTFUL_ENVIRONMENT || 'master';
const cmaToken = process.argv[2] || env.CONTENTFUL_MANAGEMENT_TOKEN || env.VITE_CONTENTFUL_MANAGEMENT_TOKEN;

if (!cmaToken) {
  console.log('\n======================================================');
  console.log('  EAGLECOMPLY CONTENTFUL AUTO-SETUP');
  console.log('======================================================\n');
  console.log('To automatically build your Contentful Models and publish initial posts,');
  console.log('we need a Content Management Token (Personal Access Token).\n');
  console.log('How to get it in 10 seconds:');
  console.log('1. Go to https://app.contentful.com');
  console.log('2. Click Settings -> API keys -> Content management tokens');
  console.log('3. Click "Generate personal token", give it a name (e.g. "EagleComply Setup"), and copy it.\n');
  console.log('Then run:');
  console.log('  node scripts/setup-contentful.js <YOUR_PERSONAL_ACCESS_TOKEN>\n');
  console.log('Or add CONTENTFUL_MANAGEMENT_TOKEN=<TOKEN> into your .env file.\n');
  process.exit(0);
}

const baseUrl = `https://api.contentful.com/spaces/${spaceId}/environments/${environment}`;

async function cmaFetch(endpoint, options = {}) {
  const url = `${baseUrl}${endpoint}`;
  const headers = {
    'Authorization': `Bearer ${cmaToken}`,
    'Content-Type': 'application/vnd.contentful.management.v1+json',
    ...options.headers
  };
  const response = await fetch(url, { ...options, headers });
  const data = await response.json().catch(() => ({}));
  if (!response.ok) {
    throw new Error(`[CMA Error ${response.status}] ${data.message || JSON.stringify(data)}`);
  }
  return { status: response.status, data, headers: response.headers };
}

// Define Content Types
const blogPostModel = {
  name: 'Blog Post',
  description: 'In-depth regulatory, AML, and compliance advisory publication for EagleComply',
  displayField: 'title',
  fields: [
    { id: 'title', name: 'Title', type: 'Symbol', required: true, localized: false },
    { id: 'slug', name: 'Slug', type: 'Symbol', required: true, localized: false },
    { id: 'category', name: 'Category', type: 'Symbol', required: true, localized: false },
    { id: 'excerpt', name: 'Excerpt', type: 'Text', required: true, localized: false },
    { id: 'content', name: 'Content (Markdown)', type: 'Text', required: true, localized: false },
    { id: 'coverImage', name: 'Cover Image URL', type: 'Symbol', required: false, localized: false },
    { id: 'author', name: 'Author Name', type: 'Symbol', required: false, localized: false },
    { id: 'authorRole', name: 'Author Role', type: 'Symbol', required: false, localized: false },
    { id: 'publishDate', name: 'Publish Date', type: 'Date', required: false, localized: false },
    { id: 'readTime', name: 'Read Time', type: 'Symbol', required: false, localized: false },
    { id: 'tags', name: 'Tags', type: 'Array', items: { type: 'Symbol' }, required: false, localized: false },
    { id: 'featured', name: 'Featured Article', type: 'Boolean', required: false, localized: false }
  ]
};

const newsArticleModel = {
  name: 'News Article',
  description: 'Real-time regulatory dispatches, enforcement alerts, and supervisory updates',
  displayField: 'title',
  fields: [
    { id: 'title', name: 'Title', type: 'Symbol', required: true, localized: false },
    { id: 'slug', name: 'Slug', type: 'Symbol', required: true, localized: false },
    { id: 'category', name: 'Jurisdiction / Category', type: 'Symbol', required: true, localized: false },
    { id: 'excerpt', name: 'Excerpt', type: 'Text', required: true, localized: false },
    { id: 'content', name: 'Content (Markdown)', type: 'Text', required: true, localized: false },
    { id: 'coverImage', name: 'Cover Image URL', type: 'Symbol', required: false, localized: false },
    { id: 'author', name: 'Dispatch Team', type: 'Symbol', required: false, localized: false },
    { id: 'publishDate', name: 'Publish Date', type: 'Date', required: false, localized: false },
    { id: 'readTime', name: 'Read Time', type: 'Symbol', required: false, localized: false },
    { id: 'tags', name: 'Tags', type: 'Array', items: { type: 'Symbol' }, required: false, localized: false },
    { id: 'breaking', name: 'Breaking Alert', type: 'Boolean', required: false, localized: false }
  ]
};

async function createOrUpdateContentType(id, model) {
  console.log(`Setting up Content Type: ${model.name} (${id})...`);
  let version = 1;
  try {
    const existing = await cmaFetch(`/content_types/${id}`);
    version = existing.data.sys.version;
    console.log(`  Updating existing Content Type (v${version})...`);
  } catch (e) {
    console.log(`  Creating new Content Type...`);
  }

  const res = await cmaFetch(`/content_types/${id}`, {
    method: 'PUT',
    headers: { 'X-Contentful-Version': String(version) },
    body: JSON.stringify(model)
  });

  const newVersion = res.data.sys.version;
  console.log(`  Publishing Content Type (v${newVersion})...`);
  await cmaFetch(`/content_types/${id}/published`, {
    method: 'PUT',
    headers: { 'X-Contentful-Version': String(newVersion) }
  });
  console.log(`✓ ${model.name} is LIVE and published!\n`);
}

async function createEntry(contentTypeId, entryId, fields) {
  const localizedFields = {};
  for (const [k, v] of Object.entries(fields)) {
    if (v !== undefined) {
      localizedFields[k] = { 'en-US': v };
    }
  }

  let version = 1;
  try {
    const existing = await cmaFetch(`/entries/${entryId}`);
    version = existing.data.sys.version;
  } catch (e) {
    // entry does not exist
  }

  console.log(`Creating/updating entry: "${fields.title}" (${entryId})...`);
  const res = await cmaFetch(`/entries/${entryId}`, {
    method: 'PUT',
    headers: {
      'X-Contentful-Content-Type': contentTypeId,
      'X-Contentful-Version': String(version)
    },
    body: JSON.stringify({ fields: localizedFields })
  });

  const newVersion = res.data.sys.version;
  await cmaFetch(`/entries/${entryId}/published`, {
    method: 'PUT',
    headers: { 'X-Contentful-Version': String(newVersion) }
  });
  console.log(`✓ Entry published: "${fields.title}"\n`);
}

async function main() {
  try {
    console.log(`\nConnecting to Contentful Space: ${spaceId} (${environment})...\n`);

    // 1. Create and publish Content Types
    await createOrUpdateContentType('blogPost', blogPostModel);
    await createOrUpdateContentType('newsArticle', newsArticleModel);

    // 2. Publish initial sample Blog Post
    await createEntry('blogPost', 'blog-first-welcome', {
      title: 'Welcome to EagleComply: Navigating Modern Regulatory Architecture',
      slug: 'welcome-to-eaglecomply-regulatory-architecture',
      category: 'AML/CFT & Financial Crime',
      excerpt: 'An introduction to EagleComply’s multidisciplinary advisory model across AML/CFT, regulatory compliance, risk governance, and legal advisory.',
      content: `# Welcome to EagleComply\n\nIn an era of accelerating regulatory evolution, institutions face complex supervisory mandates across the UK, EU, US, UAE, and Asian markets.\n\n### Practical Compliance Engineering\nEagleComply translates complex statutory regulations into audit-tested operational controls, bespoke policy frameworks, and board-level risk management strategies.\n\n* **AML/CFT Frameworks**: Enterprise-wide risk assessments, CDD/EDD calibration, and transaction monitoring.\n* **Regulatory Licensing**: Direct preparation of authorization dossiers with the FCA, VARA, SECP, and European NCAs.\n* **Independent Assurance**: Objective reviews and regulatory remediation blueprints.`,
      coverImage: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=80',
      author: 'Muhammad Shahid',
      authorRole: 'Head of Compliance Advisory',
      publishDate: '2026-08-24',
      readTime: '4 min read',
      tags: ['EagleComply', 'Regulatory Architecture', 'AML/CFT', 'Advisory'],
      featured: true
    });

    // 3. Publish initial sample News Article
    await createEntry('newsArticle', 'news-first-dispatch', {
      title: 'Global Regulatory Outlook 2026: Key Priorities for Regulated Firms',
      slug: 'global-regulatory-outlook-2026-key-priorities',
      category: 'Supervisory Dispatch',
      excerpt: 'Summary of international supervisory themes focusing on AI governance, cross-border AML travel rules, and operational cyber resilience.',
      content: `### Supervisory Priorities for Q3/Q4 2026\n\nInternational regulatory bodies including FATF, the FCA, and the European Banking Authority (EBA) have outlined unified enforcement agendas for the coming quarter.\n\n1. **Digital Asset Surveillance**: Mandatory Travel Rule implementation across virtual asset corridors.\n2. **AI & Model Risk**: Verification of bias mitigation and explainability under the EU AI Act.\n3. **Operational Resilience**: Compliance verification under DORA and UK operational resilience mandates.`,
      coverImage: 'https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?auto=format&fit=crop&w=1200&q=80',
      author: 'EagleComply Regulatory Intelligence',
      publishDate: '2026-08-24',
      readTime: '3 min read',
      tags: ['Supervisory Dispatch', 'FCA', 'FATF', 'DORA'],
      breaking: true
    });

    console.log('\n======================================================');
    console.log('🎉 ALL CONTENTFUL MODELS & ENTRIES SET UP SUCCESSFULLY!');
    console.log('======================================================');
    console.log('You can now log in to https://app.contentful.com and create, edit,');
    console.log('or publish your news and blog articles with zero configuration!\n');
  } catch (err) {
    console.error('Setup failed:', err.message);
  }
}

main();
