import React from 'react';
import logoIcon from '../assets/logo.svg';

const GithubIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"/>
    <path d="M9 18c-4.51 2-5-2-7-2"/>
  </svg>
);

const DESTINATIONS = [
  { id: 'overview', label: 'Главная', icon: 'home' },
  { id: 'projects', label: 'Проекты', icon: 'grid_view' },
  { id: 'docs', label: 'Документация', icon: 'auto_stories' }
];

export default function NavigationDrawer({ 
  activeDestination, 
  onSelectDestination, 
  theme, 
  onToggleTheme,
  collapsed,
  onToggleCollapse,
  mobileOpen,
  onCloseMobile
}) {
  const handleSelect = (id) => {
    onSelectDestination(id);
    if (onCloseMobile) onCloseMobile();
  };

  return (
    <div className="drawer-outer-wrapper">
      {/* Backdrop overlay with smooth opacity transition */}
      <div 
        className={`mobile-drawer-backdrop ${mobileOpen ? 'active' : ''}`} 
        onClick={onCloseMobile} 
      />

      <aside className={`m3-navigation-drawer ${collapsed ? 'collapsed' : ''} ${mobileOpen ? 'mobile-open' : ''}`}>
        {/* Floating Toggle Button on Right Border (Desktop) */}
        <button 
          className="collapse-toggle-btn-floating"
          onClick={onToggleCollapse}
          title={collapsed ? 'Развернуть меню' : 'Свернуть меню'}
        >
          <span className="material-symbols-outlined">
            {collapsed ? 'chevron_right' : 'chevron_left'}
          </span>
        </button>

        {/* Drawer Header */}
        <div className="drawer-header">
          <div className="brand-group" onClick={() => handleSelect('overview')}>
            <img src={logoIcon} alt="nonFeature" className="brand-logo-img" />
            <div className="brand-titles">
              <span className="brand-name">nonFeature</span>
            </div>
          </div>

          {/* Close button on mobile */}
          <button className="mobile-close-btn" onClick={onCloseMobile} title="Закрыть">
            <span className="material-symbols-outlined">close</span>
          </button>
        </div>

        {/* Drawer Destinations List */}
        <nav className="drawer-destinations">
          {DESTINATIONS.map((item) => {
            const isActive = activeDestination === item.id;
            return (
              <button
                key={item.id}
                className={`drawer-destination-item ${isActive ? 'active' : ''}`}
                onClick={() => handleSelect(item.id)}
                title={collapsed && !mobileOpen ? item.label : ''}
              >
                <div className="icon-indicator">
                  <span className="material-symbols-outlined">{item.icon}</span>
                </div>
                
                <div className="label-container">
                  <span className="destination-label">{item.label}</span>
                </div>
              </button>
            );
          })}
        </nav>

        {/* Drawer Footer Actions */}
        <div className="drawer-footer">
          <button className="footer-action-item" onClick={onToggleTheme}>
            <div className="icon-indicator">
              <span className="material-symbols-outlined">
                {theme === 'light' && 'light_mode'}
                {theme === 'dark' && 'dark_mode'}
                {theme === 'amoled' && 'contrast'}
              </span>
            </div>
            
            <div className="label-container">
              <span className="destination-label">
                {theme === 'light' && 'Светлая тема'}
                {theme === 'dark' && 'Тёмная тема'}
                {theme === 'amoled' && 'AMOLED (Чёрная)'}
              </span>
            </div>
          </button>

          <a 
            href="https://github.com/nonFeature" 
            target="_blank" 
            rel="noreferrer" 
            className="footer-action-item"
          >
            <div className="icon-indicator">
              <GithubIcon />
            </div>
            
            <div className="label-container">
              <span className="destination-label">GitHub</span>
            </div>
          </a>

          <a 
            href="https://t.me/nonfeature" 
            target="_blank" 
            rel="noreferrer" 
            className="footer-action-item"
          >
            <div className="icon-indicator flame">
              <span className="material-symbols-outlined">send</span>
            </div>
            
            <div className="label-container">
              <span className="destination-label">Telegram</span>
            </div>
          </a>
        </div>
      </aside>

      <style>{`
        .drawer-outer-wrapper {
          position: sticky;
          top: 0;
          height: 100vh;
          z-index: 100;
        }

        .m3-navigation-drawer {
          width: 300px;
          height: 100vh;
          position: relative;
          background-color: var(--color-jet);
          border-right: 1px solid var(--md-sys-color-outline-variant);
          display: flex;
          flex-direction: column;
          flex-shrink: 0;
          transition: width 0.3s cubic-bezier(0.16, 1, 0.3, 1), transform 0.35s cubic-bezier(0.16, 1, 0.3, 1);
          will-change: width, transform;
          z-index: 100;
          overflow: visible !important;
        }

        .m3-navigation-drawer.collapsed {
          width: 78px;
        }

        /* Floating Toggle Button on the Right Border Edge (Desktop) */
        .collapse-toggle-btn-floating {
          position: absolute;
          right: -15px;
          top: 26px;
          width: 30px;
          height: 30px;
          border-radius: 50%;
          background-color: var(--color-jet);
          border: 1px solid var(--md-sys-color-outline-variant);
          color: var(--color-gold);
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          z-index: 120;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.4);
          transition: background-color 0.2s ease, transform 0.2s ease;
        }

        .collapse-toggle-btn-floating:hover {
          background-color: var(--color-gold);
          color: #101113;
          transform: scale(1.1);
        }

        .drawer-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0 16px;
          height: 80px;
          flex-shrink: 0;
          overflow: hidden;
        }

        .brand-group {
          display: flex;
          align-items: center;
          gap: 14px;
          cursor: pointer;
          min-width: 0;
        }

        .brand-logo-img {
          width: 44px;
          height: 44px;
          border-radius: var(--md-sys-shape-corner-m);
          object-fit: cover;
          flex-shrink: 0;
        }

        .brand-titles {
          display: flex;
          flex-direction: column;
          min-width: 0;
          transition: opacity 0.2s ease;
        }

        .m3-navigation-drawer.collapsed .brand-titles {
          opacity: 0;
          pointer-events: none;
        }

        .brand-name {
          font-family: 'Feature Mono', monospace;
          font-size: 1.35rem;
          font-weight: 500;
          color: var(--md-sys-color-on-surface);
          line-height: 1.2;
          letter-spacing: -0.5px;
          white-space: nowrap;
        }

        .mobile-close-btn {
          display: none;
          background: none;
          border: none;
          color: var(--md-sys-color-on-surface-variant);
          align-items: center;
          justify-content: center;
          padding: 6px;
          cursor: pointer;
        }

        .drawer-destinations {
          flex: 1;
          padding: 12px 10px;
          display: flex;
          flex-direction: column;
          gap: 6px;
          overflow-y: auto;
          overflow-x: hidden;
        }

        .drawer-destination-item {
          display: flex;
          align-items: center;
          gap: 14px;
          height: 56px;
          padding: 0 8px;
          border-radius: var(--md-sys-shape-corner-full);
          background: transparent;
          border: 1px solid transparent;
          color: var(--md-sys-color-on-surface-variant);
          cursor: pointer;
          transition: background-color 0.2s ease, border-color 0.2s ease, color 0.2s ease;
          text-decoration: none;
          width: 100%;
          text-align: left;
          justify-content: flex-start;
          overflow: hidden;
        }

        .icon-indicator {
          width: 42px;
          height: 36px;
          border-radius: var(--md-sys-shape-corner-full);
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
          transition: all 0.2s ease;
        }

        .drawer-destination-item:hover {
          background-color: var(--md-sys-color-surface-container-high);
          color: var(--color-gold);
          border: 1px solid rgba(238, 198, 67, 0.25);
        }

        .drawer-destination-item.active {
          background-color: var(--color-gold);
          color: #101113;
          font-weight: 700;
          border: 1px solid transparent;
        }

        .drawer-destination-item.active .icon-indicator {
          background-color: transparent;
          color: #101113;
        }

        .label-container {
          display: flex;
          align-items: center;
          justify-content: space-between;
          flex: 1;
          min-width: 0;
          transition: opacity 0.2s ease;
        }

        .m3-navigation-drawer.collapsed .label-container {
          opacity: 0;
          pointer-events: none;
        }

        .destination-label {
          font-family: 'Google Sans', sans-serif;
          font-size: 0.92rem;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .drawer-footer {
          padding: 12px 10px;
          display: flex;
          flex-direction: column;
          gap: 6px;
          overflow: hidden;
          flex-shrink: 0;
        }

        .footer-action-item {
          display: flex;
          align-items: center;
          gap: 14px;
          height: 56px;
          padding: 0 8px;
          border-radius: var(--md-sys-shape-corner-full);
          background: transparent;
          border: 1px solid transparent;
          color: var(--md-sys-color-on-surface-variant);
          font-family: 'Google Sans', sans-serif;
          font-size: 0.92rem;
          cursor: pointer;
          text-decoration: none;
          transition: background-color 0.2s ease, border-color 0.2s ease, color 0.2s ease;
          justify-content: flex-start;
          overflow: hidden;
        }

        .footer-action-item:hover {
          background-color: var(--md-sys-color-surface-container-high);
          color: var(--color-gold);
          border: 1px solid rgba(238, 198, 67, 0.25);
        }

        .icon-indicator.flame {
          color: var(--color-flame);
        }

        /* Mobile Layout & Smooth Slide-out Drawer */
        @media (max-width: 768px) {
          .drawer-outer-wrapper {
            position: relative !important;
            height: auto;
            z-index: 1000 !important;
          }

          .mobile-drawer-backdrop {
            position: fixed;
            top: 0; left: 0; right: 0; bottom: 0;
            background: rgba(0, 0, 0, 0.65);
            backdrop-filter: blur(4px);
            z-index: 990 !important;
            opacity: 0;
            pointer-events: none;
            transition: opacity 0.35s cubic-bezier(0.16, 1, 0.3, 1);
          }

          .mobile-drawer-backdrop.active {
            opacity: 1;
            pointer-events: auto;
          }

          .m3-navigation-drawer {
            position: fixed;
            top: 0; left: 0; bottom: 0;
            width: min(320px, calc(100vw - 56px)) !important;
            height: 100vh;
            transform: translate3d(-100%, 0, 0) !important;
            box-shadow: none !important;
            border-right: none !important;
            z-index: 1000 !important;
            overflow: hidden !important;
            transition: transform 0.35s cubic-bezier(0.16, 1, 0.3, 1) !important;
            will-change: transform;
          }

          .m3-navigation-drawer.mobile-open {
            transform: translate3d(0, 0, 0) !important;
            box-shadow: 0 0 36px rgba(0, 0, 0, 0.8) !important;
            border-right: 1px solid var(--md-sys-color-outline-variant) !important;
          }

          .m3-navigation-drawer.mobile-open .label-container,
          .m3-navigation-drawer.mobile-open .brand-titles {
            opacity: 1 !important;
          }

          .mobile-close-btn {
            display: flex;
            width: 36px;
            height: 36px;
            border-radius: 50%;
            background-color: var(--md-sys-color-surface-container);
            color: var(--color-gold);
          }

          .collapse-toggle-btn-floating {
            display: none;
          }
        }
      `}</style>
    </div>
  );
}
