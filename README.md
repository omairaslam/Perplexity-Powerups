# Perplexity Powerups
A Chrome extension that provides essential powerups to enhance your Perplexity.ai experience

## Features

This Chrome extension enhances your Perplexity.ai experience with two main features:

### 1. **Mermaid.js Code Block Enhancement**
*   **Smart Detection**: Automatically detects Mermaid code blocks in Perplexity responses by analyzing code content for Mermaid keywords (`mermaid`, `graph`, `flowchart`, `sequencediagram`, `gantt`, `pie`, `classdiagram`, `erdiagram`, `statediagram`)
*   **Mermaid Icon Button**: Adds a distinctive diagram icon button next to the copy button in Mermaid code blocks
*   **Mermaid.live Integration**: Click the diagram icon to instantly open the code in Mermaid.live Editor
*   **Advanced URL Encoding**: Uses proper JSON-based Base64 encoding to ensure complex diagrams work correctly in Mermaid.live
*   **Seamless Integration**: Icon buttons appear in the native toolbar without disrupting Perplexity's interface

### 2. **Enhanced Rich Text Copy with Citation Removal**
*   **Smart Copy Button**: Adds a distinctive dollar sign ($) icon button next to Perplexity's native copy button in response toolbars
*   **Citation Cleaning**: Automatically removes citation references (e.g., [1], [2], etc.) and source links when copying
*   **Rich Text Preservation**: Copies content as HTML to preserve formatting (headings, lists, bold/italic text, etc.) when pasting into rich text editors
*   **Clean Content**: Removes superscript citations, source sections, and reference elements for cleaner copied content
*   **Visual Feedback**: Button shows a checkmark animation when copy is successful
*   **Optimized for Productivity**: Perfect for pasting into Google Docs, Word, email clients, or other rich text applications

## Technical Implementation

### Architecture
- **Manifest Version**: 3 (latest Chrome extension standard)
- **Content Script**: Runs on all `*.perplexity.ai/*` pages
- **Permissions**: `activeTab`, `scripting`, `clipboardWrite`
- **Dependencies**: Includes `marked.min.js` library for enhanced text processing

### Key Components
- **`manifest.json`**: Extension configuration and permissions
- **`content_script.js`**: Main functionality with DOM manipulation and event handling
- **`styles.css`**: Custom styling for enhanced UI elements
- **`popup.html`**: Simple popup interface for extension status
- **`lib/marked.min.js`**: Markdown processing library
- **`icons/`**: Extension icons in multiple sizes (16px, 48px, 128px)

### Smart Detection Logic
The extension uses intelligent content analysis to identify Mermaid diagrams by checking for specific keywords in code blocks, ensuring accurate detection without false positives.

## Setup Guide: How to Install

This guide will walk you through installing and running the "Perplexity Enhanced" Chrome extension on your computer. Since this is a custom-developed extension, you'll load it as an "unpacked extension" in developer mode.

**Prerequisites:**

*   **Google Chrome:** Ensure you have Google Chrome browser installed.
*   **Extension Files:** You'll need the folder containing all the extension files (`manifest.json`, `content_script.js`, `styles.css`, `lib/` folder, `icons/` folder, `popup.html`). Download these files from this repository (e.g., by clicking the green "Code" button and then "Download ZIP", then extracting the ZIP). Let's call the main folder `perplexity-powerups` (or `Perplexity-Powerups-main` if you download the ZIP).

**Installation Steps:**

1.  **Open Chrome Extensions Page:**
    *   Open Google Chrome.
    *   In the address bar, type `chrome://extensions` and press Enter.
    *   Alternatively, you can click the three vertical dots (⋮) menu in the top-right corner of Chrome, go to **Extensions**, and then click **Manage Extensions**.

2.  **Enable Developer Mode:**
    *   On the Extensions page (`chrome://extensions`), look for a toggle switch labeled **Developer mode** in the top-right corner.
    *   Click this switch to turn Developer Mode **ON**. If it's already on, you'll see options like "Load unpacked," "Pack extension," etc.
    *   *(If you need an image for this step, you can refer to the official Chrome documentation, as embedding images directly in this README via the tool might be complex).*

3.  **Load the Unpacked Extension:**
    *   Once Developer Mode is enabled, you will see new buttons appear. Click on the **Load unpacked** button.
    *   A file dialog will open. Navigate to the directory where you saved/extracted the extension files (e.g., the `perplexity-enhanced-extension` or `perplexity.powerup-main` folder).
    *   Select the **entire folder** and click **Select Folder** (or "Open" depending on your operating system). **Do not** select an individual file like `manifest.json`; select the folder that *contains* `manifest.json`.

4.  **Verify Installation:**
    *   If the extension is loaded correctly, you should see a new card for "Perplexity Enhanced" (or the name defined in `manifest.json`) appear on your `chrome://extensions` page.
    *   It will show the extension's name, version, and description.
    *   You should also see its icon in your Chrome toolbar (usually to the right of the address bar). If you have many extensions, it might be hidden inside the "puzzle piece" (🧩) extensions menu icon. You can pin it to the toolbar from there if you wish.

