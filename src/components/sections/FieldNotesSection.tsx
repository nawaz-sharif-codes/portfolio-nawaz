import React from 'react';

interface FieldNoteItem {
  title: string;
  author: string;
  category: string;
  summary: string;
  url: string;
}

export const FieldNotesSection: React.FC = () => {
  const notes: FieldNoteItem[] = [
    {
      title: 'OIDC and OAuth 2.0: An Architecture Deep-Dive',
      author: 'Charles Sieg',
      category: 'Identity & Access Management',
      summary:
        'A practical walkthrough of implementing the same OAuth/OIDC protocol across web, desktop, and native mobile clients.',
      url: 'https://charlessieg.com/articles/oidc-oauth-2-architecture-deep-dive.html',
    },
    {
      title: 'SAML → OIDC Migration: The Hidden Gotchas',
      author: 'Koushik Anand, Cyber Defense Magazine',
      category: 'Identity Migration',
      summary:
        'The operational playbook for migrating legacy SSO to OIDC without breaking application teams mid-cutover.',
      url: 'https://www.cyberdefensemagazine.com/saml-oidc-migration-the-hidden-gotchas/',
    },
    {
      title: 'Payment System Design: Ledger, Idempotency, and Settlement',
      author: 'Ajit Singh',
      category: 'Distributed Systems',
      summary:
        'Why payment infrastructure has to be correctness-first: idempotency keys, state machines, and an immutable double-entry ledger.',
      url: 'https://singhajit.com/payment-system-design/',
    },
    {
      title: 'Event-Driven Architecture (EDA): A Complete Introduction',
      author: 'Confluent',
      category: 'Event-Driven Systems',
      summary:
        'A grounding primer on asynchronous, loosely-coupled systems built on Kafka as the event broker.',
      url: 'https://www.confluent.io/learn/event-driven-architecture/',
    },
  ];

  return (
    <section
      id="field-notes"
      aria-label="Field Notes and Recommended Reading"
      style={{
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
            Curated Technical Index
          </span>
          <h2
            style={{
              fontFamily: 'var(--font-anthropic-sans)',
              fontSize: '24px',
              fontWeight: 'var(--font-weight-bold)',
              letterSpacing: 'var(--tracking-heading)',
              color: 'var(--color-slate-dark)',
            }}
          >
            Field Notes: Recommended Reading
          </h2>
          <p
            style={{
              fontFamily: 'var(--font-anthropic-serif)',
              fontSize: 'var(--text-body-sm)',
              color: 'var(--color-slate-medium)',
              marginTop: 'var(--spacing-8)',
              maxWidth: '680px',
            }}
          >
            Foundational architecture write-ups, protocols, and engineering literature that inform my approach to distributed systems and identity infrastructure.
          </p>
        </div>

        {/* Divided Editorial Feed Rows */}
        <div
          style={{
            borderTop: '1px solid var(--color-stone)',
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          {notes.map((note) => (
            <article
              key={note.url}
              style={{
                paddingTop: 'var(--spacing-24)',
                paddingBottom: 'var(--spacing-24)',
                borderBottom: '1px solid var(--color-stone)',
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
                gap: 'var(--spacing-16)',
                alignItems: 'baseline',
              }}
              className="field-note-row"
            >
              {/* Left Column: Metadata & Attribution */}
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 'var(--spacing-4)',
                }}
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
                  {note.category}
                </span>
                <span
                  style={{
                    fontFamily: 'var(--font-anthropic-sans)',
                    fontSize: 'var(--text-caption)',
                    fontWeight: 'var(--font-weight-medium)',
                    color: 'var(--color-slate-dark)',
                  }}
                >
                  Source: {note.author}
                </span>
              </div>

              {/* Right Column: 24px Serif Title, 16px Snippet & External Link */}
              <div
                style={{
                  maxWidth: '720px',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 'var(--spacing-8)',
                }}
              >
                <h3
                  style={{
                    fontFamily: 'var(--font-anthropic-serif)',
                    fontSize: 'var(--text-subheading)',
                    fontWeight: 'var(--font-weight-semibold)',
                    lineHeight: 'var(--leading-subheading)',
                    color: 'var(--color-slate-dark)',
                  }}
                >
                  <a
                    href={note.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-link"
                    style={{
                      color: 'var(--color-slate-dark)',
                      textDecoration: 'underline',
                      textDecorationThickness: '1px',
                      textUnderlineOffset: '4px',
                    }}
                  >
                    {note.title} ↗
                  </a>
                </h3>

                <p
                  style={{
                    fontFamily: 'var(--font-anthropic-serif)',
                    fontSize: 'var(--text-body-sm)',
                    lineHeight: '1.43',
                    color: 'var(--color-slate-dark)',
                  }}
                >
                  {note.summary}
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>

      <style>{`
        @media (min-width: 768px) {
          .field-note-row {
            grid-template-columns: 260px 1fr !important;
          }
        }
      `}</style>
    </section>
  );
};
