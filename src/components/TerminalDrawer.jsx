import { useState, useRef, useEffect } from 'react';
import { Terminal as TerminalIcon, X, Maximize2, Minimize2, Send } from 'lucide-react';

export default function TerminalDrawer({ data, isOpen, setIsOpen }) {
  const [history, setHistory] = useState([
    { type: 'system', text: 'Welcome to Nandan Sagar S CLI [v2.4.0]' },
    { type: 'system', text: 'Type "help" or click chip buttons below to run commands.' },
  ]);
  const [inputVal, setInputVal] = useState('');
  const [isExpanded, setIsExpanded] = useState(false);
  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [history, isOpen]);

  const handleCommand = (cmdStr) => {
    const cmd = cmdStr.trim().toLowerCase();
    if (!cmd) return;

    const newHistory = [...history, { type: 'user', text: `$ ${cmdStr}` }];

    switch (cmd) {
      case 'help':
        newHistory.push({
          type: 'output',
          text: `Available Commands:
  • bio       : Brief background & engineering overview
  • skills    : Technical competencies & proficiency
  • projects  : Key projects & technical highlights
  • contact   : Email, phone, & social media links
  • clear     : Clear terminal history
  • exit      : Close terminal drawer`,
        });
        break;
      case 'bio':
      case 'about':
        newHistory.push({
          type: 'output',
          text: `${data.personal.name} — ${data.personal.tagline}
Location: ${data.personal.location}
${data.about.bio}`,
        });
        break;
      case 'skills': {
        const skillList = Object.entries(data.skills)
          .map(([cat, list]) => `[${cat}]\n` + list.map(s => `  - ${s.name} (${s.level}%)`).join('\n'))
          .join('\n\n');
        newHistory.push({ type: 'output', text: skillList });
        break;
      }
      case 'projects': {
        const projList = data.projects
          .map(p => `[${p.title}] (${p.category.toUpperCase()}) - ${p.subtitle}\n  Tech: ${p.tech.join(', ')}\n  Highlight: ${p.highlights[0]}`)
          .join('\n\n');
        newHistory.push({ type: 'output', text: projList });
        break;
      }
      case 'contact':
        newHistory.push({
          type: 'output',
          text: `Email : ${data.personal.email}
Phone : ${data.personal.phone} / ${data.personal.phone2}
GitHub: ${data.personal.github}
LinkedIn: ${data.personal.linkedin}`,
        });
        break;
      case 'clear':
        setHistory([]);
        setInputVal('');
        return;
      case 'exit':
        setIsOpen(false);
        break;
      default:
        newHistory.push({
          type: 'error',
          text: `Command not found: "${cmdStr}". Type "help" for available commands.`,
        });
        break;
    }

    setHistory(newHistory);
    setInputVal('');
  };

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        style={{
          position: 'fixed',
          bottom: 24,
          left: 24,
          zIndex: 1500,
          background: 'linear-gradient(135deg, var(--bg-card), rgba(0, 242, 254, 0.15))',
          border: '1px solid var(--accent-cyan)',
          color: 'var(--accent-cyan)',
          padding: '12px 18px',
          borderRadius: 'var(--radius-full)',
          boxShadow: 'var(--shadow-glow)',
          display: 'flex',
          alignItems: 'center',
          gap: 10,
          cursor: 'pointer',
          fontFamily: 'var(--font-code)',
          fontSize: '0.85rem',
          fontWeight: 600,
          transition: 'all 0.3s ease',
        }}
        onMouseEnter={(e) => (e.currentTarget.style.transform = 'translateY(-3px)')}
        onMouseLeave={(e) => (e.currentTarget.style.transform = 'translateY(0)')}
      >
        <TerminalIcon size={18} /> CLI Console
      </button>
    );
  }

  return (
    <div
      style={{
        position: 'fixed',
        bottom: isExpanded ? 0 : 20,
        left: isExpanded ? 0 : 20,
        right: isExpanded ? 0 : 'auto',
        top: isExpanded ? 0 : 'auto',
        width: isExpanded ? '100vw' : 'clamp(320px, 90vw, 550px)',
        height: isExpanded ? '100vh' : '420px',
        zIndex: 2500,
        background: '#070a12',
        border: isExpanded ? 'none' : '1px solid var(--accent-cyan)',
        borderRadius: isExpanded ? 0 : 'var(--radius-md)',
        boxShadow: '0 20px 50px rgba(0, 0, 0, 0.8)',
        display: 'flex',
        flexDirection: 'column',
        fontFamily: 'var(--font-code)',
        overflow: 'hidden',
        animation: 'slideUp 0.3s ease-out',
      }}
    >
      {/* Terminal Header */}
      <div
        style={{
          background: '#0e1422',
          padding: '10px 16px',
          borderBottom: '1px solid var(--border)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <div style={{ display: 'flex', gap: 6 }}>
            <span style={{ width: 10, height: 10, borderRadius: '50%', background: '#ff5f56' }} />
            <span style={{ width: 10, height: 10, borderRadius: '50%', background: '#ffbd2e' }} />
            <span style={{ width: 10, height: 10, borderRadius: '50%', background: '#27c93f' }} />
          </div>
          <span style={{ color: 'var(--text-secondary)', fontSize: '0.82rem', fontWeight: 600 }}>
            nandan-terminal ~ bash
          </span>
        </div>

        <div style={{ display: 'flex', gap: 10, color: 'var(--text-secondary)' }}>
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            style={{ background: 'none', border: 'none', color: 'inherit', cursor: 'pointer', display: 'flex' }}
          >
            {isExpanded ? <Minimize2 size={16} /> : <Maximize2 size={16} />}
          </button>
          <button
            onClick={() => setIsOpen(false)}
            style={{ background: 'none', border: 'none', color: 'inherit', cursor: 'pointer', display: 'flex' }}
          >
            <X size={16} />
          </button>
        </div>
      </div>

      {/* Terminal Output */}
      <div
        style={{
          flex: 1,
          padding: '16px',
          overflowY: 'auto',
          fontSize: '0.85rem',
          lineHeight: 1.6,
          display: 'flex',
          flexDirection: 'column',
          gap: 8,
        }}
      >
        {history.map((item, i) => (
          <div
            key={i}
            style={{
              color:
                item.type === 'user'
                  ? 'var(--accent-cyan)'
                  : item.type === 'error'
                  ? '#f87171'
                  : item.type === 'system'
                  ? 'var(--accent-purple)'
                  : 'var(--text-secondary)',
              whiteSpace: 'pre-wrap',
            }}
          >
            {item.text}
          </div>
        ))}
        <div ref={bottomRef} />
      </div>

      {/* Interactive Command Chips */}
      <div
        style={{
          padding: '6px 14px',
          background: '#090d17',
          borderTop: '1px solid var(--border)',
          display: 'flex',
          gap: 6,
          overflowX: 'auto',
        }}
      >
        {['bio', 'skills', 'projects', 'contact', 'help', 'clear'].map((chip) => (
          <button
            key={chip}
            onClick={() => handleCommand(chip)}
            style={{
              background: 'rgba(0, 242, 254, 0.08)',
              border: '1px solid rgba(0, 242, 254, 0.2)',
              color: 'var(--accent-cyan)',
              padding: '3px 10px',
              borderRadius: '12px',
              fontSize: '0.75rem',
              cursor: 'pointer',
              whiteSpace: 'nowrap',
              fontFamily: 'var(--font-code)',
            }}
          >
            {chip}
          </button>
        ))}
      </div>

      {/* Terminal Input Line */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleCommand(inputVal);
        }}
        style={{
          display: 'flex',
          alignItems: 'center',
          padding: '10px 14px',
          background: '#06080f',
          borderTop: '1px solid var(--border)',
        }}
      >
        <span style={{ color: 'var(--accent-cyan)', marginRight: 8 }}>$</span>
        <input
          type="text"
          value={inputVal}
          onChange={(e) => setInputVal(e.target.value)}
          placeholder="Type command ('help', 'projects')..."
          style={{
            flex: 1,
            background: 'transparent',
            border: 'none',
            outline: 'none',
            color: 'var(--text-primary)',
            fontFamily: 'var(--font-code)',
            fontSize: '0.85rem',
          }}
        />
        <button type="submit" style={{ background: 'none', border: 'none', color: 'var(--accent-cyan)', cursor: 'pointer' }}>
          <Send size={14} />
        </button>
      </form>
    </div>
  );
}
