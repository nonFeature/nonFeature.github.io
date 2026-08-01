import React from 'react';
import { Send, MessageSquare, Mail, Sparkles, Heart } from 'lucide-react';

const GithubIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"/>
    <path d="M9 18c-4.51 2-5-2-7-2"/>
  </svg>
);

export default function CommunitySection() {
  return (
    <section id="community" className="community-section">
      <div className="section-container">
        <div className="community-card">
          <div className="card-left">
            <span className="community-tag">ПРИСОЕДИНЯЙТЕСЬ К НАМ</span>
            <h2 className="community-title">Станьте частью <span className="highlight-text">nonFeature</span></h2>
            <p className="community-desc">
              Мы всегда открыты для разработчиков, авторов плагинов и единомышленников. Присоединяйтесь к нашему Telegram-сообществу и следите за релизами на GitHub.
            </p>

            <div className="community-links">
              <a 
                href="https://t.me/nonfeature" 
                target="_blank" 
                rel="noreferrer" 
                className="community-btn telegram"
              >
                <Send size={18} />
                <span>Telegram Канал</span>
              </a>

              <a 
                href="https://github.com/nonFeature" 
                target="_blank" 
                rel="noreferrer" 
                className="community-btn github"
              >
                <GithubIcon />
                <span>GitHub Репозитории</span>
              </a>
            </div>
          </div>

          <div className="card-right">
            <div className="info-box">
              <div className="box-icon"><Sparkles size={24} /></div>
              <h4>Открытые обсуждения</h4>
              <p>Участвуйте в обсуждении архитектуры плагинов, предложении новых модулей и тестировании предрелизных версий.</p>
            </div>

            <div className="info-box">
              <div className="box-icon flame"><Heart size={24} /></div>
              <h4>Open Source Вклад</h4>
              <p>Отправляйте свои Pull Request'ы, создавайте форки и улучшайте экосистему вместе с нами.</p>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .community-section {
          padding: 80px 24px;
          background-color: var(--md-sys-color-surface-container-low);
        }

        .section-container {
          max-width: 1200px;
          margin: 0 auto;
        }

        .community-card {
          background-color: var(--color-jet);
          border: 1px solid var(--md-sys-color-outline-variant);
          border-radius: var(--md-sys-shape-corner-xl);
          padding: 48px;
          display: flex;
          gap: 48px;
          box-shadow: var(--md-sys-elevation-2);
        }

        .card-left {
          flex: 1;
        }

        .community-tag {
          font-size: 0.8rem;
          font-weight: 800;
          letter-spacing: 1.5px;
          color: var(--color-gold);
          display: block;
          margin-bottom: 12px;
        }

        .community-title {
          font-family: 'Google Sans', sans-serif;
          font-size: 2.4rem;
          font-weight: 800;
          color: var(--md-sys-color-on-surface);
          margin-bottom: 16px;
        }

        .highlight-text {
          color: var(--color-flame);
        }

        .community-desc {
          font-size: 1.05rem;
          color: var(--md-sys-color-on-surface-variant);
          line-height: 1.6;
          margin-bottom: 32px;
        }

        .community-links {
          display: flex;
          gap: 16px;
          flex-wrap: wrap;
        }

        .community-btn {
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 14px 28px;
          border-radius: var(--md-sys-shape-corner-full);
          font-weight: 700;
          font-size: 0.95rem;
          text-decoration: none;
          transition: all 0.25s ease;
        }

        .community-btn.telegram {
          background: linear-gradient(135deg, #0088cc, #006699);
          color: #ffffff;
          box-shadow: 0 4px 16px rgba(0, 136, 204, 0.3);
        }
        .community-btn.telegram:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 24px rgba(0, 136, 204, 0.5);
        }

        .community-btn.github {
          background-color: var(--color-night);
          border: 1px solid var(--color-gold);
          color: var(--color-gold);
        }
        .community-btn.github:hover {
          background-color: var(--color-gold);
          color: #101113;
        }

        .card-right {
          width: 380px;
          display: flex;
          flex-direction: column;
          gap: 20px;
        }

        .info-box {
          background-color: var(--color-night);
          border: 1px solid var(--md-sys-color-outline-variant);
          border-radius: var(--md-sys-shape-corner-l);
          padding: 20px;
        }

        .box-icon {
          color: var(--color-gold);
          margin-bottom: 10px;
        }
        .box-icon.flame {
          color: var(--color-flame);
        }

        .info-box h4 {
          font-family: 'Google Sans', sans-serif;
          font-size: 1.1rem;
          color: var(--md-sys-color-on-surface);
          margin-bottom: 6px;
        }

        .info-box p {
          font-size: 0.88rem;
          color: var(--md-sys-color-on-surface-variant);
          line-height: 1.5;
        }

        @media (max-width: 900px) {
          .community-card {
            flex-direction: column;
            padding: 32px;
          }
          .card-right {
            width: 100%;
          }
        }
      `}</style>
    </section>
  );
}
