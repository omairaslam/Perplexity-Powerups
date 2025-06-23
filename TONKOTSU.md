# REPO CONTEXT
This file contains important context about this repo for [Tonkotsu](https://www.tonkotsu.ai) and helps it work faster and generate better code.

## Project Type
Chrome Extension (Manifest V3) - JavaScript/HTML/CSS

## Setup Commands

### Initial Setup
No package installation or virtual environment needed. This is a Chrome extension with static files.

### Build
No build process required. Extension files are used directly.

### Lint
No linting configured. Extension uses standard JavaScript, HTML, and CSS.

### Tests
No test framework configured.

### Dev Server
No dev server needed. Load as unpacked extension in Chrome:
1. Open `chrome://extensions`
2. Enable "Developer mode"
3. Click "Load unpacked" and select the project directory

## Extension Structure
- `manifest.json` - Extension configuration
- `content_script.js` - Main functionality
- `styles.css` - Custom styling
- `popup.html` - Extension popup
- `lib/marked.min.js` - Markdown processing library
- `icons/` - Extension icons

## Development Workflow
1. Make changes to extension files
2. Go to `chrome://extensions`
3. Click reload button on the extension card
4. Refresh any Perplexity.ai tabs to see changes

## Testing
Manual testing on https://www.perplexity.ai/:
- Test Mermaid diagram detection and icon button
- Test rich text copy buttons (with/without citations)