5.  **Test the Extension:**
    *   Open or refresh a tab with `https://www.perplexity.ai/`.
    *   **For Mermaid Enhancement:**
        *   Ask Perplexity a question that should return a Mermaid diagram (e.g., "Create a flowchart for making tea using Mermaid syntax" or "Draw a sequence diagram showing user login process").
        *   Look for the blue diagram icon button that appears next to the copy button in Mermaid code blocks.
        *   Click the diagram icon to verify it opens the diagram correctly in Mermaid.live with proper encoding.
    *   **For Enhanced Rich Text Copy:**
        *   After Perplexity generates a response with citations, hover over or focus on the response to make the action buttons appear.
        *   You should see a dollar sign ($) icon button next to Perplexity's standard copy button.
        *   Click the dollar icon button, then paste into a rich text editor (like Google Docs, Word, or an email composer).
        *   Verify that formatting is preserved and citations/source references are automatically removed.

## Advanced Features & Implementation Details

### Mermaid Integration
- **Smart Content Detection**: Uses keyword analysis to identify Mermaid diagrams (`graph`, `flowchart`, `sequencediagram`, `gantt`, `pie`, `classdiagram`, `erdiagram`, `statediagram`)
- **Robust URL Encoding**: Implements proper JSON-based Base64 encoding for complex diagrams
- **Toolbar Integration**: Adds diagram icon buttons directly in code block toolbars next to copy buttons
- **Visual Design**: Uses distinctive blue diagram icon with hover effects
- **Error Prevention**: Includes duplicate button prevention and proper DOM manipulation

### Rich Text Copy Enhancement
- **Citation Removal**: Automatically strips citation references `[1]`, `[2]`, etc.
- **Source Link Cleaning**: Removes source sections and reference elements
- **Visual Design**: Uses distinctive dollar sign ($) icon with green color scheme
- **Feedback System**: Provides visual confirmation with checkmark animation
- **HTML Preservation**: Maintains rich formatting for seamless pasting

### Performance Optimizations
- **Mutation Observer**: Efficiently monitors DOM changes for dynamic content
- **Debounced Execution**: Uses 500ms delay to prevent excessive processing
- **Duplicate Prevention**: Tracks processed elements to avoid redundant operations
- **Memory Management**: Proper cleanup and event handling

**Troubleshooting:**

*   **Errors during loading:** If Chrome shows an error when you try to "Load unpacked," the error message usually points to an issue in the `manifest.json` file. Double-check its syntax. The console on the `chrome://extensions` page (there's often an "Errors" button on the extension's card) can provide more details.
*   **Extension not working:**
    *   Ensure you've refreshed any Perplexity pages that were open *before* you loaded the extension.
    *   Open the Chrome Developer Tools (press F12 or Ctrl+Shift+I) on the Perplexity page. Check the **Console** tab for any errors logged by `content_script.js`. These errors can give clues about what might be going wrong.
    *   Double-check that the `matches` pattern in `manifest.json` (`"*://*.perplexity.ai/*"`) is correct for the URL you are on.
*   **Button/Diagram not appearing:** This is often due to changes in Perplexity's website structure. The selectors in `content_script.js` used to find elements might need updating. This is common for extensions that modify third-party websites.
*   **Mermaid icon not appearing:** Verify that the code block contains valid Mermaid keywords and syntax. The extension only processes blocks that start with recognized Mermaid diagram types. The blue diagram icon should appear next to the copy button in the code block toolbar.
*   **Rich text copy issues:** Ensure you're clicking the dollar sign ($) icon button, not the regular copy button. The rich text copy requires clipboard write permissions.

**Updating the Extension:**

If you modify the local code for this extension:
1.  Save the changes in your local files.
2.  Go back to the `chrome://extensions` page.
3.  Find the "Perplexity Enhanced" extension card.
4.  Click the reload icon (a circular arrow) on the extension's card. This will reload the extension with your latest changes.
5.  Refresh any Perplexity pages to see the updates.

## Development Notes

### Current Version: 0.1.0
- **Extension Name**: Perplexity Enhanced
- **Manifest Version**: 3 (Chrome Extensions Manifest V3)
- **Target Platform**: Chrome/Chromium browsers
- **Compatibility**: Designed for current Perplexity.ai website structure

### Code Structure
```
perplexity-powerups/
├── manifest.json          # Extension configuration
├── content_script.js      # Main functionality (v16 - Dollar Icon & Citation Removal)
├── styles.css            # Custom styling for UI elements
├── popup.html            # Extension popup interface
├── lib/
│   └── marked.min.js     # Markdown processing library
└── icons/
    ├── icon16.png        # 16x16 toolbar icon
    ├── icon48.png        # 48x48 management page icon
    └── icon128.png       # 128x128 Chrome Web Store icon
```

### Key Implementation Highlights
- **Robust DOM Manipulation**: Uses modern JavaScript with proper error handling
- **Event-Driven Architecture**: Mutation observers for dynamic content detection
- **Cross-Browser Compatibility**: Built with standard web APIs
- **Performance Conscious**: Optimized selectors and debounced operations
- **User Experience Focus**: Non-intrusive enhancements that complement Perplexity's interface

### Future Enhancement Opportunities
- Support for additional diagram types beyond Mermaid
- Customizable citation removal patterns
- User preferences and settings panel
- Export options for processed content
- Integration with other productivity tools
