import React, { useState } from 'react';
import { BookOpen, Code, Copy, Check, Terminal, FileText, ChevronRight } from 'lucide-react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';

const DOC_PAGES = {
  litegram: {
    title: 'LiteGram Framework — Быстрый старт',
    subtitle: 'Руководство по созданию модульного бота в Telegram на Python',
    code: `# 1. Установка LiteGram
pip install litegram

# 2. Создание главного файла бота (main.py)
from litegram import Bot, Dispatcher, types
from litegram.plugins import PluginManager

bot = Bot(token="YOUR_TELEGRAM_BOT_TOKEN")
dp = Dispatcher(bot)

# Регистрация плагина
plugin = PluginManager()

@dp.message_handler(commands=['start'])
async def send_welcome(message: types.Message):
    await message.reply("Привет от nonFeature LiteGram! 🚀")

if __name__ == '__main__':
    dp.run_polling()`,
    lang: 'python'
  },
  m3guide: {
    title: 'Material Design 3 — Палитра nonFeature',
    subtitle: 'Подключение цветовой палитры и токенов в веб-проектах',
    code: `/* CSS Переменные палитры nonFeature */
:root {
  --color-gold: #eec643;    /* Saffron Gold Accent */
  --color-flame: #e24700;   /* Flame Orange-Red Accent */
  --color-jet: #2d2d2a;     /* Jet Dark Slate Container */
  --color-night: #101113;   /* Deep Night Background */

  /* M3 System Tokens */
  --md-sys-color-primary: var(--color-gold);
  --md-sys-color-secondary: var(--color-flame);
  --md-sys-color-background: var(--color-night);
  --md-sys-color-surface-container-high: var(--color-jet);
}`,
    lang: 'css'
  },
  utils: {
    title: 'nonFeature Core Utilities — Использование',
    subtitle: 'Утилиты для кэширования и быстрых асинхронных операций',
    code: `from nonfeature.utils import AsyncCache, JSONFormatter

# Инициализация кэша в памяти
cache = AsyncCache(ttl_seconds=300)

@cache.memoize()
async def fetch_user_data(user_id: int):
    # Тяжёлый запрос к API или БД
    return {"user_id": user_id, "status": "active"}`,
    lang: 'python'
  }
};

