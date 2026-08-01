import React from 'react';
import { Heart, Send } from 'lucide-react';
import logoIcon from '../assets/logo.svg';

const GithubIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"/>
    <path d="M9 18c-4.51 2-5-2-7-2"/>
  </svg>
);

export default function Footer({ onNavigate }) {
  return (
    <footer className="site-footer">
      <div className="footer-container">
        <div className="footer-top-row">
          <div className="footer-brand">
            <img src={logoIcon} alt="nonFeature" className="footer-logo-img" />
            <div className="brand-info">
              <span className="brand-name">nonFeature</span>
              <span className="brand-tagline">Engineering & Open Source Collective</span>
            </div>
          </div>

          <div className="footer-nav">
            <button onClick={() => onNavigate('hero')}>Главная</button>
            <button onClick={() => onNavigate('about')}>О нас</button>
            <button onClick={() => onNavigate('projects')}>Проекты</button>
            <button onClick={() => onNavigate('docs')}>Документация</button>
            <button onClick={() => onNavigate('community')}>Сообщество</button>
          </div>
        </div>

        <div className="footer-bottom-row">
          <p className="copyright">
            © 2026 <b>nonFeature</b> Collective. Все права защищены. Разработано на чистом Material Design 3.
          </p>

          <div className="footer-socials">
            <a href="https://github.com/nonFeature" target="_blank" rel="noreferrer" title="GitHub">
              <GithubIcon />
            </a>
            <a href="https://t.me/nonfeature" target="_blank" rel="noreferrer" title="Telegram">
              <Send size={18} />
            </a>
          </div>
        </div>
      </div>

      <style>{`
        .site-footer {
          background-color: #0a0b0d;
          border-top: 1px solid var(--md-sys-color-outline-variant);
          padding: 48px 24px 32px;
          color: var(--md-sys-color-on-surface-variant);
        }

        .footer-container {
          max-width: 1200px;
          margin: 0 auto;
          display: flex;
          flex-direction: column;
          gap: 36px;
        }

        .footer-top-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
          flex-wrap: wrap;
          gap: 24px;
        }

        .footer-brand {
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .footer-logo-img {
          width: 38px;
          height: 38px;
          border-radius: var(--md-sys-shape-corner-m);
          object-fit: cover;
        }

        .brand-info {
          display: flex;
          flex-direction: column;
        }

        .brand-name {
          font-family: 'Feature Mono', monospace;
          font-weight: 500;
          font-size: 1.3rem;
          color: var(--md-sys-color-on-surface);
        }

        .brand-tagline {
          font-size: 0.75rem;
          color: var(--md-sys-color-outline);
        }

        .palette-badge {
          display: flex;
          align-items: center;
          gap: 10px;
          background-color: var(--color-jet);
          padding: 6px 14px;
          border-radius: var(--md-sys-shape-corner-full);
          border: 1px solid var(--md-sys-color-outline-variant);
        }

        .palette-title {
          font-size: 0.78rem;
          font-weight: 600;
          color: var(--color-gold);
        }

        .swatch-list {
          display: flex;
          gap: 6px;
        }

        .swatch {
          width: 16px;
          height: 16px;
          border-radius: 50%;
          border: 1px solid rgba(255, 255, 255, 0.2);
        }

        .footer-nav {
          display: flex;
          gap: 16px;
        }

        .footer-nav button {
          background: none;
          border: none;
          color: var(--md-sys-color-on-surface-variant);
          font-size: 0.88rem;
          font-weight: 500;
          cursor: pointer;
          transition: color 0.2s ease;
        }

        .footer-nav button:hover {
          color: var(--color-gold);
        }

        .footer-bottom-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
          border-top: 1px solid var(--md-sys-color-outline-variant);
          padding-top: 24px;
          font-size: 0.82rem;
          color: var(--md-sys-color-outline);
        }

        .copyright b {
          color: var(--md-sys-color-on-surface);
        }

        .footer-socials {
          display: flex;
          gap: 12px;
        }

        .footer-socials a {
          color: var(--md-sys-color-outline);
          transition: color 0.2s ease;
        }

        .footer-socials a:hover {
          color: var(--color-gold);
        }
      `}</style>
    </footer>
  );
}
