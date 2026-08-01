import React from 'react';
import { Sparkles, Sun, Moon, Send, Layers, BookOpen, Code2 } from 'lucide-react';

const GithubIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"/>
    <path d="M9 18c-4.51 2-5-2-7-2"/>
  </svg>
);

export default function Navbar({ activeSection, onNavigate, theme, onToggleTheme }) {
  return (
    <header className="navbar-header">
      <div className="navbar-container">
        {/* Brand Logo & Name */}
        <div className="brand-group" onClick={() => onNavigate('hero')}>
          <div className="brand-icon-box">
            <span className="brand-letter">N</span>
          </div>
          <div className="brand-text">
            <span className="brand-name">nonFeature</span>
            <span className="brand-badge">LABS</span>
          </div>
        </div>

        {/* Center Nav Links */}
        <nav className="nav-links">
          <button 
            className={`nav-link ${activeSection === 'hero' ? 'active' : ''}`}
            onClick={() => onNavigate('hero')}
          >
            Главная
          </button>
          <button 
            className={`nav-link ${activeSection === 'about' ? 'active' : ''}`}
            onClick={() => onNavigate('about')}
          >
            О нас
          </button>
          <button 
            className={`nav-link ${activeSection === 'projects' ? 'active' : ''}`}
            onClick={() => onNavigate('projects')}
          >
            Проекты
          </button>
          <button 
            className={`nav-link ${activeSection === 'docs' ? 'active' : ''}`}
            onClick={() => onNavigate('docs')}
          >
            Документация
          </button>
          <button 
            className={`nav-link ${activeSection === 'community' ? 'active' : ''}`}
            onClick={() => onNavigate('community')}
          >
            Сообщество
          </button>
        </nav>

        {/* Right Action Controls */}
        <div className="nav-actions">
          <button 
            className="theme-toggle-btn"
            onClick={onToggleTheme}
            title={theme === 'dark' ? 'Переключить тему' : 'Переключить тему'}
          >
            {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
          </button>

          <a 
            href="https://github.com/nonFeature" 
            target="_blank" 
            rel="noreferrer" 
            className="github-btn"
          >
            <GithubIcon />
            <span>GitHub</span>
          </a>
        </div>
      </div>

      <style>{`
        .navbar-header {
          position: sticky;
          top: 0;
          z-index: 1000;
          background: rgba(16, 17, 19, 0.85);
          backdrop-filter: blur(16px);
          -webkit-backdrop-filter: blur(16px);
          border-bottom: 1px solid var(--md-sys-color-outline-variant);
        }

        .navbar-container {
          max-width: 1300px;
          margin: 0 auto;
          padding: 14px 24px;
          display: flex;
          align-items: center;
          justify-content: space-between;
        }

        .brand-group {
          display: flex;
          align-items: center;
          gap: 12px;
          cursor: pointer;
        }

        .brand-icon-box {
          width: 40px;
          height: 40px;
          border-radius: var(--md-sys-shape-corner-m);
          background: linear-gradient(135deg, var(--color-flame), var(--color-gold));
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: var(--glow-secondary);
        }

        .brand-letter {
          font-family: 'Google Sans', sans-serif;
          font-weight: 900;
          font-size: 1.4rem;
          color: #101113;
        }

        .brand-text {
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .brand-name {
          font-family: 'Google Sans', sans-serif;
          font-weight: 700;
          font-size: 1.3rem;
          color: var(--md-sys-color-on-surface);
          letter-spacing: -0.5px;
        }

        .brand-badge {
          background-color: var(--md-sys-color-primary-container);
          color: var(--color-gold);
          font-size: 0.68rem;
          font-weight: 800;
          padding: 2px 8px;
          border-radius: var(--md-sys-shape-corner-full);
          letter-spacing: 0.5px;
        }

        .nav-links {
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .nav-link {
          background: transparent;
          border: none;
          color: var(--md-sys-color-on-surface-variant);
          font-family: 'Google Sans', sans-serif;
          font-size: 0.95rem;
          font-weight: 500;
          padding: 8px 16px;
          border-radius: var(--md-sys-shape-corner-full);
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .nav-link:hover {
          color: var(--md-sys-color-on-surface);
          background-color: var(--md-sys-color-surface-container);
        }

        .nav-link.active {
          color: var(--color-gold);
          background-color: var(--md-sys-color-primary-container);
          font-weight: 600;
        }

        .nav-actions {
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .theme-toggle-btn {
          width: 40px;
          height: 40px;
          border-radius: var(--md-sys-shape-corner-full);
          background-color: var(--md-sys-color-surface-container);
          border: 1px solid var(--md-sys-color-outline-variant);
          color: var(--md-sys-color-on-surface);
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .theme-toggle-btn:hover {
          background-color: var(--md-sys-color-surface-container-high);
          color: var(--color-gold);
        }

        .github-btn {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 8px 20px;
          border-radius: var(--md-sys-shape-corner-full);
          background: linear-gradient(135deg, var(--color-flame), #b83900);
          color: #ffffff;
          font-weight: 600;
          font-size: 0.9rem;
          text-decoration: none;
          box-shadow: var(--glow-secondary);
          transition: all 0.2s ease;
        }

        .github-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 0 28px rgba(226, 71, 0, 0.45);
        }

        @media (max-width: 850px) {
          .nav-links { display: none; }
        }
      `}</style>
    </header>
  );
}
