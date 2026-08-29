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
  const modalRef = useRef<HTMLDivElement>(null);
  const firstInputRef = useRef<HTMLInputElement>(null);

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
    }

    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;

    setIsSubmitting(true);
    // Simulate lightweight submission
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 600);
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
            top: '24px',
            right: '24px',
            background: 'none',
            border: 'none',
            width: '32px',
            height: '32px',
            borderRadius: '6px',
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'var(--color-slate-dark)',
            cursor: 'pointer',
            padding: 0,
            transition: 'background-color var(--duration-fast) var(--ease-editorial)',
          }}
          onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = 'var(--color-oat-warm)')}
          onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'transparent')}
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>

        {isSubmitted ? (
          <div style={{ textAlign: 'center', padding: 'var(--spacing-24) 0' }}>
            <span
              style={{
                fontFamily: 'var(--font-anthropic-mono)',
                fontSize: 'var(--text-caption)',
                color: 'var(--color-cloud-dark)',
                textTransform: 'uppercase',
                letterSpacing: '0.08em',
                display: 'block',
                marginBottom: 'var(--spacing-12)',
              }}
            >
              TRANSMISSION RECEIVED
            </span>
            <h3
              style={{
                fontFamily: 'var(--font-anthropic-serif)',
                fontSize: '28px',
                fontWeight: 'var(--font-weight-bold)',
                color: 'var(--color-slate-dark)',
                marginBottom: 'var(--spacing-16)',
                letterSpacing: 'var(--tracking-heading)',
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
                lineHeight: '1.4',
              }}
            >
              Reach out for backend architecture, high-throughput systems, or engineering inquiries.
            </p>

            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-16)' }}>
              {/* Name Field */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                <label
                  htmlFor="contact-name"
                  style={{
                    fontFamily: 'var(--font-anthropic-sans)',
                    fontSize: '13px',
                    fontWeight: 'var(--font-weight-semibold)',
                    color: 'var(--color-slate-dark)',
                    letterSpacing: '-0.01em',
                  }}
                >
                  Name <span style={{ color: 'var(--color-cloud-dark)' }}>*</span>
                </label>
                <input
                  ref={firstInputRef}
                  id="contact-name"
                  type="text"
                  required
                  placeholder="e.g. Alex Morgan"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  style={{
                    backgroundColor: '#ffffff',
                    border: '1px solid var(--color-stone)',
                    borderRadius: '8px',
                    padding: '10px 14px',
                    fontFamily: 'var(--font-anthropic-sans)',
                    fontSize: '15px',
                    color: 'var(--color-slate-dark)',
                    outline: 'none',
                    transition: 'border-color var(--duration-fast) var(--ease-editorial), box-shadow var(--duration-fast) var(--ease-editorial)',
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
              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                <label
                  htmlFor="contact-email"
                  style={{
                    fontFamily: 'var(--font-anthropic-sans)',
                    fontSize: '13px',
                    fontWeight: 'var(--font-weight-semibold)',
                    color: 'var(--color-slate-dark)',
                    letterSpacing: '-0.01em',
                  }}
                >
                  Email <span style={{ color: 'var(--color-cloud-dark)' }}>*</span>
                </label>
                <input
                  id="contact-email"
                  type="email"
                  required
                  placeholder="alex@company.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  style={{
                    backgroundColor: '#ffffff',
                    border: '1px solid var(--color-stone)',
                    borderRadius: '8px',
                    padding: '10px 14px',
                    fontFamily: 'var(--font-anthropic-sans)',
                    fontSize: '15px',
                    color: 'var(--color-slate-dark)',
                    outline: 'none',
                    transition: 'border-color var(--duration-fast) var(--ease-editorial), box-shadow var(--duration-fast) var(--ease-editorial)',
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
              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                <label
                  htmlFor="contact-message"
                  style={{
                    fontFamily: 'var(--font-anthropic-sans)',
                    fontSize: '13px',
                    fontWeight: 'var(--font-weight-semibold)',
                    color: 'var(--color-slate-dark)',
                    letterSpacing: '-0.01em',
                  }}
                >
                  Message <span style={{ color: 'var(--color-cloud-dark)' }}>*</span>
                </label>
                <textarea
                  id="contact-message"
                  required
                  rows={4}
                  placeholder="Overview of your system, team requirements, or project scope..."
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  style={{
                    backgroundColor: '#ffffff',
                    border: '1px solid var(--color-stone)',
                    borderRadius: '8px',
                    padding: '10px 14px',
                    fontFamily: 'var(--font-anthropic-sans)',
                    fontSize: '15px',
                    color: 'var(--color-slate-dark)',
                    outline: 'none',
                    resize: 'vertical',
                    minHeight: '96px',
                    transition: 'border-color var(--duration-fast) var(--ease-editorial), box-shadow var(--duration-fast) var(--ease-editorial)',
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

              {/* CTA Button */}
              <div style={{ paddingTop: 'var(--spacing-8)' }}>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  style={{
                    width: '100%',
                    backgroundColor: 'var(--color-slate-dark)',
                    color: 'var(--color-ivory-light)',
                    border: 'none',
                    padding: '14px 24px',
                    borderRadius: '8px',
                    fontFamily: 'var(--font-anthropic-sans)',
                    fontSize: '15px',
                    fontWeight: 'var(--font-weight-semibold)',
                    cursor: isSubmitting ? 'not-allowed' : 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '8px',
                    transition: 'all var(--duration-fast) var(--ease-editorial)',
                    opacity: isSubmitting ? 0.7 : 1,
                  }}
                  onMouseEnter={(e) => {
                    if (!isSubmitting) e.currentTarget.style.backgroundColor = '#262624';
                  }}
                  onMouseLeave={(e) => {
                    if (!isSubmitting) e.currentTarget.style.backgroundColor = 'var(--color-slate-dark)';
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
                    textUnderlineOffset: '2px',
                  }}
                >
                  nawazsharif.works@gmail.com
                </a>
              </p>
            </form>
          </div>
        )}
      </div>

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes scaleIn {
          from { opacity: 0; transform: scale(0.97) translateY(8px); }
          to { opacity: 1; transform: scale(1) translateY(0); }
        }
      `}</style>
    </div>
  );
};
