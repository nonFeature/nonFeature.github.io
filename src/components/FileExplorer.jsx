import React, { useState, useMemo, useEffect } from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus, vs } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { 
  Folder, FolderOpen, FileCode, FileImage, FileText, 
  Search, GitBranch, Copy, Check, Download, ChevronRight, ChevronDown 
} from 'lucide-react';
import { githubApi } from '../services/githubApi';

// Helper to determine file icon and language
function getFileInfo(path = '') {
  const ext = path.split('.').pop().toLowerCase();
  if (['png', 'jpg', 'jpeg', 'svg', 'gif', 'webp', 'ico'].includes(ext)) {
    return { type: 'image', lang: ext, icon: FileImage };
  }
  if (['md', 'txt', 'rst', 'markdown'].includes(ext)) {
    return { type: 'doc', lang: 'markdown', icon: FileText };
  }
  const langMap = {
    js: 'javascript', jsx: 'jsx', ts: 'typescript', tsx: 'tsx',
    py: 'python', json: 'json', html: 'html', css: 'css',
    go: 'go', rs: 'rust', cpp: 'cpp', c: 'c', java: 'java',
    sh: 'bash', yaml: 'yaml', yml: 'yaml', toml: 'toml', sql: 'sql'
  };
  return { type: 'code', lang: langMap[ext] || 'clike', icon: FileCode };
}

// Convert flat tree array from GitHub into nested folder structure
function buildNestedTree(flatTree = []) {
  const root = { name: '', path: '', type: 'tree', children: {} };

  flatTree.forEach(item => {
    const parts = item.path.split('/');
    let current = root;

    parts.forEach((part, index) => {
      const isLast = index === parts.length - 1;
      if (!current.children[part]) {
        current.children[part] = {
          name: part,
          path: parts.slice(0, index + 1).join('/'),
          type: isLast ? item.type : 'tree',
          size: item.size,
          children: {}
        };
      }
      current = current.children[part];
    });
  });

  return root;
}

