/**
 * Copilot Glass New Tab - Core Logic & Interactions (Zero-Flicker & Single-Layer Capsule)
 */

(function () {
  'use strict';

  // --------------------------------------------------------------------------
  // Default Configurations & State
  // --------------------------------------------------------------------------
  const DEFAULT_SHORTCUTS = [
    { id: 'bilibili', title: 'bilibili', url: 'https://www.bilibili.com', iconType: 'svg', iconVal: 'bilibili' },
    { id: 'chat', title: 'chat', url: 'https://chatgpt.com', iconType: 'svg', iconVal: 'chatgpt' },
    { id: 'youtube', title: 'youtube', url: 'https://www.youtube.com', iconType: 'svg', iconVal: 'youtube' },
    { id: 'github', title: 'GitHub', url: 'https://github.com', iconType: 'svg', iconVal: 'github' },
    { id: 'translate', title: 'translate', url: 'https://translate.google.com', iconType: 'svg', iconVal: 'translate' },
    { id: 'google', title: 'google', url: 'https://www.google.com', iconType: 'svg', iconVal: 'google' },
    { id: 'friendlywrt', title: 'OpenWrt', url: 'http://192.168.2.1', iconType: 'svg', iconVal: 'router' },
    { id: 'grok', title: 'grok', url: 'https://grok.com', iconType: 'svg', iconVal: 'grok' }
  ];

  const ENGINES = {
    google: { name: 'Google', label: 'Google', url: 'https://www.google.com/search?q=' },
    chatgpt: { name: 'ChatGPT', label: 'ChatGPT', url: 'https://chatgpt.com/?hints=search&q=' },
    ai: { name: 'AI Mode', label: 'AI Mode', url: 'https://www.google.com/search?udm=50&q=' },
    bing: { name: 'Bing', label: 'Bing', url: 'https://www.bing.com/search?q=' },
    bilibili: { name: 'Bilibili', label: 'Bilibili', url: 'https://search.bilibili.com/all?keyword=' }
  };

  const SVG_ICONS = {
    bilibili: `<svg viewBox="0 0 24 24" class="shortcut-icon-svg" fill="#00A1D6"><path d="M18.8 3.7a1 1 0 0 0-1.4 0L14.7 6.4H9.3L6.6 3.7A1 1 0 1 0 5.2 5.1L6.7 6.6C3.9 7 2 9.2 2 12.1v6c0 3.2 2.7 5.9 6 5.9h8c3.3 0 6-2.7 6-5.9v-6c0-2.9-1.9-5.1-4.7-5.5l1.5-1.5a1 1 0 0 0 0-1.4zM8 12a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3zm8 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3z"/></svg>`,
    chatgpt: `<svg viewBox="0 0 24 24" class="shortcut-icon-svg" fill="#10a37f"><path d="M22.28 9.37a5.57 5.57 0 0 0-.46-4.42 5.76 5.76 0 0 0-5.46-2.9 5.6 5.6 0 0 0-4.32-1.95 5.74 5.74 0 0 0-5.5 4.02 5.56 5.56 0 0 0-3.8 2.75 5.73 5.73 0 0 0 .7 6.18 5.57 5.57 0 0 0 .46 4.42 5.76 5.76 0 0 0 5.46 2.9 5.6 5.6 0 0 0 4.32 1.95 5.74 5.74 0 0 0 5.5-4.02 5.56 5.56 0 0 0 3.8-2.75 5.73 5.73 0 0 0-.7-6.18zM12 19.38a3.38 3.38 0 1 1 0-6.76 3.38 3.38 0 0 1 0 6.76z"/></svg>`,
    youtube: `<svg viewBox="0 0 24 24" class="shortcut-icon-svg" fill="#FF0000"><path d="M23.5 6.2a3 3 0 0 0-2.1-2.1C19.5 3.5 12 3.5 12 3.5s-7.5 0-9.4.6A3 3 0 0 0 .5 6.2 31.4 31.4 0 0 0 0 12a31.4 31.4 0 0 0 .5 5.8 3 3 0 0 0 2.1 2.1c1.9.6 9.4.6 9.4.6s7.5 0 9.4-.6a3 3 0 0 0 2.1-2.1c.4-1.9.5-3.8.5-5.8s-.1-3.9-.5-5.8zM9.5 15.5V8.5l6.3 3.5-6.3 3.5z"/></svg>`,
    github: `<svg viewBox="0 0 24 24" class="shortcut-icon-svg" fill="#ffffff"><path fill-rule="evenodd" clip-rule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"/></svg>`,
    translate: `<svg viewBox="0 0 24 24" class="shortcut-icon-svg" fill="#4285F4"><path d="M12.87 15.07l-2.54-2.51.03-.03A17.52 17.52 0 0 0 14.07 6H17V4h-7V2H8v2H1v2h11.17C11.5 7.92 10.44 9.75 9 11.35 8.07 10.32 7.3 9.19 6.69 8h-2c.73 1.63 1.73 3.17 2.98 4.56l-5.09 5.02L4 19l5-5 3.11 3.11.76-2.04zM18.5 10h-2L12 22h2l1.12-3h4.75L21 22h2l-4.5-12zm-2.62 7l1.62-4.33L19.12 17h-3.24z"/></svg>`,
    google: `<svg viewBox="0 0 24 24" class="shortcut-icon-svg"><path fill="#4285F4" d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.66-5.17 3.66-9.17z"/><path fill="#34A853" d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.25v3.15C3.26 21.36 7.35 24 12 24z"/><path fill="#FBBC05" d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.58H1.25C.45 8.18 0 9.99 0 12s.45 3.82 1.25 5.42l4.03-3.15z"/><path fill="#EA4335" d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.35 0 3.26 2.64 1.25 6.58l4.03 3.15c.95-2.83 3.6-4.98 6.72-4.98z"/></svg>`,
    router: `<svg viewBox="0 0 24 24" class="shortcut-icon-svg" fill="#38bdf8"><path d="M4 13h16a2 2 0 0 1 2 2v4a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2v-4a2 2 0 0 1 2-2zm2 3a1.2 1.2 0 1 0 0 2.4 1.2 1.2 0 0 0 0-2.4zm4 0a1.2 1.2 0 1 0 0 2.4 1.2 1.2 0 0 0 0-2.4zm4 0a1.2 1.2 0 1 0 0 2.4 1.2 1.2 0 0 0 0-2.4zm4 0a1.2 1.2 0 1 0 0 2.4 1.2 1.2 0 0 0 0-2.4zM6 4a1.2 1.2 0 0 1 1.2 1.2V13H4.8V5.2A1.2 1.2 0 0 1 6 4zm12 0a1.2 1.2 0 0 1 1.2 1.2V13h-2.4V5.2A1.2 1.2 0 0 1 18 4z"/></svg>`,
    grok: `<svg viewBox="0 0 24 24" class="shortcut-icon-svg" fill="#ffffff"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>`
  };

  let initialShortcuts = DEFAULT_SHORTCUTS;
  try {
    const rawShortcuts = localStorage.getItem('copilot_shortcuts');
    if (rawShortcuts) {
      const parsed = JSON.parse(rawShortcuts);
      if (Array.isArray(parsed) && parsed.length > 0) {
        initialShortcuts = parsed;
      }
    }
  } catch (e) {
    initialShortcuts = DEFAULT_SHORTCUTS;
  }

  function saveShortcutsToStorage() {
    try {
      localStorage.setItem('copilot_shortcuts', JSON.stringify(state.shortcuts));
    } catch (e) {
      console.warn('localStorage save warning:', e);
    }
    if (typeof chrome !== 'undefined' && chrome.storage && chrome.storage.local) {
      try {
        chrome.storage.local.set({ copilot_shortcuts: state.shortcuts });
      } catch (e) {}
    }
  }

  let savedEngine = localStorage.getItem('copilot_default_engine') || 'google';
  if (savedEngine === 'gemini' || !ENGINES[savedEngine]) {
    savedEngine = 'google';
    localStorage.setItem('copilot_default_engine', 'google');
  }

  let state = {
    searchPlaceholder: localStorage.getItem('copilot_search_placeholder') || 'Message Gemini...',
    wallpaperSource: localStorage.getItem('copilot_wallpaper_source') || 'upload',
    customWallpaperUrl: localStorage.getItem('copilot_custom_wallpaper_url') || '',
    bgDim: localStorage.getItem('copilot_bg_dim') !== null ? parseInt(localStorage.getItem('copilot_bg_dim'), 10) : 15,
    bgBlur: localStorage.getItem('copilot_bg_blur') !== null ? parseInt(localStorage.getItem('copilot_bg_blur'), 10) : 0,
    currentEngine: savedEngine,
    shortcuts: initialShortcuts
  };

  // DOM Elements
  const searchInput = document.getElementById('searchInput');
  const modeSelectBtn = document.getElementById('modeSelectBtn');
  const modeMenu = document.getElementById('modeMenu');
  const currentEngineLabel = document.getElementById('currentEngineLabel');
  const mentionPopover = document.getElementById('mentionPopover');
  const mentionList = document.getElementById('mentionList');
  const shortcutsGrid = document.getElementById('shortcutsGrid');

  // Modals

  const settingsModal = document.getElementById('settingsModal');
  const closeSettingsModal = document.getElementById('closeSettingsModal');
  const saveSettingsBtn = document.getElementById('saveSettingsBtn');
  const resetShortcutsBtn = document.getElementById('resetShortcutsBtn');

  // Shortcut Edit Modal
  const shortcutEditModal = document.getElementById('shortcutEditModal');
  const closeShortcutEditModal = document.getElementById('closeShortcutEditModal');
  const cancelShortcutEditBtn = document.getElementById('cancelShortcutEditBtn');
  const saveShortcutBtn = document.getElementById('saveShortcutBtn');
  const addNewShortcutModalBtn = document.getElementById('addNewShortcutModalBtn');

  let editingShortcutIndex = -1;

  // --------------------------------------------------------------------------
  // IndexedDB Storage for Lossless Wallpapers (No 5MB quota limit!)
  // --------------------------------------------------------------------------
  const DB_NAME = 'CopilotGlassNewTabDB';
  const DB_VERSION = 1;
  const STORE_NAME = 'wallpaperStore';

  function openWallpaperDB() {
    return new Promise((resolve, reject) => {
      const request = indexedDB.open(DB_NAME, DB_VERSION);
      request.onupgradeneeded = (e) => {
        const db = e.target.result;
        if (!db.objectStoreNames.contains(STORE_NAME)) {
          db.createObjectStore(STORE_NAME);
        }
      };
      request.onsuccess = (e) => resolve(e.target.result);
      request.onerror = (e) => reject(e.target.error);
    });
  }

  async function saveWallpaperToDB(dataUrl) {
    try {
      const db = await openWallpaperDB();
      return new Promise((resolve, reject) => {
        const tx = db.transaction(STORE_NAME, 'readwrite');
        const store = tx.objectStore(STORE_NAME);
        store.put(dataUrl, 'custom_wallpaper');
        tx.oncomplete = () => resolve(true);
        tx.onerror = () => reject(tx.error);
      });
    } catch (e) {
      console.warn('IndexedDB save error:', e);
    }
  }

  async function loadWallpaperFromDB() {
    try {
      const db = await openWallpaperDB();
      return new Promise((resolve, reject) => {
        const tx = db.transaction(STORE_NAME, 'readonly');
        const store = tx.objectStore(STORE_NAME);
        const req = store.get('custom_wallpaper');
        req.onsuccess = () => resolve(req.result || '');
        req.onerror = () => reject(req.error);
      });
    } catch (e) {
      console.warn('IndexedDB load error:', e);
      return '';
    }
  }

  // --------------------------------------------------------------------------
  // Initialization
  // --------------------------------------------------------------------------
  async function init() {
    try {
      if (state.wallpaperSource === 'upload') {
        const dbWp = await loadWallpaperFromDB();
        if (dbWp) {
          state.customWallpaperUrl = dbWp;
        }
      }
    } catch (e) {}

    renderWallpaper();
    renderPlaceholder();
    renderEngineUI();
    renderShortcuts();
    setupEventListeners();
    focusSearch();

    // 空闲时间调度后台图标缓存，主线程 0 阻塞
    if ('requestIdleCallback' in window) {
      window.requestIdleCallback(() => {
        cacheAllShortcutIcons(false);
      }, { timeout: 250 });
    } else {
      setTimeout(() => {
        cacheAllShortcutIcons(false);
      }, 250);
    }
  }

  function focusSearch() {
    if (searchInput) {
      searchInput.focus();
    }
    setTimeout(() => {
      if (searchInput && document.activeElement !== searchInput) {
        searchInput.focus();
      }
    }, 50);
  }

  // --------------------------------------------------------------------------
  // Search Box Placeholder Logic (自定义占位提示文本)
  // --------------------------------------------------------------------------
  function renderPlaceholder() {
    const text = (state.searchPlaceholder || '').trim() || 'Message Gemini...';
    if (searchInput) {
      searchInput.placeholder = text;
    }
  }

  function renderWallpaper() {
    const wallpaperEl = document.getElementById('wallpaper');
    if (wallpaperEl) {
      const bgSrc = state.customWallpaperUrl || '';
      if (bgSrc) {
        wallpaperEl.style.backgroundImage = `url('${bgSrc}')`;
        const img = new Image();
        img.onload = () => {
          wallpaperEl.classList.add('loaded');
        };
        img.src = bgSrc;
        if (img.complete) {
          requestAnimationFrame(() => {
            wallpaperEl.classList.add('loaded');
          });
        }
      } else {
        wallpaperEl.style.backgroundImage = 'none';
        wallpaperEl.classList.remove('loaded');
      }
    }
    document.documentElement.style.setProperty('--bg-dim', (state.bgDim / 100).toString());
    document.documentElement.style.setProperty('--bg-blur', `${state.bgBlur}px`);
  }

  // --------------------------------------------------------------------------
  // Engine & Search UI
  // --------------------------------------------------------------------------
  function renderEngineUI() {
    const engine = ENGINES[state.currentEngine] || ENGINES.google;
    currentEngineLabel.textContent = engine.name;

    document.querySelectorAll('.mode-menu .menu-item').forEach(item => {
      if (item.getAttribute('data-engine') === state.currentEngine) {
        item.classList.add('active');
      } else {
        item.classList.remove('active');
      }
    });
  }

  function setEngine(engineKey) {
    if (ENGINES[engineKey]) {
      state.currentEngine = engineKey;
      renderEngineUI();
      const wrapper = document.querySelector('.mode-dropdown-wrapper');
      if (wrapper) {
        wrapper.classList.remove('open', 'hovering');
      }
      searchInput.focus();
    }
  }

  function isDirectUrl(text) {
    if (!text || text.includes(' ')) return false;
    // 明确的协议或 www 开头
    if (/^(https?:\/\/|ftp:\/\/|file:\/\/|chrome:\/\/|edge:\/\/|www\.)/i.test(text)) {
      return true;
    }
    // 本地主机 (localhost:3000 等)
    if (/^localhost(:\d+)?(\/.*)?$/i.test(text)) {
      return true;
    }
    // IPv4 地址 (如 192.168.1.1)
    if (/^(\d{1,3}\.){3}\d{1,3}(:\d+)?(\/.*)?$/.test(text)) {
      return true;
    }
    // 带有标准顶级域名的有效网址 (如 github.com, bilibili.com, vite.dev, ai.google)
    const validDomainPattern = /^[a-zA-Z0-9][-a-zA-Z0-9]*(\.[a-zA-Z0-9][-a-zA-Z0-9]*)*\.(com|cn|org|net|io|dev|app|ai|me|cc|tv|xyz|top|site|info|gov|edu|co|uk|jp|de|hk|tw|icu|club|vip|online|store)(\/.*)?$/i;
    return validDomainPattern.test(text);
  }

  function executeSearch(query) {
    const text = query !== undefined ? query : searchInput.value.trim();
    if (!text) return;

    // 精确判定是否为网址直达 (避免如 deepseek-r1、claude3.5、vue3.0 等含小数点的搜索词被误判为网址)
    if (isDirectUrl(text)) {
      const url = text.startsWith('http://') || text.startsWith('https://') || text.startsWith('chrome://') || text.startsWith('edge://')
        ? text 
        : `https://${text}`;
      window.location.href = url;
      return;
    }

    // 引擎分发与 @ 指令支持
    let engineKey = state.currentEngine;
    let cleanQuery = text;

    const match = text.match(/^@([a-zA-Z0-9]+)\s*(.*)$/);
    if (match) {
      let target = match[1].toLowerCase();
      if (target === 'gpt') target = 'chatgpt';
      if (ENGINES[target]) {
        engineKey = target;
        cleanQuery = match[2].trim();
      }
    }

    // 保存搜索历史
    saveSearchHistory(cleanQuery);

    const engine = ENGINES[engineKey] || ENGINES.google;
    const targetUrl = engine.url + encodeURIComponent(cleanQuery);
    window.location.href = targetUrl;
  }

  // --------------------------------------------------------------------------
  // Shortcuts Rendering (Ultra-Fast 0-Delay Offline Local Caching)
  // --------------------------------------------------------------------------
  function blobToBase64(blob) {
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result);
      reader.onerror = () => resolve(null);
      reader.readAsDataURL(blob);
    });
  }

  async function fetchFaviconDirect(websiteUrl) {
    const domain = getDomain(websiteUrl);
    if (!domain || domain === 'localhost' || /^(\d+\.){3}\d+/.test(domain)) {
      return null;
    }

    const targetUrl = `https://www.google.com/s2/favicons?domain=${encodeURIComponent(domain)}&sz=128`;
    
    // Fast fetch with 1.2s timeout
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), 1200);
    try {
      const resp = await fetch(targetUrl, { signal: controller.signal });
      clearTimeout(timer);
      if (resp.ok) {
        const blob = await resp.blob();
        if (blob && blob.size > 80) {
          const b64 = await blobToBase64(blob);
          if (b64 && b64.startsWith('data:image')) {
            return b64;
          }
        }
      }
    } catch (e) {
      clearTimeout(timer);
    }
    
    // Guaranteed fallback url
    return targetUrl;
  }

  async function cacheAllShortcutIcons(force = false) {
    const promises = state.shortcuts.map(async (item) => {
      try {
        if (force || !item.cachedIcon) {
          const iconData = await fetchFaviconDirect(item.url);
          if (iconData) {
            item.cachedIcon = iconData;
          }
        }
      } catch (e) {
        // Fallback
        const d = getDomain(item.url);
        if (d && !/^(\d+\.){3}\d+/.test(d)) {
          item.cachedIcon = `https://www.google.com/s2/favicons?domain=${encodeURIComponent(d)}&sz=128`;
        }
      }
    });

    await Promise.all(promises);
    saveShortcutsToStorage();
    renderShortcuts();
    renderShortcutsManageList();
  }

  function renderShortcuts() {
    shortcutsGrid.innerHTML = '';
    state.shortcuts.forEach((item, index) => {
      const link = document.createElement('a');
      link.className = 'shortcut-item';
      link.href = item.url;
      link.title = `${item.title} (${item.url})`;
      link.setAttribute('data-index', index);

      const badge = document.createElement('div');
      badge.className = 'shortcut-badge';

      if (item.cachedIcon) {
        // Direct zero-network local Base64 render
        badge.innerHTML = `<img src="${item.cachedIcon}" class="shortcut-icon" alt="" />`;
      } else if (item.iconType === 'svg' && SVG_ICONS[item.iconVal]) {
        badge.innerHTML = SVG_ICONS[item.iconVal];
      } else if (item.iconType === 'custom_url' && item.iconVal) {
        if (item.iconVal.length <= 4) {
          badge.innerHTML = `<span style="font-size: 20px;">${item.iconVal}</span>`;
        } else {
          badge.innerHTML = `<img src="${item.iconVal}" class="shortcut-icon" alt="" onerror="this.innerText='🔗'"/>`;
        }
      } else {
        const domain = getDomain(item.url);
        badge.innerHTML = `<img src="https://www.google.com/s2/favicons?domain=${domain}&sz=128" class="shortcut-icon" alt="" onerror="this.innerText='🔗'"/>`;
        // One-time automatic background caching pass
        fetchFaviconDirect(item.url).then(b64 => {
          if (b64 && typeof b64 === 'string' && b64.startsWith('data:image')) {
            item.cachedIcon = b64;
            saveShortcutsToStorage();
          }
        }).catch(() => {});
      }

      const title = document.createElement('span');
      title.className = 'shortcut-title';
      title.textContent = item.title;

      link.appendChild(badge);
      link.appendChild(title);
      shortcutsGrid.appendChild(link);
    });
  }

  function getDomain(url) {
    try {
      const u = new URL(url.startsWith('http') ? url : `https://${url}`);
      return u.hostname;
    } catch {
      return url;
    }
  }

  // --------------------------------------------------------------------------
  // Search History & Google Live Suggestions Logic (Floating Acrylic Glass)
  // --------------------------------------------------------------------------
  const searchCapsule = document.getElementById('searchCapsule') || document.querySelector('.search-capsule');
  const searchSuggestPopover = document.getElementById('searchSuggestPopover');
  const suggestList = document.getElementById('suggestList');

  let suggestDebounceTimer = null;
  let suggestAbortController = null;
  let selectedSuggestIndex = -1;

  function escapeHtml(str) {
    return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
  }

  function getSearchHistory() {
    try {
      const raw = localStorage.getItem('copilot_search_history');
      if (raw) {
        const parsed = JSON.parse(raw);
        if (Array.isArray(parsed)) return parsed;
      }
    } catch (e) {}
    return [];
  }

  function saveSearchHistory(query) {
    const q = query.trim();
    if (!q || q.startsWith('@')) return;
    try {
      let history = getSearchHistory().filter(item => item !== q);
      history.unshift(q);
      if (history.length > 12) history = history.slice(0, 12);
      localStorage.setItem('copilot_search_history', JSON.stringify(history));
    } catch (e) {}
  }

  function deleteSearchHistoryItem(idx) {
    try {
      let history = getSearchHistory();
      if (idx >= 0 && idx < history.length) {
        history.splice(idx, 1);
        localStorage.setItem('copilot_search_history', JSON.stringify(history));
        showSearchHistory();
      }
    } catch (e) {}
  }


  function showSearchHistory() {
    const history = getSearchHistory();
    if (!history || history.length === 0) {
      hideSuggestPopover();
      return;
    }
    selectedSuggestIndex = -1;
    
    // 关闭其他可能打开的菜单
    const modeDropdownWrapper = document.getElementById('modeDropdownWrapper') || document.querySelector('.mode-dropdown-wrapper');
    if (modeDropdownWrapper) modeDropdownWrapper.classList.remove('open', 'hovering');
    if (mentionPopover) mentionPopover.style.display = 'none';
    
    let html = '';
    history.forEach((term, idx) => {
      html += `
        <div class="suggest-item" data-type="history" data-idx="${idx}" data-val="${escapeHtml(term)}">
          <div class="suggest-item-left">
            <svg class="suggest-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8">
              <circle cx="12" cy="12" r="10"></circle>
              <polyline points="12 6 12 12 16 14"></polyline>
            </svg>
            <span class="suggest-item-text">${escapeHtml(term)}</span>
          </div>
          <div class="suggest-item-actions">
            <button class="suggest-action-btn delete-btn" data-action="delete-history" data-idx="${idx}" title="删除记录">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>
          </div>
        </div>
      `;
    });
    suggestList.innerHTML = html;
    searchSuggestPopover.classList.add('open');
    if (searchCapsule) searchCapsule.classList.add('has-suggestions');
  }

  function hideSuggestPopover() {
    if (searchSuggestPopover) {
      searchSuggestPopover.classList.remove('open');
    }
    if (searchCapsule) {
      searchCapsule.classList.remove('has-suggestions');
    }
    selectedSuggestIndex = -1;
  }

  async function fetchGoogleSuggestions(query) {
    if (suggestAbortController) {
      suggestAbortController.abort();
    }
    suggestAbortController = new AbortController();
    
    try {
      const url = `https://suggestqueries.google.com/complete/search?client=chrome&q=${encodeURIComponent(query)}`;
      const res = await fetch(url, { signal: suggestAbortController.signal });
      if (res.ok) {
        const data = await res.json();
        if (Array.isArray(data) && Array.isArray(data[1])) {
          return data[1].slice(0, 8);
        }
      }
    } catch (e) {}
    return [];
  }

  function handleSearchInputChange() {
    const modeDropdownWrapper = document.getElementById('modeDropdownWrapper') || document.querySelector('.mode-dropdown-wrapper');
    if (modeDropdownWrapper) modeDropdownWrapper.classList.remove('open', 'hovering');

    const val = searchInput.value.trim();
    if (val.startsWith('@')) {
      hideSuggestPopover();
      checkMention();
      return;
    }
    if (mentionPopover) mentionPopover.style.display = 'none';

    if (!val) {
      showSearchHistory();
      return;
    }

    clearTimeout(suggestDebounceTimer);
    suggestDebounceTimer = setTimeout(async () => {
      const suggestions = await fetchGoogleSuggestions(val);
      if (searchInput.value.trim() !== val) return;

      if (suggestions.length > 0) {
        selectedSuggestIndex = -1;
        let html = '';
        suggestions.forEach((term, idx) => {
          html += `
            <div class="suggest-item" data-type="suggest" data-idx="${idx}" data-val="${escapeHtml(term)}">
              <div class="suggest-item-left">
                <svg class="suggest-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8">
                  <circle cx="11" cy="11" r="8"></circle>
                  <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                </svg>
                <span class="suggest-item-text">${escapeHtml(term)}</span>
              </div>
            </div>
          `;
        });
        suggestList.innerHTML = html;
        searchSuggestPopover.classList.add('open');
        if (searchCapsule) searchCapsule.classList.add('has-suggestions');
      } else {
        hideSuggestPopover();
      }
    }, 120);
  }

  // --------------------------------------------------------------------------
  // Mention Popover (@) Logic
  // --------------------------------------------------------------------------
  function checkMention() {
    const val = searchInput.value;
    if (val.startsWith('@')) {
      const query = val.slice(1).toLowerCase();
      const keys = Object.keys(ENGINES).filter(k => k.includes(query) || ENGINES[k].label.toLowerCase().includes(query));
      
      if (keys.length > 0) {
        renderMentionList(keys);
        mentionPopover.style.display = 'block';
        hideSuggestPopover();
      } else {
        mentionPopover.style.display = 'none';
      }
    } else {
      if (mentionPopover) mentionPopover.style.display = 'none';
    }
  }

  function renderMentionList(keys) {
    mentionList.innerHTML = '';
    keys.forEach((k, idx) => {
      const engine = ENGINES[k];
      const item = document.createElement('div');
      item.className = `mention-item ${idx === 0 ? 'selected' : ''}`;
      item.innerHTML = `
        <div class="menu-item-text">
          <div class="item-title">@${k} - ${engine.label}</div>
          <div class="item-desc">${engine.url}</div>
        </div>
      `;
      item.addEventListener('click', () => {
        setEngine(k);
        searchInput.value = '';
        mentionPopover.style.display = 'none';
        searchInput.focus();
      });
      mentionList.appendChild(item);
    });
  }

  // --------------------------------------------------------------------------
  // 立即访问 / 搜索按钮 (Visit / Submit Button)
  // --------------------------------------------------------------------------
  function setupSubmitButton() {
    const submitSearchBtn = document.getElementById('submitSearchBtn');
    if (submitSearchBtn) {
      submitSearchBtn.addEventListener('click', () => {
        executeSearch();
      });
    }
  }


  // --------------------------------------------------------------------------
  // 设置面板管理 (Settings Modal)
  // --------------------------------------------------------------------------
  function openSettingsModal() {
    try {
      const placeholderInput = document.getElementById('searchPlaceholderInput');
      if (placeholderInput) {
        placeholderInput.value = state.searchPlaceholder || 'Message Gemini...';
      }
      document.getElementById('bgDimRange').value = state.bgDim !== undefined ? state.bgDim : 15;
      document.getElementById('bgDimVal').textContent = `${state.bgDim !== undefined ? state.bgDim : 15}%`;
      document.getElementById('bgBlurRange').value = state.bgBlur !== undefined ? state.bgBlur : 0;
      document.getElementById('bgBlurVal').textContent = `${state.bgBlur !== undefined ? state.bgBlur : 0}px`;
      document.getElementById('defaultEngineSelect').value = state.currentEngine || 'google';

      const fileNameLabel = document.getElementById('fileNameLabel');
      if (fileNameLabel) {
        fileNameLabel.textContent = state.customWallpaperUrl ? '已设置自定义壁纸' : '未选择文件';
      }

      renderShortcutsManageList();

      settingsModal.style.display = 'flex';
    } catch (err) {
      console.error('Error opening settings modal:', err);
      settingsModal.style.display = 'flex';
    }
  }

  function renderShortcutsManageList() {
    const container = document.getElementById('shortcutsManageList');
    if (!container) return;
    let html = '';
    state.shortcuts.forEach((item, index) => {
      const isFirst = index === 0;
      const isLast = index === state.shortcuts.length - 1;
      html += `
        <div class="shortcut-manage-row">
          <div class="shortcut-manage-row-left">
            <span class="shortcut-order-badge">${index + 1}</span>
            <div class="shortcut-info-col">
              <strong>${item.title}</strong>
              <span style="color: var(--text-dim); font-size: 11px;">${item.url}</span>
            </div>
          </div>
          <div class="manage-btn-group">
            <button class="action-sm-btn move-btn" data-action="move-up" data-idx="${index}" ${isFirst ? 'disabled style="opacity:0.25;cursor:not-allowed;pointer-events:none;"' : ''} title="向上移动">上移</button>
            <button class="action-sm-btn move-btn" data-action="move-down" data-idx="${index}" ${isLast ? 'disabled style="opacity:0.25;cursor:not-allowed;pointer-events:none;"' : ''} title="向下移动">下移</button>
            <button class="action-sm-btn" data-action="edit" data-idx="${index}">编辑</button>
            <button class="action-sm-btn delete" data-action="delete" data-idx="${index}">删除</button>
          </div>
        </div>
      `;
    });
    container.innerHTML = html;
  }

  function saveSettings() {
    try {
      const saveBtn = document.getElementById('saveSettingsBtn');
      if (saveBtn) {
        saveBtn.textContent = '✅ 已保存';
      }
      const placeholderInput = document.getElementById('searchPlaceholderInput');
      if (placeholderInput) {
        state.searchPlaceholder = placeholderInput.value.trim() || 'Message Gemini...';
      }
      state.bgDim = parseInt(document.getElementById('bgDimRange').value, 10);
      state.bgBlur = parseInt(document.getElementById('bgBlurRange').value, 10);
      state.currentEngine = document.getElementById('defaultEngineSelect').value;

      if (state.customWallpaperUrl) {
        saveWallpaperToDB(state.customWallpaperUrl);
      }

      try {
        localStorage.setItem('copilot_search_placeholder', state.searchPlaceholder);
        localStorage.setItem('copilot_wallpaper_source', state.wallpaperSource || 'upload');
        localStorage.setItem('copilot_bg_dim', state.bgDim.toString());
        localStorage.setItem('copilot_bg_blur', state.bgBlur.toString());
        localStorage.setItem('copilot_default_engine', state.currentEngine);
      } catch (storageErr) {
        console.warn('localStorage quota warning:', storageErr);
      }

      saveShortcutsToStorage();

      renderPlaceholder();
      renderWallpaper();
      renderEngineUI();
      renderShortcuts();
    } catch (err) {
      console.error('saveSettings error:', err);
    } finally {
      setTimeout(() => {
        const saveBtn = document.getElementById('saveSettingsBtn');
        if (saveBtn) saveBtn.textContent = '保存并应用设置';
        settingsModal.style.display = 'none';
      }, 150);
    }
  }

  function openShortcutEditModal(index) {
    editingShortcutIndex = index;
    const titleInput = document.getElementById('shortcutTitleInput');
    const urlInput = document.getElementById('shortcutUrlInput');
    const modalTitle = document.getElementById('shortcutModalTitle');
    const customIconInput = document.getElementById('shortcutCustomIconInput');
    const iconTypeSelect = document.getElementById('shortcutIconTypeSelect');
    const customIconRow = document.getElementById('shortcutCustomIconRow');

    if (index >= 0 && state.shortcuts[index]) {
      const item = state.shortcuts[index];
      modalTitle.textContent = '编辑快捷方式';
      titleInput.value = item.title;
      urlInput.value = item.url;
      if (item.iconType === 'custom_url') {
        iconTypeSelect.value = 'custom_url';
        customIconInput.value = item.iconVal || '';
        customIconRow.style.display = 'flex';
      } else {
        iconTypeSelect.value = 'favicon';
        customIconInput.value = '';
        customIconRow.style.display = 'none';
      }
    } else {
      modalTitle.textContent = '添加快捷方式';
      titleInput.value = '';
      urlInput.value = '';
      iconTypeSelect.value = 'favicon';
      customIconInput.value = '';
      customIconRow.style.display = 'none';
    }

    iconTypeSelect.onchange = () => {
      customIconRow.style.display = iconTypeSelect.value === 'custom_url' ? 'flex' : 'none';
    };

    shortcutEditModal.style.display = 'flex';
    titleInput.focus();
  }

  function saveShortcut() {
    const title = document.getElementById('shortcutTitleInput').value.trim();
    const url = document.getElementById('shortcutUrlInput').value.trim();
    const iconType = document.getElementById('shortcutIconTypeSelect').value;
    const customIcon = document.getElementById('shortcutCustomIconInput').value.trim();

    if (!title || !url) {
      alert('请完整填写网站名称和网站链接');
      return;
    }

    const formattedUrl = url.startsWith('http://') || url.startsWith('https://') ? url : `https://${url}`;

    if (editingShortcutIndex >= 0 && editingShortcutIndex < state.shortcuts.length) {
      const oldItem = state.shortcuts[editingShortcutIndex];
      const urlChanged = oldItem.url !== formattedUrl;
      const typeChanged = oldItem.iconType !== iconType;

      oldItem.title = title;
      oldItem.url = formattedUrl;
      oldItem.iconType = iconType;
      oldItem.iconVal = iconType === 'custom_url' ? customIcon : '';

      if (urlChanged || typeChanged) {
        delete oldItem.cachedIcon;
      }
    } else {
      const newShortcut = {
        id: 'custom_' + Date.now(),
        title: title,
        url: formattedUrl,
        iconType: iconType,
        iconVal: iconType === 'custom_url' ? customIcon : ''
      };
      state.shortcuts.push(newShortcut);
    }

    saveShortcutsToStorage();

    renderShortcuts();
    renderShortcutsManageList();
    shortcutEditModal.style.display = 'none';

    if (iconType === 'favicon') {
      const targetIdx = editingShortcutIndex >= 0 ? editingShortcutIndex : state.shortcuts.length - 1;
      const currentItem = state.shortcuts[targetIdx];
      if (currentItem && !currentItem.cachedIcon) {
        fetchFaviconDirect(formattedUrl).then((b64) => {
          if (b64 && typeof b64 === 'string' && b64.startsWith('data:image')) {
            currentItem.cachedIcon = b64;
            saveShortcutsToStorage();
            renderShortcuts();
            renderShortcutsManageList();
          }
        }).catch(() => {});
      }
    }
  }

  // --------------------------------------------------------------------------
  // 事件监听绑定 (Event Listeners)
  // --------------------------------------------------------------------------
  function setupEventListeners() {
    function updateSelectedSuggest(items) {
      items.forEach((it, i) => {
        if (i === selectedSuggestIndex) {
          it.classList.add('selected');
          it.scrollIntoView({ block: 'nearest' });
          searchInput.value = it.getAttribute('data-val');
        } else {
          it.classList.remove('selected');
        }
      });
    }

    searchInput.addEventListener('keydown', (e) => {
      const items = suggestList ? suggestList.querySelectorAll('.suggest-item') : [];
      if (searchSuggestPopover && searchSuggestPopover.classList.contains('open') && items.length > 0) {
        if (e.key === 'ArrowDown') {
          e.preventDefault();
          selectedSuggestIndex = (selectedSuggestIndex + 1) % items.length;
          updateSelectedSuggest(items);
          return;
        } else if (e.key === 'ArrowUp') {
          e.preventDefault();
          selectedSuggestIndex = (selectedSuggestIndex - 1 + items.length) % items.length;
          updateSelectedSuggest(items);
          return;
        } else if (e.key === 'Enter') {
          if (selectedSuggestIndex >= 0 && items[selectedSuggestIndex]) {
            e.preventDefault();
            const val = items[selectedSuggestIndex].getAttribute('data-val');
            executeSearch(val);
            return;
          }
        } else if (e.key === 'Escape') {
          hideSuggestPopover();
          return;
        }
      }

      if (e.key === 'Enter') {
        executeSearch();
      }
    });

    searchInput.addEventListener('input', handleSearchInputChange);

    function tryOpenSuggestOrHistory() {
      if (!searchSuggestPopover || searchSuggestPopover.classList.contains('open')) return;
      if (!searchInput.value.trim()) {
        showSearchHistory();
      } else {
        handleSearchInputChange();
      }
    }

    // 仅在用户主动点击或输入时展开搜索历史/建议，彻底杜绝新标签页自动聚焦时的开合闪烁
    searchInput.addEventListener('click', tryOpenSuggestOrHistory);

    if (searchCapsule) {
      searchCapsule.addEventListener('click', (e) => {
        if (
          !e.target.closest('#modeDropdownWrapper') &&
          !e.target.closest('#submitSearchBtn') &&
          !e.target.closest('#searchSuggestPopover') &&
          !e.target.closest('#imageAiBtn')
        ) {
          searchInput.focus();
          tryOpenSuggestOrHistory();
        }
      });
    }

    if (searchSuggestPopover) {
      searchSuggestPopover.addEventListener('click', (e) => {
        // 删除单条历史记录按钮 (带平滑滑出动画)
        const delBtn = e.target.closest('[data-action="delete-history"]');
        if (delBtn) {
          e.stopPropagation();
          const itemEl = delBtn.closest('.suggest-item');
          const idx = parseInt(delBtn.getAttribute('data-idx'), 10);
          if (itemEl) {
            itemEl.style.transform = 'translateX(24px) scale(0.95)';
            itemEl.style.opacity = '0';
            itemEl.style.transition = 'all 0.22s cubic-bezier(0.16, 1, 0.3, 1)';
            setTimeout(() => {
              deleteSearchHistoryItem(idx);
            }, 200);
          } else {
            deleteSearchHistoryItem(idx);
          }
          return;
        }


        // 点击搜索建议/历史项，直接执行搜索
        const item = e.target.closest('.suggest-item');
        if (item) {
          e.stopPropagation();
          const val = item.getAttribute('data-val');
          executeSearch(val);
        }
      });
    }

    function positionModeMenu() {
      if (!modeSelectBtn || !modeMenu) return;
      const rect = modeSelectBtn.getBoundingClientRect();
      modeMenu.style.top = `${rect.bottom + 20}px`;
      modeMenu.style.left = `${rect.left}px`;
      modeMenu.style.width = `${rect.width + 5}px`;
      modeMenu.style.minWidth = `${rect.width + 5}px`;
    }

    // 引擎下拉框点击切换支持 (显式点击打开/收起，移除悬停误触)
    const modeDropdownWrapper = document.getElementById('modeDropdownWrapper') || document.querySelector('.mode-dropdown-wrapper');
    if (modeSelectBtn) {
      modeSelectBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        hideSuggestPopover();
        positionModeMenu();
        const isOpen = modeMenu && modeMenu.classList.contains('open');
        if (modeDropdownWrapper) {
          modeDropdownWrapper.classList.toggle('open', !isOpen);
        }
        if (modeMenu) {
          modeMenu.classList.toggle('open', !isOpen);
        }
      });
    }

    if (modeMenu) {
      modeMenu.addEventListener('click', (e) => {
        const item = e.target.closest('.menu-item');
        if (item) {
          e.stopPropagation();
          const engine = item.getAttribute('data-engine');
          setEngine(engine);
          modeMenu.classList.remove('open');
          if (modeDropdownWrapper) {
            modeDropdownWrapper.classList.remove('open');
          }
        }
      });
    }

    window.addEventListener('resize', () => {
      if (modeMenu && modeMenu.classList.contains('open')) {
        positionModeMenu();
      }
    });

    // 快捷方式列表事件委托 (支持上移、下移、编辑、删除)
    const manageListContainer = document.getElementById('shortcutsManageList');
    if (manageListContainer) {
      manageListContainer.addEventListener('click', (e) => {
        const btn = e.target.closest('button');
        if (!btn || btn.disabled) return;
        const action = btn.getAttribute('data-action');
        const idx = parseInt(btn.getAttribute('data-idx'), 10);
        if (action === 'move-up') {
          if (idx > 0) {
            const temp = state.shortcuts[idx];
            state.shortcuts[idx] = state.shortcuts[idx - 1];
            state.shortcuts[idx - 1] = temp;
            saveShortcutsToStorage();
            renderShortcuts();
            renderShortcutsManageList();
          }
        } else if (action === 'move-down') {
          if (idx < state.shortcuts.length - 1) {
            const temp = state.shortcuts[idx];
            state.shortcuts[idx] = state.shortcuts[idx + 1];
            state.shortcuts[idx + 1] = temp;
            saveShortcutsToStorage();
            renderShortcuts();
            renderShortcutsManageList();
          }
        } else if (action === 'delete') {
          state.shortcuts.splice(idx, 1);
          saveShortcutsToStorage();
          renderShortcuts();
          renderShortcutsManageList();
        } else if (action === 'edit') {
          openShortcutEditModal(idx);
        }
      });
    }

    // 图片询问 AI 按钮 (Google Lens 视觉 AI 识图)
    const imageAiBtn = document.getElementById('imageAiBtn');
    if (imageAiBtn) {
      imageAiBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        window.open('https://lens.google.com/', '_blank');
      });
    }

    // 全局点击隐藏浮动菜单与搜索建议
    document.addEventListener('click', (e) => {
      if (modeDropdownWrapper) {
        modeDropdownWrapper.classList.remove('open', 'hovering');
      }
      if (modeMenu) {
        modeMenu.classList.remove('open');
      }
      if (searchSuggestPopover && !e.target.closest('.search-capsule')) {
        hideSuggestPopover();
      }
    });

    // 快捷键支持 (Alt+S 或 F2 打开设置)
    document.addEventListener('keydown', (e) => {
      if ((e.altKey && (e.key === 's' || e.key === 'S')) || e.key === 'F2') {
        e.preventDefault();
        openSettingsModal();
      }
    });

    // 右上角浮动设置按钮
    const pageSettingsBtn = document.getElementById('pageSettingsBtn');
    if (pageSettingsBtn) {
      pageSettingsBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        openSettingsModal();
      });
    }

    // 设置面板触发与保存
    closeSettingsModal.addEventListener('click', () => settingsModal.style.display = 'none');
    saveSettingsBtn.addEventListener('click', saveSettings);

    const resetWallpaperBtn = document.getElementById('resetWallpaperBtn');
    if (resetWallpaperBtn) {
      resetWallpaperBtn.addEventListener('click', async () => {
        state.customWallpaperUrl = '';
        state.wallpaperSource = 'upload';
        await saveWallpaperToDB('');
        localStorage.removeItem('copilot_custom_wallpaper_url');
        localStorage.setItem('copilot_wallpaper_source', 'upload');
        const fileNameLabel = document.getElementById('fileNameLabel');
        if (fileNameLabel) {
          fileNameLabel.textContent = '已清空壁纸';
        }
        renderWallpaper();
      });
    }

    document.getElementById('bgDimRange').addEventListener('input', (e) => {
      document.getElementById('bgDimVal').textContent = `${e.target.value}%`;
      document.documentElement.style.setProperty('--bg-dim', (e.target.value / 100).toString());
    });

    document.getElementById('bgBlurRange').addEventListener('input', (e) => {
      document.getElementById('bgBlurVal').textContent = `${e.target.value}px`;
      document.documentElement.style.setProperty('--bg-blur', `${e.target.value}px`);
    });

    // 本地上传壁纸 (保持 100% 原图超清无损画质，永久保存在 IndexedDB)
    const localWallpaperFileInput = document.getElementById('localWallpaperFile');
    if (localWallpaperFileInput) {
      localWallpaperFileInput.addEventListener('change', (e) => {
        const file = e.target.files[0];
        if (file) {
          const fileNameLabel = document.getElementById('fileNameLabel');
          if (fileNameLabel) {
            fileNameLabel.textContent = file.name;
          }
          const reader = new FileReader();
          reader.onload = async (uploadEvent) => {
            state.customWallpaperUrl = uploadEvent.target.result;
            state.wallpaperSource = 'upload';
            await saveWallpaperToDB(state.customWallpaperUrl);
            renderWallpaper();
          };
          reader.readAsDataURL(file);
        }
      });
    }

    // 点击背景空白遮罩或按 Escape 键关闭弹窗
    settingsModal.addEventListener('click', (e) => {
      if (e.target === settingsModal) {
        settingsModal.style.display = 'none';
      }
    });

    shortcutEditModal.addEventListener('click', (e) => {
      if (e.target === shortcutEditModal) {
        shortcutEditModal.style.display = 'none';
      }
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        settingsModal.style.display = 'none';
        shortcutEditModal.style.display = 'none';
      }
    });

    // 快捷方式弹窗
    addNewShortcutModalBtn.addEventListener('click', () => openShortcutEditModal(-1));
    closeShortcutEditModal.addEventListener('click', () => shortcutEditModal.style.display = 'none');
    cancelShortcutEditBtn.addEventListener('click', () => shortcutEditModal.style.display = 'none');
    saveShortcutBtn.addEventListener('click', saveShortcut);

    resetShortcutsBtn.addEventListener('click', () => {
      if (confirm('确定要恢复默认快捷方式吗？')) {
        state.shortcuts = [...DEFAULT_SHORTCUTS];
        saveShortcutsToStorage();
        renderShortcuts();
        renderShortcutsManageList();
      }
    });

    const refreshAllIconsBtn = document.getElementById('refreshAllIconsBtn');
    if (refreshAllIconsBtn) {
      refreshAllIconsBtn.addEventListener('click', async () => {
        refreshAllIconsBtn.disabled = true;
        refreshAllIconsBtn.textContent = '⏳ 正在极速抓取图标...';
        await cacheAllShortcutIcons(true);
        refreshAllIconsBtn.textContent = '✅ 已全部成功保存到本地！';
        setTimeout(() => {
          refreshAllIconsBtn.textContent = '🔄 联网更新并缓存图标';
          refreshAllIconsBtn.disabled = false;
        }, 1800);
      });
    }

    // 访问 / 搜索直达按钮
    setupSubmitButton();

    // 聚焦就绪后自动净化地址栏参数，去除 ?focus=1
    if (window.location.search.includes('focus=1')) {
      try {
        window.history.replaceState(null, '', window.location.pathname);
      } catch (e) {}
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
