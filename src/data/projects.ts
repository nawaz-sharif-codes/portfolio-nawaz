export interface CaseStudy {
  slug: string;
  title: string;
  subtitle: string;
  context: string;
  approach: string[];
  stack: string[];
}

export const CASE_STUDIES: Record<string, CaseStudy> = {
  'identity-migration': {
    slug: 'identity-migration',
    title: 'Foxtel → DAZN',
    subtitle: 'Scaling and securing identity for 1.4M users on the fly.',
    context:
      "Following DAZN's acquisition of Foxtel, the two companies run separate identity platforms. This project maps Foxtel's existing IAM setup end to end and plans the migration path onto DAZN's own identity systems, starting with OAuth2 client flows and social login federation.",
    approach: [
      'Mapped every OAuth2/OIDC client flow in the existing IAM platform, including a two-hop social login federation path for Google sign-in',
      'Built a resumable, checkpointed extraction pipeline in TypeScript to pull the full ~1.4M-user managed identity dataset using cookie-based pagination with token refresh so the extraction can survive interruptions without starting over',
      "Added event-driven sync hooks into the identity platform's update events, forwarding changes to the new environment in real time so both systems stay consistent during the transition window",
      'Designed the migration to run without service downtime for end users',
    ],
    stack: [
      'OAuth2/OIDC',
      'LDAP/Directory Server',
      'OpenIDM',
      'TypeScript',
      'event-driven sync hooks',
    ],
  },
  'billing-event-processor': {
    slug: 'billing-event-processor',
    title: 'Real-Time Billing Sync',
    subtitle: 'A serverless pipeline handling B2B billing at scale.',
    context:
      "DAZN's B2B billing platform emits subscription lifecycle events (purchases, renewals, cancellations, suspensions) that need to reach support and sales systems in real time to keep customer records accurate.",
    approach: [
      'Built an AWS Lambda (Node.js) service triggered directly off a Kafka event stream via MSK event source mapping',
      'Deserializes protobuf-encoded event messages, filters to relevant B2B subscription events, and routes each one by type and status to the correct downstream action',
      'Synchronizes both a support ticketing system and an internal sales system, keeping customer and case records consistent as subscriptions move through their lifecycle',
      'Runs inside a private VPC with a dead-letter queue for failed events and centralized logging for observability',
      'Currently migrating the service from JavaScript to a fully-typed TypeScript codebase with a production-grade layered folder structure',
    ],
    stack: [
      'AWS Lambda',
      'Kafka (MSK)',
      'Node.js/TypeScript',
      'DynamoDB',
      'SQS',
      'CloudWatch/Coralogix',
    ],
  },
  'retention-offers': {
    slug: 'retention-offers',
    title: 'Retention Offer Engine',
    subtitle: 'Matching at-risk B2B customers to the right offer, automatically.',
    context:
      'When B2B customers soft-cancel their subscription, the business wants to present the right retention offer automatically, rather than relying on manual review of every cancellation.',
    approach: [
      'Built a NestJS microservice that evaluates soft-cancelled customers against a set of configurable, DynamoDB-backed segmentation rules',
      'Segments are data-driven, not hardcoded; new offer rules can be added without a code deployment',
      "Provisioned the service's cloud infrastructure with Terraform, supporting a dedicated staging environment for safe rollout testing",
    ],
    stack: ['NestJS', 'DynamoDB', 'Terraform', 'AWS'],
  },
  'beattheats': {
    slug: 'beattheats',
    title: 'Beat the ATS',
    subtitle: 'An AI-powered resume tool, built end to end.',
    context:
      'A personal SaaS product that helps job seekers understand how their resume scores against a specific job description, and rewrites it to close the gap. Built solo, end to end, from architecture to billing.',
    approach: [
      'A multi-agent pipeline: one agent parses the resume into structured data, another fetches and analyzes the job description, another scores the match, another rewrites bullet points to close gaps, and further agents generate cover letters, interview prep questions, and LinkedIn profile suggestions, each a discrete, independently-tested step',
      'Streams agent output to the user in real time via server-sent events, rather than making users wait on a single long request',
      'Tiered LLM routing across multiple providers, balancing cost and quality between a free development tier and a paid production tier',
      'Full product surface: Google OAuth authentication, JWT session management, Stripe billing with a credit-based pricing model, and deterministic (non-LLM) text extraction from uploaded PDF/DOCX resumes',
    ],
    stack: [
      'NestJS',
      'Next.js',
      'PostgreSQL/Prisma',
      'Stripe',
      'multi-provider LLM routing',
      'Google OAuth',
    ],
  },
};
