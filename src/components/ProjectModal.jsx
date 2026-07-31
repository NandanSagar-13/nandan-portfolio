import { X, Github, ExternalLink, Cpu, Layers, CheckCircle } from 'lucide-react';

export default function ProjectModal({ project, onClose }) {
  if (!project) return null;

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 3000,
        background: 'rgba(5, 8, 15, 0.85)',
        backdropFilter: 'blur(10px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '20px',
        animation: 'fadeIn 0.25s ease-out',
      }}
      onClick={onClose}
    >
      <div
        style={{
          background: 'var(--bg-card)',
          border: '1px solid var(--border-highlight)',
          borderRadius: 'var(--radius-lg)',
          maxWidth: '680px',
          width: '100%',
          maxHeight: '90vh',
          overflowY: 'auto',
          padding: '32px',
          boxShadow: 'var(--shadow-glow)',
          position: 'relative',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          style={{
            position: 'absolute',
            top: 20,
            right: 20,
            background: 'rgba(255, 255, 255, 0.05)',
            border: '1px solid var(--border)',
            borderRadius: '50%',
            width: 36,
            height: 36,
            color: 'var(--text-secondary)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            transition: 'all 0.2s',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.color = 'var(--accent-cyan)';
            e.currentTarget.style.borderColor = 'var(--accent-cyan)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.color = 'var(--text-secondary)';
            e.currentTarget.style.borderColor = 'var(--border)';
          }}
        >
          <X size={18} />
        </button>

        {/* Top Badges */}
        <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', marginBottom: 14 }}>
          <span className="tech-chip">{project.category.toUpperCase()}</span>
          {project.badge && (
            <span
              style={{
                background: 'linear-gradient(135deg, var(--accent-purple), var(--accent-blue))',
                color: '#fff',
                padding: '4px 12px',
                borderRadius: 'var(--radius-full)',
                fontSize: '0.78rem',
                fontWeight: 700,
              }}
            >
              ★ {project.badge}
            </span>
          )}
          <span style={{ color: 'var(--text-muted)', fontSize: '0.85rem', alignSelf: 'center', marginLeft: 'auto' }}>
            {project.date}
          </span>
        </div>

        {/* Title & Subtitle */}
        <h2 style={{ fontSize: '1.8rem', fontWeight: 800, marginBottom: 6, color: 'var(--text-primary)' }}>
          {project.title}
        </h2>
        <p style={{ color: 'var(--accent-cyan)', fontSize: '1rem', marginBottom: 20, fontWeight: 500 }}>
          {project.subtitle}
        </p>

        {/* Summary */}
        <p style={{ color: 'var(--text-secondary)', lineHeight: 1.7, marginBottom: 24, fontSize: '0.95rem' }}>
          {project.summary}
        </p>

        {/* Key Features & Highlights */}
        <div style={{ marginBottom: 24 }}>
          <h4 style={{ fontSize: '1rem', color: 'var(--text-primary)', marginBottom: 12, display: 'flex', alignItems: 'center', gap: 8 }}>
            <CheckCircle size={18} color="var(--accent-cyan)" /> Key Features & Engineering Achievements
          </h4>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {project.highlights.map((h, idx) => (
              <div key={idx} style={{ display: 'flex', gap: 10, fontSize: '0.9rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
                <span style={{ color: 'var(--accent-cyan)', flexShrink: 0 }}>▹</span>
                <span>{h}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Tech Stack Chips */}
        <div style={{ marginBottom: 24 }}>
          <h4 style={{ fontSize: '0.95rem', color: 'var(--text-primary)', marginBottom: 10, display: 'flex', alignItems: 'center', gap: 8 }}>
            <Layers size={16} color="var(--accent-purple)" /> Technologies & Frameworks
          </h4>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
            {project.tech.map((t) => (
              <span
                key={t}
                style={{
                  background: 'rgba(255, 255, 255, 0.05)',
                  border: '1px solid var(--border)',
                  color: 'var(--text-primary)',
                  padding: '4px 12px',
                  borderRadius: 'var(--radius-sm)',
                  fontSize: '0.82rem',
                }}
              >
                {t}
              </span>
            ))}
          </div>
        </div>

        {/* Hardware & Software Specs Box */}
        {project.hardwareSoftwareDetails && (
          <div
            style={{
              background: 'rgba(0, 242, 254, 0.04)',
              border: '1px dashed rgba(0, 242, 254, 0.25)',
              borderRadius: 'var(--radius-md)',
              padding: '16px',
              marginBottom: 28,
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, color: 'var(--accent-cyan)', fontSize: '0.88rem', fontWeight: 700, marginBottom: 6 }}>
              <Cpu size={16} /> Architecture & Specification Details
            </div>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', fontFamily: 'var(--font-code)', margin: 0 }}>
              {project.hardwareSoftwareDetails}
            </p>
          </div>
        )}

        {/* Action Buttons */}
        <div style={{ display: 'flex', gap: 14, flexWrap: 'wrap' }}>
          {project.github && (
            <a href={project.github} target="_blank" rel="noreferrer" className="btn btn-primary btn-sm">
              <Github size={16} /> View GitHub Code
            </a>
          )}
          {project.demo ? (
            <a href={project.demo} target="_blank" rel="noreferrer" className="btn btn-outline btn-sm">
              <ExternalLink size={16} /> Live Demo
            </a>
          ) : (
            <span style={{ color: 'var(--text-muted)', fontSize: '0.85rem', alignSelf: 'center' }}>
              🔒 Enterprise / Hardware Prototype
            </span>
          )}
        </div>
      </div>
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: scale(0.96); }
          to { opacity: 1; transform: scale(1); }
        }
      `}</style>
    </div>
  );
}
