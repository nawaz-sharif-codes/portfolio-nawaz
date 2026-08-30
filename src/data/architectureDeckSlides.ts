export interface DeckSlide {
  id: string;
  slideNumber: string;
  category: string;
  title: string;
  subtitle: string;
  keyMetrics: { label: string; value: string }[];
  diagramType: 'pipeline' | 'event-stream' | 'rules-engine' | 'multi-agent' | 'distributed-mesh';
  highlights: string[];
  takeaway: string;
}

export const ARCHITECTURE_DECK_SLIDES: DeckSlide[] = [
  {
    id: 'foxtel-dazn-iam',
    slideNumber: '01',
    category: 'Identity & Access Management',
    title: 'Foxtel → DAZN: 1.4M User Identity Migration',
    subtitle: 'Zero-downtime cutover architecture with dual-write directory synchronization.',
    keyMetrics: [
      { label: 'Managed Identities', value: '1.4M Users' },
      { label: 'Cutover Downtime', value: '0 Seconds' },
      { label: 'Protocol', value: 'OAuth2 / OIDC' },
    ],
    diagramType: 'pipeline',
    highlights: [
      'Checkpoint-persisted extraction surviving connection timeouts',
      'Dual-hop OAuth2 federation with Google sign-in bridge',
      'Event-driven sync hooks maintaining live directory parity',
      'Deterministic parallel audits verifying zero data loss',
    ],
    takeaway: 'Decoupled batch extraction and live event streaming enables zero-downtime cutovers across heterogeneous directory stores.',
  },
  {
    id: 'billing-event-processor',
    slideNumber: '02',
    category: 'Distributed Stream Processing',
    title: 'High-Throughput Billing Sync Pipeline',
    subtitle: 'Kafka-driven serverless event pipeline handling B2B subscription state machines.',
    keyMetrics: [
      { label: 'Event Throughput', value: '1M req/sec' },
      { label: 'Transport Broker', value: 'Kafka (MSK)' },
      { label: 'Serialization', value: 'Protobuf v3' },
    ],
    diagramType: 'event-stream',
    highlights: [
      'MSK-triggered Lambda workers with binary Protobuf parsing',
      'Idempotent status routing preventing duplicate ledger writes',
      'Dead-letter queue isolation with automated alert telemetry',
      'Sub-second sync latency across sales and support records',
    ],
    takeaway: 'Schema-governed binary serialization combined with partitioned streams ensures guaranteed ordering under peak traffic spikes.',
  },
  {
    id: 'retention-offers',
    slideNumber: '03',
    category: 'Microservices & Rules Engine',
    title: 'B2B Retention Offers Evaluation Engine',
    subtitle: 'Data-driven promotion matching service for soft-cancellation customer flows.',
    keyMetrics: [
      { label: 'Framework', value: 'NestJS' },
      { label: 'Rule Store', value: 'DynamoDB' },
      { label: 'Infrastructure', value: 'Terraform' },
    ],
    diagramType: 'rules-engine',
    highlights: [
      'Decoupled dynamic rule evaluation built in NestJS',
      'Low-latency DynamoDB composite partition query patterns',
      'Declarative Terraform infrastructure across staging and prod',
      'Real-time metrics integrated into CloudWatch and Coralogix',
    ],
    takeaway: 'Configurable data-driven rules eliminate code redeployments for time-sensitive commercial retention campaigns.',
  },
  {
    id: 'beat-the-ats',
    slideNumber: '04',
    category: 'LLM Orchestration & Full-Stack',
    title: 'Beat the ATS: Multi-Agent Pipeline',
    subtitle: 'Streaming DAG orchestration with tiered multi-provider LLM routing.',
    keyMetrics: [
      { label: 'Streaming Protocol', value: 'SSE (HTTP)' },
      { label: 'Agent Pipeline', value: '5-Stage DAG' },
      { label: 'Billing Engine', value: 'Stripe Metered' },
    ],
    diagramType: 'multi-agent',
    highlights: [
      '5-stage DAG orchestrating parsing, matching, and rewrites',
      'Server-Sent Events streaming token output in real time',
      'Tiered LLM routing dynamically balancing quality and unit cost',
      'Deterministic document extraction without LLM hallucinations',
    ],
    takeaway: 'Decomposed specialized agents with token streaming deliver high-quality outputs with sub-second perceived latency.',
  },
  {
    id: 'distributed-mesh',
    slideNumber: '05',
    category: 'System Reliability & Observability',
    title: 'Production Resilience & Observability Patterns',
    subtitle: 'Fault-tolerant patterns, rate limiting, and end-to-end tracing at global scale.',
    keyMetrics: [
      { label: 'Availability Target', value: '99.99%' },
      { label: 'Tracing Standard', value: 'OpenTelemetry' },
      { label: 'Cache Hit Ratio', value: '> 98.5%' },
    ],
    diagramType: 'distributed-mesh',
    highlights: [
      'Multi-region cache warming with fast token invalidation',
      'Circuit breaking and adaptive backoff on external APIs',
      'Structured correlation ID tracing across all microservices',
      'Real-time anomaly alerts with Coralogix integration',
    ],
    takeaway: 'Observability must be engineered into service boundaries as a core primitive rather than retrofitted as an afterthought.',
  },
];
