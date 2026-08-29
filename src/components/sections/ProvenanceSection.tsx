import React from 'react';
import { Card } from '../ui/Card';

interface TimelineItem {
  organization: string;
  role: string;
  period?: string;
  description?: string;
  isEducation?: boolean;
}

interface StackCategory {
  category: string;
  items: string[];
}

export const ProvenanceSection: React.FC = () => {
  const timeline: TimelineItem[] = [
    {
      organization: 'DAZN',
      role: 'Software Engineer',
      period: 'Feb 2024 – Present',
      description:
        'Engineered high-throughput, low-latency backend microservices for a global sports streaming platform, ensuring seamless real-time playback for millions of concurrent users.',
    },
    {
      organization: 'ENTAIN',
      role: 'Associate Software Engineer',
      period: 'Aug 2021 – Jan 2024',
      description: 'Engineered and optimized core platform features for PartyPoker, driving measurable increases in player engagement, retention, and real-time game performance.'
    },
  ];

  const stackCategories: StackCategory[] = [
    {
      category: 'Backend Engineering',
      items: ['Node.js', 'Express', 'NestJS', 'C#', '.NET Core'],
    },
    {
      category: 'Databases',
      items: ['PostgreSQL', 'MongoDB', 'Redis'],
    },
    {
      category: 'DevOps & Systems',
      items: ['CI/CD', 'Terraform', 'Docker', 'AWS'],
    },
    {
      category: 'Monitoring & Observability',
      items: ['CloudWatch', 'Coralogix', 'New Relic'],
    },
    {
      category: 'Frontend Engineering',
      items: ['TypeScript', 'React', 'Redux', 'HTML', 'CSS', 'JavaScript'],
    },
  ];

  return (
    <section
      id="provenance"
      aria-label="Work Experience and Technical Provenance"
      style={{
        scrollMarginTop: '76px',
        paddingTop: 'clamp(48px, 8vw, 80px)',
        paddingBottom: 'clamp(48px, 8vw, 96px)',
        borderBottom: '1px solid var(--color-stone)',
      }}
    >
      <div className="site-container">
        {/* Section Header */}
        <div style={{ marginBottom: 'var(--spacing-32)' }}>
          <span
            style={{
              fontFamily: 'var(--font-anthropic-sans)',
              fontSize: 'var(--text-caption)',
              fontWeight: 'var(--font-weight-semibold)',
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              color: 'var(--color-cloud-dark)',
              display: 'block',
              marginBottom: 'var(--spacing-8)',
            }}
          >
            Provenance & Career Record
          </span>
          <h2
            style={{
              fontFamily: 'var(--font-anthropic-serif)',
              fontSize: '24px',
              fontWeight: 'var(--font-weight-bold)',
              letterSpacing: 'var(--tracking-heading)',
              color: 'var(--color-slate-dark)',
            }}
          >
            Work Experience
          </h2>
        </div>

        {/* Career Timeline (Editorial Rows) */}
        <div
          style={{
            borderTop: '1px solid var(--color-stone)',
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          {timeline.map((item, idx) => (
            <div
              key={`${item.organization}-${idx}`}
              style={{
                paddingTop: 'var(--spacing-24)',
                paddingBottom: 'var(--spacing-24)',
                borderBottom:
                  idx !== timeline.length - 1 ? '1px solid var(--color-stone)' : 'none',
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
                gap: 'var(--spacing-16)',
                alignItems: 'baseline',
              }}
              className="provenance-row"
            >
              {/* Left Column: Period (if provided) & Organization */}
              <div>
                {item.period && (
                  <span
                    style={{
                      fontFamily: 'var(--font-anthropic-sans)',
                      fontSize: 'var(--text-caption)',
                      fontWeight: 'var(--font-weight-medium)',
                      color: 'var(--color-slate-medium)',
                      display: 'block',
                      marginBottom: 'var(--spacing-4)',
                    }}
                  >
                    {item.period}
                  </span>
                )}
                <span
                  style={{
                    fontFamily: 'var(--font-anthropic-serif)',
                    fontSize: '24px',
                    fontWeight: 'var(--font-weight-bold)',
                    color: 'var(--color-slate-dark)',
                  }}
                >
                  {item.organization}
                </span>
              </div>

              {/* Right Column: Role Title & Description */}
              <div style={{ maxWidth: '720px' }}>
                <h3
                  style={{
                    fontFamily: 'var(--font-anthropic-serif)',
                    fontSize: 'var(--text-subheading)',
                    fontWeight: 'var(--font-weight-semibold)',
                    lineHeight: 'var(--leading-subheading)',
                    color: 'var(--color-slate-dark)',
                    marginBottom: item.description ? 'var(--spacing-8)' : 0,
                  }}
                >
                  {item.role}
                </h3>

                {item.description && (
                  <p
                    style={{
                      fontFamily: 'var(--font-anthropic-serif)',
                      fontSize: 'var(--text-body)',
                      lineHeight: 'var(--leading-body)',
                      fontWeight: 'var(--font-weight-regular)',
                      color: 'var(--color-slate-dark)',
                    }}
                  >
                    {item.description}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Technical Provenance / Stack Index */}
        <div
          id="skills"
          style={{
            scrollMarginTop: '76px',
            borderTop: '1px solid var(--color-stone)',
            paddingTop: 'clamp(48px, 6vw, 76px)',
          }}
        >
          <div style={{ marginBottom: 'var(--spacing-24)' }}>
            <span
              style={{
                fontFamily: 'var(--font-anthropic-sans)',
                fontSize: 'var(--text-caption)',
                fontWeight: 'var(--font-weight-semibold)',
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                color: 'var(--color-cloud-dark)',
                display: 'block',
                marginBottom: 'var(--spacing-8)',
              }}
            >
              System Index
            </span>
            <h3
              style={{
                fontFamily: 'var(--font-anthropic-serif)',
                fontSize: '24px',
                fontWeight: 'var(--font-weight-bold)',
                letterSpacing: 'var(--tracking-subheading)',
                color: 'var(--color-slate-dark)',
              }}
            >
              Technical Provenance & Core Stack
            </h3>
          </div>

          <Card surface="ivory" bordered={true} padding="large">
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: 'var(--spacing-24)',
              }}
            >
              {stackCategories.map((group, idx) => (
                <div
                  key={group.category}
                  style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
                    gap: 'var(--spacing-12)',
                    alignItems: 'baseline',
                    paddingBottom: idx !== stackCategories.length - 1 ? 'var(--spacing-16)' : 0,
                    borderBottom:
                      idx !== stackCategories.length - 1
                        ? '1px solid var(--color-stone)'
                        : 'none',
                  }}
                  className="stack-row"
                >
                  <span
                    style={{
                      fontFamily: 'var(--font-anthropic-sans)',
                      fontSize: 'var(--text-caption)',
                      fontWeight: 'var(--font-weight-semibold)',
                      letterSpacing: '0.04em',
                      textTransform: 'uppercase',
                      color: 'var(--color-slate-medium)',
                    }}
                  >
                    {group.category}
                  </span>

                  <div
                    style={{
                      display: 'flex',
                      flexWrap: 'wrap',
                      gap: 'var(--spacing-8)',
                    }}
                  >
                    {group.items.map((tech) => (
                      <span
                        key={tech}
                        style={{
                          fontFamily: 'var(--font-anthropic-mono)',
                          fontSize: '14px',
                          color: 'var(--color-slate-dark)',
                          backgroundColor: 'var(--color-oat-warm)',
                          padding: '4px 10px',
                          borderRadius: 'var(--radius-lg)',
                        }}
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>

      <style>{`
        @media (min-width: 768px) {
          .provenance-row {
            grid-template-columns: 260px 1fr !important;
          }
          .stack-row {
            grid-template-columns: 240px 1fr !important;
          }
        }
      `}</style>
    </section>
  );
};
