import React, { useState, useEffect } from 'react';
import { 
  Building2, Star, GitFork, BookOpen, Users, Code2, 
  ExternalLink, Sparkles, Terminal, ArrowRight, ShieldCheck 
} from 'lucide-react';
import { githubApi } from '../services/githubApi';

const TECH_STACK = [
  'Python', 'React', 'Material Design 3', 'Vite', 'TypeScript', 
  'Telegram API', 'Open Source', 'Node.js', 'Web UI'
];

export default function OrgHome({ orgName = 'nonFeature', onSelectRepo }) {
  const [orgData, setOrgData] = useState(null);
  const [repos, setRepos] = useState([]);
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadOrgData() {
      setLoading(true);
      try {
        const [orgInfo, orgRepos, orgMembers] = await Promise.all([
          githubApi.getOrgDetails(orgName).catch(() => null),
          githubApi.getOrgRepos(orgName).catch(() => []),
          githubApi.getOrgMembers(orgName).catch(() => []),
        ]);

        setOrgData(orgInfo);
        setRepos(orgRepos);
        setMembers(orgMembers);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    loadOrgData();
  }, [orgName]);

  const totalStars = repos.reduce((acc, r) => acc + (r.stargazers_count || 0), 0);

  if (loading) {
    return (
      <div className="org-home-loading">
        <div className="md3-spinner"></div>
        <p>Загрузка информации об организации {orgName}...</p>
        <style>{`
          .org-home-loading {
            display: flex;
            flex-direction: column;
            align-items: center;
            padding: 80px 24px;
            gap: 16px;
            color: var(--md-sys-color-outline);
          }
          .md3-spinner {
            width: 48px;
            height: 48px;
            border: 4px solid var(--md-sys-color-surface-container-high);
            border-top-color: var(--md-sys-color-primary);
            border-radius: 50%;
            animation: spin 0.8s linear infinite;
          }
          @keyframes spin { to { transform: rotate(360deg); } }
        `}</style>
      </div>
    );
  }

  return (
    <div className="org-home-container">
      {/* Hero Section */}
      <section className="hero-card">
        <div className="hero-content">
          <div className="hero-avatar-area">
            {orgData?.avatar_url ? (
              <img src={orgData.avatar_url} alt={orgName} className="org-avatar" />
            ) : (
              <div className="avatar-fallback"><Building2 size={48} /></div>
            )}
          </div>

          <div className="hero-text-area">
            <div className="org-badge-row">
              <span className="org-badge"><Sparkles size={14} /> Open-Source Команда</span>
              {orgData?.location && <span className="loc-badge">{orgData.location}</span>}
            </div>

            <h1 className="org-title">{orgData?.name || orgName}</h1>
            <p className="org-bio">
              {orgData?.bio || orgData?.description || 'Разработка современных открытых сервисов, плагинов, веб-приложений и экосистем на базе передового стека технологий.'}
            </p>

            <div className="hero-actions">
              <a
                href="#repos-section"
                className="btn-primary"
                onClick={(e) => {
                  e.preventDefault();
                  document.getElementById('repos-section')?.scrollIntoView({ behavior: 'smooth' });
                }}
              >
                <span>Продукты и репозитории</span>
                <ArrowRight size={16} />
              </a>

              {orgData?.html_url && (
                <a
                  href={orgData.html_url}
                  target="_blank"
                  rel="noreferrer"
                  className="btn-outlined"
                >
                  <ExternalLink size={16} />
                  <span>GitHub Профиль</span>
                </a>
              )}
            </div>
          </div>
        </div>

        {/* Stats Row */}
        <div className="stats-grid">
          <div className="stat-card">
            <div className="stat-icon-wrapper">
              <BookOpen size={20} />
            </div>
            <div className="stat-info">
              <span className="stat-value">{repos.length || orgData?.public_repos || 0}</span>
              <span className="stat-label">Репозиториев</span>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon-wrapper star-wrapper">
              <Star size={20} />
            </div>
            <div className="stat-info">
              <span className="stat-value">{totalStars}</span>
              <span className="stat-label">Всего звёзд</span>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon-wrapper team-wrapper">
              <Users size={20} />
            </div>
            <div className="stat-info">
              <span className="stat-value">{members.length || orgData?.followers || 1}</span>
              <span className="stat-label">Участников</span>
            </div>
          </div>
        </div>
      </section>

      {/* About & Tech Stack Section */}
      <section className="about-section">
        <div className="section-card">
          <div className="card-header">
            <Code2 size={22} className="header-icon" />
            <h2>О нашей экосистеме</h2>
          </div>
          <p className="about-desc">
            Наша команда занимается созданием высокопроизводительных решений с фокусом на визуальное совершенство, чистоту архитектуры и удобство разработчика. Мы разрабатываем проекты с применением Material Design 3, модульной структуры и современных стандартов открытого кода.
          </p>

          <div className="stack-container">
            <span className="stack-title">Технологический стек:</span>
            <div className="stack-chips">
              {TECH_STACK.map(tech => (
                <span key={tech} className="stack-chip">
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Repositories Showcase Section */}
      <section id="repos-section" className="repos-showcase">
        <div className="section-title-row">
          <div>
            <h2>Проекты и репозитории</h2>
            <p>Исследуйте исходный код, документацию и историю разработок</p>
          </div>
        </div>

        {repos.length === 0 ? (
          <div className="no-repos-card">
            <Terminal size={36} />
            <p>Репозитории подгружаются или являются приватными.</p>
          </div>
        ) : (
          <div className="repos-grid">
            {repos.map(repo => (
              <div key={repo.id} className="repo-showcard">
                <div className="card-top">
                  <div className="repo-icon">
                    <BookOpen size={20} />
                  </div>
                  <div className="repo-head-info">
                    <h3 className="repo-name">{repo.name}</h3>
                    <span className="repo-full">{repo.full_name}</span>
                  </div>
                </div>

                <p className="repo-desc">
                  {repo.description || 'Описание проекта отсутствует. Откройте интерактивный обозреватель для чтения README.'}
                </p>

                <div className="card-meta">
                  {repo.language && (
                    <span className="lang-tag">{repo.language}</span>
                  )}
                  <span className="meta-item">
                    <Star size={14} className="star-icon" />
                    {repo.stargazers_count}
                  </span>
                  <span className="meta-item">
                    <GitFork size={14} />
                    {repo.forks_count}
                  </span>
                </div>

                <div className="card-actions">
                  <button
                    className="explore-btn"
                    onClick={() => onSelectRepo(repo.full_name)}
                  >
                    <span>Открыть код & Доки</span>
                    <ArrowRight size={14} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Team / Members Section */}
      {members.length > 0 && (
        <section className="team-section">
          <h2>Участники команды</h2>
          <div className="members-grid">
            {members.map(member => (
              <a
                key={member.id}
                href={member.html_url}
                target="_blank"
                rel="noreferrer"
                className="member-card"
              >
                <img src={member.avatar_url} alt={member.login} className="member-avatar" />
                <div className="member-info">
                  <span className="member-login">@{member.login}</span>
                  <span className="member-link">Профиль GitHub</span>
                </div>
              </a>
            ))}
          </div>
        </section>
      )}

      <style>{`
        .org-home-container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 32px 24px;
          display: flex;
          flex-direction: column;
          gap: 36px;
        }

        .hero-card {
          background-color: var(--md-sys-color-surface-container-lowest);
          border: 1px solid var(--md-sys-color-outline-variant);
          border-radius: var(--md-sys-shape-corner-xl);
          padding: 36px;
          box-shadow: var(--md-sys-elevation-2);
          display: flex;
          flex-direction: column;
          gap: 32px;
        }

        .hero-content {
          display: flex;
          gap: 32px;
          align-items: flex-start;
        }

        .org-avatar {
          width: 110px;
          height: 110px;
          border-radius: var(--md-sys-shape-corner-l);
          object-fit: cover;
          box-shadow: var(--md-sys-elevation-1);
        }

        .avatar-fallback {
          width: 110px;
          height: 110px;
          border-radius: var(--md-sys-shape-corner-l);
          background-color: var(--md-sys-color-primary-container);
          color: var(--md-sys-color-on-primary-container);
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .hero-text-area {
          flex: 1;
        }

        .org-badge-row {
          display: flex;
          gap: 8px;
          margin-bottom: 8px;
        }

        .org-badge {
          display: flex;
          align-items: center;
          gap: 6px;
          background-color: var(--md-sys-color-tertiary-container);
          color: var(--md-sys-color-on-tertiary-container);
          padding: 4px 12px;
          border-radius: var(--md-sys-shape-corner-full);
          font-size: 0.78rem;
          font-weight: 600;
        }

        .loc-badge {
          background-color: var(--md-sys-color-surface-container-high);
          color: var(--md-sys-color-on-surface-variant);
          padding: 4px 12px;
          border-radius: var(--md-sys-shape-corner-full);
          font-size: 0.78rem;
        }

        .org-title {
          font-family: 'Google Sans', sans-serif;
          font-size: 2.2rem;
          font-weight: 700;
          color: var(--md-sys-color-on-surface);
          margin-bottom: 8px;
        }

        .org-bio {
          font-size: 1.05rem;
          color: var(--md-sys-color-on-surface-variant);
          line-height: 1.6;
          margin-bottom: 20px;
          max-width: 800px;
        }

        .hero-actions {
          display: flex;
          gap: 12px;
          flex-wrap: wrap;
        }

        .btn-primary {
          display: flex;
          align-items: center;
          gap: 8px;
          background-color: var(--md-sys-color-primary);
          color: var(--md-sys-color-on-primary);
          padding: 12px 24px;
          border-radius: var(--md-sys-shape-corner-full);
          font-weight: 600;
          text-decoration: none;
          font-size: 0.95rem;
          transition: transform 0.15s ease;
        }
        .btn-primary:hover {
          transform: translateY(-1px);
        }

        .btn-outlined {
          display: flex;
          align-items: center;
          gap: 8px;
          border: 1px solid var(--md-sys-color-outline);
          color: var(--md-sys-color-on-surface);
          padding: 12px 24px;
          border-radius: var(--md-sys-shape-corner-full);
          font-weight: 500;
          text-decoration: none;
          font-size: 0.95rem;
        }
        .btn-outlined:hover {
          background-color: var(--md-sys-color-surface-container-high);
        }

        .stats-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 16px;
          border-top: 1px solid var(--md-sys-color-outline-variant);
          padding-top: 24px;
        }

        .stat-card {
          display: flex;
          align-items: center;
          gap: 14px;
          background-color: var(--md-sys-color-surface-container-low);
          padding: 16px;
          border-radius: var(--md-sys-shape-corner-l);
        }

        .stat-icon-wrapper {
          width: 44px;
          height: 44px;
          border-radius: var(--md-sys-shape-corner-m);
          background-color: var(--md-sys-color-primary-container);
          color: var(--md-sys-color-on-primary-container);
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .star-wrapper {
          background-color: #fff8e1;
          color: #b78103;
        }
        [data-theme="dark"] .star-wrapper {
          background-color: #3e3204;
          color: #ffd740;
        }

        .team-wrapper {
          background-color: var(--md-sys-color-secondary-container);
          color: var(--md-sys-color-on-secondary-container);
        }

        .stat-value {
          font-family: 'Google Sans', sans-serif;
          font-size: 1.4rem;
          font-weight: 700;
          display: block;
          line-height: 1.2;
        }

        .stat-label {
          font-size: 0.8rem;
          color: var(--md-sys-color-outline);
        }

        .section-card {
          background-color: var(--md-sys-color-surface-container-lowest);
          border: 1px solid var(--md-sys-color-outline-variant);
          border-radius: var(--md-sys-shape-corner-xl);
          padding: 28px;
        }

        .card-header {
          display: flex;
          align-items: center;
          gap: 10px;
          margin-bottom: 12px;
        }
        .header-icon {
          color: var(--md-sys-color-primary);
        }

        .card-header h2 {
          font-family: 'Google Sans', sans-serif;
          font-size: 1.35rem;
          color: var(--md-sys-color-on-surface);
        }

        .about-desc {
          font-size: 0.98rem;
          color: var(--md-sys-color-on-surface-variant);
          line-height: 1.6;
          margin-bottom: 20px;
        }

        .stack-container {
          display: flex;
          flex-direction: column;
          gap: 10px;
        }

        .stack-title {
          font-size: 0.85rem;
          font-weight: 600;
          color: var(--md-sys-color-outline);
        }

        .stack-chips {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
        }

        .stack-chip {
          background-color: var(--md-sys-color-surface-container-high);
          color: var(--md-sys-color-on-surface-variant);
          padding: 6px 14px;
          border-radius: var(--md-sys-shape-corner-full);
          font-size: 0.82rem;
          font-weight: 500;
        }

        .section-title-row h2 {
          font-family: 'Google Sans', sans-serif;
          font-size: 1.5rem;
          color: var(--md-sys-color-on-surface);
        }
        .section-title-row p {
          font-size: 0.9rem;
          color: var(--md-sys-color-outline);
          margin-top: 4px;
          margin-bottom: 20px;
        }

        .repos-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
          gap: 20px;
        }

        .repo-showcard {
          background-color: var(--md-sys-color-surface-container-lowest);
          border: 1px solid var(--md-sys-color-outline-variant);
          border-radius: var(--md-sys-shape-corner-l);
          padding: 20px;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          gap: 16px;
          transition: transform 0.2s ease, box-shadow 0.2s ease;
        }

        .repo-showcard:hover {
          transform: translateY(-3px);
          box-shadow: var(--md-sys-elevation-2);
          border-color: var(--md-sys-color-primary);
        }

        .card-top {
          display: flex;
          align-items: flex-start;
          gap: 12px;
        }

        .repo-icon {
          color: var(--md-sys-color-primary);
          padding: 6px;
          background-color: var(--md-sys-color-primary-container);
          border-radius: var(--md-sys-shape-corner-s);
          display: flex;
        }

        .repo-name {
          font-family: 'Google Sans', sans-serif;
          font-size: 1.1rem;
          color: var(--md-sys-color-on-surface);
        }

        .repo-full {
          font-size: 0.78rem;
          color: var(--md-sys-color-outline);
        }

        .repo-desc {
          font-size: 0.88rem;
          color: var(--md-sys-color-on-surface-variant);
          line-height: 1.5;
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }

        .card-meta {
          display: flex;
          align-items: center;
          gap: 12px;
          font-size: 0.8rem;
          color: var(--md-sys-color-outline);
        }

        .lang-tag {
          background-color: var(--md-sys-color-surface-container-high);
          color: var(--md-sys-color-on-surface-variant);
          padding: 2px 8px;
          border-radius: var(--md-sys-shape-corner-xs);
          font-weight: 500;
        }

        .meta-item {
          display: flex;
          align-items: center;
          gap: 4px;
        }

        .explore-btn {
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 6px;
          padding: 10px;
          border-radius: var(--md-sys-shape-corner-full);
          border: 1px solid var(--md-sys-color-outline-variant);
          background-color: var(--md-sys-color-surface-container-low);
          color: var(--md-sys-color-primary);
          font-weight: 600;
          font-size: 0.88rem;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .explore-btn:hover {
          background-color: var(--md-sys-color-primary-container);
          color: var(--md-sys-color-on-primary-container);
          border-color: transparent;
        }

        .team-section h2 {
          font-family: 'Google Sans', sans-serif;
          font-size: 1.35rem;
          margin-bottom: 16px;
          color: var(--md-sys-color-on-surface);
        }

        .members-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
          gap: 16px;
        }

        .member-card {
          display: flex;
          align-items: center;
          gap: 12px;
          background-color: var(--md-sys-color-surface-container-lowest);
          border: 1px solid var(--md-sys-color-outline-variant);
          padding: 12px 16px;
          border-radius: var(--md-sys-shape-corner-m);
          text-decoration: none;
          transition: background 0.2s ease;
        }

        .member-card:hover {
          background-color: var(--md-sys-color-surface-container-high);
        }

        .member-avatar {
          width: 44px;
          height: 44px;
          border-radius: 50%;
        }

        .member-login {
          font-weight: 600;
          color: var(--md-sys-color-on-surface);
          display: block;
          font-size: 0.9rem;
        }

        .member-link {
          font-size: 0.75rem;
          color: var(--md-sys-color-primary);
        }

        @media (max-width: 768px) {
          .hero-content {
            flex-direction: column;
          }
        }
      `}</style>
    </div>
  );
}
