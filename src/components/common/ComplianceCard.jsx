import React from 'react';
import { ArrowRight, FileText, Check } from 'lucide-react';

export default function ComplianceCard({
  category = 'Financial Crime Compliance',
  categoryIcon: CategoryIcon,
  jurisdictions = [],
  title,
  desc,
  deliverablesTitle = 'Key Scope & Deliverables',
  deliverables = [],
  onDetails,
  detailsText = 'Detailed Specifications',
  onConsult,
  consultText = 'Consult',
  uniqueId = 'card',
  compact = false,
  className = ''
}) {
  const formattedRegions = Array.isArray(jurisdictions)
    ? jurisdictions.join(' · ')
    : jurisdictions;

  return (
    <article 
      className={`compliance-card ${compact ? 'compact' : ''} ${className}`} 
      aria-labelledby={`title-${uniqueId}`}
    >
      {/* Top Metadata: Category Pill + Jurisdictions */}
      <div className="card-top">
        <div className="category-pill">
          {CategoryIcon && <CategoryIcon aria-hidden="true" />}
          <span>{category}</span>
        </div>
        {formattedRegions && (
          <div className="regions">
            {formattedRegions}
          </div>
        )}
      </div>

      {/* Heading Wrap — Clean full-width title */}
      <div className="heading-wrap">
        <h3 id={`title-${uniqueId}`} className="card-title">
          {title}
        </h3>
      </div>

      {/* Cyan/Blue Accent Glow Rule */}
      <div className="heading-rule" />

      {/* Intro Description */}
      <p className="intro">
        {desc}
      </p>

      {/* Deliverables Section */}
      {deliverables && deliverables.length > 0 && (
        <section className="deliverables" aria-label={deliverablesTitle}>
          <div className="section-heading">
            <FileText aria-hidden="true" />
            <span>{deliverablesTitle}</span>
          </div>
          <ul>
            {deliverables.map((item, idx) => (
              <li key={idx}>
                <span className="check" aria-hidden="true">
                  <Check />
                </span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </section>
      )}

      {/* Card Footer */}
      <footer className="card-footer">
        {onDetails ? (
          <button
            type="button"
            onClick={onDetails}
            className="details-link cursor-pointer"
          >
            <span>{detailsText}</span>
            <ArrowRight className="w-4 h-4 rtl:rotate-180" aria-hidden="true" />
          </button>
        ) : (
          <span />
        )}

        {onConsult && (
          <button
            type="button"
            onClick={onConsult}
            className="consult-button"
          >
            <span>{consultText}</span>
            <ArrowRight className="w-3.5 h-3.5 rtl:rotate-180" aria-hidden="true" />
          </button>
        )}
      </footer>
    </article>
  );
}
