import { createClient } from 'contentful';

// Contentful Client Initialization
const spaceId = import.meta.env.VITE_CONTENTFUL_SPACE_ID || '';
const accessToken = import.meta.env.VITE_CONTENTFUL_ACCESS_TOKEN || '';
const environment = import.meta.env.VITE_CONTENTFUL_ENVIRONMENT || 'master';

export const isContentfulConfigured = Boolean(
  spaceId && 
  accessToken && 
  spaceId !== 'your_space_id_here' && 
  accessToken !== 'your_access_token_here'
);

const client = isContentfulConfigured
  ? createClient({
      space: spaceId,
      accessToken: accessToken,
      environment: environment,
    })
  : null;

// ==========================================
// FALLBACK DATASET (Used when Contentful is offline or empty)
// ==========================================

export const fallbackBlogs = [
  {
    id: 'blog-eu-ai-act-classification',
    slug: 'eu-ai-act-high-risk-classification-blueprint',
    type: 'blog',
    title: 'EU AI Act & High-Risk AI System Classification: A Technical Blueprint for Regulated Entities',
    category: 'AI & Digital Governance',
    excerpt: 'A practical legal and governance guide to classifying artificial intelligence systems under the EU AI Act, conducting fundamental rights impact assessments, and assembling technical conformity documentation.',
    coverImage: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&q=80',
    author: {
      name: 'Shan Ali',
      role: 'Legal, Regulatory and Commercial Advisor',
      avatar: `${import.meta.env.BASE_URL}images/team/shan-ali.png`,
      email: 'info@eaglecomply.com',
      linkedIn: 'https://www.linkedin.com/in/shan-ali-blockchain/'
    },
    publishDate: '2026-08-20',
    readTime: '6 min read',
    tags: ['EU AI Act', 'AI Governance', 'Conformity Assessment', 'Digital Regulation'],
    featured: true,
    content: `The entry into force of the EU Artificial Intelligence Act (Regulation 2024/1689) marks the world’s first comprehensive horizontal regulatory framework for artificial intelligence. For financial institutions, FinTechs, and corporate enterprises deploying predictive models and autonomous software, understanding regulatory classification is a critical compliance milestone.

### 1. The Risk-Based Categorization Matrix
The EU AI Act classifies AI systems into four distinct risk tiers:
• **Unacceptable Risk (Prohibited Practices)**: Cognitive behavioral manipulation, social scoring systems, and untargeted biometric scraping.
• **High-Risk AI Systems**: AI used in credit scoring, biometric identification, risk assessment for insurance, HR recruitment algorithms, and critical infrastructure management.
• **General Purpose AI (GPAI)**: Foundation models requiring systemic risk evaluations, copyright transparency, and technical documentation.
• **Minimal / Low Risk**: Standard AI systems subject only to general transparency rules (e.g., AI disclosure for chatbots).

### 2. High-Risk Compliance Obligations
Regulated entities deploying high-risk AI architectures must establish:
• **Continuous Risk Management System**: Identifying known and foreseeable risks throughout the AI lifecycle.
• **Data Quality & Governance**: Training, validation, and testing datasets must be free from statistically discriminatory biases.
• **Technical Documentation & Logging**: Detailed architecture blueprints and automated activity logging for regulatory traceability.
• **Human Oversight Mechanisms**: Ensuring qualified compliance and risk personnel can interpret, override, or halt automated algorithmic decisions.

### 3. Practical Steps for Compliance Officers
1. **Inventory All Algorithmic Assets**: Catalogue internal and vendor-supplied AI models across your operational footprint.
2. **Conduct Fundamental Rights Impact Assessments (FRIA)**: Evaluate how model outputs impact data subjects and consumer protection mandates.
3. **Draft Conformity Evidence Packs**: Maintain audit-ready technical files and declarations of conformity before placing models into live production.`
  },
  {
    id: 'blog-ewra-methodology-2026',
    slug: 'enterprise-wide-ml-tf-risk-assessment-methodology',
    type: 'blog',
    title: 'Enterprise-Wide ML/TF Risk Assessments (EWRA): Calibration Strategies for 2026',
    category: 'AML/CFT & Financial Crime',
    excerpt: 'Methodologies for quantifying inherent money laundering vulnerabilities, calculating residual risk scores, and designing data-driven financial crime control frameworks.',
    coverImage: 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=1200&q=80',
    author: {
      name: 'Muhammad Shahid',
      role: 'Compliance & Financial Crime Professional',
      avatar: `${import.meta.env.BASE_URL}images/team/muhammad-shahid.png`,
      email: 'info@eaglecomply.com'
    },
    publishDate: '2026-08-16',
    readTime: '8 min read',
    tags: ['AML/CFT', 'EWRA', 'Risk Assessment', 'Sanctions', 'FATF'],
    featured: false,
    content: `An Enterprise-Wide Money Laundering, Terrorist Financing, and Proliferation Financing Risk Assessment (EWRA) is the foundational cornerstone of every regulated firm’s financial crime defense. Regulators across the UK (FCA), Europe (EBA/AMLA), and global jurisdictions expect EWRAs to be granular, data-driven, and dynamically updated.

### Core Risk Vector Dimensions
A robust EWRA methodology must evaluate inherent risk across five standard parameters:
• **Customer Risk**: High-net-worth individuals, PEPs, non-resident clients, cash-intensive businesses, and corporate vehicles with complex beneficial ownership structures.
• **Geographic Risk**: Operations, cross-border corridors, and transaction counterparties in FATF high-risk or increased monitoring jurisdictions.
• **Products & Services Risk**: High-velocity remittance, correspondent banking, multi-currency electronic money, and virtual asset transfers.
• **Delivery Channel Risk**: Non-face-to-face digital customer onboarding, third-party intermediary networks, and automated API-driven transactions.
• **Transaction Volume Risk**: Velocity anomalies, high-value bulk transfers, and cross-border currency conversion corridors.

### Measuring Control Effectiveness & Residual Risk
Assessing inherent risk is only half the equation. Compliance teams must objectively test the operational strength of preventative controls:
• Customer Due Diligence (CDD) and automated Enhanced Due Diligence (EDD) escalation rates.
• Real-time sanctions and PEP fuzzy-matching screening accuracy.
• Automated transaction monitoring scenario calibration and false positive suppression.
• Timely Suspicious Activity Reporting (SAR/STR) submission workflows.`
  },
  {
    id: 'blog-csrd-double-materiality',
    slug: 'double-materiality-csrd-sustainability-reporting',
    type: 'blog',
    title: 'Double Materiality & CSRD Assurance: Connecting IFRS Disclosures with Board Governance',
    category: 'ESG & Sustainability',
    excerpt: 'Navigating the European Corporate Sustainability Reporting Directive (CSRD), double materiality assessments, and aligning ESG financial disclosures with statutory board oversight.',
    coverImage: 'https://images.unsplash.com/photo-1497435334941-8c899ee9e8e9?auto=format&fit=crop&w=1200&q=80',
    author: {
      name: 'Zahid Munir',
      role: 'Chartered Accountant, ESG & Sustainability Advisor',
      avatar: `${import.meta.env.BASE_URL}images/team/zahid-munir.png`,
      email: 'info@eaglecomply.com'
    },
    publishDate: '2026-08-11',
    readTime: '7 min read',
    tags: ['CSRD', 'ESG Reporting', 'Double Materiality', 'IFRS', 'Green Finance'],
    featured: false,
    content: `The Corporate Sustainability Reporting Directive (CSRD) and the European Sustainability Reporting Standards (ESRS) have transformed sustainability from a voluntary marketing exercise into a mandatory statutory reporting discipline subject to limited assurance audits.

### Understanding Double Materiality
Under CSRD, companies must evaluate sustainability impacts through two complementary lenses:
1. **Impact Materiality (Inside-Out)**: How the organization’s operational activities directly and indirectly impact people, the environment, human rights, and society.
2. **Financial Materiality (Outside-In)**: How environmental, climate, and social factors create quantifiable financial risks and opportunities that impact company valuation, cash flow, and cost of capital.

### Practical Steps for Finance & Accounting Teams
• Establish end-to-end data governance for Scope 1, 2, and 3 greenhouse gas (GHG) calculations.
• Connect ESG metrics directly with balance sheet impairment testing and financial disclosures under IFRS / ISSB standards.
• Prepare board audit committees for statutory limited assurance inspections by accredited statutory auditors.`
  },
  {
    id: 'blog-mica-casp-authorization',
    slug: 'mica-casp-licensing-passporting-guide',
    type: 'blog',
    title: 'MiCA CASP Licensing & EU Passporting: The Strategic Playbook for Digital Asset Firms',
    category: 'Digital Assets & FinTech',
    excerpt: 'How crypto-asset service providers (CASPs) can satisfy capital requirements, custody segregation, white paper drafting, and secure cross-border EU passporting rights under MiCA.',
    coverImage: 'https://images.unsplash.com/photo-1639762681485-074b7f938ba0?auto=format&fit=crop&w=1200&q=80',
    author: {
      name: 'Shan Ali',
      role: 'Legal, Regulatory and Commercial Advisor',
      avatar: `${import.meta.env.BASE_URL}images/team/shan-ali.png`,
      email: 'info@eaglecomply.com',
      linkedIn: 'https://www.linkedin.com/in/shan-ali-blockchain/'
    },
    publishDate: '2026-08-05',
    readTime: '6 min read',
    tags: ['MiCA', 'Crypto Regulation', 'CASP Licensing', 'EU Passporting', 'Web3'],
    featured: false,
    content: `The Markets in Crypto-Assets (MiCA) regulation has unified 27 European Union member states under a single, coherent regulatory passport for crypto-asset service providers (CASPs). Securing an authorization in one member state unlocks frictionless access to a consumer market of over 450 million citizens.

### Key Threshold Conditions for CASP Authorization
• **Prudential Capital Reserves**: Maintenance of permanent minimum regulatory capital or equivalent insurance coverage based on licensed service tiers.
• **Client Asset Custody & Segregation**: Clear cryptographic and contractual separation of customer assets from company treasury accounts.
• **Standardized White Papers**: Mandatory pre-issuance disclosure documents with legally binding warranties and consumer withdrawal rights.
• **Operational Resilience & DORA Compliance**: Robust ICT infrastructure, cryptographic key security protocols, and business continuity systems.`
  }
];

