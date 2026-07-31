import { Smartphone, Cpu, Bot, Layers, Code, Zap, Radio, Terminal, Server, Figma, GitBranch, Settings } from 'lucide-react';

const categoryIcons = {
  "Mobile Development": <Smartphone size={22} color="var(--accent-cyan)" />,
  "Embedded & IoT Systems": <Cpu size={22} color="var(--accent-amber)" />,
  "Backend & GenAI Tools": <Bot size={22} color="var(--accent-purple)" />,
  "Design & Hardware Tools": <Layers size={22} color="var(--accent-blue)" />,
};

export default function Skills({ data }) {
  return (
    <section id="skills" style={{ background: 'var(--bg-secondary)' }}>
      <div className="section">
        <h2 className="section-title">
          Technical <span>Skills</span>
        </h2>
        <p className="section-subtitle">A balanced matrix spanning Android apps, C firmware, IoT telemetry, and AI</p>
        <div className="underline" />

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 24 }}>
          {Object.entries(data).map(([cat, skills]) => (
            <div key={cat} className="glass-card">
              <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 24 }}>
                <div
                  style={{
                    width: 42,
                    height: 42,
                    borderRadius: 'var(--radius-md)',
                    background: 'rgba(255, 255, 255, 0.04)',
                    border: '1px solid var(--border)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  {categoryIcons[cat] || <Code size={20} color="var(--accent-cyan)" />}
                </div>
                <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--text-primary)' }}>{cat}</h3>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
                {skills.map((s) => (
                  <div key={s.name}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8, fontSize: '0.9rem' }}>
                      <span style={{ color: 'var(--text-primary)', fontWeight: 500 }}>{s.name}</span>
                      <span style={{ color: 'var(--accent-cyan)', fontFamily: 'var(--font-code)', fontSize: '0.85rem' }}>
                        {s.level}%
                      </span>
                    </div>
                    {/* Progress Bar Container */}
                    <div
                      style={{
                        height: 7,
                        background: 'rgba(255, 255, 255, 0.06)',
                        borderRadius: 'var(--radius-full)',
                        overflow: 'hidden',
                      }}
                    >
                      <div
                        style={{
                          height: '100%',
                          width: `${s.level}%`,
                          background: 'linear-gradient(90deg, var(--accent-cyan), var(--accent-purple))',
                          borderRadius: 'var(--radius-full)',
                          transition: 'width 1s cubic-bezier(0.4, 0, 0.2, 1)',
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}