import { GraduationCap, Award, Trophy, Sparkles, MapPin, Calendar, CheckCircle2 } from 'lucide-react';

export default function About({ data }) {
  return (
    <section id="about" className="section">
      <h2 className="section-title">
        About <span>Me</span>
      </h2>
      <p className="section-subtitle">Bridging the gap between software algorithms and physical hardware</p>
      <div className="underline" />

      {/* Main Grid: Bio & Stats */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: 28,
          marginBottom: 40,
        }}
      >
        {/* Bio Card */}
        <div className="glass-card" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16 }}>
            <Sparkles size={22} color="var(--accent-cyan)" />
            <h3 style={{ fontSize: '1.25rem', fontWeight: 700 }}>Engineering Philosophy</h3>
          </div>
          <p style={{ color: 'var(--text-secondary)', lineHeight: 1.8, fontSize: '0.98rem' }}>{data.bio}</p>
        </div>

        {/* Stats Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
          {data.stats.map((s, i) => (
            <div
              key={i}
              className="glass-card"
              style={{
                textAlign: 'center',
                padding: '24px 16px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <div
                style={{
                  fontSize: '2.2rem',
                  fontWeight: 900,
                  background: 'linear-gradient(135deg, var(--accent-cyan), var(--accent-purple))',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                }}
              >
                {s.value}
              </div>
              <div style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', fontWeight: 600, marginTop: 4 }}>
                {s.label}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Education Highlight Card */}
      <div
        className="glass-card"
        style={{
          marginBottom: 32,
          borderLeft: '4px solid var(--accent-cyan)',
          background: 'linear-gradient(135deg, var(--bg-card), rgba(0, 242, 254, 0.03))',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 12 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
            <div
              style={{
                width: 48,
                height: 48,
                borderRadius: 'var(--radius-md)',
                background: 'rgba(0, 242, 254, 0.1)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <GraduationCap size={26} color="var(--accent-cyan)" />
            </div>
            <div>
              <h3 style={{ fontSize: '1.15rem', fontWeight: 800 }}>{data.education.degree}</h3>
              <p style={{ color: 'var(--accent-cyan)', fontSize: '0.92rem', fontWeight: 600 }}>{data.education.field}</p>
            </div>
          </div>
          <div style={{ textAlign: 'right' }}>
            <p style={{ color: 'var(--text-primary)', fontWeight: 600, fontSize: '0.92rem' }}>
              📍 {data.education.college}, {data.education.location}
            </p>
            <span style={{ color: 'var(--accent-amber)', fontSize: '0.85rem', fontWeight: 600 }}>
              🎓 {data.education.graduation}
            </span>
          </div>
        </div>
      </div>

      {/* Certifications & Achievements Split */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: 24 }}>
        {/* Certifications */}
        <div className="glass-card">
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 20 }}>
            <Award size={22} color="var(--accent-cyan)" />
            <h3 style={{ fontSize: '1.15rem', fontWeight: 700 }}>Certifications</h3>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            {data.certifications.map((c, i) => (
              <div key={i} style={{ display: 'flex', gap: 12 }}>
                <CheckCircle2 size={18} color="var(--accent-cyan)" style={{ flexShrink: 0, marginTop: 2 }} />
                <div>
                  <div style={{ color: 'var(--text-primary)', fontWeight: 600, fontSize: '0.92rem' }}>{c.title}</div>
                  <div style={{ color: 'var(--text-secondary)', fontSize: '0.84rem', marginTop: 2 }}>{c.detail}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Achievements */}
        <div className="glass-card">
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 20 }}>
            <Trophy size={22} color="var(--accent-amber)" />
            <h3 style={{ fontSize: '1.15rem', fontWeight: 700 }}>Key Achievements</h3>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            {data.achievements.map((a, i) => (
              <div key={i} style={{ display: 'flex', gap: 12, fontSize: '0.9rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
                <span style={{ color: 'var(--accent-amber)', flexShrink: 0 }}>★</span>
                <span>{a}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}