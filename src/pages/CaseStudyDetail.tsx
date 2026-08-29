import React from 'react';
import { Card } from '../components/ui/Card';
import { CASE_STUDIES } from '../data/projects';

interface CaseStudyDetailProps {
  slug: string;
  onBackToIndex: () => void;
  onNavigateCaseStudy?: (slug: string) => void;
}

export const CaseStudyDetail: React.FC<CaseStudyDetailProps> = ({
  slug,
  onBackToIndex,
  onNavigateCaseStudy,
}) => {
  const project = CASE_STUDIES[slug] || CASE_STUDIES['identity-migration'];

  const allSlugs = Object.keys(CASE_STUDIES);
  const currentIndex = allSlugs.indexOf(slug);
  const nextSlug = allSlugs[(currentIndex + 1) % allSlugs.length];
  const nextProject = CASE_STUDIES[nextSlug];

  return (
    <article
      style={{
        minHeight: '80vh',
        paddingTop: 'clamp(48px, 8vw, 96px)',
        paddingBottom: 'clamp(64px, 10vw, 120px)',
      }}
    >
      <div className="site-container" style={{ maxWidth: '920px' }}>
        {/* Breadcrumb / Return Link */}
        <div style={{ marginBottom: 'var(--spacing-32)' }}>
          <a
            href="/"
            onClick={(e) => {
              e.preventDefault();
              onBackToIndex();
            }}
            className="inline-link font-sans"
            style={{
              fontSize: 'var(--text-caption)',
              fontWeight: 'var(--font-weight-medium)',
              color: 'var(--color-slate-dark)',
              letterSpacing: '-0.24px',
            }}
          >
            ← Return to Index
          </a>
        </div>

        {/* Header Block */}
        <header style={{ marginBottom: 'var(--spacing-32)' }}>
          <span
            style={{
              fontFamily: 'var(--font-anthropic-sans)',
              fontSize: 'var(--text-caption)',
              fontWeight: 'var(--font-weight-semibold)',
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              color: 'var(--color-cloud-dark)',
              display: 'block',
              marginBottom: 'var(--spacing-12)',
            }}
          >
            Production Case Study
          </span>

          <h1
            style={{
              fontFamily: 'var(--font-anthropic-serif)',
              fontSize: 'clamp(32px, 5vw, 61px)',
              fontWeight: 'var(--font-weight-regular)',
              lineHeight: 'var(--leading-heading)',
              color: 'var(--color-slate-dark)',
              marginBottom: 'var(--spacing-16)',
            }}
          >
            {project.title}
          </h1>

          <p
            style={{
              fontFamily: 'var(--font-anthropic-sans)',
              fontSize: 'clamp(18px, 2.5vw, 24px)',
              fontWeight: 'var(--font-weight-medium)',
              lineHeight: 'var(--leading-subheading)',
              letterSpacing: 'var(--tracking-subheading)',
              color: 'var(--color-slate-dark)',
            }}
          >
            "{project.subtitle}"
          </p>
        </header>

        {/* Section 1: Context */}
        <section style={{ marginBottom: 'var(--spacing-32)' }}>
          <Card surface="ivory" bordered={true} padding="large">
            <h2
              style={{
                fontFamily: 'var(--font-anthropic-sans)',
                fontSize: 'var(--text-caption)',
                fontWeight: 'var(--font-weight-semibold)',
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                color: 'var(--color-cloud-dark)',
                marginBottom: 'var(--spacing-12)',
              }}
            >
              Context
            </h2>
            <p
              style={{
                fontFamily: 'var(--font-anthropic-serif)',
                fontSize: 'var(--text-body)',
                lineHeight: 'var(--leading-body)',
                color: 'var(--color-slate-dark)',
              }}
            >
              {project.context}
            </p>
          </Card>
        </section>

        {/* Section 2: Approach */}
        <section style={{ marginBottom: 'var(--spacing-32)' }}>
          <h2
            style={{
              fontFamily: 'var(--font-anthropic-sans)',
              fontSize: 'var(--text-subheading)',
              fontWeight: 'var(--font-weight-bold)',
              letterSpacing: 'var(--tracking-subheading)',
              color: 'var(--color-slate-dark)',
              marginBottom: 'var(--spacing-16)',
              paddingBottom: 'var(--spacing-8)',
              borderBottom: '1px solid var(--color-stone)',
            }}
          >
            Approach
          </h2>
          <ul
            style={{
              listStyle: 'none',
              padding: 0,
              margin: 0,
              display: 'flex',
              flexDirection: 'column',
              gap: 'var(--spacing-16)',
            }}
          >
            {project.approach.map((point, index) => (
              <li
                key={index}
                style={{
                  display: 'grid',
                  gridTemplateColumns: '24px 1fr',
                  gap: 'var(--spacing-8)',
                  alignItems: 'baseline',
                }}
              >
                <span
                  style={{
                    fontFamily: 'var(--font-anthropic-mono)',
                    fontSize: 'var(--text-body-sm)',
                    color: 'var(--color-cloud-dark)',
                  }}
                >
                  —
                </span>
                <span
                  style={{
                    fontFamily: 'var(--font-anthropic-serif)',
                    fontSize: 'var(--text-body)',
                    lineHeight: 'var(--leading-body)',
                    color: 'var(--color-slate-dark)',
                  }}
                >
                  {point}
                </span>
              </li>
            ))}
          </ul>
        </section>

        {/* Section 3: Stack */}
        <section style={{ marginBottom: 'var(--spacing-76)' }}>
          <h2
            style={{
              fontFamily: 'var(--font-anthropic-sans)',
              fontSize: 'var(--text-subheading)',
              fontWeight: 'var(--font-weight-bold)',
              letterSpacing: 'var(--tracking-subheading)',
              color: 'var(--color-slate-dark)',
              marginBottom: 'var(--spacing-16)',
            }}
          >
            Stack
          </h2>
          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: 'var(--spacing-8)',
            }}
          >
            {project.stack.map((tech) => (
              <span
                key={tech}
                style={{
                  fontFamily: 'var(--font-anthropic-mono)',
                  fontSize: '14px',
                  color: 'var(--color-slate-dark)',
                  backgroundColor: 'var(--color-oat-warm)',
                  padding: '6px 14px',
                  borderRadius: 'var(--radius-lg)',
                }}
              >
                {tech}
              </span>
            ))}
          </div>
        </section>

        {/* Next Case Study Navigation Footer */}
        {nextProject && nextSlug !== slug && (
          <div
            style={{
              paddingTop: 'var(--spacing-24)',
              borderTop: '1px solid var(--color-stone)',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              flexWrap: 'wrap',
              gap: 'var(--spacing-16)',
            }}
          >
            <a
              href="/"
              onClick={(e) => {
                e.preventDefault();
                onBackToIndex();
              }}
              className="inline-link font-sans"
              style={{
                fontSize: 'var(--text-body-sm)',
                color: 'var(--color-slate-dark)',
              }}
            >
              ← Back to Index
            </a>

            <a
              href={`/work/${nextSlug}`}
              onClick={(e) => {
                if (onNavigateCaseStudy) {
                  e.preventDefault();
                  onNavigateCaseStudy(nextSlug);
                }
              }}
              className="inline-link font-sans"
              style={{
                fontSize: 'var(--text-body-sm)',
                fontWeight: 'var(--font-weight-semibold)',
                color: 'var(--color-slate-dark)',
              }}
            >
              Next Case Study: {nextProject.title} →
            </a>
          </div>
        )}
      </div>
    </article>
  );
};
