import { useState, useEffect, useRef } from 'react';
import { Cpu, Radio, Smartphone, Play, RefreshCw, Zap, CheckCircle2, Sliders } from 'lucide-react';

export default function HardwareVisualizer() {
  const [activeTab, setActiveTab] = useState('pov');

  // POV State
  const [rpm, setRpm] = useState(1800);
  const [povPattern, setPovPattern] = useState('NANDAN 3D');
  const canvasPovRef = useRef(null);

  // LoRa State
  const [transmitting, setTransmitting] = useState(true);
  const [telemetry, setTelemetry] = useState({ temp: 24.5, humidity: 62, rssi: -91, distance: 2.0 });

  // SMS Parser State
  const [smsText, setSmsText] = useState('Debited Rs 450.00 at Starbucks via HDFC Bank UPI on 28-Oct-2025. Avl Bal Rs 12,450.00');
  const [parsedData, setParsedData] = useState({
    amount: '₹450.00',
    type: 'DEBIT',
    category: 'Food & Dining',
    bank: 'HDFC Bank',
    balance: '₹12,450.00',
  });

  // POV LED Array Animation
  useEffect(() => {
    if (activeTab !== 'pov') return;
    const canvas = canvasPovRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let angle = 0;
    let animId;

    const renderPOV = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const cx = canvas.width / 2;
      const cy = canvas.height / 2;
      const radius = 90;

      // Outer ring glow
      ctx.beginPath();
      ctx.arc(cx, cy, radius, 0, Math.PI * 2);
      ctx.strokeStyle = 'rgba(0, 242, 254, 0.15)';
      ctx.lineWidth = 4;
      ctx.stroke();

      // Rotating LED blades (2 blades)
      const speedFactor = (rpm / 1800) * 0.15;
      angle += speedFactor;

      for (let b = 0; b < 2; b++) {
        const bladeAngle = angle + b * Math.PI;
        ctx.beginPath();
        ctx.moveTo(cx, cy);
        ctx.lineTo(cx + Math.cos(bladeAngle) * radius, cy + Math.sin(bladeAngle) * radius);
        ctx.strokeStyle = 'rgba(0, 242, 254, 0.8)';
        ctx.lineWidth = 3;
        ctx.stroke();

        // Glowing LEDs on blade
        for (let i = 1; i <= 8; i++) {
          const r = (radius / 8) * i;
          const lx = cx + Math.cos(bladeAngle) * r;
          const ly = cy + Math.sin(bladeAngle) * r;
          ctx.beginPath();
          ctx.arc(lx, ly, 3, 0, Math.PI * 2);
          ctx.fillStyle = i % 2 === 0 ? '#00f2fe' : '#7928ca';
          ctx.fill();
        }
      }

      // Persistence Hologram Visual Text
      ctx.font = 'bold 16px "Fira Code", monospace';
      ctx.fillStyle = 'rgba(0, 242, 254, 0.9)';
      ctx.textAlign = 'center';
      ctx.shadowColor = '#00f2fe';
      ctx.shadowBlur = 10;
      ctx.fillText(povPattern, cx, cy + 5);
      ctx.shadowBlur = 0;

      animId = requestAnimationFrame(renderPOV);
    };

    renderPOV();
    return () => cancelAnimationFrame(animId);
  }, [activeTab, rpm, povPattern]);

  // LoRa Telemetry Loop
  useEffect(() => {
    if (activeTab !== 'lora' || !transmitting) return;
    const interval = setInterval(() => {
      setTelemetry({
        temp: (24 + Math.random() * 1.5).toFixed(1),
        humidity: Math.floor(60 + Math.random() * 5),
        rssi: Math.floor(-94 + Math.random() * 6),
        distance: 2.0,
      });
    }, 2000);
    return () => clearInterval(interval);
  }, [activeTab, transmitting]);

  // Parse SMS Simulation
  const handleParseSms = (textToParse = smsText) => {
    let amt = '₹0.00';
    let bnk = 'Unknown Bank';
    let cat = 'General';

    const amtMatch = textToParse.match(/(?:Rs|INR|₹)\s?([\d,]+\.?\d*)/i);
    if (amtMatch) amt = `₹${amtMatch[1]}`;

    if (textToParse.toLowerCase().includes('hdfc')) bnk = 'HDFC Bank';
    else if (textToParse.toLowerCase().includes('sbi')) bnk = 'State Bank of India';
    else if (textToParse.toLowerCase().includes('icici')) bnk = 'ICICI Bank';

    if (textToParse.toLowerCase().includes('starbucks') || textToParse.toLowerCase().includes('zomato') || textToParse.toLowerCase().includes('swiggy')) {
      cat = 'Food & Dining';
    } else if (textToParse.toLowerCase().includes('amazon') || textToParse.toLowerCase().includes('flipkart')) {
      cat = 'Shopping';
    } else if (textToParse.toLowerCase().includes('uber') || textToParse.toLowerCase().includes('metro')) {
      cat = 'Transport';
    }

    setParsedData({
      amount: amt,
      type: textToParse.toLowerCase().includes('credited') ? 'CREDIT' : 'DEBIT',
      category: cat,
      bank: bnk,
      balance: '₹12,450.00',
    });
  };

  return (
    <section className="section">
      <div style={{ textAlign: 'center', marginBottom: 30 }}>
        <span
          style={{
            background: 'rgba(121, 40, 202, 0.12)',
            border: '1px solid rgba(121, 40, 202, 0.3)',
            color: 'var(--accent-purple)',
            padding: '4px 14px',
            borderRadius: 'var(--radius-full)',
            fontSize: '0.8rem',
            fontWeight: 700,
            fontFamily: 'var(--font-code)',
          }}
        >
          ⚡ INTERACTIVE ENGINEERING LAB
        </span>
        <h2 className="section-title" style={{ marginTop: 12 }}>
          Live Project <span>Simulators</span>
        </h2>
        <p className="section-subtitle">Test real-time interactive demos of Nandan's hardware & mobile firmware algorithms</p>
        <div className="underline" />
      </div>

      {/* Simulator Selector Tabs */}
      <div style={{ display: 'flex', justifyContent: 'center', gap: 12, flexWrap: 'wrap', marginBottom: 32 }}>
        {[
          { id: 'pov', label: '3D POV LED Display', icon: <Cpu size={16} /> },
          { id: 'lora', label: '2km LoRa RF Telemetry', icon: <Radio size={16} /> },
          { id: 'sms', label: 'SMS Bank Regex Parser', icon: <Smartphone size={16} /> },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            style={{
              padding: '10px 22px',
              borderRadius: 'var(--radius-full)',
              fontSize: '0.9rem',
              fontWeight: 600,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: 8,
              border: activeTab === tab.id ? '1px solid var(--accent-cyan)' : '1px solid var(--border)',
              background: activeTab === tab.id ? 'rgba(0, 242, 254, 0.14)' : 'rgba(255, 255, 255, 0.03)',
              color: activeTab === tab.id ? 'var(--accent-cyan)' : 'var(--text-secondary)',
              transition: 'all 0.25s ease',
              boxShadow: activeTab === tab.id ? 'var(--shadow-glow)' : 'none',
            }}
          >
            {tab.icon} {tab.label}
          </button>
        ))}
      </div>

      {/* TAB 1: 3D POV LED DISPLAY SIMULATOR */}
      {activeTab === 'pov' && (
        <div className="glass-card" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 32, alignItems: 'center' }}>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <canvas ref={canvasPovRef} width={250} height={250} style={{ background: '#050811', borderRadius: '50%', border: '1px solid var(--accent-cyan)', boxShadow: 'var(--shadow-glow)' }} />
            <p style={{ color: 'var(--accent-cyan)', fontFamily: 'var(--font-code)', fontSize: '0.82rem', marginTop: 12 }}>
              ● ROTATING AT {rpm} RPM (POV ILLUSION)
            </p>
          </div>

          <div>
            <h3 style={{ fontSize: '1.25rem', fontWeight: 800, marginBottom: 8 }}>POV 3D Volumetric Display Controller</h3>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', lineHeight: 1.6, marginBottom: 20 }}>
              Adjust motor RPM speed and select spatial 3D POV graphic patterns rendered in real-time by C/C++ firmware running on ESP32 & Arduino.
            </p>

            {/* Controls */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16, marginBottom: 24 }}>
              <div>
                <label style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--text-primary)', fontSize: '0.85rem', marginBottom: 6 }}>
                  <span>Motor Rotation Speed (RPM):</span> <strong>{rpm} RPM</strong>
                </label>
                <input
                  type="range"
                  min="600"
                  max="2400"
                  step="100"
                  value={rpm}
                  onChange={(e) => setRpm(Number(e.target.value))}
                  style={{ width: '100%', accentColor: 'var(--accent-cyan)', cursor: 'pointer' }}
                />
              </div>

              <div>
                <label style={{ color: 'var(--text-primary)', fontSize: '0.85rem', display: 'block', marginBottom: 6 }}>
                  POV Hologram Preset Pattern:
                </label>
                <div style={{ display: 'flex', gap: 8 }}>
                  {['NANDAN 3D', 'ESP32 POV', 'ECE 2026'].map((pat) => (
                    <button
                      key={pat}
                      onClick={() => setPovPattern(pat)}
                      style={{
                        padding: '6px 14px',
                        borderRadius: 'var(--radius-sm)',
                        background: povPattern === pat ? 'var(--accent-cyan)' : 'rgba(255, 255, 255, 0.05)',
                        color: povPattern === pat ? '#000' : 'var(--text-secondary)',
                        border: 'none',
                        fontWeight: 600,
                        fontSize: '0.8rem',
                        cursor: 'pointer',
                      }}
                    >
                      {pat}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div style={{ background: 'rgba(0, 242, 254, 0.05)', padding: '12px 16px', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-highlight)', fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
              ⚡ <strong>Firmware Spec:</strong> PID speed loop stability ±0.5% @ 1800 RPM | Optical indexing via Hall Effect pulse interrupt.
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: 2KM LORA TELEMETRY SIMULATOR */}
      {activeTab === 'lora' && (
        <div className="glass-card">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 28, alignItems: 'center' }}>
            <div>
              <h3 style={{ fontSize: '1.25rem', fontWeight: 800, marginBottom: 8 }}>LoRa SX1276 868MHz Transceiver Monitor</h3>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', lineHeight: 1.6, marginBottom: 20 }}>
                Live telemetry packets received over tested 2.0 km line-of-sight urban environment from low-power ESP32 sensor node.
              </p>

              {/* Status Indicator & Toggle */}
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20, flexWrap: 'wrap', gap: 10 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                  <span style={{ width: 10, height: 10, borderRadius: '50%', background: transmitting ? 'var(--accent-green)' : 'var(--text-muted)', boxShadow: transmitting ? '0 0 10px var(--accent-green)' : 'none' }} />
                  <span style={{ color: transmitting ? 'var(--accent-green)' : 'var(--text-muted)', fontWeight: 700, fontSize: '0.9rem' }}>
                    {transmitting ? 'RECEIVING RF TELEMETRY (2.0 KM)' : 'TELEMETRY STREAM PAUSED'}
                  </span>
                </div>

                <button
                  onClick={() => setTransmitting(!transmitting)}
                  className="btn btn-outline btn-sm"
                  style={{ fontSize: '0.78rem', padding: '4px 12px' }}
                >
                  {transmitting ? 'Pause Signal' : 'Resume Signal'}
                </button>
              </div>

              {/* Telemetry Grid */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                <div style={{ background: 'rgba(255, 255, 255, 0.03)', padding: '12px', borderRadius: 'var(--radius-md)', border: '1px solid var(--border)' }}>
                  <div style={{ color: 'var(--text-muted)', fontSize: '0.78rem' }}>TEMPERATURE</div>
                  <div style={{ color: 'var(--accent-cyan)', fontSize: '1.4rem', fontWeight: 800 }}>{telemetry.temp} °C</div>
                </div>
                <div style={{ background: 'rgba(255, 255, 255, 0.03)', padding: '12px', borderRadius: 'var(--radius-md)', border: '1px solid var(--border)' }}>
                  <div style={{ color: 'var(--text-muted)', fontSize: '0.78rem' }}>HUMIDITY</div>
                  <div style={{ color: 'var(--accent-purple)', fontSize: '1.4rem', fontWeight: 800 }}>{telemetry.humidity} %</div>
                </div>
                <div style={{ background: 'rgba(255, 255, 255, 0.03)', padding: '12px', borderRadius: 'var(--radius-md)', border: '1px solid var(--border)' }}>
                  <div style={{ color: 'var(--text-muted)', fontSize: '0.78rem' }}>RF RSSI SIGNAL</div>
                  <div style={{ color: 'var(--accent-green)', fontSize: '1.4rem', fontWeight: 800 }}>{telemetry.rssi} dBm</div>
                </div>
                <div style={{ background: 'rgba(255, 255, 255, 0.03)', padding: '12px', borderRadius: 'var(--radius-md)', border: '1px solid var(--border)' }}>
                  <div style={{ color: 'var(--text-muted)', fontSize: '0.78rem' }}>RANGE TESTED</div>
                  <div style={{ color: 'var(--accent-amber)', fontSize: '1.4rem', fontWeight: 800 }}>{telemetry.distance} KM</div>
                </div>
              </div>
            </div>

            {/* Visual Signal Pulse Box */}
            <div style={{ background: '#050811', padding: '24px', borderRadius: 'var(--radius-md)', border: '1px solid var(--border)', textAlign: 'center' }}>
              <div style={{ fontFamily: 'var(--font-code)', fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: 16 }}>
                ESP32 TX ─── [ LoRa 868MHz Radio Wave ] ─── RX Gateway
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', margin: '20px 0' }}>
                <div style={{ background: 'rgba(0, 242, 254, 0.15)', border: '1px solid var(--accent-cyan)', padding: '10px 14px', borderRadius: 'var(--radius-md)', color: 'var(--accent-cyan)', fontSize: '0.82rem', fontWeight: 700 }}>
                  📡 TX Node
                </div>
                <div style={{ flex: 1, height: 2, background: 'linear-gradient(90deg, var(--accent-cyan), var(--accent-purple))', margin: '0 10px', position: 'relative' }}>
                  <div style={{ position: 'absolute', top: -5, left: '50%', width: 12, height: 12, borderRadius: '50%', background: 'var(--accent-cyan)', animation: 'pulseGlow 1s infinite' }} />
                </div>
                <div style={{ background: 'rgba(121, 40, 202, 0.15)', border: '1px solid var(--accent-purple)', padding: '10px 14px', borderRadius: 'var(--radius-md)', color: 'var(--accent-purple)', fontSize: '0.82rem', fontWeight: 700 }}>
                  💻 RX Node
                </div>
              </div>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.82rem' }}>
                Packet Payload: <span style={{ fontFamily: 'var(--font-code)', color: 'var(--accent-cyan)' }}>{`{"t":${telemetry.temp},"h":${telemetry.humidity},"rssi":${telemetry.rssi}}`}</span>
              </p>
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: SMS BANK REGEX PARSER SIMULATOR */}
      {activeTab === 'sms' && (
        <div className="glass-card">
          <h3 style={{ fontSize: '1.25rem', fontWeight: 800, marginBottom: 8 }}>Budget Buddy Android SMS Parser Engine</h3>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginBottom: 20 }}>
            Test how Nandan's custom BroadcastReceiver regex algorithm extracts transaction data from bank SMS alerts with 85% accuracy.
          </p>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 24 }}>
            <div>
              <label style={{ display: 'block', fontSize: '0.85rem', color: 'var(--text-primary)', marginBottom: 8, fontWeight: 600 }}>
                Sample Bank SMS String:
              </label>
              <textarea
                rows={4}
                value={smsText}
                onChange={(e) => {
                  setSmsText(e.target.value);
                  handleParseSms(e.target.value);
                }}
                style={{
                  width: '100%',
                  padding: '12px',
                  background: '#050811',
                  border: '1px solid var(--border)',
                  borderRadius: 'var(--radius-md)',
                  color: 'var(--accent-cyan)',
                  fontFamily: 'var(--font-code)',
                  fontSize: '0.85rem',
                  marginBottom: 14,
                  outline: 'none',
                }}
              />

              <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                <button
                  onClick={() => {
                    const sample = 'Debited Rs 450.00 at Starbucks via HDFC Bank UPI on 28-Oct-2025.';
                    setSmsText(sample);
                    handleParseSms(sample);
                  }}
                  className="btn btn-outline btn-sm"
                >
                  HDFC Starbucks Sample
                </button>
                <button
                  onClick={() => {
                    const sample = 'INR 1,200.00 spent on Flipkart using SBI Credit Card ending 4092.';
                    setSmsText(sample);
                    handleParseSms(sample);
                  }}
                  className="btn btn-outline btn-sm"
                >
                  SBI Flipkart Sample
                </button>
              </div>
            </div>

            {/* Extracted Output */}
            <div style={{ background: 'rgba(0, 242, 254, 0.03)', padding: '20px', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-highlight)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, color: 'var(--accent-cyan)', fontSize: '0.9rem', fontWeight: 700, marginBottom: 16 }}>
                <CheckCircle2 size={18} /> Extracted Transaction Metadata
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: 10, fontFamily: 'var(--font-code)', fontSize: '0.88rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: 'var(--text-muted)' }}>Amount Extracted:</span>
                  <span style={{ color: 'var(--accent-cyan)', fontWeight: 700 }}>{parsedData.amount}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: 'var(--text-muted)' }}>Bank Detected:</span>
                  <span style={{ color: 'var(--text-primary)' }}>{parsedData.bank}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: 'var(--text-muted)' }}>Category Assigned:</span>
                  <span style={{ color: 'var(--accent-purple)', fontWeight: 700 }}>{parsedData.category}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: 'var(--text-muted)' }}>Transaction Type:</span>
                  <span style={{ color: 'var(--accent-amber)', fontWeight: 700 }}>{parsedData.type}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
