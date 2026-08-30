import React, { useState } from 'react';
import { Card } from '../components/ui/Card';

interface ContactPageProps {
  onBackToIndex: () => void;
}

export const ContactPage: React.FC<ContactPageProps> = ({ onBackToIndex }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const formspreeEndpoint =
    import.meta.env.VITE_FORMSPREE_ENDPOINT ||
    (import.meta.env.VITE_FORMSPREE_ID
      ? `https://formspree.io/f/${import.meta.env.VITE_FORMSPREE_ID}`
      : 'https://formspree.io/f/mqaeajob');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;

    setIsSubmitting(true);
    setErrorMessage(null);

    try {
      const response = await fetch(formspreeEndpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          message: formData.message,
          _replyto: formData.email,
        }),
      });

      if (response.ok) {
        setIsSubmitted(true);
      } else {
        const data = await response.json().catch(() => ({}));
        const serverError =
          data?.errors?.[0]?.message ||
          data?.error ||
          'Submission could not be delivered to the email service.';
        setErrorMessage(
          `${serverError} Please email Nawaz directly at nawazsharif.works@gmail.com.`
        );
      }
    } catch (err) {
      setErrorMessage(
        'Network transmission error. Please email Nawaz directly at nawazsharif.works@gmail.com.'
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <article
      style={{
        minHeight: '80vh',
        paddingTop: 'clamp(48px, 8vw, 96px)',
        paddingBottom: 'clamp(64px, 10vw, 120px)',
      }}
    >
      <div className="site-container" style={{ maxWidth: '640px' }}>
        {/* Return to Index Breadcrumb */}
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

        {/* Section Header */}
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
            Get In Touch
          </span>

          <h1
            style={{
              fontFamily: 'var(--font-anthropic-serif)',
              fontSize: 'clamp(32px, 5vw, 52px)',
              fontWeight: 'var(--font-weight-bold)',
              lineHeight: 'var(--leading-heading)',
              color: 'var(--color-slate-dark)',
              marginBottom: 'var(--spacing-16)',
            }}
          >
            Let's connect.
          </h1>

          <p
            style={{
              fontFamily: 'var(--font-anthropic-sans)',
              fontSize: 'var(--text-body)',
              lineHeight: 'var(--leading-body)',
              color: 'var(--color-slate-dark)',
            }}
          >
            Reach out for backend architecture, high-throughput systems, or engineering inquiries.
          </p>
        </header>

        {/* Form Container */}
        <Card surface="ivory" bordered={true} padding="large">
          {isSubmitted ? (
            <div style={{ textAlign: 'center', padding: 'var(--spacing-24) 0' }}>
              <span
                style={{
                  fontFamily: 'var(--font-anthropic-mono)',
                  fontSize: '11px',
                  fontWeight: 'var(--font-weight-semibold)',
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                  color: 'var(--color-cloud-dark)',
                  display: 'block',
                  marginBottom: 'var(--spacing-8)',
                }}
              >
                Transmission Received
              </span>
              <h2
                style={{
                  fontFamily: 'var(--font-anthropic-serif)',
                  fontSize: '28px',
                  fontWeight: 'var(--font-weight-bold)',
                  color: 'var(--color-slate-dark)',
                  marginBottom: 'var(--spacing-12)',
                }}
              >
                Message Sent.
              </h2>
              <p
                style={{
                  fontFamily: 'var(--font-anthropic-sans)',
                  fontSize: 'var(--text-body)',
                  color: 'var(--color-slate-dark)',
                  lineHeight: 'var(--leading-body)',
                  marginBottom: 'var(--spacing-24)',
                }}
              >
                Thank you for reaching out, {formData.name}. I'll review your note and get back to you shortly.
              </p>
              <button
                type="button"
                onClick={onBackToIndex}
                style={{
                  backgroundColor: 'var(--color-slate-dark)',
                  color: 'var(--color-ivory-light)',
                  fontFamily: 'var(--font-anthropic-sans)',
                  fontSize: 'var(--text-body-sm)',
                  fontWeight: 'var(--font-weight-medium)',
                  padding: '10px 24px',
                  borderRadius: 'var(--radius-buttons)',
                  border: 'none',
                  cursor: 'pointer',
                }}
              >
                Return to Index
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-20)' }}>
              {errorMessage && (
                <div
                  role="alert"
                  style={{
                    backgroundColor: 'rgba(217, 119, 87, 0.1)',
                    border: '1px solid rgba(217, 119, 87, 0.4)',
                    borderRadius: 'var(--radius-cards)',
                    padding: 'var(--spacing-16)',
                    color: 'var(--color-slate-dark)',
                    fontFamily: 'var(--font-anthropic-sans)',
                    fontSize: 'var(--text-body-sm)',
                    lineHeight: '1.4',
                  }}
                >
                  <p style={{ margin: 0, fontWeight: 'var(--font-weight-semibold)', color: '#b91c1c' }}>
                    Transmission Error
                  </p>
                  <p style={{ margin: 'var(--spacing-4) 0 0' }}>
                    {errorMessage}{' '}
                    <a
                      href="mailto:nawazsharif.works@gmail.com"
                      style={{
                        color: 'var(--color-slate-dark)',
                        fontWeight: 'var(--font-weight-bold)',
                        textDecoration: 'underline',
                      }}
                    >
                      nawazsharif.works@gmail.com
                    </a>
                  </p>
                </div>
              )}

              {/* Name Field */}
              <div>
                <label
                  htmlFor="contact-page-name"
                  style={{
                    display: 'block',
                    fontFamily: 'var(--font-anthropic-sans)',
                    fontSize: 'var(--text-caption)',
                    fontWeight: 'var(--font-weight-semibold)',
                    letterSpacing: '0.02em',
                    color: 'var(--color-slate-dark)',
                    marginBottom: 'var(--spacing-8)',
                  }}
                >
                  Name <span style={{ color: 'var(--color-cloud-dark)' }}>*</span>
                </label>
                <input
                  id="contact-page-name"
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="e.g. Alex Morgan"
                  style={{
                    width: '100%',
                    padding: '12px 14px',
                    fontFamily: 'var(--font-anthropic-sans)',
                    fontSize: 'var(--text-body)',
                    backgroundColor: '#ffffff',
                    color: 'var(--color-slate-dark)',
                    border: '1px solid var(--color-stone)',
                    borderRadius: 'var(--radius-cards)',
                    outline: 'none',
                    boxSizing: 'border-box',
                  }}
                />
              </div>

              {/* Email Field */}
              <div>
                <label
                  htmlFor="contact-page-email"
                  style={{
                    display: 'block',
                    fontFamily: 'var(--font-anthropic-sans)',
                    fontSize: 'var(--text-caption)',
                    fontWeight: 'var(--font-weight-semibold)',
                    letterSpacing: '0.02em',
                    color: 'var(--color-slate-dark)',
                    marginBottom: 'var(--spacing-8)',
                  }}
                >
                  Email <span style={{ color: 'var(--color-cloud-dark)' }}>*</span>
                </label>
                <input
                  id="contact-page-email"
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="alex@company.com"
                  style={{
                    width: '100%',
                    padding: '12px 14px',
                    fontFamily: 'var(--font-anthropic-sans)',
                    fontSize: 'var(--text-body)',
                    backgroundColor: '#ffffff',
                    color: 'var(--color-slate-dark)',
                    border: '1px solid var(--color-stone)',
                    borderRadius: 'var(--radius-cards)',
                    outline: 'none',
                    boxSizing: 'border-box',
                  }}
                />
              </div>

              {/* Message Field */}
              <div>
                <label
                  htmlFor="contact-page-message"
                  style={{
                    display: 'block',
                    fontFamily: 'var(--font-anthropic-sans)',
                    fontSize: 'var(--text-caption)',
                    fontWeight: 'var(--font-weight-semibold)',
                    letterSpacing: '0.02em',
                    color: 'var(--color-slate-dark)',
                    marginBottom: 'var(--spacing-8)',
                  }}
                >
                  Message <span style={{ color: 'var(--color-cloud-dark)' }}>*</span>
                </label>
                <textarea
                  id="contact-page-message"
                  required
                  rows={5}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Overview of your system, team requirements, or project scope..."
                  style={{
                    width: '100%',
                    padding: '12px 14px',
                    fontFamily: 'var(--font-anthropic-sans)',
                    fontSize: 'var(--text-body)',
                    backgroundColor: '#ffffff',
                    color: 'var(--color-slate-dark)',
                    border: '1px solid var(--color-stone)',
                    borderRadius: 'var(--radius-cards)',
                    outline: 'none',
                    resize: 'vertical',
                    minHeight: '130px',
                    boxSizing: 'border-box',
                  }}
                />
              </div>

              {/* Submit CTA */}
              <button
                type="submit"
                disabled={isSubmitting}
                style={{
                  backgroundColor: 'var(--color-slate-dark)',
                  color: 'var(--color-ivory-light)',
                  fontFamily: 'var(--font-anthropic-sans)',
                  fontSize: 'var(--text-body-sm)',
                  fontWeight: 'var(--font-weight-medium)',
                  padding: '14px 20px',
                  borderRadius: 'var(--radius-buttons)',
                  border: 'none',
                  cursor: isSubmitting ? 'not-allowed' : 'pointer',
                  opacity: isSubmitting ? 0.7 : 1,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: 'var(--spacing-8)',
                  marginTop: 'var(--spacing-8)',
                }}
              >
                {isSubmitting ? 'Sending...' : 'Send Message →'}
              </button>

              {/* Direct Mail Fallback */}
              <p
                style={{
                  fontFamily: 'var(--font-anthropic-sans)',
                  fontSize: '12px',
                  color: 'var(--color-cloud-dark)',
                  textAlign: 'center',
                  margin: 'var(--spacing-8) 0 0',
                }}
              >
                Or email directly at{' '}
                <a
                  href="mailto:nawazsharif.works@gmail.com"
                  style={{
                    color: 'var(--color-slate-dark)',
                    textDecoration: 'underline',
                  }}
                >
                  nawazsharif.works@gmail.com
                </a>
              </p>
            </form>
          )}
        </Card>
      </div>
    </article>
  );
};
