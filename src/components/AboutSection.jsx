import React from 'react';
import { ShieldCheck, Cpu, Flame, Feather, ArrowUpRight } from 'lucide-react';

export default function AboutSection() {
  return (
    <section id="about" className="about-section">
      <div className="section-container">
        <div className="section-header">
          <span className="section-tag">ФИЛОСОФИЯ И ПРИНЦИПЫ</span>
          <h2 className="section-title">Почему <span className="highlight-text">nonFeature</span>?</h2>
          <p className="section-desc">
            Название отражает нашу концепцию: отказ от раздутых «фич» в пользу истинной производительности, надёжности и удобства.
          </p>
        </div>

        <div className="principles-grid">
          <div className="principle-card">
            <div className="card-badge">01</div>
            <div className="card-icon"><Feather size={28} /></div>
            <h3>Минимализм и легковесивность</h3>
            <p>
              Мы строим архитектуру без тяжеловесных сторонних фреймворков там, где можно обойтись чистыми, эффективными решениями.
            </p>
          </div>

          <div className="principle-card highlighted">
            <div className="card-badge flame">02</div>
            <div className="card-icon flame-icon"><Flame size={28} /></div>
            <h3>LiteGram & Telegram Инструменты</h3>
            <p>
              Разработка высокоскоростных плагинов, модулей и экосистем на Python для управления инфраструктурой и ботами в Telegram.
            </p>
          </div>

          <div className="principle-card">
            <div className="card-badge">03</div>
            <div className="card-icon"><Cpu size={28} /></div>
            <h3>Material Design 3 Эстетика</h3>
            <p>
              Все наши веб-интерфейсы базируются на последнем поколении Material Design от Google: плавность, глубина и адаптивность.
            </p>
          </div>

          <div className="principle-card">
            <div className="card-badge">04</div>
            <div className="card-icon"><ShieldCheck size={28} /></div>
            <h3>Открытый код & Безопасность</h3>
            <p>
              Каждый репозиторий проходит аудит кода. Все модули полностью открыты и доступны для сообщества разработчиков.
            </p>
          </div>
        </div>
      </div>

      <style>{`
        .about-section {
          padding: 80px 24px;
          background-color: var(--md-sys-color-background);
          position: relative;
        }

        .section-container {
          max-width: 1200px;
          margin: 0 auto;
        }

        .section-header {
          text-align: center;
          max-width: 700px;
          margin: 0 auto 56px;
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
          line-height: 1.2;
          margin-bottom: 16px;
        }

        .highlight-text {
          color: var(--color-flame);
        }

        .section-desc {
          font-size: 1.1rem;
          color: var(--md-sys-color-on-surface-variant);
          line-height: 1.6;
        }

        .principles-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
          gap: 24px;
        }

        .principle-card {
          background-color: var(--color-jet);
          border: 1px solid var(--md-sys-color-outline-variant);
          border-radius: var(--md-sys-shape-corner-xl);
          padding: 32px 28px;
          position: relative;
          display: flex;
          flex-direction: column;
          gap: 16px;
          transition: all 0.3s ease;
        }

        .principle-card:hover {
          transform: translateY(-6px);
          box-shadow: var(--md-sys-elevation-2);
          border-color: rgba(238, 198, 67, 0.3);
        }

        .principle-card.highlighted {
          background: linear-gradient(145deg, var(--color-jet), #38241b);
          border-color: rgba(226, 71, 0, 0.35);
        }

        .card-badge {
          font-family: 'Google Sans', sans-serif;
          font-size: 0.85rem;
          font-weight: 800;
          color: var(--color-gold);
          background-color: rgba(238, 198, 67, 0.12);
          width: fit-content;
          padding: 4px 12px;
          border-radius: var(--md-sys-shape-corner-full);
        }

        .card-badge.flame {
          color: var(--color-flame);
          background-color: rgba(226, 71, 0, 0.15);
        }

        .card-icon {
          color: var(--color-gold);
        }

        .flame-icon {
          color: var(--color-flame);
        }

        .principle-card h3 {
          font-family: 'Google Sans', sans-serif;
          font-size: 1.25rem;
          color: var(--md-sys-color-on-surface);
        }

        .principle-card p {
          font-size: 0.95rem;
          color: var(--md-sys-color-on-surface-variant);
          line-height: 1.6;
        }
      `}</style>
    </section>
  );
}
