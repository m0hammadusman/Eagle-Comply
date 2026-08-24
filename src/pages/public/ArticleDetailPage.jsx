import React, { useState, useEffect } from 'react';
import { 
  FileText, Clock, User, Calendar, ArrowLeft, Share2, Bookmark, 
  Check, MessageSquare, Send, Sparkles, Tag, ExternalLink 
} from 'lucide-react';
import { useArticleDetail } from '../../hooks/useContentful';
import { useLanguage } from '../../context/LanguageContext';
import Breadcrumbs from '../../components/common/Breadcrumbs';

function FormattedArticleContent({ content }) {
  if (!content) return null;
  const sections = content.split('\n\n');

  return (
    <div className="space-y-6 text-slate-700 dark:text-slate-300 text-sm sm:text-base leading-relaxed">
      {sections.map((section, sIdx) => {
        const text = section.trim();
        if (!text) return null;

        // Headings
        if (text.startsWith('### ')) {
          return (
            <h3 key={sIdx} className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white pt-4 pb-1 border-b border-surface-border">
              {text.replace(/^###\s+/, '')}
            </h3>
          );
        }
        if (text.startsWith('## ')) {
          return (
            <h2 key={sIdx} className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white pt-6 pb-2 border-b border-surface-border">
              {text.replace(/^##\s+/, '')}
            </h2>
          );
        }

        // Blockquote
        if (text.startsWith('> ')) {
          return (
            <blockquote key={sIdx} className="p-4 rounded-2xl bg-surface-subtle border-l-4 border-[#334DAF] dark:border-[#7096D1] text-slate-800 dark:text-slate-200 italic my-4">
              {text.replace(/^>\s+/, '')}
            </blockquote>
          );
        }

        // Bullet lists
        if (text.includes('\n• ') || text.startsWith('• ') || text.includes('\n- ') || text.startsWith('- ')) {
          const lines = text.split('\n');
          return (
            <ul key={sIdx} className="space-y-2.5 my-3 pl-2">
              {lines.map((line, lIdx) => {
                const cleanLine = line.replace(/^[•\-]\s*/, '').trim();
                if (!cleanLine) return null;
                const parts = cleanLine.split(/(\*\*.*?\*\*)/g).map((part, pIdx) => {
                  if (part.startsWith('**') && part.endsWith('**')) {
                    return <strong key={pIdx} className="font-bold text-slate-900 dark:text-white">{part.slice(2, -2)}</strong>;
                  }
                  return part;
                });
                return (
                  <li key={lIdx} className="flex items-start gap-2 text-sm sm:text-base">
                    <span className="text-[#334DAF] dark:text-[#7096D1] font-bold mt-1 shrink-0">•</span>
                    <span className="flex-1">{parts}</span>
                  </li>
                );
              })}
            </ul>
          );
        }

        // Regular paragraph with bold support
        const parts = text.split(/(\*\*.*?\*\*)/g).map((part, pIdx) => {
          if (part.startsWith('**') && part.endsWith('**')) {
            return <strong key={pIdx} className="font-bold text-slate-900 dark:text-white">{part.slice(2, -2)}</strong>;
          }
          return part;
        });

        return <p key={sIdx} className="leading-relaxed">{parts}</p>;
      })}
    </div>
  );
}

export default function ArticleDetailPage({ params, onNavigate, onOpenConsultation }) {
  const { t, insights } = useLanguage();
  const slugOrId = params?.id;
  const { article: contentfulArticle, loading } = useArticleDetail(slugOrId);

  // Fallback to legacy insights if not in Contentful format
  const legacyArticle = (insights || []).find(i => i.id === slugOrId) || insights?.[0];
  const article = contentfulArticle || legacyArticle || {};

  const [copied, setCopied] = useState(false);

  const handleCopyLink = () => {
    navigator.clipboard?.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleShareLinkedIn = () => {
    const url = encodeURIComponent(window.location.href);
    const title = encodeURIComponent(article.title || 'EagleComply Compliance Publication');
    window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${url}&title=${title}`, '_blank', 'noopener,noreferrer');
  };

  const handleShareWhatsApp = () => {
    const text = encodeURIComponent(`${article.title || 'EagleComply Publication'}: ${window.location.href}`);
    window.open(`https://api.whatsapp.com/send?text=${text}`, '_blank', 'noopener,noreferrer');
  };

  const backRoute = article.type === 'news' ? 'news' : 'blogs';
  const backLabel = article.type === 'news' ? 'Regulatory Newsroom' : 'Compliance Blogs';

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14 space-y-8 animate-fade-in">
      {/* Breadcrumbs */}
      <Breadcrumbs 
        items={[
          { label: backLabel, route: backRoute },
          { label: article.title || 'Publication' }
        ]} 
        onNavigate={onNavigate} 
      />

      {/* Back button */}
      <div>
        <button
          onClick={() => onNavigate(backRoute)}
          className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-500 hover:text-[#334DAF] dark:hover:text-[#7096D1] transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4 rtl:rotate-180" /> Back to {backLabel}
        </button>
      </div>

      {loading && (
        <div className="space-y-6">
          <div className="h-8 bg-surface-subtle rounded-xl animate-pulse w-3/4" />
          <div className="h-64 bg-surface-subtle rounded-3xl animate-pulse w-full" />
          <div className="h-40 bg-surface-subtle rounded-2xl animate-pulse w-full" />
        </div>
      )}

      {!loading && (
        <article className="space-y-8">
          {/* Header Metadata */}
          <div className="space-y-4">
            <div className="flex flex-wrap items-center gap-2.5 text-xs font-mono">
              <span className="px-3 py-1 rounded-full bg-[#334DAF]/10 dark:bg-[#7096D1]/15 text-[#334DAF] dark:text-[#7096D1] font-bold uppercase tracking-wider">
                {article.category || 'Regulatory Practice'}
              </span>
              <span className="text-slate-400 flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5" /> {article.publishDate || 'Recent'}
              </span>
              <span className="text-slate-400 flex items-center gap-1">
                <Clock className="w-3.5 h-3.5" /> {article.readTime || '5 min read'}
              </span>
            </div>

            <h1 className="font-sans tracking-tight text-2xl sm:text-4xl lg:text-5xl font-bold text-slate-900 dark:text-white leading-tight">
              {article.title}
            </h1>

            {article.excerpt && (
              <p className="text-base sm:text-lg font-medium text-slate-600 dark:text-slate-300 leading-relaxed pt-1">
                {article.excerpt}
              </p>
            )}
          </div>

          {/* Cover Image Banner */}
          {article.coverImage && (
            <div className="w-full h-72 sm:h-96 rounded-3xl overflow-hidden bg-slate-950 border border-surface-border shadow-xl relative">
              <img
                src={article.coverImage}
                alt={article.title}
                className="w-full h-full object-cover"
              />
            </div>
          )}

          {/* Author & Share Bar */}
          <div className="p-4 sm:p-5 rounded-2xl bg-surface-subtle border border-surface-border flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              {article.author?.avatar && (
                <img
                  src={article.author.avatar}
                  alt={article.author.name}
                  className="w-11 h-11 rounded-full object-cover border-2 border-[#334DAF] dark:border-[#7096D1] shadow-xs shrink-0"
                />
              )}
              <div>
                <div className="text-sm font-bold text-slate-900 dark:text-white">
                  {article.author?.name || 'EagleComply Advisory Board'}
                </div>
                <div className="text-xs text-slate-500 font-mono">
                  {article.author?.role || 'Resident Regulatory Advisor'}
                </div>
              </div>
            </div>

            {/* Social Sharing */}
            <div className="flex items-center gap-2">
              <button
                onClick={handleCopyLink}
                className="p-2 rounded-xl bg-surface-base border border-surface-border text-slate-600 dark:text-slate-300 hover:text-[#334DAF] text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
                title="Copy link"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Share2 className="w-3.5 h-3.5" />}
                <span>{copied ? 'Copied!' : 'Copy Link'}</span>
              </button>

              <button
                onClick={handleShareLinkedIn}
                className="p-2 rounded-xl bg-[#0A66C2]/10 text-[#0A66C2] border border-[#0A66C2]/20 hover:bg-[#0A66C2]/20 text-xs font-semibold flex items-center gap-1 transition-colors cursor-pointer"
                title="Share on LinkedIn"
              >
                <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                  <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z"/>
                </svg>
              </button>

              <button
                onClick={handleShareWhatsApp}
                className="p-2 rounded-xl bg-[#25D366]/10 text-[#25D366] border border-[#25D366]/20 hover:bg-[#25D366]/20 text-xs font-semibold flex items-center gap-1 transition-colors cursor-pointer"
                title="Share on WhatsApp"
              >
                <MessageSquare className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Article Main Body */}
          <div className="py-2 border-t border-surface-border">
            <FormattedArticleContent content={article.content || article.excerpt} />
          </div>

          {/* Tags */}
          {article.tags && article.tags.length > 0 && (
            <div className="pt-6 border-t border-surface-border space-y-2">
              <span className="text-xs font-mono font-bold uppercase text-slate-400">Related Regulatory Topics:</span>
              <div className="flex flex-wrap gap-2">
                {article.tags.map(tag => (
                  <span
                    key={tag}
                    className="px-3 py-1 rounded-xl text-xs font-mono font-semibold bg-surface-subtle border border-surface-border text-[#334DAF] dark:text-[#7096D1]"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Author CTA Card */}
          <div className="p-6 sm:p-8 rounded-3xl bg-surface-raised border border-surface-border shadow-xl flex flex-col sm:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-4 text-center sm:text-left flex-col sm:flex-row">
              {article.author?.avatar && (
                <img
                  src={article.author.avatar}
                  alt={article.author.name}
                  className="w-14 h-14 rounded-2xl object-cover border border-surface-border shadow-sm shrink-0"
                />
              )}
              <div>
                <h4 className="text-base font-bold text-slate-900 dark:text-white">
                  Discuss this analysis with {article.author?.name || 'EagleComply'}
                </h4>
                <p className="text-xs text-slate-500 font-mono mt-0.5">
                  Direct consultation and supervisory advisory for your institution.
                </p>
              </div>
            </div>

            <button
              onClick={() => onOpenConsultation?.()}
              className="px-5 py-2.5 rounded-xl bg-[#091F5C] dark:bg-[#334DAF] hover:bg-[#1E3778] dark:hover:bg-[#253982] text-white font-bold text-xs shadow-md hover:shadow-lg transition-all cursor-pointer whitespace-nowrap"
            >
              Book a Consultation
            </button>
          </div>
        </article>
      )}
    </div>
  );
}
