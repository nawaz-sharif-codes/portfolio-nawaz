import React from 'react';
import {
  Calendar,
  MapPin,
  CheckCircle2,
  Sparkles,
} from 'lucide-react';

interface CareerMilestone {
  title: string;
  category: string;
  metric?: string;
  description: string;
}

interface CareerRole {
  id: string;
  company: string;
  companySubtitle: string;
  role: string;
  period: string;
  duration: string;
  location: string;
  type: string;
  isCurrent?: boolean;
  summary: string;
  impactMetrics: { label: string; value: string }[];
  milestones: CareerMilestone[];
  technologies: string[];
}

import { NawazProfileCard } from '../ui/NawazProfileCard';

export const ProvenanceSection: React.FC = () => {
  const careerRoles: CareerRole[] = [
    {
      id: 'dazn',
      company: 'DAZN',
      companySubtitle: 'Global Live Sports Streaming & Entertainment',
      role: 'Software Engineer',
      period: 'Feb 2024 – Present',
      duration: '2 yrs+',
      location: 'Hyderabad, India',
      type: 'Full-time',
      isCurrent: true,
      summary:
        'Architecting high-throughput backend microservices, resilient event streaming pipelines, and enterprise IAM data migrations powering live sports playback for millions of concurrent global subscribers.',
      impactMetrics: [
        { label: 'Identities Migrated', value: '1.4M Users' },
        { label: 'Event Throughput', value: 'High-Concurrency' },
        { label: 'Service Uptime', value: '99.99%' },
      ],
      milestones: [
        {
          title: 'Foxtel → DAZN 1.4M User Identity Migration',
          category: 'IAM & Distributed ETL',
          metric: 'Zero Downtime',
          description:
            'Engineered a resumable, WAL-checkpointed extraction pipeline in TypeScript to migrate ~1.4M users from Sun Directory LDAP to DAZN IAM with real-time CDC dual-write synchronization hooks.',
        },
        {
          title: 'Real-Time Kafka Serverless Billing Event Pipeline',
          category: 'Event-Driven Systems',
          metric: 'Sub-second Sync',
          description:
            'Built an AWS Lambda service triggered off Kafka MSK deserializing Protobuf payloads to dynamically route subscription purchases, renewals, and cancellations to CRM ledgers with SQS DLQ failover.',
        },
        {
          title: 'Dynamic Retention Offers & Segmentation Engine',
          category: 'Microservices & Cloud',
          metric: 'Dynamic Rules',
          description:
            'Architected a NestJS microservice backed by DynamoDB evaluating soft-cancellation signals against data-driven retention rule matrices, fully provisioned via Terraform IaC.',
        },
      ],
      technologies: [
        'TypeScript',
        'Node.js',
        'AWS Lambda',
        'Kafka MSK',
        'NestJS',
        'DynamoDB',
        'Terraform',
        'OAuth2/OIDC',
        'SQS',
        'Coralogix',
      ],
    },
    {
      id: 'entain',
      company: 'ENTAIN',
      companySubtitle: 'Global Sports Betting & Gaming (PartyPoker)',
      role: 'Associate Software Engineer',
      period: 'Aug 2021 – Jan 2024',
      duration: '2 yrs 6 mos',
      location: 'Hyderabad, India',
      type: 'Full-time',
      isCurrent: false,
      summary:
        'Engineered core gameplay backend systems, player engagement pipelines, and distributed data layers for PartyPoker, optimizing real-time concurrency and server-side game state consistency.',
      impactMetrics: [
        { label: 'Platform Domain', value: 'PartyPoker' },
        { label: 'Concurrency Mode', value: 'Deterministic' },
        { label: 'Tenure', value: '2.5 Years' },
      ],
      milestones: [
        {
          title: 'PartyPoker Real-Time Engine & Table Concurrency',
          category: 'Gaming Backend & State',
          metric: 'Low Latency',
          description:
            'Developed and maintained deterministic backend game components in C# and .NET Core, ensuring lock-free multi-user state synchronization during high-traffic tournament surges.',
        },
        {
          title: 'Player Engagement & Retention Reward Workflows',
          category: 'Platform Architecture',
          metric: '+Daily Engagement',
          description:
            'Implemented asynchronous event tracking and player reward distribution pipelines, increasing daily active session length and tournament participation metrics.',
        },
        {
          title: 'Database Query Tuning & Distributed Caching',
          category: 'Database & Performance',
          metric: 'Reduced P99 Latency',
          description:
            'Optimized relational PostgreSQL queries and Redis caching layers to prevent table contention and stabilize round-trip latency across distributed service clusters.',
        },
      ],
      technologies: [
        'C#',
        '.NET Core',
        'TypeScript',
        'PostgreSQL',
        'Redis',
        'Microservices',
        'Docker',
        'CI/CD Pipelines',
        'GitOps',
      ],
    },
  ];

  const filteredRoles = careerRoles;

  return (
    <section
      id="provenance"
      aria-label="Work Experience and Technical Provenance"
      style={{
        scrollMarginTop: '76px',
        paddingTop: 'clamp(48px, 6vw, 76px)',
        paddingBottom: 'clamp(56px, 8vw, 96px)',
        backgroundColor: 'var(--color-ivory-medium)',
        borderBottom: '1px solid var(--color-stone)',
      }}
    >
      <div className="site-container">
        {/* Section Header with Profile Card Spotlight */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: 'var(--spacing-32)',
            alignItems: 'center',
            marginBottom: 'var(--spacing-40)',
          }}
        >
          <div>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                marginBottom: 'var(--spacing-8)',
              }}
            >
              <span
                style={{
                  fontFamily: 'var(--font-anthropic-sans)',
                  fontSize: 'var(--text-caption)',
                  fontWeight: 'var(--font-weight-semibold)',
                  letterSpacing: '0.08em',
                  textTransform: 'uppercase',
                  color: 'var(--color-cloud-dark)',
                }}
              >
                Provenance & Career Record
              </span>
              <span
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '4px',
                  padding: '2px 8px',
                  borderRadius: '999px',
                  backgroundColor: 'rgba(217, 119, 87, 0.12)',
                  color: 'var(--color-clay)',
                  fontFamily: 'var(--font-anthropic-mono)',
                  fontSize: '11px',
                  fontWeight: 600,
                  letterSpacing: '0.04em',
                }}
              >
                <Sparkles size={11} /> 5+ YEARS PRODUCTION ENGINEERING
              </span>
            </div>

            <h2
              style={{
                fontFamily: 'var(--font-anthropic-serif)',
                fontSize: 'clamp(28px, 4vw, 36px)',
                fontWeight: 'var(--font-weight-bold)',
                letterSpacing: 'var(--tracking-heading)',
                color: 'var(--color-slate-dark)',
                margin: '0 0 var(--spacing-8) 0',
              }}
            >
              Work Experience
            </h2>

            <p
              style={{
                fontFamily: 'var(--font-anthropic-serif)',
                fontSize: 'var(--text-body)',
                color: 'var(--color-slate-medium)',
                margin: '0 0 var(--spacing-16) 0',
                maxWidth: '600px',
                lineHeight: 1.5,
              }}
            >
              Production track record architecting high-throughput distributed microservices, zero-downtime identity migrations, and real-time backend pipelines across global streaming and gaming platforms.
            </p>

            <div style={{ display: 'flex', alignItems: 'center', gap: '16px', flexWrap: 'wrap' }}>
              <div
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  fontFamily: 'var(--font-anthropic-mono)',
                  fontSize: '12px',
                  color: 'var(--color-slate-dark)',
                }}
              >
                <span
                  style={{
                    width: '7px',
                    height: '7px',
                    borderRadius: '50%',
                    backgroundColor: 'var(--color-clay)',
                  }}
                />
                DAZN Systems Engineer
              </div>
              <div
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  fontFamily: 'var(--font-anthropic-mono)',
                  fontSize: '12px',
                  color: 'var(--color-slate-medium)',
                }}
              >
                <span>📍 Hyderabad, India</span>
              </div>
            </div>
          </div>

          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <NawazProfileCard />
          </div>
        </div>

        {/* Roles List */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-32)' }}>
          {filteredRoles.map((role) => (
            <article
              key={role.id}
              style={{
                backgroundColor: 'var(--color-ivory-light)',
                border: '1px solid var(--color-stone)',
                borderRadius: '20px',
                padding: 'clamp(28px, 4.5vw, 44px)',
                position: 'relative',
                transition: 'all 0.25s cubic-bezier(0.16, 1, 0.3, 1)',
                boxShadow: '0 1px 4px rgba(0, 0, 0, 0.03)',
              }}
              className="experience-card"
            >
              {/* Card Top Row: Company Badge, Role Title, and Metadata */}
              <div
                style={{
                  display: 'flex',
                  flexWrap: 'wrap',
                  alignItems: 'flex-start',
                  justifyContent: 'space-between',
                  gap: 'var(--spacing-20)',
                  paddingBottom: 'var(--spacing-24)',
                  borderBottom: '1px solid rgba(204, 203, 200, 0.7)',
                  marginBottom: 'var(--spacing-24)',
                }}
              >
                {/* Left: Monogram + Company & Role Title */}
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '20px' }}>
                  <div
                    style={{
                      width: '52px',
                      height: '52px',
                      borderRadius: '12px',
                      backgroundColor: 'var(--color-slate-dark)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0,
                      boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
                      overflow: 'hidden',
                      padding: role.company === 'DAZN' ? '0' : '10px 6px',
                    }}
                  >
                    {role.company === 'DAZN' ? (
                      <img
                        src="/dazn.svg"
                        alt="DAZN Logo"
                        style={{
                          width: '100%',
                          height: '100%',
                          objectFit: 'cover',
                          display: 'block',
                        }}
                      />
                    ) : (
                      <img
                        src="/Entain.png"
                        alt="Entain Logo"
                        style={{
                          width: '100%',
                          height: 'auto',
                          maxHeight: '100%',
                          objectFit: 'contain',
                          display: 'block',
                        }}
                      />
                    )}
                  </div>

                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flexWrap: 'wrap' }}>
                      <h3
                        style={{
                          fontFamily: 'var(--font-anthropic-serif)',
                          fontSize: '24px',
                          fontWeight: 'var(--font-weight-bold)',
                          color: 'var(--color-slate-dark)',
                          margin: 0,
                        }}
                      >
                        {role.role}
                      </h3>

                      <span
                        style={{
                          fontFamily: 'var(--font-anthropic-mono)',
                          fontSize: '14px',
                          fontWeight: 700,
                          color: 'var(--color-clay)',
                          letterSpacing: '0.04em',
                        }}
                      >
                        @{role.company}
                      </span>

                      {role.isCurrent && (
                        <span
                          style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '6px',
                            padding: '4px 10px',
                            borderRadius: '999px',
                            backgroundColor: 'rgba(40, 167, 69, 0.12)',
                            color: '#1e7e34',
                            fontFamily: 'var(--font-anthropic-mono)',
                            fontSize: '11px',
                            fontWeight: 700,
                            letterSpacing: '0.03em',
                          }}
                        >
                          <span
                            style={{
                              width: '7px',
                              height: '7px',
                              borderRadius: '50%',
                              backgroundColor: '#28a745',
                              animation: 'pulseStatusDot 2s infinite',
                            }}
                          />
                          ACTIVE ROLE
                        </span>
                      )}
                    </div>

                    <p
                      style={{
                        fontFamily: 'var(--font-anthropic-sans)',
                        fontSize: '14px',
                        color: 'var(--color-slate-medium)',
                        margin: '6px 0 0 0',
                      }}
                    >
                      {role.companySubtitle}
                    </p>
                  </div>
                </div>

                {/* Right: Period, Duration, Location */}
                <div
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'flex-start',
                    gap: '6px',
                    backgroundColor: 'var(--color-ivory-medium)',
                    padding: '10px 18px',
                    borderRadius: '10px',
                    border: '1px solid var(--color-stone)',
                  }}
                  className="role-metadata-badge"
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <Calendar size={14} color="var(--color-clay)" />
                    <span
                      style={{
                        fontFamily: 'var(--font-anthropic-mono)',
                        fontSize: '12.5px',
                        fontWeight: 600,
                        color: 'var(--color-slate-dark)',
                      }}
                    >
                      {role.period}
                    </span>
                    <span
                      style={{
                        fontSize: '11.5px',
                        color: 'var(--color-cloud-dark)',
                        fontFamily: 'var(--font-anthropic-sans)',
                      }}
                    >
                      ({role.duration})
                    </span>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <MapPin size={13} color="var(--color-cloud-dark)" />
                    <span
                      style={{
                        fontFamily: 'var(--font-anthropic-sans)',
                        fontSize: '12.5px',
                        color: 'var(--color-slate-medium)',
                      }}
                    >
                      {role.location} · {role.type}
                    </span>
                  </div>
                </div>
              </div>

              {/* Role Summary */}
              <p
                style={{
                  fontFamily: 'var(--font-anthropic-serif)',
                  fontSize: '16px',
                  lineHeight: 1.6,
                  color: 'var(--color-slate-dark)',
                  margin: '0 0 var(--spacing-24) 0',
                }}
              >
                {role.summary}
              </p>

              {/* Key Impact Metrics Grid */}
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(190px, 1fr))',
                  gap: '14px',
                  marginBottom: 'var(--spacing-28)',
                }}
              >
                {role.impactMetrics.map((metric, i) => (
                  <div
                    key={i}
                    style={{
                      padding: '14px 18px',
                      backgroundColor: 'var(--color-ivory-medium)',
                      border: '1px solid var(--color-stone)',
                      borderRadius: '10px',
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '4px',
                    }}
                  >
                    <span
                      style={{
                        fontFamily: 'var(--font-anthropic-mono)',
                        fontSize: '11px',
                        fontWeight: 600,
                        color: 'var(--color-cloud-dark)',
                        textTransform: 'uppercase',
                        letterSpacing: '0.04em',
                      }}
                    >
                      {metric.label}
                    </span>
                    <span
                      style={{
                        fontFamily: 'var(--font-anthropic-sans)',
                        fontSize: '15px',
                        fontWeight: 700,
                        color: 'var(--color-slate-dark)',
                      }}
                    >
                      {metric.value}
                    </span>
                  </div>
                ))}
              </div>

              {/* Architectural Highlights / Key Deliverables */}
              <div
                style={{
                  marginTop: 'var(--spacing-32)',
                  marginBottom: 'var(--spacing-32)',
                  paddingTop: 'var(--spacing-32)',
                  borderTop: '1px solid rgba(204, 203, 200, 0.7)',
                }}
              >
                <span
                  style={{
                    fontFamily: 'var(--font-anthropic-sans)',
                    fontSize: '12px',
                    fontWeight: 700,
                    letterSpacing: '0.08em',
                    textTransform: 'uppercase',
                    color: 'var(--color-cloud-dark)',
                    display: 'block',
                    marginBottom: '20px',
                  }}
                >
                  Key Architectural Deliverables & Impact
                </span>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
                  {role.milestones.map((milestone, idx) => (
                    <div
                      key={idx}
                      style={{
                        display: 'flex',
                        alignItems: 'flex-start',
                        gap: '16px',
                        padding: '20px 24px',
                        backgroundColor: 'var(--color-ivory-medium)',
                        border: '1px solid rgba(204, 203, 200, 0.75)',
                        borderRadius: '12px',
                        transition: 'all 0.2s cubic-bezier(0.16, 1, 0.3, 1)',
                      }}
                      className="milestone-item"
                    >
                      <div
                        style={{
                          width: '24px',
                          height: '24px',
                          borderRadius: '50%',
                          backgroundColor: 'rgba(217, 119, 87, 0.12)',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          color: 'var(--color-clay)',
                          flexShrink: 0,
                          marginTop: '2px',
                        }}
                      >
                        <CheckCircle2 size={15} strokeWidth={2.5} />
                      </div>

                      <div style={{ flex: 1 }}>
                        <div
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            flexWrap: 'wrap',
                            gap: '12px',
                            marginBottom: '8px',
                          }}
                        >
                          <h4
                            style={{
                              fontFamily: 'var(--font-anthropic-sans)',
                              fontSize: '15.5px',
                              fontWeight: 700,
                              color: 'var(--color-slate-dark)',
                              margin: 0,
                            }}
                          >
                            {milestone.title}
                          </h4>

                          <span
                            style={{
                              fontFamily: 'var(--font-anthropic-mono)',
                              fontSize: '11.5px',
                              fontWeight: 600,
                              color: 'var(--color-clay)',
                              backgroundColor: 'rgba(217, 119, 87, 0.08)',
                              padding: '4px 10px',
                              borderRadius: '6px',
                            }}
                          >
                            {milestone.metric}
                          </span>
                        </div>

                        <p
                          style={{
                            fontFamily: 'var(--font-anthropic-serif)',
                            fontSize: '14.5px',
                            lineHeight: 1.6,
                            color: 'var(--color-slate-medium)',
                            margin: 0,
                          }}
                        >
                          {milestone.description}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Technologies Applied */}
              <div
                style={{
                  marginTop: 'var(--spacing-28)',
                  paddingTop: 'var(--spacing-24)',
                  borderTop: '1px solid rgba(204, 203, 200, 0.6)',
                  paddingBottom: 'var(--spacing-8)',
                }}
              >
                <span
                  style={{
                    fontFamily: 'var(--font-anthropic-sans)',
                    fontSize: '12px',
                    fontWeight: 700,
                    letterSpacing: '0.07em',
                    textTransform: 'uppercase',
                    color: 'var(--color-cloud-dark)',
                    display: 'block',
                    marginBottom: '14px',
                  }}
                >
                  Core Technologies & Tooling
                </span>

                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                  {role.technologies.map((tech) => (
                    <span
                      key={tech}
                      style={{
                        fontFamily: 'var(--font-anthropic-mono)',
                        fontSize: '12px',
                        fontWeight: 500,
                        padding: '6px 12px',
                        borderRadius: '6px',
                        backgroundColor: 'var(--color-ivory-medium)',
                        border: '1px solid var(--color-stone)',
                        color: 'var(--color-slate-dark)',
                        letterSpacing: '-0.01em',
                      }}
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>

      <style>{`
        .experience-card:hover {
          border-color: var(--color-clay) !important;
          box-shadow: 0 8px 24px rgba(0, 0, 0, 0.06) !important;
        }

        .milestone-item:hover {
          border-color: var(--color-slate-dark) !important;
        }

        @keyframes pulseStatusDot {
          0% {
            transform: scale(0.95);
            box-shadow: 0 0 0 0 rgba(40, 167, 69, 0.7);
          }
          70% {
            transform: scale(1.1);
            box-shadow: 0 0 0 5px rgba(40, 167, 69, 0);
          }
          100% {
            transform: scale(0.95);
            box-shadow: 0 0 0 0 rgba(40, 167, 69, 0);
          }
        }

        @media (max-width: 640px) {
          .role-metadata-badge {
            width: 100%;
          }
        }
      `}</style>
    </section>
  );
};
