import React from 'react';
import { ArrowRight, Sparkles, Code2, Terminal, Shield, Zap, Layers } from 'lucide-react';

export default function HeroSection({ onExploreProjects, onOpenDocs }) {
  return (
    <section className="hero-section">
      {/* Background Glowing Gradients */}
      <div className="glow-orb orb-1" />
      <div className="glow-orb orb-2" />

      <div className="hero-container">
        {/* Top Tagline Badge */}
        <div className="hero-badge animate-fade-in">
          <Sparkles size={16} className="badge-sparkle" />
          <span>nonFeature Engineering & Open Source Collective</span>
        </div>

        {/* Main Headline */}
        <h1 className="hero-headline animate-fade-in">
          Мы создаём продукты, <br />
          <span className="gradient-text">где нет ничего лишнего</span>
        </h1>

        {/* Subtitle */}
        <p className="hero-subtext animate-fade-in">
          Индивидуальная разработка открытых библиотек, Telegram-плагинов, веб-платформ и микросервисов. Скорость, элегантность архитектуры и чистый Material Design 3.
        </p>

        {/* CTA Buttons */}
        <div className="hero-cta-group animate-fade-in">
          <button className="cta-main-btn" onClick={onExploreProjects}>
            <span>Смотреть проекты</span>
            <ArrowRight size={18} />
          </button>
          
          <button className="cta-secondary-btn" onClick={onOpenDocs}>
            <Terminal size={18} />
            <span>База знаний & Доки</span>
          </button>
        </div>

        {/* Highlight Feature Cards */}
        <div className="feature-grid">
          <div className="feature-card">
            <div className="icon-wrapper flame">
              <Zap size={22} />
            </div>
            <div className="feature-text">
              <h3>Высокая скорость</h3>
              <p>Мгновенный отклик, оптимизированные алгоритмы и асинхронность.</p>
            </div>
          </div>

          <div className="feature-card">
            <div className="icon-wrapper gold">
              <Code2 size={22} />
            </div>
            <div className="feature-text">
              <h3>Чистая архитектура</h3>
              <p>Модульный код без лишних зависимостей, удобный для расширения.</p>
            </div>
          </div>

          <div className="feature-card">
            <div className="icon-wrapper flame">
              <Shield size={22} />
            </div>
            <div className="feature-text">
              <h3>Open Source & Свобода</h3>
              <p>Безопасные открытые исходники, доступные каждому разработчику.</p>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .hero-section {
          position: relative;
          padding: 90px 24px 70px;
          overflow: hidden;
          background: radial-gradient(circle at 50% 20%, rgba(226, 71, 0, 0.08) 0%, transparent 60%);
        }

        .glow-orb {
          position: absolute;
          border-radius: 50%;
          filter: blur(120px);
          pointer-events: none;
          z-index: 0;
        }

        .orb-1 {
          width: 450px;
          height: 450px;
          background: rgba(226, 71, 0, 0.22);
          top: -100px;
          left: 10%;
        }

        .orb-2 {
          width: 400px;
          height: 400px;
          background: rgba(238, 198, 67, 0.18);
          top: 150px;
          right: 5%;
        }

        .hero-container {
          position: relative;
          z-index: 1;
          max-width: 1100px;
          margin: 0 auto;
          text-align: center;
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        .hero-badge {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 8px 18px;
          border-radius: var(--md-sys-shape-corner-full);
          background-color: var(--md-sys-color-surface-container-high);
          border: 1px solid rgba(238, 198, 67, 0.25);
          color: var(--color-gold);
          font-size: 0.85rem;
          font-weight: 600;
          margin-bottom: 28px;
          box-shadow: var(--glow-primary);
        }

        .badge-sparkle {
          color: var(--color-flame);
        }

        .hero-headline {
          font-family: 'Google Sans', sans-serif;
          font-size: 3.8rem;
          font-weight: 900;
          line-height: 1.15;
          color: var(--md-sys-color-on-surface);
          letter-spacing: -1.5px;
          margin-bottom: 24px;
        }

        .gradient-text {
          background: linear-gradient(135deg, var(--color-gold) 0%, var(--color-flame) 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        .hero-subtext {
          font-size: 1.25rem;
          color: var(--md-sys-color-on-surface-variant);
          max-width: 780px;
          line-height: 1.6;
          margin-bottom: 40px;
        }

        .hero-cta-group {
          display: flex;
          gap: 16px;
          flex-wrap: wrap;
          justify-content: center;
          margin-bottom: 70px;
        }

        .cta-main-btn {
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 16px 36px;
          border-radius: var(--md-sys-shape-corner-full);
          background: linear-gradient(135deg, var(--color-flame), #c43c00);
          color: #ffffff;
          font-weight: 700;
          font-size: 1.05rem;
          border: none;
          cursor: pointer;
          box-shadow: 0 8px 24px rgba(226, 71, 0, 0.4);
          transition: all 0.25s ease;
        }

        .cta-main-btn:hover {
          transform: translateY(-3px);
          box-shadow: 0 12px 32px rgba(226, 71, 0, 0.6);
        }

        .cta-secondary-btn {
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 16px 32px;
          border-radius: var(--md-sys-shape-corner-full);
          background-color: var(--md-sys-color-surface-container-high);
          border: 1px solid var(--md-sys-color-outline-variant);
          color: var(--md-sys-color-on-surface);
          font-weight: 600;
          font-size: 1.05rem;
          cursor: pointer;
          transition: all 0.25s ease;
        }

        .cta-secondary-btn:hover {
          border-color: var(--color-gold);
          color: var(--color-gold);
          background-color: var(--md-sys-color-surface-container-highest);
        }

        .feature-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 24px;
          width: 100%;
          text-align: left;
        }

        .feature-card {
          background-color: rgba(45, 45, 42, 0.5);
          backdrop-filter: blur(12px);
          border: 1px solid rgba(238, 198, 67, 0.12);
          border-radius: var(--md-sys-shape-corner-xl);
          padding: 28px;
          display: flex;
          gap: 18px;
          align-items: flex-start;
          transition: all 0.3s ease;
        }

        .feature-card:hover {
          transform: translateY(-4px);
          border-color: rgba(238, 198, 67, 0.35);
          box-shadow: var(--md-sys-elevation-2);
        }

        .icon-wrapper {
          width: 52px;
          height: 52px;
          border-radius: var(--md-sys-shape-corner-m);
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }

        .icon-wrapper.flame {
          background: rgba(226, 71, 0, 0.18);
          color: var(--color-flame);
        }

        .icon-wrapper.gold {
          background: rgba(238, 198, 67, 0.18);
          color: var(--color-gold);
        }

        .feature-text h3 {
          font-family: 'Google Sans', sans-serif;
          font-size: 1.15rem;
          color: var(--md-sys-color-on-surface);
          margin-bottom: 6px;
        }

        .feature-text p {
          font-size: 0.92rem;
          color: var(--md-sys-color-on-surface-variant);
          line-height: 1.5;
        }

        @media (max-width: 768px) {
          .hero-headline { font-size: 2.5rem; }
          .hero-subtext { font-size: 1.05rem; }
        }
      `}</style>
    </section>
  );
}
