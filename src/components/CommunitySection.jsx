import React from 'react';
import svyazImg from '../assets/svyaz.jpg';

export default function CommunitySection() {
  return (
    <div className="section-pane-container">
      <div className="empty-content-card glass-panel">
        <img src={svyazImg} alt="Связь" className="rounded-svyaz-img" />
      </div>

      <style>{`
        .section-pane-container {
          width: 100%;
          max-width: 1400px;
          margin: 0 auto;
        }

        .empty-content-card {
          padding: 32px 24px;
          border-radius: var(--md-sys-shape-corner-l);
          text-align: center;
          display: flex;
          align-items: center;
          justify-content: center;
          min-height: 400px;
        }

        .rounded-svyaz-img {
          width: 100%;
          max-width: 50%;
          max-height: 50%;
          height: auto;
          border-radius: 36px;
          box-shadow: 0 16px 40px rgba(0, 0, 0, 0.45);
          border: 1px solid var(--md-sys-color-outline-variant);
          object-fit: contain;
          display: block;
        }

        @media (max-width: 768px) {
          .empty-content-card {
            padding: 20px 16px;
          }
          .rounded-svyaz-img {
            max-width: 90%;
            border-radius: 28px;
          }
        }
      `}</style>
    </div>
  );
}
