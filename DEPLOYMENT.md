# Deployment Guide

## 🚀 Quick Start (Development)

1. **Clone the repository:**
   ```bash
   git clone https://github.com/beargallbladder/bookmarkbrent.git
   cd bookmarkbrent/codex-watcher
   ```

2. **Load in Chrome:**
   - Open `chrome://extensions/`
   - Enable "Developer mode" (top right)
   - Click "Load unpacked"
   - Select the `codex-watcher` folder

3. **Test the extension:**
   - Visit https://ai-notebook.ford.com
   - Start chatting
   - Click extension icon to see captured messages

## 📦 Chrome Web Store Deployment

### Prerequisites
- Chrome Web Store developer account ($5 one-time fee)
- Icons in PNG format (16x16, 48x48, 128x128)
- Screenshots (1280x800 or 640x400)

### Steps

1. **Prepare for production:**
   ```bash
   # Create icons (open in browser and save as PNG)
   open icons/generate-icons.html
   
   # Create production build
   zip -r codex-watcher.zip . -x "*.git*" "*.DS_Store" "DEPLOYMENT.md" "icons/generate-icons.html"
   ```

2. **Chrome Web Store submission:**
   - Go to [Chrome Web Store Developer Dashboard](https://chrome.google.com/webstore/developer/dashboard)
   - Click "New Item"
   - Upload `codex-watcher.zip`
   - Fill in required fields:
     - Store listing (description, screenshots)
     - Privacy practices
     - Distribution settings

3. **Required store information:**
   - **Name:** Codex Watcher for Ford AI Notebook
   - **Description:** Capture and save chat history from Ford AI Notebook
   - **Category:** Productivity
   - **Language:** English
   - **Privacy Policy:** Not required (no data collection)

## 🔧 Alternative Deployment Methods

### GitHub Releases (Recommended for internal use)
1. Create a new release on GitHub
2. Upload the `.zip` file as a release asset
3. Users can download and install manually

### Internal Distribution
1. Host the `.crx` file on internal servers
2. Distribute via enterprise policy
3. Or share the `.zip` for manual installation

## 🛡️ Security Considerations

- Extension only works on `https://ai-notebook.ford.com/*`
- All data stored locally (no external API calls)
- No analytics or tracking
- Minimal permissions requested

## 📝 Update Process

1. Increment version in `manifest.json`
2. Make changes and test locally
3. Create new `.zip` file
4. Upload to Chrome Web Store or GitHub releases
5. Users will auto-update (Web Store) or need manual update (GitHub)

## 🐛 Troubleshooting

- **Icons missing:** Generate using `icons/generate-icons.html`
- **Permissions error:** Ensure Ford domain is accessible
- **Not capturing messages:** Update DOM selectors in `content.js`

## 📞 Support

For issues or questions:
- Open an issue on GitHub
- Contact your IT department for enterprise deployment