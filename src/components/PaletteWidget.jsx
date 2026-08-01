import React, { useState } from 'react';
import { Palette, Copy, Check, Sparkles } from 'lucide-react';

const PALETTE_COLORS = [
  { hex: '#eec643', name: 'Saffron Gold', role: 'Primary Accent', m3Token: '--md-sys-color-primary' },
  { hex: '#e24700', name: 'Flame Orange', role: 'Secondary Accent', m3Token: '--md-sys-color-secondary' },
  { hex: '#2d2d2a', name: 'Jet Slate', role: 'Surface Container High', m3Token: '--md-sys-color-surface-container-high' },
  { hex: '#101113', name: 'Night Deep', role: 'Background / Surface', m3Token: '--md-sys-color-background' }
];

export default function PaletteWidget() {
  const [copiedHex, setCopiedHex] = useState('');

  const handleCopy = (hex) => {
    navigator.clipboard.writeText(hex);
    setCopiedHex(hex);
    setTimeout(() => setCopiedHex(''), 2000);
  };

  return (
    <div className="m3-palette-card">
      <div className="card-header">
        <div className="title-group">
          <Palette className="palette-icon" size={22} />
          <div>
            <h3>Material Design 3 Color System</h3>
            <span className="subtitle">Фирменная цветовая палитра nonFeature</span>
          </div>
        </div>
        <span className="coolors-badge">
          <Sparkles size={12} />
          Coolors #07987083182847801
        </span>
      </div>

      <div className="swatches-grid">
        {PALETTE_COLORS.map((color) => (
          <div
            key={color.hex}
            className="swatch-card"
            style={{ '--swatch-color': color.hex }}
            onClick={() => handleCopy(color.hex)}
            title="Нажмите, чтобы скопировать HEX"
          >
            <div className="swatch-preview" style={{ backgroundColor: color.hex }}>
              <button className="swatch-copy-btn">
                {copiedHex === color.hex ? <Check size={16} /> : <Copy size={16} />}
              </button>
            </div>

            <div className="swatch-info">
              <span className="swatch-hex">{color.hex}</span>
              <span className="swatch-name">{color.name}</span>
              <span className="swatch-role">{color.role}</span>
            </div>
          </div>
        ))}
      </div>

      <style>{`
        .m3-palette-card {
          background-color: var(--color-jet);
          border: 1px solid var(--md-sys-color-outline-variant);
          border-radius: var(--md-sys-shape-corner-xl);
          padding: 28px;
          margin: 40px 0;
          box-shadow: var(--md-sys-elevation-2);
        }

        .card-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 24px;
          flex-wrap: wrap;
          gap: 12px;
        }

        .title-group {
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .palette-icon {
          color: var(--color-gold);
        }

        .title-group h3 {
          font-family: 'Google Sans', sans-serif;
          font-size: 1.35rem;
          font-weight: 700;
          color: var(--md-sys-color-on-surface);
        }

        .subtitle {
          font-size: 0.85rem;
          color: var(--md-sys-color-on-surface-variant);
        }

        .coolors-badge {
          display: flex;
          align-items: center;
          gap: 6px;
          background-color: rgba(238, 198, 67, 0.12);
          color: var(--color-gold);
          padding: 6px 14px;
          border-radius: var(--md-sys-shape-corner-full);
          font-size: 0.78rem;
          font-weight: 600;
        }

        .swatches-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 16px;
        }

        .swatch-card {
          background-color: var(--color-night);
          border: 1px solid var(--md-sys-color-outline-variant);
          border-radius: var(--md-sys-shape-corner-l);
          overflow: hidden;
          cursor: pointer;
          transition: all 0.25s ease;
        }

        .swatch-card:hover {
          transform: translateY(-4px);
          border-color: var(--swatch-color);
          box-shadow: 0 8px 20px rgba(0, 0, 0, 0.5);
        }

        .swatch-preview {
          height: 90px;
          position: relative;
          display: flex;
          align-items: flex-end;
          justify-content: flex-end;
          padding: 10px;
        }

        .swatch-copy-btn {
          width: 32px;
          height: 32px;
          border-radius: 50%;
          background: rgba(0, 0, 0, 0.4);
          backdrop-filter: blur(4px);
          color: #ffffff;
          border: none;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          opacity: 0.8;
          transition: opacity 0.2s ease;
        }

        .swatch-card:hover .swatch-copy-btn {
          opacity: 1;
        }

        .swatch-info {
          padding: 14px;
          display: flex;
          flex-direction: column;
          gap: 2px;
        }

        .swatch-hex {
          font-family: 'Roboto Mono', monospace;
          font-size: 1rem;
          font-weight: 700;
          color: var(--md-sys-color-on-surface);
        }

        .swatch-name {
          font-size: 0.88rem;
          font-weight: 600;
          color: var(--md-sys-color-on-surface-variant);
        }

        .swatch-role {
          font-size: 0.75rem;
          color: var(--md-sys-color-outline);
        }
      `}</style>
    </div>
  );
}
