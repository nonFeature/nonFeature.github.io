import React, { useState } from 'react';
import { 
  Send, Layers, Code2, ExternalLink, Star, 
  GitFork, ArrowRight, Sparkles, Terminal, CheckCircle2 
} from 'lucide-react';

const PRODUCTS = [
  {
    id: 'litegram',
    title: 'LiteGram Framework',
    category: 'telegram',
    badge: 'Флагманский проект',
    tagline: 'Быстрый и лёгкий плагин-модуль для работы с Telegram API на Python.',
    description: 'Модульный движок плагинов и обработчиков сообщений. Отличается нулевым оверхедом по памяти, высокой скоростью выполнения обработчиков и простой системой интеграции сторонних расширений.',
    tags: ['Python 3.11+', 'Telegram API', 'AsyncIO', 'Plugins System'],
    version: 'v2.4.0',
    stars: 142,
    forks: 28,
    githubUrl: 'https://github.com/nonFeature/LiteGram'
  },
  {
    id: 'site-engine',
    title: 'Material 3 Site Portal',
    category: 'web',
    badge: 'Новый релиз',
    tagline: 'Современный движок информационного портала на React + Vite + MD3.',
    description: 'Готовое веб-приложение для презентации организаций, продуктов и документации. Использует кастомную цветовую палитру HSL/Hex, стекломорфизм и интеграцию с GitHub API.',
    tags: ['React 19', 'Vite', 'Material Design 3', 'Vanilla CSS'],
    version: 'v1.0.0',
    stars: 89,
    forks: 14,
    githubUrl: 'https://github.com/nonFeature/site'
  },
  {
    id: 'core-utils',
    title: 'nonFeature Core Utilities',
    category: 'library',
    badge: 'Библиотека',
    tagline: 'Коллекция микробиблиотек для быстрого форматирования и асинхронной работы.',
    description: 'Набор высокоэффективных хелперов для работы с JSON, кэшированием в памяти, потоковой обработкой данных и автоматической валидацией конфигураций.',
    tags: ['Python', 'JavaScript', 'Utils', 'Zero Dependencies'],
    version: 'v0.9.5',
    stars: 64,
    forks: 9,
    githubUrl: 'https://github.com/nonFeature'
  }
];

