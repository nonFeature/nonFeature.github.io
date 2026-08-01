import React from 'react';
import { Building2, BookOpen, FolderTree, GitCommit, Tag } from 'lucide-react';

const NAV_ITEMS = [
  { id: 'home', label: 'Организация', icon: Building2 },
  { id: 'docs', label: 'Документация', icon: BookOpen },
  { id: 'code', label: 'Код и Файлы', icon: FolderTree },
  { id: 'commits', label: 'Коммиты', icon: GitCommit },
  { id: 'releases', label: 'Релизы', icon: Tag },
];

export default function NavigationRail({ activeTab, onTabChange }) {
  return (
    <aside className="nav-rail">
      <div className="rail-container">
        {NAV_ITEMS.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              className={`rail-item ${isActive ? 'active' : ''}`}
              onClick={() => onTabChange(item.id)}
            >
              <div className="icon-indicator">
                <Icon size={22} />
              </div>
              <span className="rail-label">{item.label}</span>
            </button>
          );
        })}
      </div>

      <style>{`
        .nav-rail {
          width: 96px;
          background-color: var(--md-sys-color-surface-container);
          border-right: 1px solid var(--md-sys-color-outline-variant);
          padding: 16px 0;
          display: flex;
          flex-direction: column;
          align-items: center;
          flex-shrink: 0;
        }

        .rail-container {
          display: flex;
          flex-direction: column;
          gap: 12px;
          width: 100%;
          align-items: center;
        }

        .rail-item {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 4px;
          background: transparent;
          border: none;
          cursor: pointer;
          width: 100%;
          padding: 4px 0;
          color: var(--md-sys-color-on-surface-variant);
          transition: color 0.2s ease;
        }

        .icon-indicator {
          width: 56px;
          height: 32px;
          border-radius: var(--md-sys-shape-corner-full);
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.25s cubic-bezier(0.2, 0, 0, 1);
        }

        .rail-item:hover .icon-indicator {
          background-color: var(--md-sys-color-surface-container-high);
          color: var(--md-sys-color-on-surface);
        }

        .rail-item.active .icon-indicator {
          background-color: var(--md-sys-color-secondary-container);
          color: var(--md-sys-color-on-secondary-container);
        }

        .rail-item.active .rail-label {
          font-weight: 700;
          color: var(--md-sys-color-on-surface);
        }

        .rail-label {
          font-size: 0.72rem;
          font-family: 'Google Sans', sans-serif;
          letter-spacing: 0.2px;
          text-align: center;
        }

        @media (max-width: 768px) {
          .nav-rail {
            width: 100%;
            height: auto;
            border-right: none;
            border-bottom: 1px solid var(--md-sys-color-outline-variant);
            padding: 8px 0;
          }
          .rail-container {
            flex-direction: row;
            justify-content: space-around;
          }
        }
      `}</style>
    </aside>
  );
}
