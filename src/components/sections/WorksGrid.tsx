import React, { useState, useRef, useEffect } from 'react';
import { ArrowRight, Radio, RefreshCw, Cpu } from 'lucide-react';

interface WorksGridProps {
  onViewCaseStudy?: (slug: string) => void;
}

interface ProjectCardData {
  title: string;
  tagline: string;
  body: string;
  slug: string;
  category: string;
  metricBadge: string;
  icon: React.ReactNode;
}

export const WorksGrid: React.FC<WorksGridProps> = ({ onViewCaseStudy }) => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.15 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const projects: ProjectCardData[] = [
    {
      title: 'Real-Time Billing Sync',
      tagline: 'A serverless pipeline handling B2B billing at scale.',
      body: 'An event-driven system processing subscription lifecycle events off a live Kafka stream in real time (purchases, renewals, cancellations, suspensions), keeping support and sales systems in sync. Backend systems in this space have handled up to 1M requests/sec in production.',
      slug: 'billing-event-processor',
      category: 'EVENT STREAMING',
      metricBadge: '1M REQ/S',
      icon: <Radio size={14} />,
    },
    {
      title: 'Retention Offers Engine',
      tagline: 'Matching at-risk B2B customers to the right offer, automatically.',
      body: 'A NestJS microservice that evaluates soft-cancelled business customers against dynamic, DynamoDB-backed promotion rules in real time. Deployed with declarative Terraform infrastructure and full telemetry, replacing manual retention review workflows with an automated rules engine.',
      slug: 'retention-offers',
      category: 'MICROSERVICES',
      metricBadge: 'AUTO RULES',
      icon: <RefreshCw size={14} />,
    },
    {
      title: 'Beat the ATS',
      tagline: 'An AI-powered resume tool, built end to end.',
      body: 'A multi-agent SaaS product that scores resumes against job descriptions, rewrites bullets to match, and generates tailored application materials, covering the full pipeline from LLM orchestration and streaming responses to auth, billing, and a credit-based pricing system.',
      slug: 'beattheats',
      category: 'AI ORCHESTRATION',
      metricBadge: 'STREAMING LLM',
      icon: <Cpu size={14} />,
    },
  ];

  return (
    <section
      id="works"
      ref={sectionRef}
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

        {/* Three-Column Release Grid with Smooth Staggered Entrance & 3D Interactive Hover */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: 'var(--spacing-24)',
            alignItems: 'stretch',
            perspective: '1200px',
          }}
          className="works-grid-container"
        >
          {projects.map((project, index) => (
            <AnimatedProductionCard
              key={project.slug}
              project={project}
              index={index}
              isVisible={isVisible}
              onViewCaseStudy={onViewCaseStudy}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

interface AnimatedCardProps {
  project: ProjectCardData;
  index: number;
  isVisible: boolean;
  onViewCaseStudy?: (slug: string) => void;
}

const AnimatedProductionCard: React.FC<AnimatedCardProps> = ({
  project,
  index,
  isVisible,
  onViewCaseStudy,
}) => {
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  const handleClick = (e: React.MouseEvent) => {
    if (onViewCaseStudy) {
      e.preventDefault();
      onViewCaseStudy(project.slug);
    }
  };

  return (
    <div
      onClick={handleClick}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      tabIndex={0}
      role="link"
      aria-label={`View case study for ${project.title}`}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          if (onViewCaseStudy) onViewCaseStudy(project.slug);
        }
      }}
      style={{
        backgroundColor: 'var(--color-ivory-light)',
        borderRadius: 'var(--radius-cards)',
        border: isHovered
          ? '1px solid var(--color-clay)'
          : '1px solid var(--color-stone)',
        padding: 'var(--spacing-32)',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        position: 'relative',
        overflow: 'hidden',
        cursor: 'pointer',
        outline: 'none',
        opacity: isVisible ? 1 : 0,
        transformOrigin: 'bottom center',
        transform: isVisible
          ? isHovered
            ? 'scaleY(1.03)'
            : 'scaleY(1)'
          : 'translateY(28px)',
        transition: isHovered
          ? 'transform 0.28s cubic-bezier(0.16, 1, 0.3, 1), border-color 0.25s ease, box-shadow 0.25s ease'
          : `opacity 0.7s cubic-bezier(0.16, 1, 0.3, 1) ${index * 0.12}s, transform 0.3s cubic-bezier(0.16, 1, 0.3, 1), border-color 0.25s ease, box-shadow 0.25s ease`,
        boxShadow: isHovered
          ? '0 16px 32px -10px rgba(20, 20, 19, 0.09), 0 0 0 1px rgba(217, 119, 87, 0.15)'
          : '0 2px 8px rgba(0, 0, 0, 0.02)',
      }}
      className="animated-project-card"
    >
      {/* Top Accent Illumination Bar */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: '3px',
          backgroundColor: 'var(--color-clay)',
          opacity: isHovered ? 1 : 0,
          transform: isHovered ? 'scaleX(1)' : 'scaleX(0)',
          transformOrigin: 'left',
          transition: 'transform 0.35s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.25s ease',
        }}
      />

      <div>
        {/* Top Micro-Metadata Header Strip */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginBottom: 'var(--spacing-16)',
          }}
        >
          <span
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '5px',
              fontFamily: 'var(--font-anthropic-mono)',
              fontSize: '11px',
              fontWeight: 600,
              color: isHovered ? 'var(--color-clay)' : 'var(--color-cloud-dark)',
              letterSpacing: '0.06em',
              textTransform: 'uppercase',
              transition: 'color 0.2s ease',
            }}
          >
            {project.icon} {project.category}
          </span>

          <span
            style={{
              fontFamily: 'var(--font-anthropic-mono)',
              fontSize: '10px',
              fontWeight: 600,
              color: isHovered ? 'var(--color-clay-deep)' : 'var(--color-slate-medium)',
              backgroundColor: isHovered
                ? 'rgba(217, 119, 87, 0.12)'
                : 'rgba(0, 0, 0, 0.04)',
              padding: '2px 7px',
              borderRadius: '4px',
              letterSpacing: '0.04em',
              transition: 'all 0.2s ease',
            }}
          >
            {project.metricBadge}
          </span>
        </div>

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
            transition: 'color 0.2s ease',
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
            lineHeight: 1.35,
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

      {/* Interactive Underlined Action Link with Animated Arrow */}
      <div style={{ paddingTop: 'var(--spacing-24)' }}>
        <a
          href={`/work/${project.slug}`}
          onClick={handleClick}
          className="inline-link"
          style={{
            fontFamily: 'var(--font-anthropic-sans)',
            fontSize: 'var(--text-body-sm)',
            fontWeight: 'var(--font-weight-semibold)',
            letterSpacing: '-0.08px',
            color: isHovered ? 'var(--color-clay)' : 'var(--color-slate-dark)',
            display: 'inline-flex',
            alignItems: 'center',
            gap: 'var(--spacing-8)',
            textDecoration: 'underline',
            textDecorationThickness: '1.5px',
            textUnderlineOffset: '4px',
            transition: 'color 0.2s ease',
          }}
        >
          <span>View Case Study</span>
          <ArrowRight
            size={15}
            style={{
              transition: 'transform 0.25s cubic-bezier(0.16, 1, 0.3, 1)',
              transform: isHovered ? 'translateX(4px)' : 'translateX(0)',
            }}
          />
        </a>
      </div>
    </div>
  );
};

