import { useState, useEffect } from 'react';
import { portfolioData } from './data/portfolioData';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Experience from './components/Experience';
import Projects from './components/Projects';
import ProjectModal from './components/ProjectModal';
import Skills from './components/Skills';
import HardwareVisualizer from './components/HardwareVisualizer';
import Contact from './components/Contact';
import TerminalDrawer from './components/TerminalDrawer';
import ParticleBackground from './components/ParticleBackground';
import { ArrowUp, CheckCircle, Copy } from 'lucide-react';

function App() {
  const [theme, setTheme] = useState('dark');
  const [selectedProject, setSelectedProject] = useState(null);
  const [isTerminalOpen, setIsTerminalOpen] = useState(false);
  const [toasts, setToasts] = useState([]);
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleTheme = () => setTheme((t) => (t === 'dark' ? 'light' : 'dark'));

  const showToast = (message) => {
    const id = Date.now();
    setToasts((prev) => [...prev, { id, message }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 3500);
  };

  const handleCopyEmail = (email) => {
    navigator.clipboard.writeText(email);
    showToast(`Copied email to clipboard: ${email}`);
  };

  const handleCopyPhone = (phone) => {
    navigator.clipboard.writeText(phone);
    showToast(`Copied phone number: ${phone}`);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', position: 'relative' }}>
      {/* Interactive Canvas Background Nodes */}
      <ParticleBackground />

      {/* Toast Notification Layer */}
      <div className="toast-container">
        {toasts.map((t) => (
          <div key={t.id} className="toast">
            <CheckCircle size={18} color="var(--accent-cyan)" />
            <span>{t.message}</span>
          </div>
        ))}
      </div>

      {/* Navigation Bar */}
      <Navbar theme={theme} toggleTheme={toggleTheme} onOpenTerminal={() => setIsTerminalOpen(true)} />

      {/* Main Sections */}
      <main style={{ flex: 1, position: 'relative', zIndex: 1 }}>
        <Hero data={portfolioData.personal} onCopyEmail={handleCopyEmail} />
        <About data={portfolioData.about} />
        <Experience data={portfolioData.experience} />
        <Projects data={portfolioData.projects} onSelectProject={(p) => setSelectedProject(p)} />
        <HardwareVisualizer />
        <Skills data={portfolioData.skills} />
        <Contact data={portfolioData.personal} onCopyEmail={handleCopyEmail} onCopyPhone={handleCopyPhone} />
      </main>

      {/* Project Detail Modal */}
      <ProjectModal project={selectedProject} onClose={() => setSelectedProject(null)} />

      {/* CLI Developer Terminal Drawer */}
      <TerminalDrawer data={portfolioData} isOpen={isTerminalOpen} setIsOpen={setIsTerminalOpen} />

      {/* Scroll To Top Floating Button */}
      {showScrollTop && (
        <button
          onClick={scrollToTop}
          aria-label="Scroll to top"
          style={{
            position: 'fixed',
            bottom: 24,
            right: 24,
            zIndex: 1400,
            width: 44,
            height: 44,
            borderRadius: '50%',
            background: 'var(--bg-card)',
            border: '1px solid var(--accent-cyan)',
            color: 'var(--accent-cyan)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            boxShadow: 'var(--shadow-glow)',
            transition: 'all 0.3s ease',
          }}
          onMouseEnter={(e) => (e.currentTarget.style.transform = 'translateY(-3px)')}
          onMouseLeave={(e) => (e.currentTarget.style.transform = 'translateY(0)')}
        >
          <ArrowUp size={20} />
        </button>
      )}

      {/* Footer */}
      <footer
        style={{
          textAlign: 'center',
          padding: '36px 20px',
          color: 'var(--text-secondary)',
          borderTop: '1px solid var(--border)',
          fontSize: '0.9rem',
          background: 'var(--bg-secondary)',
        }}
      >
        <p style={{ marginBottom: 6 }}>
          Designed & Architected by <strong style={{ color: 'var(--text-primary)' }}>Nandan Sagar S</strong> •{' '}
          {new Date().getFullYear()}
        </p>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.82rem' }}>
          Android (Kotlin / Jetpack Compose) • Embedded & IoT (ESP32 / LoRa) • GenAI (Agentforce / Vertex AI)
        </p>
      </footer>
    </div>
  );
}

export default App;