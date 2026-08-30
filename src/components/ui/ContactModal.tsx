import React, { useState, useEffect, useRef } from 'react';

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ContactModal: React.FC<ContactModalProps> = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const modalRef = useRef<HTMLDivElement>(null);
  const firstInputRef = useRef<HTMLInputElement>(null);

  const formspreeEndpoint =
    import.meta.env.VITE_FORMSPREE_ENDPOINT ||
    (import.meta.env.VITE_FORMSPREE_ID
      ? `https://formspree.io/f/${import.meta.env.VITE_FORMSPREE_ID}`
      : 'https://formspree.io/f/xqpkezrr');

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
      setTimeout(() => firstInputRef.current?.focus(), 50);
    } else {
      document.body.style.overflow = '';
      setIsSubmitted(false);
      setErrorMessage(null);
    }

    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

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

  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
      onClose();
    }
  };

  return (
    <div
      onClick={handleBackdropClick}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 200,
        backgroundColor: 'rgba(20, 20, 19, 0.55)',
        backdropFilter: 'blur(8px)',
        WebkitBackdropFilter: 'blur(8px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 'var(--spacing-16)',
        animation: 'fadeIn 0.2s var(--ease-editorial) forwards',
      }}
      role="dialog"
      aria-modal="true"
      aria-labelledby="contact-modal-title"
    >
      <div
        ref={modalRef}
        style={{
          backgroundColor: 'var(--color-ivory-light)',
          border: '1px solid var(--color-stone)',
          borderRadius: 'var(--radius-cards)',
          width: '100%',
          maxWidth: '520px',
          padding: 'clamp(28px, 5vw, 40px)',
          boxShadow: '0 24px 48px -12px rgba(20, 20, 19, 0.22), 0 0 0 1px rgba(20, 20, 19, 0.05)',
          position: 'relative',
          animation: 'scaleIn 0.25s var(--ease-editorial) forwards',
        }}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          aria-label="Close dialog"
          style={{
            position: 'absolute',
            top: '20px',
            right: '20px',
            background: 'transparent',
            border: 'none',
            color: 'var(--color-slate-medium)',
            cursor: 'pointer',
            padding: '8px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: '50%',
            transition: 'all var(--duration-fast) var(--ease-editorial)',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.color = 'var(--color-slate-dark)';
            e.currentTarget.style.backgroundColor = 'var(--color-oat-warm)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.color = 'var(--color-slate-medium)';
            e.currentTarget.style.backgroundColor = 'transparent';
          }}
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>

        {isSubmitted ? (
          /* Success Confirmation View */
          <div style={{ textAlign: 'center', padding: 'var(--spacing-16) 0' }}>
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
            <h3
              style={{
                fontFamily: 'var(--font-anthropic-serif)',
                fontSize: '28px',
                fontWeight: 'var(--font-weight-bold)',
                color: 'var(--color-slate-dark)',
                marginBottom: 'var(--spacing-12)',
              }}
            >
              Message Sent.
            </h3>
            <p
              style={{
                fontFamily: 'var(--font-anthropic-serif)',
                fontSize: 'var(--text-body-sm)',
                lineHeight: 'var(--leading-body)',
                color: 'var(--color-slate-medium)',
                marginBottom: 'var(--spacing-32)',
              }}
            >
              Thank you for reaching out, {formData.name}. I'll review your note and get back to you shortly.
            </p>
            <button
              onClick={onClose}
              style={{
                backgroundColor: 'var(--color-slate-dark)',
                color: 'var(--color-ivory-light)',
                border: 'none',
                padding: '12px 28px',
                borderRadius: '8px',
                fontFamily: 'var(--font-anthropic-sans)',
                fontSize: '14px',
                fontWeight: 'var(--font-weight-medium)',
                cursor: 'pointer',
                transition: 'opacity var(--duration-fast) var(--ease-editorial)',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.opacity = '0.9')}
              onMouseLeave={(e) => (e.currentTarget.style.opacity = '1')}
            >
              Done
            </button>
          </div>
        ) : (
          <div>
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
              Get In Touch
            </span>

            <h2
              id="contact-modal-title"
              style={{
                fontFamily: 'var(--font-anthropic-serif)',
                fontSize: 'clamp(24px, 3.5vw, 30px)',
                fontWeight: 'var(--font-weight-bold)',
                color: 'var(--color-slate-dark)',
                letterSpacing: 'var(--tracking-subheading)',
                lineHeight: 'var(--leading-subheading)',
                marginBottom: 'var(--spacing-8)',
              }}
            >
              Let's connect.
            </h2>

            <p
              style={{
                fontFamily: 'var(--font-anthropic-sans)',
                fontSize: 'var(--text-body-sm)',
                color: 'var(--color-slate-medium)',
                marginBottom: 'var(--spacing-24)',
                lineHeight: 'var(--leading-body)',
              }}
            >
              Reach out for backend architecture, high-throughput systems, or engineering inquiries.
            </p>

            {errorMessage && (
              <div
                role="alert"
                style={{
                  backgroundColor: 'rgba(217, 119, 87, 0.1)',
                  border: '1px solid rgba(217, 119, 87, 0.4)',
                  borderRadius: 'var(--radius-cards)',
                  padding: 'var(--spacing-12) var(--spacing-16)',
                  color: 'var(--color-slate-dark)',
                  fontFamily: 'var(--font-anthropic-sans)',
                  fontSize: 'var(--text-body-sm)',
                  lineHeight: '1.4',
                  marginBottom: 'var(--spacing-16)',
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

            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-16)' }}>
              {/* Name Field */}
              <div>
                <label
                  htmlFor="contact-name"
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
                  ref={firstInputRef}
                  id="contact-name"
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="e.g. Alex Morgan"
                  style={{
                    width: '100%',
                    padding: '12px 14px',
                    fontFamily: 'var(--font-anthropic-sans)',
                    fontSize: 'var(--text-body-sm)',
                    backgroundColor: '#ffffff',
                    color: 'var(--color-slate-dark)',
                    border: '1px solid var(--color-stone)',
                    borderRadius: '8px',
                    outline: 'none',
                    transition: 'border-color var(--duration-fast) var(--ease-editorial), box-shadow var(--duration-fast) var(--ease-editorial)',
                    boxSizing: 'border-box',
                  }}
                  onFocus={(e) => {
                    e.currentTarget.style.borderColor = 'var(--color-slate-dark)';
                    e.currentTarget.style.boxShadow = '0 0 0 1px var(--color-slate-dark)';
                  }}
                  onBlur={(e) => {
                    e.currentTarget.style.borderColor = 'var(--color-stone)';
                    e.currentTarget.style.boxShadow = 'none';
                  }}
                />
              </div>

              {/* Email Field */}
              <div>
                <label
                  htmlFor="contact-email"
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
                  id="contact-email"
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="alex@company.com"
                  style={{
                    width: '100%',
                    padding: '12px 14px',
                    fontFamily: 'var(--font-anthropic-sans)',
                    fontSize: 'var(--text-body-sm)',
                    backgroundColor: '#ffffff',
                    color: 'var(--color-slate-dark)',
                    border: '1px solid var(--color-stone)',
                    borderRadius: '8px',
                    outline: 'none',
                    transition: 'border-color var(--duration-fast) var(--ease-editorial), box-shadow var(--duration-fast) var(--ease-editorial)',
                    boxSizing: 'border-box',
                  }}
                  onFocus={(e) => {
                    e.currentTarget.style.borderColor = 'var(--color-slate-dark)';
                    e.currentTarget.style.boxShadow = '0 0 0 1px var(--color-slate-dark)';
                  }}
                  onBlur={(e) => {
                    e.currentTarget.style.borderColor = 'var(--color-stone)';
                    e.currentTarget.style.boxShadow = 'none';
                  }}
                />
              </div>

              {/* Message Field */}
              <div>
                <label
                  htmlFor="contact-message"
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
                  id="contact-message"
                  required
                  rows={4}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Overview of your system, team requirements, or project scope..."
                  style={{
                    width: '100%',
                    padding: '12px 14px',
                    fontFamily: 'var(--font-anthropic-sans)',
                    fontSize: 'var(--text-body-sm)',
                    backgroundColor: '#ffffff',
                    color: 'var(--color-slate-dark)',
                    border: '1px solid var(--color-stone)',
                    borderRadius: '8px',
                    outline: 'none',
                    resize: 'vertical',
                    minHeight: '100px',
                    transition: 'border-color var(--duration-fast) var(--ease-editorial), box-shadow var(--duration-fast) var(--ease-editorial)',
                    boxSizing: 'border-box',
                  }}
                  onFocus={(e) => {
                    e.currentTarget.style.borderColor = 'var(--color-slate-dark)';
                    e.currentTarget.style.boxShadow = '0 0 0 1px var(--color-slate-dark)';
                  }}
                  onBlur={(e) => {
                    e.currentTarget.style.borderColor = 'var(--color-stone)';
                    e.currentTarget.style.boxShadow = 'none';
                  }}
                />
              </div>

              {/* Submit CTA */}
              <div style={{ marginTop: 'var(--spacing-8)' }}>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  style={{
                    width: '100%',
                    backgroundColor: 'var(--color-slate-dark)',
                    color: 'var(--color-ivory-light)',
                    fontFamily: 'var(--font-anthropic-sans)',
                    fontSize: '14px',
                    fontWeight: 'var(--font-weight-medium)',
                    padding: '13px',
                    borderRadius: '8px',
                    border: 'none',
                    cursor: isSubmitting ? 'not-allowed' : 'pointer',
                    opacity: isSubmitting ? 0.7 : 1,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: 'var(--spacing-8)',
                    transition: 'all var(--duration-fast) var(--ease-editorial)',
                  }}
                  onMouseEnter={(e) => {
                    if (!isSubmitting) e.currentTarget.style.opacity = '0.9';
                  }}
                  onMouseLeave={(e) => {
                    if (!isSubmitting) e.currentTarget.style.opacity = '1';
                  }}
                >
                  {isSubmitting ? (
                    'Sending...'
                  ) : (
                    <>
                      Send Message <span>→</span>
                    </>
                  )}
                </button>
              </div>

              {/* Direct Mail Fallback */}
              <p
                style={{
                  fontFamily: 'var(--font-anthropic-sans)',
                  fontSize: '12px',
                  color: 'var(--color-cloud-dark)',
                  textAlign: 'center',
                  marginTop: 'var(--spacing-4)',
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
          </div>
        )}
      </div>
    </div>
  );
};
