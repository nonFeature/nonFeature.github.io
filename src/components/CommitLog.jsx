import React, { useState, useEffect } from 'react';
import { GitCommit, ExternalLink, User, Calendar, Copy, Check } from 'lucide-react';
import { githubApi } from '../services/githubApi';

export default function CommitLog({ owner, repo, currentBranch }) {
  const [commits, setCommits] = useState([]);
  const [loading, setLoading] = useState(true);
  const [copiedSha, setCopiedSha] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    async function loadCommits() {
      if (!owner || !repo) return;
      setLoading(true);
      setError('');
      try {
        const data = await githubApi.getCommits(owner, repo, currentBranch);
        setCommits(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    loadCommits();
  }, [owner, repo, currentBranch]);

  const handleCopySha = (sha) => {
    navigator.clipboard.writeText(sha);
    setCopiedSha(sha);
    setTimeout(() => setCopiedSha(''), 2000);
  };

  if (loading) {
    return (
      <div className="commits-loading">
        <div className="md3-spinner"></div>
        <p>Загрузка истории коммитов...</p>
      </div>
    );
  }

  if (error) {
    return <div className="commits-error">{error}</div>;
  }

  return (
    <div className="commits-container">
      <div className="commits-header">
        <h2>
          <GitCommit size={24} />
          История коммитов ({currentBranch})
        </h2>
      </div>

      <div className="timeline">
        {commits.map((item) => {
          const shaShort = item.sha.substring(0, 7);
          const author = item.commit.author;
          const avatar = item.author?.avatar_url;

          return (
            <div key={item.sha} className="commit-card">
              <div className="avatar-wrapper">
                {avatar ? (
                  <img src={avatar} alt={author.name} className="avatar-img" />
                ) : (
                  <div className="avatar-fallback"><User size={16} /></div>
                )}
              </div>

              <div className="commit-details">
                <h3 className="commit-msg">{item.commit.message}</h3>

                <div className="commit-meta">
                  <span className="author-name">{author.name}</span>
                  <span className="dot">•</span>
                  <span className="commit-date">
                    <Calendar size={13} />
                    {new Date(author.date).toLocaleString('ru-RU')}
                  </span>
                </div>
              </div>

              <div className="commit-actions">
                <button
                  className="sha-badge"
                  onClick={() => handleCopySha(item.sha)}
                  title="Скопировать SHA"
                >
                  {copiedSha === item.sha ? <Check size={14} /> : <Copy size={14} />}
                  <span>{shaShort}</span>
                </button>

                <a
                  href={item.html_url}
                  target="_blank"
                  rel="noreferrer"
                  className="github-btn"
                  title="Открыть на GitHub"
                >
                  <ExternalLink size={14} />
                </a>
              </div>
            </div>
          );
        })}
      </div>

      <style>{`
        .commits-container {
          max-width: 1000px;
          margin: 0 auto;
          padding: 24px;
        }

        .commits-header {
          margin-bottom: 24px;
        }
        .commits-header h2 {
          display: flex;
          align-items: center;
          gap: 10px;
          font-family: 'Google Sans', sans-serif;
          color: var(--md-sys-color-on-surface);
        }

        .timeline {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .commit-card {
          display: flex;
          align-items: center;
          gap: 16px;
          background-color: var(--md-sys-color-surface-container-lowest);
          border: 1px solid var(--md-sys-color-outline-variant);
          border-radius: var(--md-sys-shape-corner-m);
          padding: 16px;
          box-shadow: var(--md-sys-elevation-1);
          transition: transform 0.15s ease, box-shadow 0.15s ease;
        }

        .commit-card:hover {
          transform: translateY(-2px);
          box-shadow: var(--md-sys-elevation-2);
        }

        .avatar-img {
          width: 40px;
          height: 40px;
          border-radius: 50%;
        }

        .avatar-fallback {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          background-color: var(--md-sys-color-surface-container-high);
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .commit-details {
          flex: 1;
          min-width: 0;
        }

        .commit-msg {
          font-size: 0.95rem;
          font-weight: 500;
          color: var(--md-sys-color-on-surface);
          margin-bottom: 6px;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .commit-meta {
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 0.8rem;
          color: var(--md-sys-color-outline);
        }

        .author-name {
          font-weight: 500;
          color: var(--md-sys-color-on-surface-variant);
        }

        .commit-date {
          display: flex;
          align-items: center;
          gap: 4px;
        }

        .commit-actions {
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .sha-badge {
          display: flex;
          align-items: center;
          gap: 4px;
          background-color: var(--md-sys-color-surface-container-high);
          color: var(--md-sys-color-primary);
          border: none;
          padding: 6px 12px;
          border-radius: var(--md-sys-shape-corner-full);
          font-family: 'Roboto Mono', monospace;
          font-size: 0.8rem;
          cursor: pointer;
        }

        .sha-badge:hover {
          background-color: var(--md-sys-color-primary-container);
        }

        .github-btn {
          color: var(--md-sys-color-outline);
          padding: 6px;
          display: flex;
          align-items: center;
        }
        .github-btn:hover {
          color: var(--md-sys-color-primary);
        }

        .commits-loading {
          text-align: center;
          padding: 60px;
          color: var(--md-sys-color-outline);
        }
      `}</style>
    </div>
  );
}
