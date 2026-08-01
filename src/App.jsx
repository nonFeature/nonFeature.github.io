import React, { useState, useEffect } from 'react';
import NavigationDrawer from './components/NavigationDrawer';
import OrgHome from './components/OrgHome';
import ProjectsSection from './components/ProjectsSection';
import DocsSection from './components/DocsSection';
import CommunitySection from './components/CommunitySection';

const VALID_DESTINATIONS = ['main', 'projects', 'docs', 'contact'];

const getDestinationFromHash = () => {
  const hash = window.location.hash.replace('#', '').trim();
  return VALID_DESTINATIONS.includes(hash) ? hash : 'main';
};

export default function App() {
  const [activeDestination, setActiveDestination] = useState(() => getDestinationFromHash());
  const [collapsed, setCollapsed] = useState(() => {
    const saved = localStorage.getItem('md3_drawer_collapsed');
    return saved !== null ? JSON.parse(saved) : false;
  });
  const [mobileOpen, setMobileOpen] = useState(false);
  const [theme, setTheme] = useState(() => localStorage.getItem('md3_theme') || 'dark');

  // Persist desktop drawer collapsed state in localStorage
  useEffect(() => {
    localStorage.setItem('md3_drawer_collapsed', JSON.stringify(collapsed));
  }, [collapsed]);

  // Sync window.location.hash when activeDestination changes
  useEffect(() => {
    if (window.location.hash !== `#${activeDestination}`) {
      window.location.hash = activeDestination;
    }
  }, [activeDestination]);

  // Listen to browser hashchange (Back / Forward navigation or manual URL edit)
  useEffect(() => {
    const handleHashChange = () => {
      const dest = getDestinationFromHash();
      setActiveDestination(dest);
    };
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

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
      {/* Side Navigation Drawer with attached edge toggle button */}
      <NavigationDrawer
        activeDestination={activeDestination}
        onSelectDestination={setActiveDestination}
        theme={theme}
        onToggleTheme={handleToggleTheme}
        collapsed={collapsed}
        onToggleCollapse={() => setCollapsed(!collapsed)}
        mobileOpen={mobileOpen}
        onToggleMobile={() => setMobileOpen(prev => !prev)}
        onCloseMobile={() => setMobileOpen(false)}
      />

      {/* Main Content Workspace */}
      <div className={`m3-workspace ${collapsed ? 'drawer-collapsed' : ''}`}>
        <main className="m3-content-body">
          <div className="destination-pane animate-fade-in" key={activeDestination}>
            {activeDestination === 'main' && <OrgHome />}
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
          min-height: 100dvh;
          background-color: var(--md-sys-color-background);
          color: var(--md-sys-color-on-background);
          width: 100%;
          overflow-x: hidden;
        }

        .m3-workspace {
          flex: 1;
          display: flex;
          flex-direction: column;
          min-width: 0;
          margin-left: 300px;
          transition: margin-left 0.3s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .m3-workspace.drawer-collapsed {
          margin-left: 78px;
        }

        .m3-content-body {
          flex: 1;
          display: flex;
          flex-direction: column;
          padding: 32px;
          width: 100%;
        }

        .destination-pane {
          flex: 1;
          width: 100%;
        }

        @media (max-width: 768px) {
          .m3-app-shell {
            flex-direction: column;
            width: 100%;
          }

          .m3-workspace,
          .m3-workspace.drawer-collapsed {
            margin-left: 0 !important;
            width: 100%;
          }

          .m3-content-body {
            padding: 72px 16px 16px 16px;
            width: 100%;
          }
        }
      `}</style>
    </div>
  );
}
