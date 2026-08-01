// GitHub REST API Integration Service

const BASE_URL = 'https://api.github.com';
const TOKEN_KEY = 'md3_github_pat';

export const githubApi = {
  getToken: () => {
    return localStorage.getItem(TOKEN_KEY) || '';
  },

  setToken: (token) => {
    if (token) {
      localStorage.setItem(TOKEN_KEY, token.trim());
    } else {
      localStorage.removeItem(TOKEN_KEY);
    }
  },

  getHeaders: () => {
    const headers = {
      'Accept': 'application/vnd.github.v3+json',
    };
    const token = githubApi.getToken();
    if (token) {
      headers['Authorization'] = `token ${token}`;
    }
    return headers;
  },

  async request(endpoint, options = {}) {
    const response = await fetch(`${BASE_URL}${endpoint}`, {
      ...options,
      headers: {
        ...githubApi.getHeaders(),
        ...options.headers,
      },
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      const message = errorData.message || `HTTP ${response.status}: ${response.statusText}`;
      
      if (response.status === 403 && message.includes('rate limit')) {
        throw new Error('Превышен лимит запросов GitHub API (60/час). Введите Personal Access Token в настройках для увеличения лимита до 5000/час.');
      }
      throw new Error(message);
    }

    return response.json();
  },

  async getRepo(owner, repo) {
    return githubApi.request(`/repos/${owner}/${repo}`);
  },

  async getBranches(owner, repo) {
    const branches = await githubApi.request(`/repos/${owner}/${repo}/branches?per_page=100`);
    return branches.map(b => b.name);
  },

  async getReadme(owner, repo, branch = '') {
    const query = branch ? `?ref=${branch}` : '';
    try {
      const data = await githubApi.request(`/repos/${owner}/${repo}/readme${query}`);
      // Decode base64 UTF-8 content safely
      const binaryString = atob(data.content.replace(/\n/g, ''));
      const bytes = new Uint8Array(binaryString.length);
      for (let i = 0; i < binaryString.length; i++) {
        bytes[i] = binaryString.charCodeAt(i);
      }
      const decodedText = new TextDecoder('utf-8').decode(bytes);
      return {
        content: decodedText,
        path: data.path,
        html_url: data.html_url
      };
    } catch (err) {
      if (err.message.includes('404')) {
        return { content: '# README не найден в этом репозитории', path: '' };
      }
      throw err;
    }
  },

  async getTree(owner, repo, branch = 'main') {
    const data = await githubApi.request(`/repos/${owner}/${repo}/git/trees/${branch}?recursive=1`);
    return data.tree || [];
  },

  async getFileContent(owner, repo, path, branch = 'main') {
    const data = await githubApi.request(`/repos/${owner}/${repo}/contents/${path}?ref=${branch}`);
    if (data.encoding === 'base64') {
      const binaryString = atob(data.content.replace(/\n/g, ''));
      const bytes = new Uint8Array(binaryString.length);
      for (let i = 0; i < binaryString.length; i++) {
        bytes[i] = binaryString.charCodeAt(i);
      }
      return {
        content: new TextDecoder('utf-8').decode(bytes),
        size: data.size,
        name: data.name,
        download_url: data.download_url
      };
    }
    return {
      content: data.content || '',
      size: data.size,
      name: data.name,
      download_url: data.download_url
    };
  },

  async getCommits(owner, repo, branch = 'main', page = 1) {
    return githubApi.request(`/repos/${owner}/${repo}/commits?sha=${branch}&per_page=30&page=${page}`);
  },

  async getReleases(owner, repo) {
    return githubApi.request(`/repos/${owner}/${repo}/releases?per_page=20`);
  },

  async getOrgDetails(orgName = 'nonFeature') {
    try {
      return await githubApi.request(`/orgs/${orgName}`);
    } catch {
      // Fallback to user if not an org account
      return await githubApi.request(`/users/${orgName}`);
    }
  },

  async getOrgRepos(orgName = 'nonFeature') {
    try {
      return await githubApi.request(`/orgs/${orgName}/repos?per_page=100&sort=updated`);
    } catch {
      return await githubApi.request(`/users/${orgName}/repos?per_page=100&sort=updated`);
    }
  },

  async getOrgMembers(orgName = 'nonFeature') {
    try {
      return await githubApi.request(`/orgs/${orgName}/members?per_page=30`);
    } catch {
      // If user account, return self
      const user = await githubApi.request(`/users/${orgName}`);
      return [user];
    }
  },

  async getRateLimit() {
    try {
      const res = await githubApi.request('/rate_limit');
      return res.rate;
    } catch {
      return null;
    }
  }
};
