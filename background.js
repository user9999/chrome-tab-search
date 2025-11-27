// Фоновая служба для расширения
chrome.runtime.onInstalled.addListener(() => {
  console.log('Tab Search Extension installed');
});

// Обработчик сообщений от popup
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "getTabs") {
    chrome.tabs.query({}, (tabs) => {
      sendResponse(tabs);
    });
    return true; // Указываем, что ответ будет асинхронным
  }
});

// Простая фоновая задача для поддержания service worker активным
chrome.runtime.onStartup.addListener(() => {
  console.log('Extension started');
});

// Периодическая проверка активности (каждые 30 секунд)
setInterval(() => {
  console.log('Background service worker is alive');
}, 30000);