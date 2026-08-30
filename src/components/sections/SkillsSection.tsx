import React, { useState } from 'react';
import {
  Server,
  Database,
  Cloud,
  Activity,
  Layers,
  Cpu,
  ShieldCheck,
  Zap,
  Terminal,
  FileCode,
  HardDrive,
  RefreshCw,
  Box,
  GitBranch,
  Search,
  CheckCircle2,
  Sliders,
  Sparkles,
} from 'lucide-react';

export interface SkillItem {
  name: string;
  category: string;
  tagline: string;
  productionContext: string;
  platforms: string[];
  keyStrengths: string[];
  icon: React.ReactNode;
}

export interface SkillDomain {
  id: string;
  title: string;
  eyebrow: string;
  description: string;
  badgeCount: string;
  domainIcon: React.ReactNode;
  metrics: { label: string; value: string }[];
  skills: SkillItem[];
}

export const SkillsSection: React.FC = () => {
  const [activeDomainFilter, setActiveDomainFilter] = useState<string>('backend');
  const [selectedSkill, setSelectedSkill] = useState<SkillItem | null>(null);

  const domains: SkillDomain[] = [
    {
      id: 'backend',
      eyebrow: 'DOMAIN 01',
      title: 'High-Throughput Backend & Concurrency',
      description:
        'Asynchronous I/O, event-driven microservices, and distributed lock choreography engineered for high-concurrency environments.',
      badgeCount: '5 Core Engines',
      domainIcon: <Server size={18} color="var(--color-clay)" strokeWidth={2} />,
      metrics: [
        { label: 'Throughput Target', value: '100K+ req/s' },
        { label: 'P99 Latency', value: '<50ms' },
      ],
      skills: [
        {
          name: 'Node.js',
          category: 'Backend',
          tagline: 'Event-driven async runtime',
          productionContext:
            'Engineered low-latency microservices for DAZN sports streaming and auth token validation pipelines.',
          platforms: ['DAZN', 'Auth Edge'],
          keyStrengths: ['Event Loop Optimization', 'Non-blocking I/O', 'Cluster Mode'],
          icon: <Cpu size={16} />,
        },
        {
          name: 'NestJS',
          category: 'Backend',
          tagline: 'Modular TypeScript architecture',
          productionContext:
            'Structured dependency injection microservices with strict schema validation, interceptors, and guard pipelines.',
          platforms: ['DAZN Microservices'],
          keyStrengths: ['Dependency Injection', 'Clean Architecture', 'Microservice Transports'],
          icon: <Box size={16} />,
        },
        {
          name: 'Express',
          category: 'Backend',
          tagline: 'Minimalist HTTP middleware',
          productionContext:
            'Fast, lightweight edge gateways, route controllers, and reverse proxy handlers.',
          platforms: ['Core Services'],
          keyStrengths: ['Middleware Chains', 'RESTful Endpoints', 'Sub-millisecond Routing'],
          icon: <Terminal size={16} />,
        },
        {
          name: 'C#',
          category: 'Backend',
          tagline: 'Type-safe enterprise systems',
          productionContext:
            'High-performance real-time engine components for PartyPoker at ENTAIN, ensuring deterministic game logic.',
          platforms: ['ENTAIN', 'PartyPoker'],
          keyStrengths: ['Memory Management', 'Multithreading', 'Type Safety'],
          icon: <FileCode size={16} />,
        },
        {
          name: '.NET Core',
          category: 'Backend',
          tagline: 'High-speed cross-platform framework',
          productionContext:
            'Asynchronous socket handlers, event queues, and scalable game session orchestration.',
          platforms: ['ENTAIN Gaming'],
          keyStrengths: ['Kestrel Web Server', 'Async/Await Pipelines', 'High Concurrency'],
          icon: <Zap size={16} />,
        },
      ],
    },
    {
      id: 'databases',
      eyebrow: 'DOMAIN 02',
      title: 'Distributed Data Stores & In-Memory Cache',
      description:
        'ACID compliance, WAL replication, and sub-5ms low-latency cache layers for rapid session resolution and user profile access.',
      badgeCount: '3 Distributed Stores',
      domainIcon: <Database size={18} color="var(--color-clay)" strokeWidth={2} />,
      metrics: [
        { label: 'Cache Lookup', value: '<5ms P99' },
        { label: 'Consistency', value: 'WAL / Dual-Write' },
      ],
      skills: [
        {
          name: 'PostgreSQL',
          category: 'Databases',
          tagline: 'Relational & JSON store',
          productionContext:
            'Complex multi-tenant schema models, transactional cutovers, composite indexes, and user metadata persistence.',
          platforms: ['IAM Migration', 'DAZN'],
          keyStrengths: ['ACID Transactions', 'Query Plan Optimization', 'Indexing Strategies'],
          icon: <Database size={16} />,
        },
        {
          name: 'Redis',
          category: 'Databases',
          tagline: 'In-memory distributed data cache',
          productionContext:
            'Distributed session caching, token revocation lists, distributed locks, and rate limiting under peak live match loads.',
          platforms: ['DAZN Streaming', 'Auth Edge'],
          keyStrengths: ['Sub-5ms Latency', 'Pub/Sub & Streams', 'Atomic Operations'],
          icon: <Zap size={16} />,
        },
        {
          name: 'MongoDB',
          category: 'Databases',
          tagline: 'Document-oriented database',
          productionContext:
            'Flexible event telemetry persistence, semi-structured session storage, and analytical aggregation pipelines.',
          platforms: ['ENTAIN', 'Analytics'],
          keyStrengths: ['Flexible Schema', 'Aggregation Framework', 'Replica Sets'],
          icon: <HardDrive size={16} />,
        },
      ],
    },
    {
      id: 'devops',
      eyebrow: 'DOMAIN 03',
      title: 'Cloud Infrastructure, IaC & Edge Routing',
      description:
        'Declarative multi-region cloud topology, containerized pipelines, and automated zero-downtime deployment pipelines.',
      badgeCount: '4 Cloud & System Engines',
      domainIcon: <Cloud size={18} color="var(--color-clay)" strokeWidth={2} />,
      metrics: [
        { label: 'Availability', value: '99.99% SLA' },
        { label: 'Deployment', value: 'Zero-Downtime' },
      ],
      skills: [
        {
          name: 'AWS',
          category: 'Cloud & Systems',
          tagline: 'ECS, Lambda, API Gateway, SQS',
          productionContext:
            'Multi-region distributed microservices, serverless event handlers, and API Gateway route protection policies.',
          platforms: ['DAZN Cloud', 'AWS IAM'],
          keyStrengths: ['Multi-AZ Resilience', 'Auto-scaling', 'IAM Security Policies'],
          icon: <Cloud size={16} />,
        },
        {
          name: 'Terraform',
          category: 'Cloud & Systems',
          tagline: 'Declarative Infrastructure as Code',
          productionContext:
            'Automated reproducible VPCs, ECS clusters, and security policies managed through version-controlled GitOps.',
          platforms: ['IaC Pipelines'],
          keyStrengths: ['State Management', 'Modular HCL', 'Immutable Infrastructure'],
          icon: <Layers size={16} />,
        },
        {
          name: 'Docker',
          category: 'Cloud & Systems',
          tagline: 'Container virtualization',
          productionContext:
            'Standardized multi-stage container builds with minimal image footprint and rapid autoscaling cold starts.',
          platforms: ['Microservices'],
          keyStrengths: ['Multi-stage Builds', 'Container Isolation', 'OCI Compliant'],
          icon: <Box size={16} />,
        },
        {
          name: 'CI/CD',
          category: 'Cloud & Systems',
          tagline: 'Automated pipeline orchestration',
          productionContext:
            'GitHub Actions & release pipelines with automated linting, security scanning, unit/e2e testing, and progressive rollouts.',
          platforms: ['Release Delivery'],
          keyStrengths: ['Automated Testing', 'GitOps Workflows', 'Blue/Green Rollouts'],
          icon: <GitBranch size={16} />,
        },
      ],
    },
    {
      id: 'observability',
      eyebrow: 'DOMAIN 04',
      title: 'Monitoring, Telemetry & Distributed Tracing',
      description:
        'Real-time distributed tracing, aggregated log intelligence, and predictive anomaly alarms across global streaming clusters.',
      badgeCount: '3 Telemetry Suites',
      domainIcon: <Activity size={18} color="var(--color-clay)" strokeWidth={2} />,
      metrics: [
        { label: 'Trace Ingestion', value: 'Real-Time' },
        { label: 'SLO Tracking', value: 'Error Budget' },
      ],
      skills: [
        {
          name: 'CloudWatch',
          category: 'Observability',
          tagline: 'AWS metrics & log aggregation',
          productionContext:
            'Synthetic alarms, dynamic auto-scaling triggers, and centralized infrastructure logging.',
          platforms: ['AWS Monitoring'],
          keyStrengths: ['Metric Filters', 'Composite Alarms', 'Log Insights'],
          icon: <Activity size={16} />,
        },
        {
          name: 'Coralogix',
          category: 'Observability',
          tagline: 'Real-time log analytics & ML alarms',
          productionContext:
            'Log parsing, structured JSON querying, and live anomaly detection across millions of global user events.',
          platforms: ['DAZN Telemetry'],
          keyStrengths: ['Log Ingestion Pipelines', 'Live Tail & Querying', 'SLO Dashboards'],
          icon: <Search size={16} />,
        },
        {
          name: 'New Relic',
          category: 'Observability',
          tagline: 'APM & distributed service maps',
          productionContext:
            'End-to-end request transaction tracing, database query bottleneck detection, and microservice dependency mapping.',
          platforms: ['APM & Tracing'],
          keyStrengths: ['Distributed Tracing', 'APM Profiling', 'Database Breakdown'],
          icon: <Activity size={16} />,
        },
      ],
    },
    {
      id: 'frontend',
      eyebrow: 'DOMAIN 05',
      title: 'Frontend Systems & Interactive Performance',
      description:
        'Type-safe component architectures, reactive state engines, and editorial design systems rendered at 60fps.',
      badgeCount: '6 UI Technologies',
      domainIcon: <Sliders size={18} color="var(--color-clay)" strokeWidth={2} />,
      metrics: [
        { label: 'Lighthouse Score', value: '95+' },
        { label: 'Type Safety', value: 'Strict TypeScript' },
      ],
      skills: [
        {
          name: 'TypeScript',
          category: 'Frontend',
          tagline: 'Strict typed JavaScript',
          productionContext:
            'End-to-end type contracts between backend REST/GraphQL APIs and reactive client interfaces.',
          platforms: ['Full-Stack'],
          keyStrengths: ['Strict Typing', 'Generic Interfaces', 'Compiler Guardrails'],
          icon: <FileCode size={16} />,
        },
        {
          name: 'React',
          category: 'Frontend',
          tagline: 'Component-driven UI library',
          productionContext:
            'High-performance interactive interfaces, custom hooks, and declarative state orchestration.',
          platforms: ['Web Clients'],
          keyStrengths: ['Virtual DOM', 'Custom Hooks', 'Component Composition'],
          icon: <Zap size={16} />,
        },
        {
          name: 'Redux',
          category: 'Frontend',
          tagline: 'Deterministic state management',
          productionContext:
            'Normalized state cache stores, middleware interceptors, and predictable state flow for complex stateful games.',
          platforms: ['PartyPoker Web'],
          keyStrengths: ['Redux Toolkit', 'Immer State', 'Predictable Mutation'],
          icon: <RefreshCw size={16} />,
        },
        {
          name: 'HTML',
          category: 'Frontend',
          tagline: 'Semantic markup & WCAG AA',
          productionContext:
            'Accessible DOM trees, screen reader optimizations, and SEO-friendly document structures.',
          platforms: ['Web Platform'],
          keyStrengths: ['Semantic Tags', 'ARIA Patterns', 'SEO Optimization'],
          icon: <ShieldCheck size={16} />,
        },
        {
          name: 'CSS',
          category: 'Frontend',
          tagline: 'Design systems & fluid responsive layout',
          productionContext:
            'Design token variables, CSS Grid/Flexbox layouts, glassmorphic surfaces, and hardware-accelerated animations.',
          platforms: ['Design System'],
          keyStrengths: ['CSS Variables', 'Container Queries', 'Subtle Micro-motion'],
          icon: <Layers size={16} />,
        },
        {
          name: 'JavaScript',
          category: 'Frontend',
          tagline: 'Modern ECMAScript (ES2022+)',
          productionContext:
            'Asynchronous event loops, DOM performance optimization, and browser lifecycle event handlers.',
          platforms: ['Core Web'],
          keyStrengths: ['Modern ESNext', 'Async Iteration', 'Browser APIs'],
          icon: <FileCode size={16} />,
        },
      ],
    },
  ];

  // Active domain and fallback active skill
  const activeDomain = domains.find((d) => d.id === activeDomainFilter) || domains[0];
  const activeSkill = selectedSkill || activeDomain.skills[0];

  // Filter domains based on active tab
  const filteredDomains = domains.filter((d) => d.id === activeDomainFilter);

  const filterTabs = [
    { id: 'backend', label: 'Backend & Concurrency' },
    { id: 'databases', label: 'Databases & Cache' },
    { id: 'devops', label: 'Cloud & IaC' },
    { id: 'observability', label: 'Observability' },
    { id: 'frontend', label: 'Frontend' },
  ];

  const handleTabClick = (tabId: string) => {
    setActiveDomainFilter(tabId);
    const targetDomain = domains.find((d) => d.id === tabId);
    if (targetDomain && targetDomain.skills.length > 0) {
      setSelectedSkill(targetDomain.skills[0]);
    }
  };

  return (
    <section
      id="skills"
      aria-label="Technical Provenance & Core Stack"
      style={{
        scrollMarginTop: '76px',
        paddingTop: 'clamp(48px, 6vw, 76px)',
        paddingBottom: 'clamp(48px, 8vw, 96px)',
        backgroundColor: 'var(--color-ivory-medium)',
        borderBottom: '1px solid var(--color-stone)',
      }}
    >
      <div className="site-container">
        {/* Section Header */}
        <div style={{ marginBottom: 'var(--spacing-32)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: 'var(--spacing-8)' }}>
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
              System Index & Capabilities
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
              <Sparkles size={11} /> 21 PRODUCTION TECHNOLOGIES
            </span>
          </div>

          <h2
            style={{
              fontFamily: 'var(--font-anthropic-serif)',
              fontSize: '28px',
              fontWeight: 'var(--font-weight-bold)',
              letterSpacing: 'var(--tracking-heading)',
              color: 'var(--color-slate-dark)',
              margin: '0 0 var(--spacing-8) 0',
            }}
          >
            Technical Provenance & Core Stack
          </h2>

          <p
            style={{
              fontFamily: 'var(--font-anthropic-serif)',
              fontSize: 'var(--text-body)',
              color: 'var(--color-slate-medium)',
              margin: 0,
              maxWidth: '720px',
              lineHeight: 1.45,
            }}
          >
            Production-tested technologies deployed across high-concurrency streaming microservices, distributed IAM cutovers, and low-latency cloud infrastructure.
          </p>
        </div>

        {/* Domain Filter Pills (without 'All Capabilities') */}
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '8px',
            marginBottom: 'var(--spacing-32)',
          }}
        >
          {filterTabs.map((tab) => {
            const isActive = activeDomainFilter === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => handleTabClick(tab.id)}
                style={{
                  fontFamily: 'var(--font-anthropic-sans)',
                  fontSize: '13px',
                  fontWeight: isActive ? 600 : 500,
                  letterSpacing: '-0.01em',
                  padding: '7px 16px',
                  borderRadius: '999px',
                  border: isActive
                    ? '1px solid var(--color-slate-dark)'
                    : '1px solid var(--color-stone)',
                  backgroundColor: isActive ? 'var(--color-slate-dark)' : 'var(--color-ivory-light)',
                  color: isActive ? '#faf9f5' : 'var(--color-slate-dark)',
                  cursor: 'pointer',
                  transition: 'all 0.2s cubic-bezier(0.16, 1, 0.3, 1)',
                  boxShadow: isActive ? '0 2px 8px rgba(0, 0, 0, 0.12)' : 'none',
                }}
                className="filter-pill-btn"
              >
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* Main Grid: Interactive Domain Bento + Live Production Inspector */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr',
            gap: 'var(--spacing-24)',
          }}
          className="skills-bento-layout"
        >
          {/* Left Column: Architectural Domain Cards */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-24)' }}>
            {filteredDomains.map((domain) => (
              <div
                key={domain.id}
                style={{
                  backgroundColor: 'var(--color-ivory-light)',
                  border: '1px solid var(--color-stone)',
                  borderRadius: '16px',
                  padding: 'clamp(20px, 3vw, 28px)',
                  transition: 'border-color 0.2s ease, box-shadow 0.2s ease',
                  position: 'relative',
                }}
                className="domain-card-wrap"
              >
                {/* Domain Header Strip */}
                <div
                  style={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    justifyContent: 'space-between',
                    alignItems: 'baseline',
                    gap: '12px',
                    paddingBottom: '16px',
                    borderBottom: '1px solid rgba(0, 0, 0, 0.07)',
                    marginBottom: '18px',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <div
                      style={{
                        width: '32px',
                        height: '32px',
                        borderRadius: '8px',
                        backgroundColor: 'rgba(217, 119, 87, 0.1)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                    >
                      {domain.domainIcon}
                    </div>
                    <div>
                      <span
                        style={{
                          fontFamily: 'var(--font-anthropic-mono)',
                          fontSize: '11px',
                          fontWeight: 600,
                          color: 'var(--color-clay)',
                          letterSpacing: '0.08em',
                          display: 'block',
                        }}
                      >
                        {domain.eyebrow}
                      </span>
                      <h3
                        style={{
                          fontFamily: 'var(--font-anthropic-serif)',
                          fontSize: '18px',
                          fontWeight: 'var(--font-weight-bold)',
                          color: 'var(--color-slate-dark)',
                          margin: 0,
                        }}
                      >
                        {domain.title}
                      </h3>
                    </div>
                  </div>

                  <span
                    style={{
                      fontFamily: 'var(--font-anthropic-mono)',
                      fontSize: '12px',
                      color: 'var(--color-cloud-dark)',
                      backgroundColor: 'rgba(0, 0, 0, 0.04)',
                      padding: '3px 9px',
                      borderRadius: '6px',
                    }}
                  >
                    {domain.badgeCount}
                  </span>
                </div>

                {/* Domain Description */}
                <p
                  style={{
                    fontFamily: 'var(--font-anthropic-serif)',
                    fontSize: '14px',
                    color: 'var(--color-slate-medium)',
                    lineHeight: 1.45,
                    margin: '0 0 16px 0',
                  }}
                >
                  {domain.description}
                </p>

                {/* Interactive Skill Badges Grid */}
                <div
                  style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))',
                    gap: '10px',
                  }}
                >
                  {domain.skills.map((skill) => {
                    const isSelected = activeSkill.name === skill.name;
                    return (
                      <div
                        key={skill.name}
                        onClick={() => setSelectedSkill(skill)}
                        onMouseEnter={() => setSelectedSkill(skill)}
                        tabIndex={0}
                        role="button"
                        aria-pressed={isSelected}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter' || e.key === ' ') {
                            e.preventDefault();
                            setSelectedSkill(skill);
                          }
                        }}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '10px',
                          padding: '10px 12px',
                          borderRadius: '10px',
                          border: isSelected
                            ? '1px solid var(--color-clay)'
                            : '1px solid rgba(0, 0, 0, 0.08)',
                          backgroundColor: isSelected
                            ? 'rgba(217, 119, 87, 0.08)'
                            : 'var(--color-oat-warm)',
                          cursor: 'pointer',
                          transition: 'all 0.18s cubic-bezier(0.16, 1, 0.3, 1)',
                          boxShadow: isSelected
                            ? '0 4px 12px rgba(217, 119, 87, 0.15)'
                            : 'none',
                          outline: 'none',
                        }}
                        className="skill-tile-card"
                      >
                        <div
                          style={{
                            width: '28px',
                            height: '28px',
                            borderRadius: '6px',
                            backgroundColor: isSelected
                              ? 'var(--color-clay)'
                              : 'var(--color-ivory-light)',
                            color: isSelected ? '#faf9f5' : 'var(--color-slate-dark)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            flexShrink: 0,
                            transition: 'all 0.18s ease',
                          }}
                        >
                          {skill.icon}
                        </div>

                        <div style={{ overflow: 'hidden' }}>
                          <div
                            style={{
                              fontFamily: 'var(--font-anthropic-sans)',
                              fontSize: '14px',
                              fontWeight: 600,
                              color: isSelected
                                ? 'var(--color-clay-deep)'
                                : 'var(--color-slate-dark)',
                              letterSpacing: '-0.01em',
                              whiteSpace: 'nowrap',
                              textOverflow: 'ellipsis',
                              overflow: 'hidden',
                            }}
                          >
                            {skill.name}
                          </div>
                          <div
                            style={{
                              fontFamily: 'var(--font-anthropic-mono)',
                              fontSize: '11px',
                              color: 'var(--color-cloud-dark)',
                              whiteSpace: 'nowrap',
                              textOverflow: 'ellipsis',
                              overflow: 'hidden',
                            }}
                          >
                            {skill.platforms[0]}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>

          {/* Right Column: Live Production Inspector Panel (Sticky on Desktop) */}
          <div className="inspector-column">
            <div
              style={{
                position: 'sticky',
                top: '96px',
                backgroundColor: 'var(--color-slate-dark)',
                color: '#faf9f5',
                borderRadius: '16px',
                padding: 'clamp(24px, 3.5vw, 32px)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                boxShadow: '0 16px 36px rgba(0, 0, 0, 0.25)',
              }}
              className="inspector-card"
            >
              {/* Header Label */}
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  paddingBottom: '14px',
                  borderBottom: '1px solid rgba(255, 255, 255, 0.12)',
                  marginBottom: '20px',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span
                    style={{
                      width: '8px',
                      height: '8px',
                      borderRadius: '50%',
                      backgroundColor: 'var(--color-clay)',
                      boxShadow: '0 0 8px var(--color-clay)',
                      display: 'inline-block',
                    }}
                  />
                  <span
                    style={{
                      fontFamily: 'var(--font-anthropic-mono)',
                      fontSize: '11px',
                      fontWeight: 600,
                      letterSpacing: '0.08em',
                      textTransform: 'uppercase',
                      color: 'var(--color-cloud-medium)',
                    }}
                  >
                    LIVE ARCHITECTURAL LENS
                  </span>
                </div>

                <span
                  style={{
                    fontFamily: 'var(--font-anthropic-mono)',
                    fontSize: '11px',
                    color: 'var(--color-clay)',
                    backgroundColor: 'rgba(217, 119, 87, 0.18)',
                    padding: '2px 8px',
                    borderRadius: '4px',
                  }}
                >
                  {activeSkill.category}
                </span>
              </div>

              {/* Active Skill Title & Tagline */}
              <div style={{ marginBottom: '18px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '4px' }}>
                  <h3
                    style={{
                      fontFamily: 'var(--font-anthropic-serif)',
                      fontSize: '26px',
                      fontWeight: 'var(--font-weight-bold)',
                      color: '#faf9f5',
                      margin: 0,
                    }}
                  >
                    {activeSkill.name}
                  </h3>
                </div>
                <span
                  style={{
                    fontFamily: 'var(--font-anthropic-sans)',
                    fontSize: '13px',
                    color: 'var(--color-clay)',
                    fontWeight: 500,
                  }}
                >
                  {activeSkill.tagline}
                </span>
              </div>

              {/* Real-World Production Context Box */}
              <div
                style={{
                  backgroundColor: 'rgba(255, 255, 255, 0.04)',
                  border: '1px solid rgba(255, 255, 255, 0.08)',
                  borderRadius: '10px',
                  padding: '16px',
                  marginBottom: '20px',
                }}
              >
                <span
                  style={{
                    fontFamily: 'var(--font-anthropic-mono)',
                    fontSize: '11px',
                    fontWeight: 600,
                    color: 'var(--color-cloud-medium)',
                    letterSpacing: '0.06em',
                    textTransform: 'uppercase',
                    display: 'block',
                    marginBottom: '8px',
                  }}
                >
                  Production Implementation Context
                </span>
                <p
                  style={{
                    fontFamily: 'var(--font-anthropic-serif)',
                    fontSize: '14px',
                    color: '#e0ded6',
                    lineHeight: 1.5,
                    margin: 0,
                  }}
                >
                  {activeSkill.productionContext}
                </p>
              </div>

              {/* Key Architectural Strengths */}
              <div style={{ marginBottom: '20px' }}>
                <span
                  style={{
                    fontFamily: 'var(--font-anthropic-mono)',
                    fontSize: '11px',
                    fontWeight: 600,
                    color: 'var(--color-cloud-medium)',
                    letterSpacing: '0.06em',
                    textTransform: 'uppercase',
                    display: 'block',
                    marginBottom: '10px',
                  }}
                >
                  Core Architectural Capabilities
                </span>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  {activeSkill.keyStrengths.map((strength) => (
                    <div
                      key={strength}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px',
                        fontSize: '13px',
                        fontFamily: 'var(--font-anthropic-sans)',
                        color: '#d0cec6',
                      }}
                    >
                      <CheckCircle2 size={14} color="var(--color-clay)" />
                      <span>{strength}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Production Systems Tagged */}
              <div>
                <span
                  style={{
                    fontFamily: 'var(--font-anthropic-mono)',
                    fontSize: '11px',
                    fontWeight: 600,
                    color: 'var(--color-cloud-medium)',
                    letterSpacing: '0.06em',
                    textTransform: 'uppercase',
                    display: 'block',
                    marginBottom: '8px',
                  }}
                >
                  Associated Production Platforms
                </span>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                  {activeSkill.platforms.map((platform) => (
                    <span
                      key={platform}
                      style={{
                        fontFamily: 'var(--font-anthropic-mono)',
                        fontSize: '12px',
                        backgroundColor: 'rgba(255, 255, 255, 0.08)',
                        color: '#faf9f5',
                        padding: '4px 10px',
                        borderRadius: '6px',
                        border: '1px solid rgba(255, 255, 255, 0.08)',
                      }}
                    >
                      {platform}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .filter-pill-btn:hover {
          border-color: var(--color-slate-dark) !important;
        }
        .skill-tile-card:hover {
          border-color: var(--color-clay) !important;
          transform: translateY(-2px);
          box-shadow: 0 4px 14px rgba(0, 0, 0, 0.06) !important;
        }
        @media (min-width: 1024px) {
          .skills-bento-layout {
            grid-template-columns: 1.4fr 1fr !important;
            align-items: start;
          }
        }
      `}</style>
    </section>
  );
};