export const fallbackNews = [
  {
    id: 'news-eba-mica-guidelines',
    slug: 'eba-issues-final-governance-guidelines-under-mica',
    type: 'news',
    title: 'European Banking Authority (EBA) Issues Final Guidelines on Internal Governance under MiCA',
    category: 'EU / MiCA',
    excerpt: 'The EBA has published final technical standards outlining suitability requirements for management bodies, internal controls, and conflict-of-interest policies for CASP operators.',
    coverImage: 'https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?auto=format&fit=crop&w=1200&q=80',
    author: {
      name: 'EagleComply Regulatory Intelligence Team',
      role: 'Supervisory Dispatch',
      avatar: `${import.meta.env.BASE_URL}logo-light.png`
    },
    publishDate: '2026-08-22',
    readTime: '3 min read',
    tags: ['EBA', 'MiCA', 'Governance', 'EU Regulation'],
    breaking: true,
    content: `The European Banking Authority (EBA) has formally finalized its regulatory technical standards (RTS) on the governance arrangements and suitability assessments for members of the management body of Crypto-Asset Service Providers (CASPs) under the Markets in Crypto-Assets Regulation (MiCA).

### Key Takeaways for Regulated Entities:
• **Fit & Proper Criteria**: Board members and senior executives must demonstrate collective competence in both traditional financial services and distributed ledger technology (DLT) architectures.
• **Conflict of Interest Protocols**: CASPs offering proprietary trading alongside customer order execution must establish physical and organizational Chinese walls.
• **Supervisory Audit Trail**: National Competent Authorities (NCAs) will conduct periodic governance reviews starting Q4 2026.`
  },
  {
    id: 'news-fca-digital-securities-sandbox',
    slug: 'fca-expands-digital-securities-sandbox-for-wholesale-markets',
    type: 'news',
    title: 'Financial Conduct Authority (FCA) Expands Digital Securities Sandbox for Wholesale Financial Markets',
    category: 'UK / FCA',
    excerpt: 'The UK FCA and Bank of England have announced an expanded cohort for the Digital Securities Sandbox (DSS), enabling institutions to test DLT in trading and settlement.',
    coverImage: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=80',
    author: {
      name: 'EagleComply UK Regulatory Team',
      role: 'London Dispatch',
      avatar: `${import.meta.env.BASE_URL}logo-light.png`
    },
    publishDate: '2026-08-18',
    readTime: '4 min read',
    tags: ['FCA', 'Bank of England', 'Tokenization', 'Digital Sandbox'],
    breaking: false,
    content: `The Financial Conduct Authority (FCA), in joint coordination with the Bank of England, has opened applications for the next phase of the UK Digital Securities Sandbox (DSS). The framework permits firms to operate digital depository, trading, and settlement platforms under modified regulatory statutory rules.`
  },
  {
    id: 'news-dora-second-phase-testing',
    slug: 'dora-second-phase-ict-resilience-testing-begins',
    type: 'news',
    title: 'DORA Compliance: Joint European Supervisory Authorities Open Phase-2 ICT Resilience Testing',
    category: 'EU / DORA',
    excerpt: 'Financial entities subject to the Digital Operational Resilience Act (DORA) must finalize third-party ICT service provider registers and threat-led penetration testing protocols.',
    coverImage: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=1200&q=80',
    author: {
      name: 'EagleComply EU Practice',
      role: 'Brussels Dispatch',
      avatar: `${import.meta.env.BASE_URL}logo-light.png`
    },
    publishDate: '2026-08-14',
    readTime: '4 min read',
    tags: ['DORA', 'Cyber Resilience', 'ICT Risk', 'ESAs'],
    breaking: false,
    content: `The European Supervisory Authorities (EBA, EIOPA, and ESMA) have issued an advisory urging all financial institutions to complete their registers of ICT outsourcing contracts in accordance with DORA standard templates. Critical cloud and third-party IT providers face direct oversight from lead European supervisory teams.`
  },
  {
    id: 'news-fatf-travel-rule-enforcement',
    slug: 'fatf-universal-travel-rule-enforcement-milestones',
    type: 'news',
    title: 'FATF Re-Evaluates Universal Travel Rule Compliance for Virtual Asset Service Providers',
    category: 'Global / FATF',
    excerpt: 'The Financial Action Task Force has published its global implementation review on Recommendation 16 (Travel Rule), urging jurisdictions to eliminate remaining supervisory loopholes.',
    coverImage: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1200&q=80',
    author: {
      name: 'EagleComply Financial Crime Practice',
      role: 'Global Compliance Dispatch',
      avatar: `${import.meta.env.BASE_URL}logo-light.png`
    },
    publishDate: '2026-08-09',
    readTime: '5 min read',
    tags: ['FATF', 'Travel Rule', 'AML/CFT', 'VASP'],
    breaking: false,
    content: `The Financial Action Task Force (FATF) reiterated that jurisdictions failing to actively enforce Travel Rule message transmission for cross-border cryptocurrency and virtual asset transfers will face heightened scrutiny during upcoming mutual evaluation cycles.`
  }
];

