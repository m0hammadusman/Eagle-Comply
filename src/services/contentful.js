// Contentful Service - Fast, direct REST client with zero caching bugs

const spaceId = import.meta.env.VITE_CONTENTFUL_SPACE_ID || 'dqelhpseod7d';
const accessToken = import.meta.env.VITE_CONTENTFUL_ACCESS_TOKEN || 'CJyRGKCDqtRoPiRe7-fi5OJkBPKhmI34JJVg_FvVvE8';
const environment = import.meta.env.VITE_CONTENTFUL_ENVIRONMENT || 'master';

export const isContentfulConfigured = Boolean(
  spaceId && 
  accessToken && 
  spaceId !== 'your_space_id_here' && 
  accessToken !== 'your_access_token_here'
);

const baseUrl = `https://cdn.contentful.com/spaces/${spaceId}/environments/${environment}`;

// Team avatar mapping lookup
const teamPhotoMap = {
  'shan ali': `${import.meta.env.BASE_URL}images/team/shan-ali.png`,
  'muhammad shahid': `${import.meta.env.BASE_URL}images/team/muhammad-shahid.png`,
  'syed anvar hussain': `${import.meta.env.BASE_URL}images/team/syed-anvar-hussain.png`,
  'zahid munir': `${import.meta.env.BASE_URL}images/team/zahid-munir.png`
};

// ==========================================
// FALLBACK DATASET (Used ONLY when Contentful is completely empty or offline)
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
    content: `The entry into force of the EU Artificial Intelligence Act (Regulation 2024/1689) marks the world’s first comprehensive horizontal regulatory framework for artificial intelligence. For financial institutions, FinTechs, and corporate enterprises deploying predictive models and autonomous software, understanding regulatory classification is a critical compliance milestone.`
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
    content: `The European Banking Authority (EBA) has formally finalized its regulatory technical standards (RTS) on the governance arrangements and suitability assessments for members of the management body of Crypto-Asset Service Providers (CASPs) under the Markets in Crypto-Assets Regulation (MiCA).`
  }
];

// ==========================================
// CORE REST CLIENT & RESOLVER
// ==========================================

async function fetchFromContentful(contentType) {
  if (!isContentfulConfigured) return null;

  try {
    const url = `${baseUrl}/entries?content_type=${contentType}&include=2&order=-sys.createdAt&limit=50`;
    const res = await fetch(url, {
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    });

    if (!res.ok) {
      console.warn(`[Contentful] ${contentType} fetch returned status ${res.status}`);
      return null;
    }

    const data = await res.json();
    if (!data.items || data.items.length === 0) return [];

    // Map Assets
    const assetMap = {};
    if (data.includes?.Asset) {
      data.includes.Asset.forEach(a => {
        if (a?.sys?.id) assetMap[a.sys.id] = a;
      });
    }

    // Map Entries (Authors, etc.)
    const entryMap = {};
    if (data.includes?.Entry) {
      data.includes.Entry.forEach(e => {
        if (e?.sys?.id) entryMap[e.sys.id] = e;
      });
    }

    // Normalize each item
    return data.items.map(item => normalizeItem(item, assetMap, entryMap, contentType)).filter(Boolean);
  } catch (error) {
    console.warn(`[Contentful] Network error fetching ${contentType}:`, error.message);
    return null;
  }
}

