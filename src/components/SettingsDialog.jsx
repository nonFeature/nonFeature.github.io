import React, { useState, useEffect } from 'react';
import { X, Key, ShieldCheck, RefreshCw, ExternalLink } from 'lucide-react';
import { githubApi } from '../services/githubApi';

export default function SettingsDialog({ isOpen, onClose }) {
  const [tokenInput, setTokenInput] = useState('');
  const [rateLimit, setRateLimit] = useState(null);
  const [loadingRate, setLoadingRate] = useState(false);
  const [savedStatus, setSavedStatus] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setTokenInput(githubApi.getToken());
      fetchRate();
    }
  }, [isOpen]);

  const fetchRate = async () => {
    setLoadingRate(true);
    const data = await githubApi.getRateLimit();
    setRateLimit(data);
    setLoadingRate(false);
  };

  const handleSave = (e) => {
    e.preventDefault();
    githubApi.setToken(tokenInput);
    setSavedStatus(true);
    fetchRate();
    setTimeout(() => setSavedStatus(false), 2000);
  };

  if (!isOpen) return null;

  return (
    <div className="dialog-overlay" onClick={onClose}>
      <div className="dialog-card" onClick={(e) => e.stopPropagation()}>
        <div className="dialog-header">
          <div className="title-area">
            <Key className="header-icon" size={22} />
            <h2>Настройки GitHub API Token</h2>
          </div>
          <button className="close-btn" onClick={onClose}>
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSave} className="dialog-body">
          <p className="description">
            Без токена GitHub ограничивает до <b>60 запросов в час</b> с одного IP. Указание вашего личного <b>Personal Access Token (classic или fine-grained)</b> расширяет лимит до <b>5 000 запросов в час</b>.
          </p>

          <div className="input-group">
            <label className="input-label">GitHub Personal Access Token:</label>
            <input
              type="password"
              className="token-input"
              placeholder="ghp_xxxxxxxxxxxxxxxxxxxx"
              value={tokenInput}
              onChange={(e) => setTokenInput(e.target.value)}
            />
          </div>

          <div className="security-note">
            <ShieldCheck size={16} />
            <span>Токен сохраняется исключительно локально в вашем браузере (localStorage) и не передается на сторонние сервера.</span>
          </div>

          {/* Rate Limit Stats Box */}
          <div className="rate-limit-card">
            <div className="rate-header">
              <span>Текущий статус лимитов API:</span>
              <button type="button" className="refresh-btn" onClick={fetchRate} disabled={loadingRate}>
                <RefreshCw size={14} className={loadingRate ? 'spin' : ''} />
              </button>
            </div>
            {rateLimit ? (
              <div className="rate-stats">
                <div className="stat-box">
                  <span className="stat-num">{rateLimit.remaining} / {rateLimit.limit}</span>
                  <span className="stat-lbl">Осталось запросов</span>
                </div>
                <div className="stat-box">
                  <span className="stat-num">
                    {new Date(rateLimit.reset * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </span>
                  <span className="stat-lbl">Сброс лимита в</span>
                </div>
              </div>
            ) : (
              <span className="loading-txt">Проверка лимитов...</span>
            )}
          </div>

          <div className="help-link">
            <a
              href="https://github.com/settings/tokens/new?description=MaterialDocsExplorer&scopes=public_repo"
              target="_blank"
              rel="noreferrer"
            >
              <span>Сгенерировать новый Token на GitHub</span>
              <ExternalLink size={14} />
            </a>
          </div>

          <div className="dialog-footer">
            <button type="button" className="secondary-btn" onClick={onClose}>
              Отмена
            </button>
            <button type="submit" className="primary-btn">
              {savedStatus ? 'Сохранено!' : 'Сохранить токен'}
            </button>
          </div>
        </form>
      </div>

      <style>{`
        .dialog-overlay {
          position: fixed;
          top: 0; left: 0; right: 0; bottom: 0;
          background-color: rgba(0, 0, 0, 0.5);
          backdrop-filter: blur(4px);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 1000;
          padding: 20px;
        }

        .dialog-card {
          background-color: var(--md-sys-color-surface-container-high);
          border: 1px solid var(--md-sys-color-outline-variant);
          border-radius: var(--md-sys-shape-corner-xl);
          width: 100%;
          max-width: 520px;
          box-shadow: var(--md-sys-elevation-3);
          overflow: hidden;
        }

        .dialog-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 20px 24px;
          border-bottom: 1px solid var(--md-sys-color-outline-variant);
        }

        .title-area {
          display: flex;
          align-items: center;
          gap: 10px;
          color: var(--md-sys-color-on-surface);
        }

        .title-area h2 {
          font-family: 'Google Sans', sans-serif;
          font-size: 1.15rem;
          font-weight: 600;
        }

        .header-icon {
          color: var(--md-sys-color-primary);
        }

        .close-btn {
          background: none;
          border: none;
          color: var(--md-sys-color-outline);
          cursor: pointer;
          border-radius: 50%;
          padding: 4px;
          display: flex;
        }
        .close-btn:hover {
          color: var(--md-sys-color-on-surface);
        }

        .dialog-body {
          padding: 24px;
          display: flex;
          flex-direction: column;
          gap: 16px;
        }

        .description {
          font-size: 0.88rem;
          color: var(--md-sys-color-on-surface-variant);
          line-height: 1.5;
        }

        .input-group {
          display: flex;
          flex-direction: column;
          gap: 6px;
        }

        .input-label {
          font-size: 0.8rem;
          font-weight: 500;
          color: var(--md-sys-color-on-surface);
        }

        .token-input {
          height: 44px;
          padding: 0 14px;
          border-radius: var(--md-sys-shape-corner-s);
          border: 1px solid var(--md-sys-color-outline-variant);
          background-color: var(--md-sys-color-surface-container-lowest);
          color: var(--md-sys-color-on-surface);
          font-family: 'Roboto Mono', monospace;
          font-size: 0.9rem;
          outline: none;
        }

        .token-input:focus {
          border-color: var(--md-sys-color-primary);
        }

        .security-note {
          display: flex;
          align-items: flex-start;
          gap: 8px;
          font-size: 0.78rem;
          color: var(--md-sys-color-outline);
          background-color: var(--md-sys-color-surface-container-low);
          padding: 8px 12px;
          border-radius: var(--md-sys-shape-corner-s);
        }

        .rate-limit-card {
          background-color: var(--md-sys-color-surface-container-lowest);
          border: 1px solid var(--md-sys-color-outline-variant);
          border-radius: var(--md-sys-shape-corner-m);
          padding: 14px;
        }

        .rate-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          font-size: 0.8rem;
          font-weight: 500;
          color: var(--md-sys-color-on-surface-variant);
          margin-bottom: 8px;
        }

        .refresh-btn {
          background: none;
          border: none;
          color: var(--md-sys-color-primary);
          cursor: pointer;
        }

        .spin {
          animation: spin 0.8s linear infinite;
        }

        .rate-stats {
          display: flex;
          justify-content: space-around;
        }

        .stat-box {
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        .stat-num {
          font-family: 'Google Sans', sans-serif;
          font-size: 1.1rem;
          font-weight: 700;
          color: var(--md-sys-color-primary);
        }

        .stat-lbl {
          font-size: 0.72rem;
          color: var(--md-sys-color-outline);
        }

        .help-link a {
          display: flex;
          align-items: center;
          gap: 6px;
          color: var(--md-sys-color-primary);
          text-decoration: none;
          font-size: 0.85rem;
          font-weight: 500;
        }
        .help-link a:hover {
          text-decoration: underline;
        }

        .dialog-footer {
          display: flex;
          justify-content: flex-end;
          gap: 12px;
          margin-top: 8px;
        }

        .primary-btn, .secondary-btn {
          height: 40px;
          padding: 0 20px;
          border-radius: var(--md-sys-shape-corner-full);
          font-size: 0.88rem;
          font-weight: 500;
          cursor: pointer;
        }

        .primary-btn {
          background-color: var(--md-sys-color-primary);
          color: var(--md-sys-color-on-primary);
          border: none;
        }

        .secondary-btn {
          background-color: transparent;
          color: var(--md-sys-color-outline);
          border: 1px solid var(--md-sys-color-outline-variant);
        }
      `}</style>
    </div>
  );
}