// Team avatar mapping lookup
const teamPhotoMap = {
  'shan ali': `${import.meta.env.BASE_URL}images/team/shan-ali.png`,
  'muhammad shahid': `${import.meta.env.BASE_URL}images/team/muhammad-shahid.png`,
  'syed anvar hussain': `${import.meta.env.BASE_URL}images/team/syed-anvar-hussain.png`,
  'zahid munir': `${import.meta.env.BASE_URL}images/team/zahid-munir.png`
};

// ==========================================
// CONTENTFUL DATA NORMALIZATION
// ==========================================

function normalizeContentfulEntry(entry) {
  if (!entry || !entry.fields) return null;
  const f = entry.fields;

  // 1. Extract cover image (supports Asset Link coverImg, coverImage, or URL string)
  let coverImage = 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=1200&q=80';
  const imgField = f.coverImg || f.coverImage || f.image;
  if (imgField) {
    if (typeof imgField === 'string') {
      coverImage = imgField;
    } else if (imgField.fields?.file?.url) {
      const url = imgField.fields.file.url;
      coverImage = url.startsWith('//') ? `https:${url}` : url;
    }
  }

  // 2. Extract content (supports description, content, body, or Rich Text)
  let content = '';
  if (typeof f.description === 'string') {
    content = f.description;
  } else if (typeof f.content === 'string') {
    content = f.content;
  } else if (typeof f.body === 'string') {
    content = f.body;
  } else if (f.content?.nodeType === 'document' || f.description?.nodeType === 'document') {
    content = renderRichTextToMarkdown(f.content || f.description);
  }

  // 3. Extract author (supports Array of author Entry references, single author object, or string)
  let authorRaw = Array.isArray(f.author) ? f.author[0] : f.author;
  let authorName = 'Shan Ali';
  let authorRole = 'Legal, Regulatory and Commercial Advisor';
  let authorLinkedIn = '';
  let authorAvatar = `${import.meta.env.BASE_URL}images/team/shan-ali.png`;

  if (typeof authorRaw === 'string') {
    authorName = authorRaw;
  } else if (authorRaw?.fields) {
    const af = authorRaw.fields;
    authorName = af.name || authorName;
    authorRole = af.bio || af.role || af.title || authorRole;
    authorLinkedIn = af.linkedIn || '';
    if (af.avatar?.fields?.file?.url) {
      const aUrl = af.avatar.fields.file.url;
      authorAvatar = aUrl.startsWith('//') ? `https:${aUrl}` : aUrl;
    }
  }

  // If avatar is default, match against resident team members
  const lowerName = authorName.toLowerCase().trim();
  if (teamPhotoMap[lowerName]) {
    authorAvatar = teamPhotoMap[lowerName];
  }

  const author = {
    name: authorName,
    role: authorRole,
    avatar: authorAvatar,
    linkedIn: authorLinkedIn,
    email: 'info@eaglecomply.com'
  };

  // 4. Extract date
  const publishDate = f.date || f.publishDate || (entry.sys?.createdAt ? entry.sys.createdAt.split('T')[0] : '2026-08-24');

  // 5. Generate clean slug from title if not set
  const title = f.title || 'Untitled Publication';
  const slug = f.slug || title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '') || entry.sys.id;
  const type = f.type || (entry.sys?.contentType?.sys?.id === 'newsArticle' || entry.sys?.contentType?.sys?.id === 'news' ? 'news' : 'blog');

  // 6. Excerpt
  const excerpt = f.excerpt || f.summary || f.shortDescription || (content ? (content.length > 200 ? content.slice(0, 195) + '…' : content) : '');

  // 7. Calculate estimated read time
  const wordCount = content.split(/\s+/).filter(Boolean).length || 300;
  const readTime = f.readTime || `${Math.max(2, Math.ceil(wordCount / 180))} min read`;

  // 8. Tags
  const tags = Array.isArray(f.tags) ? f.tags : (f.tags ? [f.tags] : []);

  return {
    id: entry.sys?.id || slug,
    slug: slug,
    type: type,
    title: title,
    category: f.category || (type === 'news' ? 'Regulatory Update' : 'Compliance Advisory'),
    excerpt: excerpt,
    coverImage: coverImage,
    author: author,
    publishDate: publishDate,
    readTime: readTime,
    tags: tags,
    featured: Boolean(f.featured),
    breaking: Boolean(f.breaking),
    content: content
  };
}

