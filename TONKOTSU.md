# REPO CONTEXT
This file contains important context about this repo for [Tonkotsu](https://www.tonkotsu.ai) and helps it work faster and generate better code.

## Project Type
Chrome Extension (Manifest V3) for enhancing Perplexity.ai user experience.

## Setup Commands

### 1. Initial Setup
```bash
npm install
```

### 2. Development Environment
```bash
# No virtual environment needed - pure JavaScript/HTML/CSS
# Extension uses static files only
```

### 3. Build Commands
```bash
# No build process - extension uses static files directly
# Files are served as-is to Chrome extension runtime
```

### 4. Lint Commands
```bash
# No linting setup - manual code review used
# Consider adding ESLint for future development
```

### 5. Test Commands
```bash
# No automated testing framework
# Testing done manually by loading extension in Chrome
```

### 6. Development Server
```bash
# No dev server needed - extension loaded directly in Chrome
# Use Chrome's extension reload button for updates
```

## Installation Process
1. Run `npm install` to install dependencies.
2. Open Chrome and navigate to `chrome://extensions`
3. Enable "Developer mode" toggle
4. Click "Load unpacked" button
5. Select the project directory containing `manifest.json`
6. Extension will be loaded and ready to use on Perplexity.ai

## Development Workflow
1. Make changes to source files
2. Go to `chrome://extensions`
3. Click reload icon on the extension card
4. Refresh Perplexity.ai tabs to see updates
5. Test functionality manually

## Key Files
- `manifest.json` - Extension configuration
- `package.json` - Project dependencies
- `content_script.js` - Main functionality (includes Google Doc export button with grayscale icon)
- `styles.css` - Custom styling
- `popup.html` - Extension popup
- `icons/` - Extension icons

## Technology Stack
- Vanilla JavaScript (ES6+)
- HTML5/CSS3
- Chrome Extension APIs
- Manifest V3 specification
- npm for dependency management

## Features
- Mermaid diagram export
- Rich text copy (with/without citations)
- **Copy to Google Doc button**: Grayscale icon, copies clean, citation-free HTML and opens docs.new for pasting
- **Open in draw.io button**: Opens Mermaid, PlantUML, and Graphviz diagrams in draw.io