export default function FileExplorer({ owner, repo, branches, currentBranch, onBranchChange, theme }) {
  const [flatTree, setFlatTree] = useState([]);
  const [treeLoading, setTreeLoading] = useState(false);
  const [filterQuery, setFilterQuery] = useState('');
  const [expandedFolders, setExpandedFolders] = useState(new Set(['src']));
  const [selectedFile, setSelectedFile] = useState(null);
  const [fileData, setFileData] = useState(null);
  const [fileLoading, setFileLoading] = useState(false);
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState('');

  // Fetch Tree when repo/branch changes
  useEffect(() => {
    async function loadTree() {
      if (!owner || !repo) return;
      setTreeLoading(true);
      setError('');
      try {
        const tree = await githubApi.getTree(owner, repo, currentBranch);
        setFlatTree(tree);
        
        // Auto select first readable file if none selected
        const firstBlob = tree.find(i => i.type === 'blob' && (i.path.endsWith('.js') || i.path.endsWith('.ts') || i.path.endsWith('.py') || i.path.endsWith('.md') || i.path.endsWith('package.json')));
        if (firstBlob) {
          handleSelectFile(firstBlob.path);
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setTreeLoading(false);
      }
    }
    loadTree();
  }, [owner, repo, currentBranch]);

  // Fetch File Content when selectedFile changes
  const handleSelectFile = async (path) => {
    setSelectedFile(path);
    setFileLoading(true);
    try {
      const data = await githubApi.getFileContent(owner, repo, path, currentBranch);
      setFileData(data);
    } catch (err) {
      setFileData({ content: `Ошибка загрузки файла: ${err.message}`, error: true });
    } finally {
      setFileLoading(false);
    }
  };

  const toggleFolder = (path) => {
    const next = new Set(expandedFolders);
    if (next.has(path)) {
      next.delete(path);
    } else {
      next.add(path);
    }
    setExpandedFolders(next);
  };

  // Filter flat tree if search query exists
  const filteredTree = useMemo(() => {
    if (!filterQuery.trim()) return flatTree;
    const q = filterQuery.toLowerCase();
    return flatTree.filter(item => item.path.toLowerCase().includes(q));
  }, [flatTree, filterQuery]);

  const nestedTree = useMemo(() => buildNestedTree(flatTree), [flatTree]);

  // Recursive Tree Component
  const renderTreeItem = (node, depth = 0) => {
    const isFolder = node.type === 'tree';
    const isExpanded = expandedFolders.has(node.path);
    const isSelected = selectedFile === node.path;
    const fileInfo = getFileInfo(node.path);
    const Icon = isFolder ? (isExpanded ? FolderOpen : Folder) : fileInfo.icon;

    return (
      <div key={node.path} className="tree-node-wrapper">
        <div
          className={`tree-node ${isSelected ? 'selected' : ''}`}
          style={{ paddingLeft: `${depth * 14 + 12}px` }}
          onClick={() => {
            if (isFolder) toggleFolder(node.path);
            else handleSelectFile(node.path);
          }}
        >
          {isFolder ? (
            <span className="folder-arrow">
              {isExpanded ? <ChevronDown size={14} /> : <ChevronRight size={14} />}
            </span>
          ) : (
            <span className="spacer" />
          )}

          <Icon size={16} className={`node-icon ${isFolder ? 'folder-icon' : ''}`} />
          <span className="node-name">{node.name}</span>
        </div>

        {isFolder && isExpanded && (
          <div className="tree-children">
            {Object.values(node.children).map(child => renderTreeItem(child, depth + 1))}
          </div>
        )}
      </div>
    );
  };

  const handleCopyCode = () => {
    if (fileData?.content) {
      navigator.clipboard.writeText(fileData.content);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="explorer-container">
      {/* Left Sidebar: File Tree & Branch Selector */}
      <aside className="explorer-sidebar">
        <div className="sidebar-header">
          {/* Branch Picker */}
          <div className="branch-selector">
            <GitBranch size={16} />
            <select
              value={currentBranch}
              onChange={(e) => onBranchChange(e.target.value)}
              className="branch-select"
            >
              {branches.map(b => (
                <option key={b} value={b}>{b}</option>
              ))}
            </select>
          </div>

          {/* Quick Filter */}
          <div className="filter-input-wrapper">
            <Search size={14} className="filter-icon" />
            <input
              type="text"
              placeholder="Фильтр файлов..."
              value={filterQuery}
              onChange={(e) => setFilterQuery(e.target.value)}
              className="filter-input"
            />
          </div>
        </div>

        {/* Tree List */}
        <div className="tree-scroll-area">
          {treeLoading ? (
            <div className="tree-loader">Загрузка структуры...</div>
          ) : filterQuery.trim() ? (
            <div className="filtered-list">
              {filteredTree.map(item => (
                <div
                  key={item.path}
                  className={`tree-node ${selectedFile === item.path ? 'selected' : ''}`}
                  onClick={() => item.type !== 'tree' && handleSelectFile(item.path)}
                >
                  <FileCode size={16} className="node-icon" />
                  <span className="node-name">{item.path}</span>
                </div>
              ))}
            </div>
          ) : (
            Object.values(nestedTree.children).map(child => renderTreeItem(child))
          )}
        </div>
      </aside>

      {/* Right Content Pane: Code / Image / Document Viewer */}
      <main className="explorer-code-pane">
        {selectedFile ? (
          <div className="code-card">
            <div className="code-header">
              <div className="file-info-group">
                <FileCode size={18} />
                <span className="selected-path">{selectedFile}</span>
                {fileData?.size && (
                  <span className="size-badge">{(fileData.size / 1024).toFixed(1)} KB</span>
                )}
              </div>

              <div className="code-actions">
                <button className="icon-btn" onClick={handleCopyCode} title="Копировать код">
                  {copied ? <Check size={16} /> : <Copy size={16} />}
                </button>
                {fileData?.download_url && (
                  <a 
                    href={fileData.download_url} 
                    target="_blank" 
                    rel="noreferrer" 
                    className="icon-btn"
                    title="Скачать файл"
                  >
                    <Download size={16} />
                  </a>
                )}
              </div>
            </div>

            <div className="code-body">
              {fileLoading ? (
                <div className="code-loader">Чтение файла...</div>
              ) : fileData ? (
                getFileInfo(selectedFile).type === 'image' ? (
                  <div className="image-preview">
                    <img src={fileData.download_url} alt={selectedFile} />
                  </div>
                ) : (
                  <SyntaxHighlighter
                    style={theme === 'dark' ? vscDarkPlus : vs}
                    language={getFileInfo(selectedFile).lang}
                    showLineNumbers={true}
                    customStyle={{
                      margin: 0,
                      padding: '20px',
                      fontSize: '0.88rem',
                      fontFamily: 'Roboto Mono, monospace',
                      background: 'transparent'
                    }}
                  >
                    {fileData.content || ''}
                  </SyntaxHighlighter>
                )
              ) : null}
            </div>
          </div>
        ) : (
          <div className="no-selection">
            <FileCode size={48} />
            <p>Выберите файл слева для просмотра</p>
          </div>
        )}
      </main>

      <style>{`
        .explorer-container {
          display: flex;
          gap: 20px;
          padding: 24px;
          max-width: 1400px;
          margin: 0 auto;
          min-height: calc(100vh - 160px);
        }

        .explorer-sidebar {
          width: 320px;
          flex-shrink: 0;
          background-color: var(--md-sys-color-surface-container-low);
          border: 1px solid var(--md-sys-color-outline-variant);
          border-radius: var(--md-sys-shape-corner-l);
          display: flex;
          flex-direction: column;
          overflow: hidden;
        }

        .sidebar-header {
          padding: 14px;
          display: flex;
          flex-direction: column;
          gap: 10px;
          background-color: var(--md-sys-color-surface-container);
          border-bottom: 1px solid var(--md-sys-color-outline-variant);
        }

        .branch-selector {
          display: flex;
          align-items: center;
          gap: 8px;
          background-color: var(--md-sys-color-surface-container-highest);
          padding: 4px 10px;
          border-radius: var(--md-sys-shape-corner-s);
          color: var(--md-sys-color-on-surface-variant);
        }

        .branch-select {
          background: transparent;
          border: none;
          color: var(--md-sys-color-on-surface);
          font-weight: 500;
          font-size: 0.85rem;
          outline: none;
          width: 100%;
          cursor: pointer;
        }

        .filter-input-wrapper {
          position: relative;
          display: flex;
          align-items: center;
        }

        .filter-icon {
          position: absolute;
          left: 10px;
          color: var(--md-sys-color-outline);
        }

        .filter-input {
          width: 100%;
          height: 34px;
          padding: 0 10px 0 32px;
          border-radius: var(--md-sys-shape-corner-full);
          border: 1px solid var(--md-sys-color-outline-variant);
          background-color: var(--md-sys-color-surface-container-lowest);
          color: var(--md-sys-color-on-surface);
          font-size: 0.82rem;
          outline: none;
        }

        .tree-scroll-area {
          flex: 1;
          overflow-y: auto;
          padding: 8px 0;
        }

        .tree-node {
          display: flex;
          align-items: center;
          gap: 6px;
          padding: 6px 12px;
          cursor: pointer;
          font-size: 0.85rem;
          color: var(--md-sys-color-on-surface-variant);
          user-select: none;
          transition: background 0.15s ease;
        }

        .tree-node:hover {
          background-color: var(--md-sys-color-surface-container-high);
          color: var(--md-sys-color-on-surface);
        }

        .tree-node.selected {
          background-color: var(--md-sys-color-primary-container);
          color: var(--md-sys-color-on-primary-container);
          font-weight: 500;
        }

        .node-icon {
          color: var(--md-sys-color-primary);
        }
        .folder-icon {
          color: var(--md-sys-color-secondary);
        }

        .spacer { width: 14px; }

        .explorer-code-pane {
          flex: 1;
          min-width: 0;
        }

        .code-card {
          background-color: var(--md-sys-color-surface-container-lowest);
          border: 1px solid var(--md-sys-color-outline-variant);
          border-radius: var(--md-sys-shape-corner-l);
          overflow: hidden;
          box-shadow: var(--md-sys-elevation-1);
        }

        .code-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 10px 18px;
          background-color: var(--md-sys-color-surface-container-high);
          border-bottom: 1px solid var(--md-sys-color-outline-variant);
        }

        .file-info-group {
          display: flex;
          align-items: center;
          gap: 10px;
          font-family: 'Roboto Mono', monospace;
          font-size: 0.875rem;
        }

        .size-badge {
          background-color: var(--md-sys-color-surface-container-highest);
          padding: 2px 8px;
          border-radius: var(--md-sys-shape-corner-full);
          font-size: 0.75rem;
        }

        .code-actions {
          display: flex;
          gap: 6px;
        }

        .icon-btn {
          width: 32px;
          height: 32px;
          border-radius: var(--md-sys-shape-corner-full);
          background-color: var(--md-sys-color-surface-container);
          color: var(--md-sys-color-on-surface-variant);
          border: none;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          text-decoration: none;
        }
        .icon-btn:hover {
          background-color: var(--md-sys-color-primary-container);
          color: var(--md-sys-color-on-primary-container);
        }

        .code-body {
          max-height: calc(100vh - 240px);
          overflow: auto;
        }

        .no-selection {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          height: 400px;
          color: var(--md-sys-color-outline);
          gap: 12px;
        }

        .image-preview {
          display: flex;
          justify-content: center;
          padding: 40px;
        }
        .image-preview img {
          max-width: 100%;
          max-height: 500px;
          border-radius: var(--md-sys-shape-corner-m);
        }

        @media (max-width: 900px) {
          .explorer-container {
            flex-direction: column;
          }
          .explorer-sidebar {
            width: 100%;
            height: 300px;
          }
        }
      `}</style>
    </div>
  );
}