function renderRichTextToMarkdown(doc) {
  if (!doc || !Array.isArray(doc.content)) return '';
  return doc.content.map(node => {
    if (node.nodeType === 'paragraph') {
      return (node.content || []).map(c => c.value || '').join('') + '\n\n';
    }
    if (node.nodeType?.startsWith('heading-')) {
      const level = node.nodeType.split('-')[1] || '2';
      const hashes = '#'.repeat(parseInt(level, 10));
      return `${hashes} ${(node.content || []).map(c => c.value || '').join('')}\n\n`;
    }
    if (node.nodeType === 'unordered-list') {
      return (node.content || []).map(item => {
        const text = (item.content || []).map(p => (p.content || []).map(c => c.value || '').join('')).join('');
        return `• ${text}`;
      }).join('\n') + '\n\n';
    }
    return '';
  }).join('');
}

// ==========================================
// PUBLIC API SERVICE METHODS
// ==========================================

export async function fetchBlogPosts() {
  if (!client) return fallbackBlogs;

  try {
    const res = await client.getEntries({
      content_type: 'blogPost',
      include: 2,
      limit: 30
    });
    if (res.items && res.items.length > 0) {
      const posts = res.items.map(normalizeContentfulEntry).filter(Boolean);
      // Sort newest date first
      posts.sort((a, b) => new Date(b.publishDate) - new Date(a.publishDate));
      return posts;
    }
    return fallbackBlogs;
  } catch (error) {
    console.warn('[Contentful] Error fetching blog posts, using fallback data:', error.message);
    return fallbackBlogs;
  }
}