function normalizeItem(item, assetMap = {}, entryMap = {}, contentType = 'blogPost') {
  if (!item || !item.fields) return null;
  const f = item.fields;
  const sys = item.sys || {};

  // 1. Resolve cover image
  let coverImage = 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=1200&q=80';
  const rawImg = f.coverImg || f.coverImage || f.image;
  if (typeof rawImg === 'string') {
    coverImage = rawImg.startsWith('//') ? `https:${rawImg}` : rawImg;
  } else if (rawImg?.sys?.type === 'Link' && assetMap[rawImg.sys.id]) {
    const asset = assetMap[rawImg.sys.id];
    const url = asset.fields?.file?.url;
    if (url) coverImage = url.startsWith('//') ? `https:${url}` : url;
  } else if (rawImg?.fields?.file?.url) {
    const url = rawImg.fields.file.url;
    coverImage = url.startsWith('//') ? `https:${url}` : url;
  }

  // 2. Resolve content / description
  let content = f.description || f.content || f.body || '';
  if (typeof content !== 'string' && content?.nodeType === 'document') {
    content = renderRichTextToMarkdown(content);
  }

  // 3. Resolve Author & Referenced profile link
  let authorName = 'Shan Ali';
  let authorRole = 'Legal, Regulatory and Commercial Advisor';
  let authorLinkedIn = '';
  let authorAvatar = `${import.meta.env.BASE_URL}images/team/shan-ali.png`;

  const rawAuthor = Array.isArray(f.author) ? f.author[0] : f.author;
  let authorEntry = null;

  if (rawAuthor?.sys?.type === 'Link' && entryMap[rawAuthor.sys.id]) {
    authorEntry = entryMap[rawAuthor.sys.id];
  } else if (rawAuthor?.fields) {
    authorEntry = rawAuthor;
  }

  if (authorEntry?.fields) {
    authorName = authorEntry.fields.name || authorName;
    authorRole = authorEntry.fields.bio || authorEntry.fields.role || authorEntry.fields.title || authorRole;
    authorLinkedIn = authorEntry.fields.linkedIn || '';
    if (authorEntry.fields.avatar?.fields?.file?.url) {
      const aUrl = authorEntry.fields.avatar.fields.file.url;
      authorAvatar = aUrl.startsWith('//') ? `https:${aUrl}` : aUrl;
    }
  } else if (typeof rawAuthor === 'string') {
    authorName = rawAuthor;
  }

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

  // 4. Clean slug & title
  const title = f.title || 'Untitled Publication';
  const slug = f.slug || title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '') || sys.id;
  const type = contentType === 'newsArticle' || contentType === 'news' ? 'news' : 'blog';

  // 5. Date
  const rawDate = f.date || f.publishDate || sys.createdAt;
  const publishDate = rawDate ? rawDate.split('T')[0] : '2026-08-25';

  // 6. Excerpt
  const excerpt = f.excerpt || f.summary || (content.length > 200 ? content.slice(0, 195) + '…' : content);

  // 7. Read time
  const wordCount = typeof content === 'string' ? content.split(/\s+/).filter(Boolean).length : 300;
  const readTime = f.readTime || `${Math.max(2, Math.ceil(wordCount / 180))} min read`;

  // 8. Tags
  const tags = Array.isArray(f.tags) ? f.tags : (f.tags ? [f.tags] : []);

  return {
    id: sys.id || slug,
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
    featured: f.featured !== undefined ? Boolean(f.featured) : true,
    breaking: Boolean(f.breaking),
    content: typeof content === 'string' ? content : ''
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
// IN-MEMORY CACHE & PUBLIC API METHODS
// ==========================================

let cachedBlogs = null;
let cachedNews = null;

export async function fetchBlogPosts(forceRefresh = false) {
  if (cachedBlogs && !forceRefresh) return cachedBlogs;

  const livePosts = await fetchFromContentful('blogPost');
  if (livePosts && livePosts.length > 0) {
    cachedBlogs = livePosts;
    return livePosts;
  }

  // If live returned empty array or failed, fallback
  return cachedBlogs || fallbackBlogs;
}

export async function fetchNewsArticles(forceRefresh = false) {
  if (cachedNews && !forceRefresh) return cachedNews;

  const liveArticles = await fetchFromContentful('newsArticle');
  if (liveArticles && liveArticles.length > 0) {
    cachedNews = liveArticles;
    return liveArticles;
  }

  return cachedNews || fallbackNews;
}

export async function fetchArticleBySlug(slugOrId) {
  if (!slugOrId) return null;

  const [blogs, news] = await Promise.all([fetchBlogPosts(), fetchNewsArticles()]);
  const all = [...blogs, ...news];
  
  const found = all.find(a => a.slug === slugOrId || a.id === slugOrId);
  if (found) return found;

  // Check fallbacks if still not found
  const fallbackAll = [...fallbackBlogs, ...fallbackNews];
  return fallbackAll.find(a => a.slug === slugOrId || a.id === slugOrId) || null;
}

export async function fetchAllArticles() {
  const [blogs, news] = await Promise.all([fetchBlogPosts(), fetchNewsArticles()]);
  return [...blogs, ...news];
}
