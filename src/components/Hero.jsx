import { useState, useEffect } from 'react';
import { Github, Linkedin, Mail, Download, Eye, Copy, Sparkles, Terminal as TerminalIcon } from 'lucide-react';

const titles = [
  "Hybrid Engineer — Android ~ IoT ~ GenAI",
  "Android Developer | Kotlin & Jetpack Compose",
  "IoT Firmware Engineer | ESP32 & 2km LoRa Network",
  "Gen AI Integrator | Agentforce & Vertex AI",
];

export default function Hero({ data, onCopyEmail }) {
  const [titleIdx, setTitleIdx] = useState(0);
  const [displayed, setDisplayed] = useState('');
  const [charIdx, setCharIdx] = useState(0);

  useEffect(() => {
    const full = titles[titleIdx];
    if (charIdx < full.length) {
      const t = setTimeout(() => {
        setDisplayed(full.slice(0, charIdx + 1));
        setCharIdx((c) => c + 1);
      }, 40);
      return () => clearTimeout(t);
    } else {
      const t = setTimeout(() => {
        setCharIdx(0);
        setDisplayed('');
        setTitleIdx((i) => (i + 1) % titles.length);
      }, 2500);
      return () => clearTimeout(t);
    }
  }, [charIdx, titleIdx]);

  return (
    <section
      id="home"
      style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '120px 24px 80px',
        position: 'relative',
      }}
    >
      <div
        style={{
          maxWidth: '1000px',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          textAlign: 'center',
        }}
      >
        {/* Availability Badge */}
        <div
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 8,
            padding: '6px 16px',
            borderRadius: 'var(--radius-full)',
            background: 'rgba(16, 185, 129, 0.1)',
            border: '1px solid rgba(16, 185, 129, 0.3)',
            color: 'var(--accent-green)',
            fontSize: '0.85rem',
            fontWeight: 600,
            marginBottom: 24,
          }}
        >
          <span
            style={{
              width: 8,
              height: 8,
              borderRadius: '50%',
              background: 'var(--accent-green)',
              boxShadow: '0 0 10px var(--accent-green)',
              animation: 'pulseGlow 1.5s infinite',
            }}
          />
          {data.status || 'Available for Internships & Full-Time Roles'}
        </div>

        {/* Headline */}
        <h1
          style={{
            fontSize: 'clamp(2.5rem, 6vw, 4.2rem)',
            fontWeight: 900,
            letterSpacing: '-0.03em',
            marginBottom: 16,
            lineHeight: 1.1,
          }}
        >
          Hello, I'm{' '}
          <span
            style={{
              background: 'linear-gradient(135deg, #ffffff, var(--accent-cyan))',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            {data.name}
          </span>
        </h1>

        {/* Dynamic Typing Title */}
        <div
          style={{
            color: 'var(--accent-cyan)',
            fontFamily: 'var(--font-code)',
            fontSize: 'clamp(1rem, 2.5vw, 1.35rem)',
            fontWeight: 600,
            minHeight: '36px',
            marginBottom: 20,
            display: 'flex',
            alignItems: 'center',
            gap: 4,
          }}
        >
          <span>{displayed}</span>
          <span style={{ animation: 'blink 1s infinite', color: 'var(--accent-purple)' }}>|</span>
        </div>

        {/* Description */}
        <p
          style={{
            color: 'var(--text-secondary)',
            fontSize: 'clamp(1rem, 2vw, 1.15rem)',
            maxWidth: '680px',
            lineHeight: 1.7,
            marginBottom: 12,
          }}
        >
          {data.description}
        </p>

        <p style={{ color: 'var(--text-muted)', fontSize: '0.92rem', marginBottom: 36 }}>
          📍 {data.location} • Pursuing B.E. in ECE @ AMC Engineering College
        </p>

        {/* Action CTAs */}
        <div style={{ display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap', marginBottom: 44 }}>
          <a href="#projects" className="btn btn-primary">
            <Eye size={18} /> View Projects
          </a>
          <a href="/resume.pdf" download="Nandan_Sagar_S_Resume.pdf" className="btn btn-outline">
            <Download size={18} /> Download CV
          </a>
          <button onClick={() => onCopyEmail(data.email)} className="btn btn-outline">
            <Copy size={16} /> Copy Email
          </button>
        </div>

        {/* Social Links */}
        <div style={{ display: 'flex', gap: 16, justifyContent: 'center', alignItems: 'center' }}>
          {[
            { icon: <Github size={20} />, href: data.github, label: 'GitHub' },
            { icon: <Linkedin size={20} />, href: data.linkedin, label: 'LinkedIn' },
            { icon: <Mail size={20} />, href: `mailto:${data.email}`, label: 'Email' },
          ].map((s, i) => (
            <a
              key={i}
              href={s.href}
              target="_blank"
              rel="noreferrer"
              aria-label={s.label}
              style={{
                width: 44,
                height: 44,
                borderRadius: '50%',
                background: 'rgba(255, 255, 255, 0.03)',
                border: '1px solid var(--border)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'var(--text-secondary)',
                textDecoration: 'none',
                transition: 'all 0.25s ease',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = 'var(--accent-cyan)';
                e.currentTarget.style.color = 'var(--accent-cyan)';
                e.currentTarget.style.transform = 'translateY(-3px)';
                e.currentTarget.style.boxShadow = 'var(--shadow-glow)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = 'var(--border)';
                e.currentTarget.style.color = 'var(--text-secondary)';
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = 'none';
              }}
            >
              {s.icon}
            </a>
          ))}
        </div>
      </div>

      <style>{`
        @keyframes blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0; }
        }
      `}</style>
    </section>
  );
}