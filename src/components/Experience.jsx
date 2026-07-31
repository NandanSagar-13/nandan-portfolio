import { Briefcase, Building, MapPin, Calendar, CheckCircle2 } from 'lucide-react';

export default function Experience({ data }) {
  return (
    <section id="experience" style={{ background: 'var(--bg-secondary)' }}>
      <div className="section">
        <h2 className="section-title">
          Work <span>Experience</span>
        </h2>
        <p className="section-subtitle">Real-world engineering internships & professional design work</p>
        <div className="underline" />

        <div style={{ display: 'flex', flexDirection: 'column', gap: 32, maxWidth: '900px', margin: '0 auto' }}>
          {data.map((exp) => (
            <div
              key={exp.id}
              className="glass-card"
              style={{
                position: 'relative',
                borderLeft: '4px solid var(--accent-cyan)',
                padding: '32px',
              }}
            >
              {/* Header Info */}
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'flex-start',
                  flexWrap: 'wrap',
                  gap: 16,
                  marginBottom: 16,
                }}
              >
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 4 }}>
                    <h3 style={{ fontSize: '1.3rem', fontWeight: 800, color: 'var(--text-primary)' }}>{exp.role}</h3>
                    <span
                      style={{
                        background: 'rgba(0, 242, 254, 0.1)',
                        color: 'var(--accent-cyan)',
                        padding: '2px 10px',
                        borderRadius: 'var(--radius-full)',
                        fontSize: '0.75rem',
                        fontWeight: 700,
                      }}
                    >
                      {exp.type}
                    </span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8, color: 'var(--accent-cyan)', fontWeight: 600, fontSize: '0.95rem' }}>
                    <Building size={16} /> {exp.company}
                  </div>
                </div>

                <div style={{ display: 'flex', gap: 16, color: 'var(--text-muted)', fontSize: '0.85rem' }}>
                  <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                    <MapPin size={14} /> {exp.location}
                  </span>
                  <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                    <Calendar size={14} /> {exp.period}
                  </span>
                </div>
              </div>

              {/* Highlights */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 20 }}>
                {exp.highlights.map((h, idx) => (
                  <div key={idx} style={{ display: 'flex', gap: 10, fontSize: '0.92rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
                    <span style={{ color: 'var(--accent-cyan)', flexShrink: 0, marginTop: 2 }}>▹</span>
                    <span>{h}</span>
                  </div>
                ))}
              </div>

              {/* Tech Tags */}
              {exp.tech && (
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                  {exp.tech.map((t) => (
                    <span
                      key={t}
                      style={{
                        background: 'rgba(255, 255, 255, 0.04)',
                        border: '1px solid var(--border)',
                        color: 'var(--text-secondary)',
                        padding: '3px 10px',
                        borderRadius: 'var(--radius-sm)',
                        fontSize: '0.8rem',
                      }}
                    >
                      {t}
                    </span>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}