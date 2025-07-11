// popup.js - Popup interface logic

let currentFormat = 'json';
let chatLog = [];

// Initialize popup
document.addEventListener('DOMContentLoaded', () => {
  loadChatLog();
  setupEventListeners();
  
  // Listen for real-time updates from content script
  chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.type === 'newMessage') {
      updateStats();
    }
  });
});

function setupEventListeners() {
  // Export button
  document.getElementById('exportButton').addEventListener('click', () => {
    if (chatLog.length > 0) {
      exportChat(chatLog, currentFormat);
    }
  });
  
  // Refresh button
  document.getElementById('refreshButton').addEventListener('click', loadChatLog);
  
  // Clear button
  document.getElementById('clearButton').addEventListener('click', () => {
    if (confirm('Are you sure you want to clear all captured messages? This cannot be undone.')) {
      clearChatLog();
    }
  });
  
  // Format buttons
  document.querySelectorAll('.format-button').forEach(button => {
    button.addEventListener('click', (e) => {
      document.querySelectorAll('.format-button').forEach(b => b.classList.remove('active'));
      e.target.classList.add('active');
      currentFormat = e.target.dataset.format;
    });
  });
}

function loadChatLog() {
  // Get active tab
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    if (tabs[0]) {
      // Try to get chat log from content script first
      chrome.tabs.sendMessage(tabs[0].id, { type: 'getChatLog' }, (response) => {
        if (chrome.runtime.lastError) {
          // Content script not injected, load from storage
          loadFromStorage();
        } else if (response && response.chatLog) {
          chatLog = response.chatLog;
          updateUI();
        }
      });
    } else {
      loadFromStorage();
    }
  });
}

function loadFromStorage() {
  chrome.storage.local.get(['chatLog'], (result) => {
    chatLog = result.chatLog || [];
    updateUI();
  });
}

function updateUI() {
  const hasMessages = chatLog.length > 0;
  
  document.getElementById('content').style.display = hasMessages ? 'block' : 'none';
  document.getElementById('emptyState').style.display = hasMessages ? 'none' : 'block';
  
  if (hasMessages) {
    updateStats();
  }
}

function updateStats() {
  const stats = getStatistics(chatLog);
  
  document.getElementById('totalMessages').textContent = stats.totalMessages;
  document.getElementById('userMessages').textContent = stats.userMessages;
  document.getElementById('assistantMessages').textContent = stats.assistantMessages;
  document.getElementById('storageSize').textContent = stats.storageSize;
}

function clearChatLog() {
  chrome.storage.local.set({ chatLog: [] }, () => {
    chatLog = [];
    updateUI();
    
    // Notify content script
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      if (tabs[0]) {
        chrome.tabs.sendMessage(tabs[0].id, { type: 'clearChatLog' });
      }
    });
  });
}