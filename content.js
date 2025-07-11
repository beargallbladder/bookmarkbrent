// content.js - Core DOM observer for Ford AI Notebook
let chatLog = [];
let observer = null;

// Initialize when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}

function init() {
  console.log('[CodexWatcher] Initializing...');
  
  // Load existing chat log from storage
  chrome.storage.local.get(['chatLog'], (result) => {
    if (result.chatLog) {
      chatLog = result.chatLog;
      console.log('[CodexWatcher] Loaded', chatLog.length, 'messages from storage');
    }
  });
  
  // Start observing DOM changes
  startObserver();
  
  // Initial scan
  scanChat();
}

function captureMessage(element, role) {
  const text = element.textContent.trim();
  if (text.length > 0) {
    const message = {
      role,
      text,
      timestamp: new Date().toISOString(),
      sessionId: window.location.pathname,
      url: window.location.href
    };
    
    chatLog.push(message);
    
    // Save to chrome storage
    chrome.storage.local.set({ chatLog }, () => {
      console.log('[CodexWatcher] Saved message:', role, text.substring(0, 50) + '...');
    });
    
    // Send to popup if open
    chrome.runtime.sendMessage({ 
      type: 'newMessage', 
      message,
      totalCount: chatLog.length 
    }).catch(() => {
      // Popup not open, ignore
    });
  }
}

function scanChat() {
  // Common selectors for chat interfaces - adjust based on actual Ford UI
  const selectors = [
    '.chat-message',
    '.message-bubble',
    '[data-role="user"]',
    '[data-role="assistant"]',
    '.user-message',
    '.assistant-message',
    '.ai-response',
    '.user-prompt',
    // Add more selectors as needed based on Ford's DOM structure
  ];
  
  selectors.forEach(selector => {
    const messages = document.querySelectorAll(selector);
    messages.forEach(msg => {
      if (!msg.dataset.codexLogged) {
        // Determine role based on classes or attributes
        let role = 'unknown';
        const text = msg.textContent.toLowerCase();
        const classes = msg.className.toLowerCase();
        
        if (classes.includes('user') || classes.includes('prompt') || msg.dataset.role === 'user') {
          role = 'user';
        } else if (classes.includes('assistant') || classes.includes('ai') || classes.includes('response') || msg.dataset.role === 'assistant') {
          role = 'assistant';
        }
        
        captureMessage(msg, role);
        msg.dataset.codexLogged = 'true';
      }
    });
  });
}

function startObserver() {
  // Create mutation observer to watch for new messages
  observer = new MutationObserver((mutations) => {
    let shouldScan = false;
    
    mutations.forEach(mutation => {
      // Check if new nodes were added
      if (mutation.addedNodes.length > 0) {
        shouldScan = true;
      }
      
      // Check if text content changed
      if (mutation.type === 'characterData' || mutation.type === 'childList') {
        shouldScan = true;
      }
    });
    
    if (shouldScan) {
      // Debounce the scan
      clearTimeout(window.codexScanTimeout);
      window.codexScanTimeout = setTimeout(scanChat, 500);
    }
  });
  
  // Start observing the entire document
  observer.observe(document.body, {
    childList: true,
    subtree: true,
    characterData: true,
    characterDataOldValue: false
  });
  
  console.log('[CodexWatcher] DOM observer started');
}

// Listen for messages from popup
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.type === 'getChatLog') {
    sendResponse({ chatLog });
  } else if (request.type === 'clearChatLog') {
    chatLog = [];
    chrome.storage.local.set({ chatLog: [] }, () => {
      sendResponse({ success: true });
    });
    return true; // Will respond asynchronously
  }
});

// Periodic scan as fallback
setInterval(scanChat, 2000);

// Clean up on page unload
window.addEventListener('beforeunload', () => {
  if (observer) {
    observer.disconnect();
  }
});