import { Mail, Phone, Github, Linkedin, Send, Copy, MapPin, Check } from 'lucide-react';
import { useState } from 'react';

export default function Contact({ data, onCopyEmail, onCopyPhone }) {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [sent, setSent] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) return;

    const subject = encodeURIComponent(`Portfolio Contact from ${form.name}`);
    const body = encodeURIComponent(`Name: ${form.name}\nEmail: ${form.email}\n\nMessage:\n${form.message}`);
    window.open(`mailto:${data.email}?subject=${subject}&body=${body}`);
    setSent(true);
    setForm({ name: '', email: '', message: '' });
    setTimeout(() => setSent(false), 4000);
  };

  const inputStyle = {
    width: '100%',
    padding: '14px 18px',
    background: 'rgba(255, 255, 255, 0.03)',
    border: '1px solid var(--border)',
    borderRadius: 'var(--radius-md)',
    color: 'var(--text-primary)',
    fontSize: '0.95rem',
    marginBottom: 18,
    outline: 'none',
    fontFamily: 'var(--font-main)',
    transition: 'all 0.25s ease',
  };

  return (
    <section id="contact" className="section">
      <h2 className="section-title">
        Get In <span>Touch</span>
      </h2>
      <p className="section-subtitle">Have a project, internship opportunity, or collaboration in mind?</p>
      <div className="underline" />

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: 36 }}>
        {/* Contact Info Card */}
        <div className="glass-card" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
          <div>
            <h3 style={{ fontSize: '1.3rem', fontWeight: 800, marginBottom: 20, color: 'var(--text-primary)' }}>
              Let's Connect
            </h3>
            <p style={{ color: 'var(--text-secondary)', lineHeight: 1.7, marginBottom: 28, fontSize: '0.95rem' }}>
              Feel free to reach out directly via email or phone. I'm always open to discussing new embedded hardware projects, mobile applications, or GenAI integrations.
            </p>

            {/* Interactive Items */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16, marginBottom: 28 }}>
              {/* Email item */}
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '12px 16px',
                  background: 'rgba(255, 255, 255, 0.03)',
                  border: '1px solid var(--border)',
                  borderRadius: 'var(--radius-md)',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                  <Mail size={18} color="var(--accent-cyan)" />
                  <span style={{ fontSize: '0.9rem', color: 'var(--text-primary)' }}>{data.email}</span>
                </div>
                <button
                  onClick={() => onCopyEmail(data.email)}
                  style={{
                    background: 'none',
                    border: 'none',
                    color: 'var(--text-secondary)',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--accent-cyan)')}
                  onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--text-secondary)')}
                >
                  <Copy size={16} />
                </button>
              </div>

              {/* Phone item */}
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '12px 16px',
                  background: 'rgba(255, 255, 255, 0.03)',
                  border: '1px solid var(--border)',
                  borderRadius: 'var(--radius-md)',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                  <Phone size={18} color="var(--accent-amber)" />
                  <span style={{ fontSize: '0.9rem', color: 'var(--text-primary)' }}>
                    {data.phone} / {data.phone2}
                  </span>
                </div>
                <button
                  onClick={() => onCopyPhone(data.phone)}
                  style={{
                    background: 'none',
                    border: 'none',
                    color: 'var(--text-secondary)',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--accent-amber)')}
                  onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--text-secondary)')}
                >
                  <Copy size={16} />
                </button>
              </div>
            </div>
          </div>

          {/* Social Profiles */}
          <div>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', marginBottom: 12, fontWeight: 600 }}>
              FIND ME ON SOCIALS
            </p>
            <div style={{ display: 'flex', gap: 14 }}>
              <a
                href={data.github}
                target="_blank"
                rel="noreferrer"
                className="btn btn-outline btn-sm"
                style={{ flex: 1 }}
              >
                <Github size={16} /> GitHub
              </a>
              <a
                href={data.linkedin}
                target="_blank"
                rel="noreferrer"
                className="btn btn-outline btn-sm"
                style={{ flex: 1 }}
              >
                <Linkedin size={16} /> LinkedIn
              </a>
            </div>
          </div>
        </div>

        {/* Message Form */}
        <div className="glass-card">
          <h3 style={{ fontSize: '1.3rem', fontWeight: 800, marginBottom: 20, color: 'var(--text-primary)' }}>
            Send a Direct Message
          </h3>

          <form onSubmit={handleSubmit}>
            <input
              style={inputStyle}
              placeholder="Your Name *"
              required
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              onFocus={(e) => (e.target.style.borderColor = 'var(--accent-cyan)')}
              onBlur={(e) => (e.target.style.borderColor = 'var(--border)')}
            />
            <input
              style={inputStyle}
              placeholder="Your Email Address *"
              type="email"
              required
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              onFocus={(e) => (e.target.style.borderColor = 'var(--accent-cyan)')}
              onBlur={(e) => (e.target.style.borderColor = 'var(--border)')}
            />
            <textarea
              style={{ ...inputStyle, height: 130, resize: 'vertical' }}
              placeholder="Your Message or Project Details *"
              required
              value={form.message}
              onChange={(e) => setForm({ ...form, message: e.target.value })}
              onFocus={(e) => (e.target.style.borderColor = 'var(--accent-cyan)')}
              onBlur={(e) => (e.target.style.borderColor = 'var(--border)')}
            />

            <button type="submit" className="btn btn-primary" style={{ width: '100%', justifyContent: 'center' }}>
              {sent ? (
                <>
                  <Check size={18} /> Email Client Opened!
                </>
              ) : (
                <>
                  <Send size={18} /> Send Message
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}