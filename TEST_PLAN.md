# Codex Watcher Test Plan

## 🌐 Browser Compatibility

### ✅ Confirmed Compatible Browsers
- **Google Chrome** (v88+) - Primary target, full support
- **Microsoft Edge** (v88+) - Chromium-based, full support
- **Brave Browser** - Chromium-based, full support
- **Opera** (v74+) - Chromium-based, full support
- **Vivaldi** - Chromium-based, full support

### ❌ Not Compatible
- **Firefox** - Uses different extension APIs (requires WebExtensions port)
- **Safari** - Uses Safari Web Extensions (requires significant changes)
- **Internet Explorer** - No extension support
- **Mobile browsers** - Extensions not supported on mobile Chrome/Edge

## 📋 Manual Test Checklist

### 1. Installation Tests
- [ ] Extension loads without errors in `chrome://extensions/`
- [ ] Icon appears in browser toolbar
- [ ] Popup opens when clicking extension icon
- [ ] No console errors on installation

### 2. Initial State Tests
- [ ] Popup shows "No chat messages captured" when first installed
- [ ] Storage size shows "0 KB"
- [ ] All counters show "0"
- [ ] Export button is visible but disabled

### 3. Message Capture Tests
- [ ] Navigate to https://ai-notebook.ford.com
- [ ] Send a user prompt
- [ ] Verify prompt is captured (check popup stats)
- [ ] Wait for AI response
- [ ] Verify response is captured
- [ ] Confirm message count increases
- [ ] Check storage size updates

### 4. DOM Detection Tests
Test with various message types:
- [ ] Simple text messages
- [ ] Multi-line messages
- [ ] Messages with code blocks
- [ ] Messages with special characters
- [ ] Rapid consecutive messages
- [ ] Long messages (>1000 characters)

### 5. Storage Tests
- [ ] Messages persist after closing popup
- [ ] Messages persist after browser restart
- [ ] Storage updates in real-time
- [ ] No duplicate messages captured

### 6. Export Functionality Tests

#### JSON Export
- [ ] Click JSON format button
- [ ] Click Export button
- [ ] Verify file downloads
- [ ] Open JSON file and verify structure
- [ ] Check all messages are included
- [ ] Verify timestamps are correct

#### Markdown Export
- [ ] Select Markdown format
- [ ] Export and download file
- [ ] Open in markdown viewer
- [ ] Verify formatting is correct
- [ ] Check message order (chronological)

#### CSV Export
- [ ] Select CSV format
- [ ] Export and download file
- [ ] Open in Excel/spreadsheet app
- [ ] Verify columns: Timestamp, Role, Message
- [ ] Check for proper escaping of commas/quotes

### 7. Clear Data Tests
- [ ] Click Clear button
- [ ] Confirm dialog appears
- [ ] Cancel and verify data remains
- [ ] Click Clear again and confirm
- [ ] Verify all data is cleared
- [ ] Check popup shows empty state

### 8. Performance Tests
- [ ] Capture 100+ messages
- [ ] Verify no lag in chat interface
- [ ] Check popup loads quickly
- [ ] Export large dataset (>1MB)
- [ ] Monitor memory usage in Task Manager

### 9. Edge Case Tests
- [ ] Multiple tabs open to Ford AI Notebook
- [ ] Quick navigation between pages
- [ ] Network disconnection during chat
- [ ] VPN disconnection/reconnection
- [ ] Browser crash recovery

### 10. Error Handling Tests
- [ ] Access extension outside Ford network
- [ ] Try to export with no messages
- [ ] Fill storage to capacity
- [ ] Corrupt storage manually and verify recovery

## 🔧 Developer Tests

### Console Checks
```javascript
// Run in extension background page console
chrome.storage.local.get(['chatLog'], (result) => {
  console.log('Stored messages:', result.chatLog?.length || 0);
  console.log('Storage size:', JSON.stringify(result).length);
});
```

### DOM Selector Verification
```javascript
// Run in Ford AI Notebook console
const selectors = [
  '.chat-message',
  '.message-bubble',
  '[data-role="user"]',
  '[data-role="assistant"]'
];

selectors.forEach(selector => {
  const elements = document.querySelectorAll(selector);
  console.log(`${selector}: ${elements.length} found`);
});
```

## 🐛 Known Issues & Limitations

1. **DOM Dependency**: Extension relies on specific DOM structure
2. **Storage Limits**: Chrome sync storage has 100KB limit (using local storage instead)
3. **Performance**: Large chat sessions (>1000 messages) may slow down export
4. **Icon Generation**: Manual process required for icon creation

## 🧪 Automated Test Setup (Future)

```json
// package.json
{
  "name": "codex-watcher-tests",
  "scripts": {
    "test": "jest",
    "test:e2e": "puppeteer test/e2e.test.js"
  },
  "devDependencies": {
    "jest": "^29.0.0",
    "puppeteer": "^21.0.0",
    "@types/chrome": "^0.0.246"
  }
}
```

## 📊 Test Results Template

| Test Category | Pass | Fail | Notes |
|--------------|------|------|-------|
| Installation | ✅ | ❌ | |
| Message Capture | ✅ | ❌ | |
| Export Functions | ✅ | ❌ | |
| Performance | ✅ | ❌ | |
| Error Handling | ✅ | ❌ | |

**Tested on:** [Date]  
**Browser:** [Chrome version]  
**OS:** [Operating System]  
**Tester:** [Name]