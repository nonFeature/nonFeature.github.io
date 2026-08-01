import React, { useState } from 'react';
import { Search, Sun, Moon, Key, GitFork, Star, BookOpen, Layers } from 'lucide-react';

const QUICK_REPOS = [
  'nonFeature/site',
  'facebook/react',
  'vitejs/vite',
  'torvalds/linux',
  'mrdoob/three.js'
];

export default function TopAppBar({ 
  currentRepo, 
  onRepoSearch, 
  theme, 
  onToggleTheme, 
  onOpenSettings, 
  repoInfo,
  loading 
}) {
  const [searchInput, setSearchInput] = useState(currentRepo);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (searchInput.trim()) {
      onRepoSearch(searchInput.trim());
    }
  };

  const handleSelectQuick = (repo) => {
    setSearchInput(repo);
    onRepoSearch(repo);
  };

  return (
    <header className="top-app-bar">
      <div className="bar-container">
        {/* Logo & Brand */}
        <div className="brand-section">
          <div className="logo-icon">
            <span className="material-symbols-outlined">folder_code</span>
          </div>
          <div className="brand-titles">
            <h1 className="app-title">M3 RepoDocs</h1>
            <span className="app-subtitle">Material Design 3 Explorer</span>
          </div>
        </div>

        {/* Search Bar */}
        <form onSubmit={handleSubmit} className="search-form">
          <div className="search-input-wrapper">
            <Search className="search-icon" size={20} />
            <input
              type="text"
              className="search-input"
              placeholder="Введите owner/repo (например: facebook/react)..."
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
            />
            {searchInput && (
              <button 
                type="button" 
                className="clear-btn" 
                onClick={() => setSearchInput('')}
                title="Очистить"
              >
                ×
              </button>
            )}
          </div>
          <button type="submit" className="search-btn" disabled={loading}>
            {loading ? 'Загрузка...' : 'Найти'}
          </button>
        </form>

        {/* Action Controls */}
        <div className="actions-section">
          <button 
            className="icon-action-btn" 
            onClick={onToggleTheme}
            title={theme === 'dark' ? 'Переключить на светлую тему' : 'Переключить на тёмную тему'}
          >
            {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
          </button>

          <button 
            className="icon-action-btn" 
            onClick={onOpenSettings}
            title="Настройки GitHub API Token"
          >
            <Key size={20} />
          </button>
        </div>
      </div>

      {/* Repo Metadata Banner */}
      {repoInfo && (
        <div className="repo-meta-bar">
          <div className="repo-title">
            <BookOpen size={18} />
            <a 
              href={repoInfo.html_url} 
              target="_blank" 
              rel="noreferrer" 
              className="repo-full-name"
            >
              {repoInfo.full_name}
            </a>
            {repoInfo.private ? (
              <span className="badge private">Private</span>
            ) : (
              <span className="badge public">Public</span>
            )}
          </div>

          <div className="repo-stats">
            <span className="stat-chip" title="Звёзды">
              <Star size={14} className="star-icon" />
              {repoInfo.stargazers_count?.toLocaleString()}
            </span>
            <span className="stat-chip" title="Форки">
              <GitFork size={14} />
              {repoInfo.forks_count?.toLocaleString()}
            </span>
            {repoInfo.language && (
              <span className="stat-chip lang-chip">
                {repoInfo.language}
              </span>
            )}
          </div>

          <div className="quick-chips">
            <span className="quick-label">Быстрый переход:</span>
            {QUICK_REPOS.map(repo => (
              <button 
                key={repo} 
                className={`quick-chip ${currentRepo === repo ? 'active' : ''}`}
                onClick={() => handleSelectQuick(repo)}
              >
                {repo.split('/')[1]}
              </button>
            ))}
          </div>
        </div>
      )}

      <style>{`
        .top-app-bar {
          background-color: var(--md-sys-color-surface-container);
          border-bottom: 1px solid var(--md-sys-color-outline-variant);
          position: sticky;
          top: 0;
          z-index: 100;
          box-shadow: var(--md-sys-elevation-1);
        }

        .bar-container {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 12px 24px;
          gap: 16px;
          max-width: 1400px;
          margin: 0 auto;
        }

        .brand-section {
          display: flex;
          align-items: center;
          gap: 12px;
          min-width: 200px;
        }

        .logo-icon {
          width: 44px;
          height: 44px;
          border-radius: var(--md-sys-shape-corner-m);
          background-color: var(--md-sys-color-primary-container);
          color: var(--md-sys-color-on-primary-container);
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .app-title {
          font-family: 'Google Sans', sans-serif;
          font-size: 1.25rem;
          font-weight: 700;
          color: var(--md-sys-color-on-surface);
          line-height: 1.2;
        }

        .app-subtitle {
          font-size: 0.75rem;
          color: var(--md-sys-color-outline);
        }

        .search-form {
          display: flex;
          align-items: center;
          gap: 8px;
          flex: 1;
          max-width: 540px;
        }

        .search-input-wrapper {
          position: relative;
          display: flex;
          align-items: center;
          flex: 1;
        }

        .search-icon {
          position: absolute;
          left: 14px;
          color: var(--md-sys-color-outline);
          pointer-events: none;
        }

        .search-input {
          width: 100%;
          height: 44px;
          padding: 0 36px 0 44px;
          border-radius: var(--md-sys-shape-corner-full);
          border: 1px solid var(--md-sys-color-outline-variant);
          background-color: var(--md-sys-color-surface-container-high);
          color: var(--md-sys-color-on-surface);
          font-size: 0.95rem;
          outline: none;
          transition: all 0.2s ease;
        }

        .search-input:focus {
          border-color: var(--md-sys-color-primary);
          background-color: var(--md-sys-color-surface-container-lowest);
          box-shadow: 0 0 0 3px var(--md-sys-color-primary-container);
        }

        .clear-btn {
          position: absolute;
          right: 12px;
          background: none;
          border: none;
          font-size: 1.2rem;
          color: var(--md-sys-color-outline);
          cursor: pointer;
        }

        .search-btn {
          height: 44px;
          padding: 0 20px;
          border-radius: var(--md-sys-shape-corner-full);
          background-color: var(--md-sys-color-primary);
          color: var(--md-sys-color-on-primary);
          border: none;
          font-weight: 500;
          font-size: 0.9rem;
          cursor: pointer;
          transition: opacity 0.2s ease;
        }

        .search-btn:hover {
          opacity: 0.9;
        }

        .actions-section {
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .icon-action-btn {
          width: 44px;
          height: 44px;
          border-radius: var(--md-sys-shape-corner-full);
          background-color: var(--md-sys-color-surface-container-high);
          color: var(--md-sys-color-on-surface-variant);
          border: none;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: background-color 0.2s ease;
        }

        .icon-action-btn:hover {
          background-color: var(--md-sys-color-surface-container-highest);
          color: var(--md-sys-color-primary);
        }

        .repo-meta-bar {
          background-color: var(--md-sys-color-surface-container-low);
          border-top: 1px solid var(--md-sys-color-outline-variant);
          padding: 8px 24px;
          display: flex;
          align-items: center;
          flex-wrap: wrap;
          gap: 16px;
          justify-content: space-between;
          font-size: 0.875rem;
          max-width: 1400px;
          margin: 0 auto;
        }

        .repo-title {
          display: flex;
          align-items: center;
          gap: 8px;
          font-weight: 600;
        }

        .repo-full-name {
          color: var(--md-sys-color-primary);
          text-decoration: none;
          font-size: 1rem;
        }

        .repo-full-name:hover {
          text-decoration: underline;
        }

        .badge {
          font-size: 0.7rem;
          padding: 2px 8px;
          border-radius: var(--md-sys-shape-corner-full);
          font-weight: 500;
          text-transform: uppercase;
        }

        .badge.public {
          background-color: var(--md-sys-color-secondary-container);
          color: var(--md-sys-color-on-secondary-container);
        }

        .repo-stats {
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .stat-chip {
          display: flex;
          align-items: center;
          gap: 4px;
          background-color: var(--md-sys-color-surface-container);
          padding: 4px 10px;
          border-radius: var(--md-sys-shape-corner-s);
          color: var(--md-sys-color-on-surface-variant);
          font-size: 0.8rem;
        }

        .star-icon {
          color: #e3a008;
        }

        .quick-chips {
          display: flex;
          align-items: center;
          gap: 6px;
        }

        .quick-label {
          color: var(--md-sys-color-outline);
          font-size: 0.75rem;
        }

        .quick-chip {
          background: transparent;
          border: 1px solid var(--md-sys-color-outline-variant);
          color: var(--md-sys-color-on-surface-variant);
          padding: 3px 10px;
          border-radius: var(--md-sys-shape-corner-full);
          font-size: 0.75rem;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .quick-chip:hover {
          border-color: var(--md-sys-color-primary);
          color: var(--md-sys-color-primary);
        }

        .quick-chip.active {
          background-color: var(--md-sys-color-primary-container);
          color: var(--md-sys-color-on-primary-container);
          border-color: transparent;
        }

        @media (max-width: 768px) {
          .bar-container {
            flex-direction: column;
            align-items: stretch;
          }
          .search-form {
            max-width: 100%;
          }
          .repo-meta-bar {
            flex-direction: column;
            align-items: flex-start;
          }
        }
      `}</style>
    </header>
  );
}
