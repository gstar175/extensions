function injectCSS() {
  // 動態加載 CSS 確保其在最後應用
  var link = document.createElement("link");
  link.href = chrome.runtime.getURL("styles.css");
  link.type = "text/css";
  link.rel = "stylesheet";

  // 檢查樣式是否已經被注入
  if (!document.querySelector(`link[href="${link.href}"]`)) {
    document.head.appendChild(link);
    console.log('[Figma CSS Overwrite] extension loaded');
  }
}

//建立監聽
document.addEventListener('DOMContentLoaded', injectCSS);

// 如果 DOMContentLoaded 事件已經觸發，立即執行注入
if (document.readyState === 'interactive' || document.readyState === 'complete') {
  injectCSS();
}

//用 MutationObserver 來監聽 DOM 變化，並在必要時注入樣式
var observer = new MutationObserver(injectCSS);
observer.observe(document, { childList: true, subtree: true });