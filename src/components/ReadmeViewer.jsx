import React, { useState, useMemo } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus, vs } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { Copy, Check, FileText, Code, List, ExternalLink } from 'lucide-react';

export default function ReadmeViewer({ readmeData, theme, loading, repoInfo }) {
  const [copied, setCopied] = useState(false);
  const [viewRaw, setViewRaw] = useState(false);

  // Extract Table of Contents (Headings) from Markdown content
  const tableOfContents = useMemo(() => {
    if (!readmeData?.content) return [];
    const lines = readmeData.content.split('\n');
    const headings = [];
    lines.forEach((line) => {
      const match = line.match(/^(#{1,3})\s+(.+)$/);
      if (match) {
        const level = match[1].length;
        const title = match[2].replace(/\[([^\]]+)\]\([^)]+\)/g, '$1').trim();
        const id = title.toLowerCase().replace(/[^\w\u0400-\u04FF -]/g, '').replace(/\s+/g, '-');
        headings.push({ level, title, id });
      }
    });
    return headings;
  }, [readmeData]);

  const handleCopy = () => {
    if (readmeData?.content) {
      navigator.clipboard.writeText(readmeData.content);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  if (loading) {
    return (
      <div className="doc-loading">
        <div className="md3-spinner"></div>
        <p>Загрузка документации...</p>
        <style>{`
          .doc-loading {
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
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
          @keyframes spin {
            to { transform: rotate(360deg); }
          }
        `}</style>
      </div>
    );
  }

  if (!readmeData || !readmeData.content) {
    return (
      <div className="doc-empty">
        <FileText size={48} className="empty-icon" />
        <h3>Документация (README) не найдена</h3>
        <p>В данном репозитории отсутствует файл README.md</p>
        <style>{`
          .doc-empty {
            text-align: center;
            padding: 60px 24px;
            color: var(--md-sys-color-outline);
          }
          .empty-icon {
            margin-bottom: 12px;
            color: var(--md-sys-color-outline-variant);
          }
        `}</style>
      </div>
    );
  }

  return (
    <div className="readme-layout">
      {/* Table of Contents Sidebar */}
      {tableOfContents.length > 0 && !viewRaw && (
        <aside className="toc-sidebar">
          <div className="toc-header">
            <List size={18} />
            <span>Оглавление</span>
          </div>
          <nav className="toc-nav">
            {tableOfContents.map((item, index) => (
              <a
                key={index}
                href={`#${item.id}`}
                className={`toc-item level-${item.level}`}
              >
                {item.title}
              </a>
            ))}
          </nav>
        </aside>
      )}

      {/* Main Documentation Area */}
      <main className="readme-main">
        <div className="readme-toolbar">
          <div className="toolbar-left">
            <FileText size={18} />
            <span className="file-name">{readmeData.path || 'README.md'}</span>
            {readmeData.html_url && (
              <a
                href={readmeData.html_url}
                target="_blank"
                rel="noreferrer"
                className="github-link"
                title="Открыть на GitHub"
              >
                <ExternalLink size={14} />
              </a>
            )}
          </div>

          <div className="toolbar-actions">
            <button
              className={`toggle-view-btn ${viewRaw ? 'active' : ''}`}
              onClick={() => setViewRaw(!viewRaw)}
            >
              {viewRaw ? <FileText size={16} /> : <Code size={16} />}
              <span>{viewRaw ? 'Рендер' : 'Исходник'}</span>
            </button>

            <button className="copy-btn" onClick={handleCopy}>
              {copied ? <Check size={16} /> : <Copy size={16} />}
              <span>{copied ? 'Скопировано!' : 'Копировать'}</span>
            </button>
          </div>
        </div>

        <div className="readme-content-card">
          {viewRaw ? (
            <pre className="raw-markdown">{readmeData.content}</pre>
          ) : (
            <div className="markdown-body">
              <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                rehypePlugins={[rehypeRaw]}
                components={{
                  h1: ({ children, ...props }) => {
                    const text = String(children);
                    const id = text.toLowerCase().replace(/[^\w\u0400-\u04FF -]/g, '').replace(/\s+/g, '-');
                    return <h1 id={id} {...props}>{children}</h1>;
                  },
                  h2: ({ children, ...props }) => {
                    const text = String(children);
                    const id = text.toLowerCase().replace(/[^\w\u0400-\u04FF -]/g, '').replace(/\s+/g, '-');
                    return <h2 id={id} {...props}>{children}</h2>;
                  },
                  h3: ({ children, ...props }) => {
                    const text = String(children);
                    const id = text.toLowerCase().replace(/[^\w\u0400-\u04FF -]/g, '').replace(/\s+/g, '-');
                    return <h3 id={id} {...props}>{children}</h3>;
                  },
                  code({ node, inline, className, children, ...props }) {
                    const match = /language-(\w+)/.exec(className || '');
                    return !inline && match ? (
                      <SyntaxHighlighter
                        style={theme === 'dark' ? vscDarkPlus : vs}
                        language={match[1]}
                        PreTag="div"
                        customStyle={{
                          borderRadius: '12px',
                          margin: '1.2em 0',
                          padding: '16px',
                          fontSize: '0.9rem'
                        }}
                        {...props}
                      >
                        {String(children).replace(/\n$/, '')}
                      </SyntaxHighlighter>
                    ) : (
                      <code className={className} {...props}>
                        {children}
                      </code>
                    );
                  }
                }}
              >
                {readmeData.content}
              </ReactMarkdown>
            </div>
          )}
        </div>
      </main>

      <style>{`
        .readme-layout {
          display: flex;
          gap: 24px;
          padding: 24px;
          max-width: 1400px;
          margin: 0 auto;
          align-items: flex-start;
        }

        .toc-sidebar {
          width: 260px;
          flex-shrink: 0;
          background-color: var(--md-sys-color-surface-container-low);
          border: 1px solid var(--md-sys-color-outline-variant);
          border-radius: var(--md-sys-shape-corner-l);
          padding: 16px;
          position: sticky;
          top: 100px;
          max-height: calc(100vh - 120px);
          overflow-y: auto;
        }

        .toc-header {
          display: flex;
          align-items: center;
          gap: 8px;
          font-family: 'Google Sans', sans-serif;
          font-weight: 600;
          color: var(--md-sys-color-on-surface);
          margin-bottom: 12px;
          padding-bottom: 8px;
          border-bottom: 1px solid var(--md-sys-color-outline-variant);
        }

        .toc-nav {
          display: flex;
          flex-direction: column;
          gap: 6px;
        }

        .toc-item {
          color: var(--md-sys-color-on-surface-variant);
          text-decoration: none;
          font-size: 0.85rem;
          line-height: 1.4;
          padding: 4px 8px;
          border-radius: var(--md-sys-shape-corner-xs);
          transition: all 0.2s ease;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }

        .toc-item:hover {
          background-color: var(--md-sys-color-surface-container-high);
          color: var(--md-sys-color-primary);
        }

        .toc-item.level-1 { font-weight: 600; }
        .toc-item.level-2 { padding-left: 16px; }
        .toc-item.level-3 { padding-left: 28px; font-size: 0.8rem; }

        .readme-main {
          flex: 1;
          min-width: 0;
        }

        .readme-toolbar {
          display: flex;
          align-items: center;
          justify-content: space-between;
          background-color: var(--md-sys-color-surface-container-high);
          padding: 10px 18px;
          border-radius: var(--md-sys-shape-corner-m) var(--md-sys-shape-corner-m) 0 0;
          border: 1px solid var(--md-sys-color-outline-variant);
          border-bottom: none;
        }

        .toolbar-left {
          display: flex;
          align-items: center;
          gap: 8px;
          font-weight: 500;
          color: var(--md-sys-color-on-surface);
        }

        .file-name {
          font-family: 'Roboto Mono', monospace;
          font-size: 0.9rem;
        }

        .github-link {
          color: var(--md-sys-color-outline);
          display: flex;
          align-items: center;
        }
        .github-link:hover {
          color: var(--md-sys-color-primary);
        }

        .toolbar-actions {
          display: flex;
          gap: 8px;
        }

        .toggle-view-btn, .copy-btn {
          display: flex;
          align-items: center;
          gap: 6px;
          padding: 6px 14px;
          border-radius: var(--md-sys-shape-corner-full);
          border: 1px solid var(--md-sys-color-outline-variant);
          background-color: var(--md-sys-color-surface-container-lowest);
          color: var(--md-sys-color-on-surface);
          font-size: 0.8rem;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .toggle-view-btn:hover, .copy-btn:hover {
          background-color: var(--md-sys-color-primary-container);
          color: var(--md-sys-color-on-primary-container);
          border-color: transparent;
        }

        .readme-content-card {
          background-color: var(--md-sys-color-surface-container-lowest);
          border: 1px solid var(--md-sys-color-outline-variant);
          border-radius: 0 0 var(--md-sys-shape-corner-l) var(--md-sys-shape-corner-l);
          padding: 32px;
          box-shadow: var(--md-sys-elevation-1);
        }

        .raw-markdown {
          font-family: 'Roboto Mono', monospace;
          font-size: 0.875rem;
          white-space: pre-wrap;
          word-break: break-word;
          color: var(--md-sys-color-on-surface);
        }

        @media (max-width: 900px) {
          .readme-layout {
            flex-direction: column;
          }
          .toc-sidebar {
            width: 100%;
            position: static;
            max-height: none;
          }
        }
      `}</style>
    </div>
  );
}
