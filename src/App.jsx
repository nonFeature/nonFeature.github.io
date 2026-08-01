import React, { useState, useEffect } from 'react';
import NavigationDrawer from './components/NavigationDrawer';
import OrgHome from './components/OrgHome';
import ProjectsSection from './components/ProjectsSection';
import DocsSection from './components/DocsSection';
import CommunitySection from './components/CommunitySection';

export default function App() {
  const [activeDestination, setActiveDestination] = useState('overview'); // 'overview' | 'projects' | 'docs' | 'contact'
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [theme, setTheme] = useState(() => localStorage.getItem('md3_theme') || 'dark');

  // Sync theme attribute on <html> element
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('md3_theme', theme);
  }, [theme]);

  const handleToggleTheme = () => {
    setTheme(prev => {
      if (prev === 'light') return 'dark';
      if (prev === 'dark') return 'amoled';
      return 'light';
    });
  };

  return (
    <div className="m3-app-shell">
      {/* Floating Mobile Trigger Button (Fixed z-index: 50, strictly lower than drawer z-index: 1000) */}
      <button 
        className="mobile-floating-trigger" 
        onClick={() => setMobileOpen(true)}
        title="Открыть меню"
      >
        <span className="material-symbols-outlined">chevron_right</span>
      </button>

      {/* Side Navigation Drawer */}
      <NavigationDrawer
        activeDestination={activeDestination}
        onSelectDestination={setActiveDestination}
        theme={theme}
        onToggleTheme={handleToggleTheme}
        collapsed={collapsed}
        onToggleCollapse={() => setCollapsed(!collapsed)}
        mobileOpen={mobileOpen}
        onCloseMobile={() => setMobileOpen(false)}
      />

      {/* Main Content Workspace */}
      <div className="m3-workspace">
        <main className="m3-content-body">
          <div className="destination-pane animate-fade-in" key={activeDestination}>
            {activeDestination === 'overview' && <OrgHome />}
            {activeDestination === 'projects' && <ProjectsSection />}
            {activeDestination === 'docs' && <DocsSection />}
            {activeDestination === 'contact' && <CommunitySection />}
          </div>
        </main>
      </div>

      <style>{`
        .m3-app-shell {
          display: flex;
          min-height: 100vh;
          background-color: var(--md-sys-color-background);
          color: var(--md-sys-color-on-background);
        }

        /* Floating Mobile Trigger Button (Strictly z-index: 50) */
        .mobile-floating-trigger {
          display: none;
          position: fixed;
          top: 16px;
          left: 16px;
          width: 44px;
          height: 44px;
          border-radius: 50%;
          background-color: var(--color-jet);
          border: 1px solid var(--md-sys-color-outline-variant);
          color: var(--color-gold);
          align-items: center;
          justify-content: center;
          z-index: 50 !important;
          box-shadow: 0 4px 16px rgba(0, 0, 0, 0.4);
          cursor: pointer;
          transition: transform 0.2s ease, background-color 0.2s ease;
        }

        .mobile-floating-trigger:active {
          transform: scale(0.92);
        }

        .mobile-floating-trigger:hover {
          background-color: var(--color-gold);
          color: #101113;
        }

        .m3-workspace {
          flex: 1;
          display: flex;
          flex-direction: column;
          min-width: 0;
        }

        .m3-content-body {
          flex: 1;
          display: flex;
          flex-direction: column;
          padding: 32px;
        }

        .destination-pane {
          flex: 1;
        }

        @media (max-width: 768px) {
          .m3-app-shell {
            flex-direction: column;
          }
          .mobile-floating-trigger {
            display: flex;
          }
          .m3-content-body {
            padding: 20px 16px 16px 70px;
          }
        }
      `}</style>
    </div>
  );
}
