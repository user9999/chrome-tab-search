class TabSearch {
  constructor() {
    this.searchInput = document.querySelector('.search-input');
    this.resultsContainer = document.getElementById('results');
    this.allTabs = [];
    
    this.init();
  }
  
  async init() {
    await this.loadAllTabs();
    this.setupEventListeners();
  }
  
  async loadAllTabs() {
    try {
      this.showLoading();
      // Получаем все вкладки во всех окнах
      const tabs = await chrome.tabs.query({});
      this.allTabs = tabs.filter(tab => tab.url && !tab.url.startsWith('chrome://'));
      this.displayResults(this.allTabs);
    } catch (error) {
      console.error('Error loading tabs:', error);
      this.showError('Ошибка загрузки вкладок');
    }
  }
  
  setupEventListeners() {
    // Поиск при вводе
    this.searchInput.addEventListener('input', (e) => {
      this.searchTabs(e.target.value);
    });
    
    // Обработка клавиш
    this.searchInput.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        window.close();
      }
    });
  }
  
  searchTabs(searchTerm) {
    if (!searchTerm.trim()) {
      this.displayResults(this.allTabs);
      return;
    }
    
    const searchLower = this.normalizeString(searchTerm.toLowerCase());
    const filteredTabs = this.allTabs.filter(tab => {
      // Поиск по заголовку
      const titleNormalized = this.normalizeString(tab.title?.toLowerCase() || '');
      const titleMatch = titleNormalized.includes(searchLower);
      
      // Поиск по URL
      const urlNormalized = this.normalizeString(tab.url?.toLowerCase() || '');
      const urlMatch = urlNormalized.includes(searchLower);
      
      // Поиск по домену
      let domainMatch = false;
      try {
        const url = new URL(tab.url);
        const domain = this.normalizeString(url.hostname.toLowerCase());
        domainMatch = domain.includes(searchLower);
      } catch (e) {
        // Игнорируем ошибки парсинга URL
      }
      
      return titleMatch || urlMatch || domainMatch;
    });
    
    this.displayResults(filteredTabs);
  }
  
  /**
   * Нормализует строку для поиска (обрабатывает кириллицу и специальные символы)
   */
  normalizeString(str) {
    if (!str) return '';
    
    return str
      // Заменяем несколько пробелов на один
      .replace(/\s+/g, ' ')
      // Убираем начальные и конечные пробелы
      .trim()
      // Приводим к нижнему регистру (уже сделано ранее, но для надежности)
      .toLowerCase();
  }
  
  displayResults(tabs) {
    if (tabs.length === 0) {
      this.resultsContainer.innerHTML = '<div class="no-results">Вкладки не найдены</div>';
      return;
    }
    
    this.resultsContainer.innerHTML = tabs.map(tab => `
      <div class="tab-item" data-tab-id="${tab.id}">
        <img class="tab-favicon" src="${tab.favIconUrl || 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTYiIGhlaWdodD0iMTYiIHZpZXdCb3g9IjAgMCAxNiAxNiIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjE2IiBoZWlnaHQ9IjE2IiBmaWxsPSIjRjFGMUYxIi8+CjxwYXRoIGQ9Ik04LjUgNC41SDEwLjVWNi41SDguNVY0LjVaIiBmaWxsPSIjOTk5OTk5Ii8+CjxwYXRoIGQ9Ik02IDdWMTBIMTBWN0g2Wk02IDZIMTBWMUg2VjZaTTUgMEgxMVYxMUg1VjBaIiBmaWxsPSIjOTk5OTk5Ii8+Cjwvc3ZnPgo='}" alt="Favicon">
        <div class="tab-content">
          <div class="tab-title">${this.escapeHtml(tab.title || 'Без названия')}</div>
          <div class="tab-url">${this.escapeHtml(this.shortenUrl(tab.url))}</div>
        </div>
      </div>
    `).join('');
    
    // Добавляем обработчики кликов
    this.resultsContainer.querySelectorAll('.tab-item').forEach(item => {
      item.addEventListener('click', () => {
        this.switchToTab(parseInt(item.dataset.tabId));
      });
    });
  }
  
  /**
   * Укорачивает URL для отображения
   */
  shortenUrl(url) {
    try {
      const urlObj = new URL(url);
      return urlObj.hostname + urlObj.pathname;
    } catch (e) {
      return url;
    }
  }
  
  async switchToTab(tabId) {
    try {
      // Активируем вкладку
      await chrome.tabs.update(tabId, { active: true });
      
      // Активируем окно, в котором находится вкладка
      const tab = await chrome.tabs.get(tabId);
      await chrome.windows.update(tab.windowId, { focused: true });
      
      // Закрываем popup
      window.close();
    } catch (error) {
      console.error('Error switching tab:', error);
    }
  }
  
  showLoading() {
    this.resultsContainer.innerHTML = '<div class="loading">Загрузка вкладок...</div>';
  }
  
  showError(message) {
    this.resultsContainer.innerHTML = `<div class="no-results">${message}</div>`;
  }
  
  escapeHtml(unsafe) {
    if (!unsafe) return '';
    return unsafe
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");
  }
}

// Инициализация при загрузке
document.addEventListener('DOMContentLoaded', () => {
  new TabSearch();
});