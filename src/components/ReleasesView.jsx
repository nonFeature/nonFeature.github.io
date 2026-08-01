import React, { useState, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Tag, Download, Calendar, ExternalLink } from 'lucide-react';
import { githubApi } from '../services/githubApi';

export default function ReleasesView({ owner, repo }) {
  const [releases, setReleases] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    async function loadReleases() {
      if (!owner || !repo) return;
      setLoading(true);
      setError('');
      try {
        const data = await githubApi.getReleases(owner, repo);
        setReleases(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    loadReleases();
  }, [owner, repo]);

  if (loading) {
    return (
      <div className="releases-loading">
        <div className="md3-spinner"></div>
        <p>Загрузка релизов...</p>
      </div>
    );
  }

  if (releases.length === 0) {
    return (
      <div className="releases-empty">
        <Tag size={48} />
        <h3>Релизы не найдены</h3>
        <p>Для этого репозитория пока нет опубликованных релизов.</p>
      </div>
    );
  }

  return (
    <div className="releases-container">
      <h2 className="page-title">
        <Tag size={24} />
        Релизы и релиз-ноты ({releases.length})
      </h2>

      <div className="releases-grid">
        {releases.map((rel) => (
          <div key={rel.id} className="release-card">
            <div className="release-card-header">
              <div className="title-group">
                <span className="tag-badge">{rel.tag_name}</span>
                <h3 className="release-name">{rel.name || rel.tag_name}</h3>
              </div>

              <div className="date-group">
                <Calendar size={14} />
                <span>{new Date(rel.published_at).toLocaleDateString('ru-RU')}</span>
              </div>
            </div>

            <div className="release-body markdown-body">
              <ReactMarkdown remarkPlugins={[remarkGfm]}>
                {rel.body || '*Описание отсутствуют*'}
              </ReactMarkdown>
            </div>

            <div className="release-footer">
              <div className="assets-list">
                {rel.assets?.map((asset) => (
                  <a
                    key={asset.id}
                    href={asset.browser_download_url}
                    className="asset-download-btn"
                  >
                    <Download size={14} />
                    <span>{asset.name}</span>
                    <span className="size">({(asset.size / (1024 * 1024)).toFixed(2)} MB)</span>
                  </a>
                ))}
              </div>

              <a
                href={rel.html_url}
                target="_blank"
                rel="noreferrer"
                className="view-github-link"
              >
                <span>Открыть на GitHub</span>
                <ExternalLink size={14} />
              </a>
            </div>
          </div>
        ))}
      </div>

      <style>{`
        .releases-container {
          max-width: 1000px;
          margin: 0 auto;
          padding: 24px;
        }

        .page-title {
          display: flex;
          align-items: center;
          gap: 10px;
          margin-bottom: 24px;
          font-family: 'Google Sans', sans-serif;
          color: var(--md-sys-color-on-surface);
        }

        .releases-grid {
          display: flex;
          flex-direction: column;
          gap: 24px;
        }

        .release-card {
          background-color: var(--md-sys-color-surface-container-lowest);
          border: 1px solid var(--md-sys-color-outline-variant);
          border-radius: var(--md-sys-shape-corner-l);
          padding: 24px;
          box-shadow: var(--md-sys-elevation-1);
        }

        .release-card-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          border-bottom: 1px solid var(--md-sys-color-outline-variant);
          padding-bottom: 12px;
          margin-bottom: 16px;
        }

        .title-group {
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .tag-badge {
          background-color: var(--md-sys-color-primary-container);
          color: var(--md-sys-color-on-primary-container);
          padding: 4px 12px;
          border-radius: var(--md-sys-shape-corner-full);
          font-family: 'Roboto Mono', monospace;
          font-weight: 600;
          font-size: 0.85rem;
        }

        .release-name {
          font-family: 'Google Sans', sans-serif;
          font-size: 1.2rem;
          color: var(--md-sys-color-on-surface);
        }

        .date-group {
          display: flex;
          align-items: center;
          gap: 6px;
          color: var(--md-sys-color-outline);
          font-size: 0.85rem;
        }

        .release-body {
          margin-bottom: 20px;
          font-size: 0.92rem;
        }

        .release-footer {
          display: flex;
          align-items: center;
          justify-content: space-between;
          border-top: 1px solid var(--md-sys-color-outline-variant);
          padding-top: 12px;
          flex-wrap: wrap;
          gap: 12px;
        }

        .assets-list {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
        }

        .asset-download-btn {
          display: flex;
          align-items: center;
          gap: 6px;
          background-color: var(--md-sys-color-surface-container-high);
          color: var(--md-sys-color-on-surface);
          text-decoration: none;
          padding: 6px 12px;
          border-radius: var(--md-sys-shape-corner-s);
          font-size: 0.8rem;
          transition: background 0.2s ease;
        }
        .asset-download-btn:hover {
          background-color: var(--md-sys-color-primary-container);
          color: var(--md-sys-color-on-primary-container);
        }

        .view-github-link {
          display: flex;
          align-items: center;
          gap: 4px;
          color: var(--md-sys-color-primary);
          text-decoration: none;
          font-weight: 500;
          font-size: 0.85rem;
        }

        .releases-loading, .releases-empty {
          text-align: center;
          padding: 60px;
          color: var(--md-sys-color-outline);
        }
      `}</style>
    </div>
  );
}
