import { useState } from 'react';
import { Github, ExternalLink, ArrowUpRight, Cpu, Layers, Sparkles } from 'lucide-react';

export default function Projects({ data, onSelectProject }) {
  const [filter, setFilter] = useState('all');

  const categories = [
    { key: 'all', label: 'All Projects' },
    { key: 'android', label: 'Android Apps' },
    { key: 'iot', label: 'Embedded & IoT' },
    { key: 'genai', label: 'GenAI & Cloud' },
  ];

  const filteredProjects = filter === 'all' ? data : data.filter((p) => p.category === filter);

  return (
    <section id="projects" className="section">
      <h2 className="section-title">
        Featured <span>Projects</span>
      </h2>
      <p className="section-subtitle">Real-world solutions combining mobile apps, embedded hardware, and AI</p>
      <div className="underline" />

      {/* Filter Tabs */}
      <div style={{ display: 'flex', justifyContent: 'center', gap: 10, flexWrap: 'wrap', marginBottom: 40 }}>
        {categories.map((c) => (
          <button
            key={c.key}
            onClick={() => setFilter(c.key)}
            style={{
              padding: '8px 20px',
              borderRadius: 'var(--radius-full)',
              fontSize: '0.9rem',
              fontWeight: 600,
              cursor: 'pointer',
              border: filter === c.key ? '1px solid var(--accent-cyan)' : '1px solid var(--border)',
              background: filter === c.key ? 'rgba(0, 242, 254, 0.12)' : 'rgba(255, 255, 255, 0.03)',
              color: filter === c.key ? 'var(--accent-cyan)' : 'var(--text-secondary)',
              transition: 'all 0.25s ease',
            }}
          >
            {c.label}
          </button>
        ))}
      </div>

      {/* Projects Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: 28 }}>
        {filteredProjects.map((p) => (
          <div
            key={p.id}
            className="glass-card"
            style={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              position: 'relative',
            }}
          >
            <div>
              {/* Header Badges */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
                <span className="tech-chip">{p.category.toUpperCase()}</span>
                {p.badge && (
                  <span
                    style={{
                      background: 'rgba(121, 40, 202, 0.15)',
                      border: '1px solid rgba(121, 40, 202, 0.3)',
                      color: 'var(--accent-purple)',
                      padding: '3px 10px',
                      borderRadius: 'var(--radius-full)',
                      fontSize: '0.75rem',
                      fontWeight: 700,
                    }}
                  >
                    {p.badge}
                  </span>
                )}
              </div>

              {/* Number overlay background */}
              <div
                style={{
                  fontSize: '3.5rem',
                  fontWeight: 900,
                  color: 'rgba(0, 242, 254, 0.08)',
                  position: 'absolute',
                  top: 10,
                  right: 20,
                  pointerEvents: 'none',
                }}
              >
                {p.number}
              </div>

              {/* Title & Subtitle */}
              <h3 style={{ fontSize: '1.25rem', fontWeight: 800, marginBottom: 6, color: 'var(--text-primary)' }}>
                {p.title}
              </h3>
              <p style={{ color: 'var(--accent-cyan)', fontSize: '0.88rem', fontWeight: 600, marginBottom: 16 }}>
                {p.subtitle}
              </p>

              {/* Summary */}
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', lineHeight: 1.6, marginBottom: 20 }}>
                {p.summary}
              </p>

              {/* Tech Stack */}
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginBottom: 24 }}>
                {p.tech.map((t) => (
                  <span
                    key={t}
                    style={{
                      background: 'rgba(255, 255, 255, 0.04)',
                      border: '1px solid var(--border)',
                      color: 'var(--text-secondary)',
                      padding: '3px 9px',
                      borderRadius: 'var(--radius-sm)',
                      fontSize: '0.78rem',
                    }}
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>

            {/* Card Footer Actions */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: 16, borderTop: '1px solid var(--border)' }}>
              <button
                onClick={() => onSelectProject(p)}
                style={{
                  background: 'none',
                  border: 'none',
                  color: 'var(--accent-cyan)',
                  fontSize: '0.88rem',
                  fontWeight: 600,
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 6,
                  padding: 0,
                }}
              >
                Details & Specs <ArrowUpRight size={16} />
              </button>

              <div style={{ display: 'flex', gap: 12 }}>
                {p.github && (
                  <a
                    href={p.github}
                    target="_blank"
                    rel="noreferrer"
                    style={{ color: 'var(--text-secondary)', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 4 }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--accent-cyan)')}
                    onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--text-secondary)')}
                  >
                    <Github size={18} />
                  </a>
                )}
                {p.demo && (
                  <a
                    href={p.demo}
                    target="_blank"
                    rel="noreferrer"
                    style={{ color: 'var(--text-secondary)', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 4 }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--accent-cyan)')}
                    onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--text-secondary)')}
                  >
                    <ExternalLink size={18} />
                  </a>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}