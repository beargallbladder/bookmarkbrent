# Codex Watcher - Ford AI Notebook Chat Capture

A Chrome extension that captures and saves chat history from Ford AI Notebook (https://ai-notebook.ford.com).

## 🌐 Browser Compatibility

✅ **Works on:** Chrome, Edge, Brave, Opera, Vivaldi (All Chromium-based browsers v88+)  
❌ **Does not work on:** Firefox, Safari, Internet Explorer, Mobile browsers

## Features

- 🔍 **Automatic Chat Detection**: Uses DOM observation to detect new messages in real-time
- 💾 **Persistent Storage**: Saves all prompts and responses to Chrome's local storage
- 📊 **Statistics Dashboard**: View message counts and storage usage
- 📥 **Multi-format Export**: Export chat logs as JSON, Markdown, or CSV
- 🔄 **Real-time Updates**: Popup updates automatically as new messages are captured
- 🛡️ **Privacy-focused**: All data stored locally, no external API calls

## Installation

1. Clone or download this repository
2. Open Chrome and navigate to `chrome://extensions/`
3. Enable "Developer mode" in the top right
4. Click "Load unpacked" and select the `codex-watcher` directory
5. The extension icon will appear in your toolbar

## Usage

1. Visit https://ai-notebook.ford.com (requires Ford VPN)
2. Start a chat session
3. The extension automatically captures all messages
4. Click the extension icon to view statistics and export options

## Export Formats

- **JSON**: Complete structured data with timestamps and metadata
- **Markdown**: Human-readable format ideal for documentation
- **CSV**: For data analysis in Excel or other tools

## DOM Selectors

The extension automatically looks for common chat UI patterns to detect messages. If messages aren't being captured properly, the extension may need to be updated to match Ford's specific website structure.

**What are DOM selectors?**
DOM selectors are like "addresses" that tell the extension where to find chat messages on the webpage. Think of them as instructions like "look for any element with the class name 'chat-message'" or "find elements marked as 'user' messages."

The extension currently searches for these patterns:
```javascript
const selectors = [
  '.chat-message',
  '.message-bubble',
  '[data-role="user"]',
  '[data-role="assistant"]',
  // Add Ford-specific selectors here
];
```

**If messages aren't being captured:**
1. Contact your development team to update the selectors
2. Or share the Ford AI Notebook's HTML structure with a developer
3. They can modify `content.js` to match Ford's specific chat layout

## Development

To modify the extension:

1. Edit the files as needed
2. Go to `chrome://extensions/`
3. Click the refresh icon on the Codex Watcher card
4. Reload the Ford AI Notebook page

## Icons

Generate icons by:
1. Opening `icons/generate-icons.html` in a browser
2. Right-clicking each canvas
3. Saving as PNG with the indicated filename

## Privacy & Security

- All data is stored locally in Chrome's storage
- No external API calls or data transmission
- Works entirely within your browser
- Respects Ford's security policies

## Testing

See [TEST_PLAN.md](TEST_PLAN.md) for comprehensive testing instructions and browser compatibility details.

## Troubleshooting

- **Messages not captured**: Check browser console for errors, update DOM selectors
- **VPN issues**: Extension only works when Ford AI Notebook is accessible
- **Storage full**: Clear old messages using the Clear button in popup
- **Browser not supported**: Use Chrome, Edge, or any Chromium-based browser

## Future Enhancements

- Auto-detection of Ford's specific DOM structure
- Session tagging and organization
- Advanced search functionality
- Automatic backup to local file system