export default function DocsSection({ selectedDocKey = 'litegram' }) {
  const [activeDocKey, setActiveDocKey] = useState(selectedDocKey);
  const [copied, setCopied] = useState(false);

  const doc = DOC_PAGES[activeDocKey] || DOC_PAGES.litegram;

  const handleCopyCode = () => {
    navigator.clipboard.writeText(doc.code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="docs" className="docs-section">
      <div className="section-container">
        <div className="section-header">
          <span className="section-tag">БАЗА ЗНАНИЙ</span>
          <h2 className="section-title">Документация <span className="highlight-text">nonFeature</span></h2>
        </div>

        <div className="docs-layout">
          {/* Left Navigation Menu */}
          <aside className="docs-sidebar">
            <div className="sidebar-title">
              <BookOpen size={18} />
              <span>Разделы документации</span>
            </div>

            <nav className="docs-nav-list">
              <button
                className={`nav-item ${activeDocKey === 'litegram' ? 'active' : ''}`}
                onClick={() => setActiveDocKey('litegram')}
              >
                <ChevronRight size={14} className="arrow-icon" />
                <span>LiteGram Framework</span>
              </button>

              <button
                className={`nav-item ${activeDocKey === 'm3guide' ? 'active' : ''}`}
                onClick={() => setActiveDocKey('m3guide')}
              >
                <ChevronRight size={14} className="arrow-icon" />
                <span>Material Design 3 Палитра</span>
              </button>

              <button
                className={`nav-item ${activeDocKey === 'utils' ? 'active' : ''}`}
                onClick={() => setActiveDocKey('utils')}
              >
                <ChevronRight size={14} className="arrow-icon" />
                <span>Core Utilities (Python)</span>
              </button>
            </nav>
          </aside>

          {/* Right Main Doc Content */}
          <main className="docs-content">
            <div className="doc-header-card">
              <h3 className="doc-title">{doc.title}</h3>
              <p className="doc-subtitle">{doc.subtitle}</p>
            </div>

            <div className="code-block-wrapper">
              <div className="code-block-bar">
                <div className="bar-left">
                  <Terminal size={16} />
                  <span className="lang-name">{doc.lang.toUpperCase()}</span>
                </div>

                <button className="copy-code-btn" onClick={handleCopyCode}>
                  {copied ? <Check size={14} /> : <Copy size={14} />}
                  <span>{copied ? 'Скопировано!' : 'Копировать'}</span>
                </button>
              </div>

              <SyntaxHighlighter
                style={vscDarkPlus}
                language={doc.lang}
                showLineNumbers={true}
                customStyle={{
                  margin: 0,
                  padding: '24px',
                  fontSize: '0.9rem',
                  borderRadius: '0 0 16px 16px',
                  background: '#101113'
                }}
              >
                {doc.code}
              </SyntaxHighlighter>
            </div>
          </main>
        </div>
      </div>

      <style>{`
        .docs-section {
          padding: 80px 24px;
          background-color: var(--md-sys-color-background);
        }

        .section-container {
          max-width: 1200px;
          margin: 0 auto;
        }

        .section-header {
          text-align: center;
          margin-bottom: 48px;
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
        }

        .highlight-text {
          color: var(--color-flame);
        }

        .docs-layout {
          display: flex;
          gap: 28px;
          align-items: flex-start;
        }

        .docs-sidebar {
          width: 300px;
          flex-shrink: 0;
          background-color: var(--color-jet);
          border: 1px solid var(--md-sys-color-outline-variant);
          border-radius: var(--md-sys-shape-corner-xl);
          padding: 24px;
        }

        .sidebar-title {
          display: flex;
          align-items: center;
          gap: 10px;
          font-family: 'Google Sans', sans-serif;
          font-size: 1rem;
          font-weight: 700;
          color: var(--color-gold);
          margin-bottom: 18px;
          padding-bottom: 12px;
          border-bottom: 1px solid var(--md-sys-color-outline-variant);
        }

        .docs-nav-list {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        .nav-item {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 12px 14px;
          border-radius: var(--md-sys-shape-corner-m);
          background: transparent;
          border: none;
          color: var(--md-sys-color-on-surface-variant);
          font-family: 'Google Sans', sans-serif;
          font-size: 0.9rem;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.2s ease;
          text-align: left;
        }

        .nav-item:hover {
          background-color: var(--md-sys-color-surface-container);
          color: var(--md-sys-color-on-surface);
        }

        .nav-item.active {
          background-color: rgba(238, 198, 67, 0.15);
          color: var(--color-gold);
          font-weight: 700;
        }

        .arrow-icon {
          opacity: 0.5;
        }
        .nav-item.active .arrow-icon {
          opacity: 1;
          color: var(--color-flame);
        }

        .docs-content {
          flex: 1;
          min-width: 0;
        }

        .doc-header-card {
          background-color: var(--color-jet);
          border: 1px solid var(--md-sys-color-outline-variant);
          border-radius: var(--md-sys-shape-corner-xl);
          padding: 28px;
          margin-bottom: 24px;
        }

        .doc-title {
          font-family: 'Google Sans', sans-serif;
          font-size: 1.6rem;
          font-weight: 700;
          color: var(--md-sys-color-on-surface);
          margin-bottom: 8px;
        }

        .doc-subtitle {
          font-size: 1rem;
          color: var(--md-sys-color-on-surface-variant);
        }

        .code-block-wrapper {
          border: 1px solid var(--md-sys-color-outline-variant);
          border-radius: var(--md-sys-shape-corner-xl);
          overflow: hidden;
          box-shadow: var(--md-sys-elevation-2);
        }

        .code-block-bar {
          display: flex;
          justify-content: space-between;
          align-items: center;
          background-color: var(--color-jet);
          padding: 12px 20px;
          border-bottom: 1px solid var(--md-sys-color-outline-variant);
        }

        .bar-left {
          display: flex;
          align-items: center;
          gap: 8px;
          color: var(--color-gold);
          font-family: 'Roboto Mono', monospace;
          font-size: 0.85rem;
          font-weight: 600;
        }

        .copy-code-btn {
          display: flex;
          align-items: center;
          gap: 6px;
          background: transparent;
          border: 1px solid var(--md-sys-color-outline-variant);
          color: var(--md-sys-color-on-surface);
          padding: 6px 14px;
          border-radius: var(--md-sys-shape-corner-full);
          font-size: 0.8rem;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .copy-code-btn:hover {
          border-color: var(--color-gold);
          color: var(--color-gold);
        }

        @media (max-width: 850px) {
          .docs-layout {
            flex-direction: column;
          }
          .docs-sidebar {
            width: 100%;
          }
        }
      `}</style>
    </section>
  );
}
