import React from 'react';

export default function OrgHome() {
  return (
    <div className="section-pane-container">
      <div className="empty-content-card glass-panel">
        <h2>Пока пусто, ждите</h2>
      </div>

      <style>{`
        .section-pane-container {
          width: 100%;
          max-width: 1400px;
          margin: 0 auto;
        }

        .empty-content-card {
          padding: 64px 32px;
          border-radius: var(--md-sys-shape-corner-l);
          text-align: center;
          display: flex;
          align-items: center;
          justify-content: center;
          min-height: 350px;
        }

        .empty-content-card h2 {
          font-size: 2.2rem;
          color: var(--md-sys-color-on-background);
          font-weight: 600;
          letter-spacing: -0.5px;
        }

        @media (max-width: 768px) {
          .empty-content-card {
            padding: 32px 16px;
          }
          .empty-content-card h2 {
            font-size: 1.8rem;
          }
        }
      `}</style>
    </div>
  );
}