export default function ProjectsSection({ onOpenDocsForProduct }) {
  const [activeCategory, setActiveCategory] = useState('all');

  const filteredProducts = PRODUCTS.filter(p => {
    if (activeCategory === 'all') return true;
    return p.category === activeCategory;
  });

  return (
    <section id="projects" className="projects-section">
      <div className="section-container">
        <div className="section-header">
          <span className="section-tag">ПРОДУКТЫ И ЭКОСИСТЕМА</span>
          <h2 className="section-title">Разработки <span className="highlight-text">nonFeature</span></h2>
          <p className="section-desc">
            Проекты, созданные нашей командой для упрощения разработки и построения современных сервисов.
          </p>
        </div>

        {/* Category Filters */}
        <div className="category-tabs">
          <button 
            className={`tab-btn ${activeCategory === 'all' ? 'active' : ''}`}
            onClick={() => setActiveCategory('all')}
          >
            Все продукты ({PRODUCTS.length})
          </button>
          <button 
            className={`tab-btn ${activeCategory === 'telegram' ? 'active' : ''}`}
            onClick={() => setActiveCategory('telegram')}
          >
            Telegram / Python
          </button>
          <button 
            className={`tab-btn ${activeCategory === 'web' ? 'active' : ''}`}
            onClick={() => setActiveCategory('web')}
          >
            Web / UI (MD3)
          </button>
          <button 
            className={`tab-btn ${activeCategory === 'library' ? 'active' : ''}`}
            onClick={() => setActiveCategory('library')}
          >
            Библиотеки
          </button>
        </div>

        {/* Product Cards Grid */}
        <div className="products-grid">
          {filteredProducts.map((product) => (
            <div key={product.id} className="product-card">
              <div className="card-top-row">
                <span className="product-badge">
                  <Sparkles size={13} />
                  {product.badge}
                </span>
                <span className="version-tag">{product.version}</span>
              </div>

              <h3 className="product-title">{product.title}</h3>
              <p className="product-tagline">{product.tagline}</p>
              <p className="product-desc">{product.description}</p>

              <div className="product-tags">
                {product.tags.map(tag => (
                  <span key={tag} className="tag-chip">{tag}</span>
                ))}
              </div>

              <div className="card-bottom-bar">
                <div className="repo-stats">
                  <span className="stat-item" title="Звёзды">
                    <Star size={14} className="star-icon" />
                    {product.stars}
                  </span>
                  <span className="stat-item" title="Форки">
                    <GitFork size={14} />
                    {product.forks}
                  </span>
                </div>

                <div className="card-actions">
                  <button 
                    className="docs-btn"
                    onClick={() => onOpenDocsForProduct(product.id)}
                  >
                    <span>Документация</span>
                    <ArrowRight size={14} />
                  </button>

                  <a 
                    href={product.githubUrl} 
                    target="_blank" 
                    rel="noreferrer" 
                    className="gh-icon-btn"
                    title="Открыть на GitHub"
                  >
                    <ExternalLink size={16} />
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        .projects-section {
          padding: 80px 24px;
          background-color: var(--md-sys-color-surface-container-low);
        }

        .section-container {
          max-width: 1200px;
          margin: 0 auto;
        }

        .section-header {
          text-align: center;
          max-width: 700px;
          margin: 0 auto 40px;
        }

        .section-tag {
          font-size: 0.8rem;
          font-weight: 800;
          letter-spacing: 1.5px;
          color: var(--color-gold);
          display: block;
          margin-bottom: 12px;
        }

        .section-title {
          font-family: 'Google Sans', sans-serif;
          font-size: 2.6rem;
          font-weight: 800;
          color: var(--md-sys-color-on-surface);
          margin-bottom: 16px;
        }

        .highlight-text {
          color: var(--color-flame);
        }

        .section-desc {
          font-size: 1.1rem;
          color: var(--md-sys-color-on-surface-variant);
        }

        .category-tabs {
          display: flex;
          justify-content: center;
          gap: 10px;
          flex-wrap: wrap;
          margin-bottom: 44px;
        }

        .tab-btn {
          background-color: var(--color-jet);
          border: 1px solid var(--md-sys-color-outline-variant);
          color: var(--md-sys-color-on-surface-variant);
          padding: 10px 22px;
          border-radius: var(--md-sys-shape-corner-full);
          font-family: 'Google Sans', sans-serif;
          font-size: 0.9rem;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .tab-btn:hover {
          border-color: var(--color-gold);
          color: var(--md-sys-color-on-surface);
        }

        .tab-btn.active {
          background-color: var(--color-gold);
          color: #101113;
          border-color: transparent;
          font-weight: 700;
          box-shadow: var(--glow-primary);
        }

        .products-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(340px, 1fr));
          gap: 28px;
        }

        .product-card {
          background-color: var(--color-jet);
          border: 1px solid var(--md-sys-color-outline-variant);
          border-radius: var(--md-sys-shape-corner-xl);
          padding: 32px;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          gap: 16px;
          transition: all 0.3s ease;
        }

        .product-card:hover {
          transform: translateY(-6px);
          border-color: var(--color-flame);
          box-shadow: var(--glow-secondary);
        }

        .card-top-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .product-badge {
          display: flex;
          align-items: center;
          gap: 6px;
          background-color: rgba(226, 71, 0, 0.18);
          color: var(--color-flame);
          padding: 4px 12px;
          border-radius: var(--md-sys-shape-corner-full);
          font-size: 0.78rem;
          font-weight: 700;
        }

        .version-tag {
          font-family: 'Roboto Mono', monospace;
          font-size: 0.78rem;
          color: var(--md-sys-color-outline);
        }

        .product-title {
          font-family: 'Google Sans', sans-serif;
          font-size: 1.45rem;
          font-weight: 700;
          color: var(--md-sys-color-on-surface);
        }

        .product-tagline {
          font-size: 0.95rem;
          font-weight: 600;
          color: var(--color-gold);
        }

        .product-desc {
          font-size: 0.92rem;
          color: var(--md-sys-color-on-surface-variant);
          line-height: 1.6;
        }

        .product-tags {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
        }

        .tag-chip {
          background-color: var(--md-sys-color-surface-container);
          color: var(--md-sys-color-on-surface-variant);
          padding: 4px 10px;
          border-radius: var(--md-sys-shape-corner-s);
          font-size: 0.78rem;
          font-weight: 500;
        }

        .card-bottom-bar {
          display: flex;
          justify-content: space-between;
          align-items: center;
          border-top: 1px solid var(--md-sys-color-outline-variant);
          padding-top: 16px;
          margin-top: 8px;
        }

        .repo-stats {
          display: flex;
          gap: 12px;
          font-size: 0.82rem;
          color: var(--md-sys-color-outline);
        }

        .stat-item {
          display: flex;
          align-items: center;
          gap: 4px;
        }

        .star-icon {
          color: var(--color-gold);
        }

        .card-actions {
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .docs-btn {
          display: flex;
          align-items: center;
          gap: 6px;
          background: transparent;
          border: 1px solid var(--color-gold);
          color: var(--color-gold);
          padding: 6px 14px;
          border-radius: var(--md-sys-shape-corner-full);
          font-size: 0.85rem;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .docs-btn:hover {
          background-color: var(--color-gold);
          color: #101113;
        }

        .gh-icon-btn {
          color: var(--md-sys-color-outline);
          padding: 6px;
          display: flex;
          align-items: center;
        }
        .gh-icon-btn:hover {
          color: var(--color-flame);
        }
      `}</style>
    </section>
  );
}
