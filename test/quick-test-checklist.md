# Quick Test Checklist ✓

## 🚀 5-Minute Smoke Test

1. **Install Extension**
   - [ ] Load unpacked in Chrome
   - [ ] Icon appears in toolbar
   - [ ] No errors in chrome://extensions

2. **Basic Capture**
   - [ ] Visit Ford AI Notebook
   - [ ] Send "Hello, test message"
   - [ ] Click extension icon
   - [ ] See message count = 1

3. **Export Test**
   - [ ] Click "Export Chat Log"
   - [ ] File downloads successfully
   - [ ] Open file - message is there

4. **Clear Test**
   - [ ] Click "Clear All Data"
   - [ ] Confirm dialog
   - [ ] Stats reset to 0

✅ **PASS** = Ready for use  
❌ **FAIL** = Check console for errors

---

## 🔍 Full Test (15 minutes)

### Setup
```bash
# 1. Clone and load extension
git clone https://github.com/beargallbladder/bookmarkbrent.git
cd bookmarkbrent/codex-watcher

# 2. Open Chrome
# 3. Navigate to chrome://extensions/
# 4. Enable Developer mode
# 5. Click "Load unpacked"
# 6. Select codex-watcher folder
```

### Test Matrix

| Browser | Version | Works? | Notes |
|---------|---------|--------|-------|
| Chrome | 88+ | ✅ | Primary target |
| Edge | 88+ | ✅ | Full support |
| Brave | Latest | ✅ | Full support |
| Opera | 74+ | ✅ | Full support |
| Firefox | Any | ❌ | Different API |
| Safari | Any | ❌ | Different API |

### Critical Path Test

1. **Message Detection** (2 min)
   - Send user message → Captured ✓
   - Receive AI response → Captured ✓
   - Multi-line message → Captured ✓

2. **Data Persistence** (2 min)
   - Close popup → Reopen → Data persists ✓
   - Refresh page → Data persists ✓
   - Restart browser → Data persists ✓

3. **Export Formats** (3 min)
   - JSON → Valid format ✓
   - Markdown → Readable ✓
   - CSV → Opens in Excel ✓

4. **Performance** (2 min)
   - 100 messages → No lag ✓
   - Large export → < 3 seconds ✓
   - Memory usage → < 50MB ✓

### Edge Cases

- [ ] Empty state (no messages)
- [ ] Very long message (>5000 chars)
- [ ] Special characters (emojis, symbols)
- [ ] Rapid messages (10 in 1 second)
- [ ] Multiple tabs open

---

## 🐛 Debugging Commands

```javascript
// Check captured messages (Extension Console)
chrome.storage.local.get(['chatLog'], (r) => console.log(r.chatLog));

// Test DOM selectors (Ford AI Notebook Console)
document.querySelectorAll('.chat-message, .message-bubble, [data-role]').length;

// Force scan (Ford AI Notebook Console)
window.postMessage({ type: 'CODEX_FORCE_SCAN' }, '*');
```

## 📱 Quick Fixes

| Issue | Solution |
|-------|----------|
| No messages captured | Update selectors in content.js |
| Icon missing | Generate from icons/generate-icons.html |
| Export fails | Check popup console for errors |
| Storage full | Clear data and restart |

---

**Test Date:** ___________  
**Tester:** ___________  
**Result:** PASS / FAIL