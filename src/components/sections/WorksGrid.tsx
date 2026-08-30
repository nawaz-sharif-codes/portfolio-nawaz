import React from 'react';
import { Card } from '../ui/Card';

interface WorksGridProps {
  onViewCaseStudy?: (slug: string) => void;
}

interface ProjectCardData {
  title: string;
  tagline: string;
  body: string;
  slug: string;
}

export const WorksGrid: React.FC<WorksGridProps> = ({ onViewCaseStudy }) => {
  const projects: ProjectCardData[] = [
    {
      title: 'Real-Time Billing Sync',
      tagline: 'A serverless pipeline handling B2B billing at scale.',
      body: 'An event-driven system processing subscription lifecycle events off a live Kafka stream in real time (purchases, renewals, cancellations, suspensions), keeping support and sales systems in sync. Backend systems in this space have handled up to 1M requests/sec in production.',
      slug: 'billing-event-processor',
    },
    {
      title: 'Retention Offers Engine',
      tagline: 'Matching at-risk B2B customers to the right offer, automatically.',
      body: 'A NestJS microservice that evaluates soft-cancelled business customers against dynamic, DynamoDB-backed promotion rules in real time. Deployed with declarative Terraform infrastructure and full telemetry, replacing manual retention review workflows with an automated rules engine.',
      slug: 'retention-offers',
    },
    {
      title: 'Beat the ATS',
      tagline: 'An AI-powered resume tool, built end to end.',
      body: 'A multi-agent SaaS product that scores resumes against job descriptions, rewrites bullets to match, and generates tailored application materials, covering the full pipeline from LLM orchestration and streaming responses to auth, billing, and a credit-based pricing system.',
      slug: 'beattheats',
    },
  ];

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, slug: string) => {
    if (onViewCaseStudy) {
      e.preventDefault();
      onViewCaseStudy(slug);
    }
  };

  return (
    <section
      id="works"
      aria-label="Selected Production Systems"
      style={{
        scrollMarginTop: '76px',
        paddingTop: 'clamp(32px, 6vw, 64px)',
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
            Selected Production Systems
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
            Engineering Systems & Architectures
          </h2>
        </div>

        {/* Three-Column Release Grid per DESIGN.md:L123-127 */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: 'var(--spacing-24)',
            alignItems: 'stretch',
          }}
          className="works-grid-container"
        >
          {projects.map((project) => (
            <Card
              key={project.slug}
              surface="ivory"
              bordered={true}
              padding="large"
              style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
              }}
            >
              <div>
                {/* Card Title in Anthropic Serif 24px */}
                <h3
                  style={{
                    fontFamily: 'var(--font-anthropic-serif)',
                    fontSize: '24px',
                    fontWeight: 'var(--font-weight-bold)',
                    lineHeight: 'var(--leading-subheading)',
                    letterSpacing: 'var(--tracking-subheading)',
                    color: 'var(--color-slate-dark)',
                    marginBottom: 'var(--spacing-8)',
                  }}
                >
                  {project.title}
                </h3>

                {/* Tagline */}
                <p
                  style={{
                    fontFamily: 'var(--font-anthropic-sans)',
                    fontSize: 'var(--text-body-sm)',
                    fontWeight: 'var(--font-weight-medium)',
                    color: 'var(--color-cloud-dark)',
                    marginBottom: 'var(--spacing-16)',
                    lineHeight: 1.3,
                  }}
                >
                  "{project.tagline}"
                </p>

                {/* Card Body in Anthropic Serif 20px */}
                <p
                  style={{
                    fontFamily: 'var(--font-anthropic-serif)',
                    fontSize: 'var(--text-body)',
                    lineHeight: 'var(--leading-body)',
                    fontWeight: 'var(--font-weight-regular)',
                    color: 'var(--color-slate-dark)',
                  }}
                >
                  {project.body}
                </p>
              </div>

              {/* Persistent Underlined Link */}
              <div style={{ paddingTop: 'var(--spacing-24)' }}>
                <a
                  href={`/work/${project.slug}`}
                  onClick={(e) => handleLinkClick(e, project.slug)}
                  className="inline-link"
                  style={{
                    fontFamily: 'var(--font-anthropic-sans)',
                    fontSize: 'var(--text-body-sm)',
                    fontWeight: 'var(--font-weight-semibold)',
                    letterSpacing: '-0.08px',
                    color: 'var(--color-slate-dark)',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: 'var(--spacing-8)',
                    textDecoration: 'underline',
                    textDecorationThickness: '1.5px',
                    textUnderlineOffset: '4px',
                  }}
                >
                  View Case Study →
                </a>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};