export async function fetchNewsArticles() {
  if (!client) return fallbackNews;

  try {
    const res = await client.getEntries({
      content_type: 'newsArticle',
      include: 2,
      limit: 30
    });
    if (res.items && res.items.length > 0) {
      const articles = res.items.map(normalizeContentfulEntry).filter(Boolean);
      articles.sort((a, b) => new Date(b.publishDate) - new Date(a.publishDate));
      return articles;
    }
    return fallbackNews;
  } catch (error) {
    console.warn('[Contentful] Error fetching news articles, using fallback data:', error.message);
    return fallbackNews;
  }
}

export async function fetchArticleBySlug(slugOrId) {
  if (!slugOrId) return null;

  if (client) {
    try {
      // 1. Try fetching all entries and match by slug or sys.id
      const allEntries = await fetchAllArticles();
      const match = allEntries.find(a => a.slug === slugOrId || a.id === slugOrId);
      if (match) return match;

      // 2. Direct lookup by Contentful entry ID
      try {
        const entry = await client.getEntry(slugOrId, { include: 2 });
        if (entry) return normalizeContentfulEntry(entry);
      } catch (e) {
        // Entry ID direct lookup not found, proceed to fallback
      }
    } catch (error) {
      console.warn('[Contentful] Error fetching article by slug, checking fallback data:', error.message);
    }
  }

  // Check fallback collections
  const allFallback = [...fallbackBlogs, ...fallbackNews];
  return allFallback.find(a => a.slug === slugOrId || a.id === slugOrId) || null;
}

export async function fetchAllArticles() {
  const [blogs, news] = await Promise.all([fetchBlogPosts(), fetchNewsArticles()]);
  return [...blogs, ...news];
}
