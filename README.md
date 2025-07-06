# Perplexity Powerups
A Chrome extension that provides essential powerups to enhance your Perplexity.ai experience

> 📖 **New to the project?** Check out our [Development Journey](DEVELOPMENT_JOURNEY.md) to see how this extension evolved from concept to completion, including challenges overcome and technical innovations!

## Features

This Chrome extension enhances your Perplexity.ai experience with four main features:

### 1. **Mermaid.js Code Block Enhancement**
*   **Smart Detection**: Automatically detects Mermaid code blocks in Perplexity responses by analyzing code content for Mermaid keywords (`mermaid`, `graph`, `flowchart`, `sequencediagram`, `gantt`, `pie`, `classdiagram`, `erdiagram`, `statediagram`)
*   **Mermaid Icon Button**: Adds a distinctive diagram icon button next to the copy button in Mermaid code blocks
*   **Mermaid.live Integration**: Click the diagram icon to instantly open the code in Mermaid.live Editor
*   **Advanced URL Encoding**: Uses proper JSON-based Base64 encoding to ensure complex diagrams work correctly in Mermaid.live
*   **Seamless Integration**: Icon buttons appear in the native toolbar without disrupting Perplexity's interface

### 2. **Enhanced Rich Text Copy with Dual Citation Options**
*   **Dual Copy Buttons**: Adds two distinctive icon buttons next to Perplexity's native copy button in response toolbars:
    - **$ (Dollar) Icon**: Copies rich text WITHOUT citations - clean content for productivity
    - **📋 (Clipboard) Icon**: Copies rich text WITH citations - preserves academic references
*   **Citation Control**: Choose whether to include or exclude citation references based on your needs
*   **Rich Text Preservation**: Both buttons copy content as HTML to preserve formatting (headings, lists, bold/italic text, etc.)
*   **Smart Citation Cleaning**: The $ button automatically removes citation references (e.g., [1], [2], etc.) and source links
*   **Academic Mode**: The clipboard button preserves all citations and references for academic or research purposes
*   **Visual Feedback**: Both buttons show checkmark animation when copy is successful
*   **Color-Coded Design**: Green $ for clean copy, amber clipboard for citations included
*   **Optimized Workflow**: Perfect for different use cases - productivity (clean) vs. academic (with citations)

### 3. **Copy to Google Doc Button**
*   **Google Doc Icon Button**: Adds a grayscale document icon button next to the rich text copy buttons in response toolbars
*   **One-Click Workflow**: Copies the response as clean, citation-free rich text (HTML), opens a new Google Doc in a new tab, and prompts you to paste
*   **Citation-Free**: Automatically removes citations for a clean paste into your document
*   **Visual Feedback**: Button shows a confirmation message after copying

### 4. **Open in draw.io Button**
*   **draw.io Icon Button**: Adds a distinctive draw.io icon button next to the Mermaid icon button in code blocks that contain Mermaid, PlantUML, or Graphviz code.
*   **One-Click Workflow**: Opens the diagram in a new draw.io tab, ready for you to edit.
*   **Advanced URL Encoding**: Uses a sophisticated compression and encoding scheme to ensure that even large diagrams are correctly imported into draw.io.

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
- **`icons/`**: Extension icons in multiple sizes (16px, 48px, 128px)

### Smart Detection Logic
The extension uses intelligent content analysis to identify Mermaid diagrams by checking for specific keywords in code blocks, ensuring accurate detection without false positives.

## Setup Guide: How to Install

This guide will walk you through installing and running the "Perplexity Enhanced" Chrome extension on your computer. Since this is a custom-developed extension, you'll load it as an "unpacked extension" in developer mode.

**Prerequisites:**

*   **Google Chrome:** Ensure you have Google Chrome browser installed.
*   **Node.js and npm:** You'll need Node.js and its package manager, npm, to install the project's dependencies. You can download them from [https://nodejs.org/](https://nodejs.org/).
*   **Extension Files:** You'll need the folder containing all the extension files (`manifest.json`, `content_script.js`, `styles.css`, `icons/` folder, `popup.html`). Download these files from this repository (e.g., by clicking the green "Code" button and then "Download ZIP", then extracting the ZIP). Let's call the main folder `perplexity-powerups` (or `Perplexity-Powerups-main` if you download the ZIP).

**Installation Steps:**

1.  **Install Dependencies:**
    *   Open a terminal or command prompt and navigate to the project's root directory (`perplexity-powerups`).
    *   Run the following command to install the necessary libraries:
        ```bash
        npm install
        ```

2.  **Open Chrome Extensions Page:**
    *   Open Google Chrome.
    *   In the address bar, type `chrome://extensions` and press Enter.
    *   Alternatively, you can click the three vertical dots (⋮) menu in the top-right corner of Chrome, go to **Extensions**, and then click **Manage Extensions**.

3.  **Enable Developer Mode:**
    *   On the Extensions page (`chrome://extensions`), look for a toggle switch labeled **Developer mode** in the top-right corner.
    *   Click this switch to turn Developer Mode **ON**. If it's already on, you'll see options like "Load unpacked," "Pack extension," etc.
    *   *(If you need an image for this step, you can refer to the official Chrome documentation, as embedding images directly in this README via the tool might be complex).)*

4.  **Load the Unpacked Extension:**
    *   Once Developer Mode is enabled, you will see new buttons appear. Click on the **Load unpacked** button.
    *   A file dialog will open. Navigate to the directory where you saved/extracted the extension files (e.g., the `perplexity-enhanced-extension` or `perplexity.powerup-main` folder).
    *   Select the **entire folder** and click **Select Folder** (or "Open" depending on your operating system). **Do not** select an individual file like `manifest.json`; select the folder that *contains* `manifest.json`.

5.  **Verify Installation:**
    *   If the extension is loaded correctly, you should see a new card for "Perplexity Enhanced" (or the name defined in `manifest.json`) appear on your `chrome://extensions` page.
    *   It will show the extension's name, version, and description.
    *   You should also see its icon in your Chrome toolbar (usually to the right of the address bar). If you have many extensions, it might be hidden inside the "puzzle piece" (🧩) extensions menu icon. You can pin it to the toolbar from there if you wish.

6.  **Test the Extension:**
    *   Open or refresh a tab with `https://www.perplexity.ai/`.
    *   **For Mermaid Enhancement:**
        *   Ask Perplexity a question that should return a Mermaid diagram (e.g., "Create a flowchart for making tea using Mermaid syntax" or "Draw a sequence diagram showing user login process").
        *   Look for the blue diagram icon button that appears next to the copy button in Mermaid code blocks.
        *   Click the diagram icon to verify it opens the diagram correctly in Mermaid.live with proper encoding.
    *   **For Enhanced Rich Text Copy:**
        *   After Perplexity generates a response with citations, hover over or focus on the response to make the action buttons appear.
        *   You should see TWO new icon buttons next to Perplexity's standard copy button:
            - **Green $ (Dollar) Icon**: Copy rich text WITHOUT citations
            - **Amber 📋 (Clipboard) Icon**: Copies rich text WITH citations
        *   **Test Clean Copy**: Click the green $ icon, then paste into a rich text editor (like Google Docs, Word, or an email composer). Verify that formatting is preserved and citations/source references are automatically removed.
        *   **Test Citation Copy**: Click the amber clipboard icon, then paste into a rich text editor. Verify that formatting is preserved AND citations/references are included.
    *   **For Copy to Google Doc Feature:**
        *   After receiving a response in Perplexity, locate the new document icon button in the response toolbar.
        *   Click the document icon to test the one-click copy and open workflow for Google Docs.
        *   A new tab should open with a blank Google Doc, and the response content (without citations) should be copied as rich text, ready for you to paste.

## Advanced Features & Implementation Details

### Mermaid Integration
- **Smart Content Detection**: Uses keyword analysis to identify Mermaid diagrams (`graph`, `flowchart`, `sequencediagram`, `gantt`, `pie`, `classdiagram`, `erdiagram`, `statediagram`)
- **Robust URL Encoding**: Implements proper JSON-based Base64 encoding for complex diagrams
- **Toolbar Integration**: Adds diagram icon buttons directly in code block toolbars next to copy buttons
- **Visual Design**: Uses distinctive blue diagram icon with hover effects
- **Error Prevention**: Includes duplicate button prevention and proper DOM manipulation

### Open in draw.io Integration
*   **Smart Content Detection**: Uses keyword analysis to identify Mermaid, PlantUML, and Graphviz diagrams.
*   **Robust URL Encoding**: Implements a `pako` deflate compression and Base64 encoding scheme to handle large diagrams.
*   **Toolbar Integration**: Adds a draw.io icon button directly in code block toolbars next to the Mermaid icon button.
*   **Visual Design**: Uses the official draw.io icon with hover effects.
*   **Error Prevention**: Includes duplicate button prevention and proper DOM manipulation.

### Rich Text Copy Enhancement
- **Dual Copy Options**: Two buttons for different use cases
  - **$ Button (Green)**: Clean copy without citations for productivity workflows
  - **📋 Clipboard Button (Amber)**: Copy with citations for academic/research purposes
- **Smart Citation Control**: Choose to include or exclude citations based on context
- **Advanced Citation Removal**: Automatically strips citation references `[1]`, `[2]`, etc. ($ button only)
- **Source Link Cleaning**: Removes source sections and reference elements ($ button only)
- **Visual Design**: Color-coded icons - green for clean, amber for citations
- **Feedback System**: Both buttons provide visual confirmation with checkmark animation
- **HTML Preservation**: Maintains rich formatting for seamless pasting in both modes

### Copy to Google Doc Feature
*   **Google Doc Button**: Grayscale document icon for copying clean, citation-free rich text to a new Google Doc, matching the style of other toolbar icons
*   **One-Click Copy Workflow**: Copies response content as clean, citation-free rich text (HTML) and opens a new Google Doc in a new tab
- **Visual Feedback**: Shows a confirmation message after copying

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
*   **Rich text copy issues:** Ensure you're clicking the correct icon button:
    - **Green $ icon**: Copy without citations (clean copy)
    - **Amber clipboard icon**: Copy with citations (academic copy)
    - Both rich text copy buttons require clipboard write permissions.
*   **Google Doc button not working:** Ensure you are logged into your Google account in the browser. The button requires access to Google Docs to create a new document.

**Updating the Extension:**

If you modify the local code for this extension:
1.  Save the changes in your local files.
2.  Go back to the `chrome://extensions` page.
3.  Find the "Perplexity Enhanced" extension card.
4.  Click the reload icon (a circular arrow) on the extension's card. This will reload the extension with your latest changes.
5.  Refresh any Perplexity pages to see the updates.

## Development Notes

### Current Version: 0.1.0
- **Extension Name**: Perplexity Powerups
- **Manifest Version**: 3 (Chrome Extensions Manifest V3)
- **Target Platform**: Chrome/Chromium browsers
- **Compatibility**: Designed for current Perplexity.ai website structure

### 📖 Development Journey
For a comprehensive look at the project's evolution, challenges overcome, and technical decisions made, see our detailed **[Development Journey](DEVELOPMENT_JOURNEY.md)** document. It chronicles:
- Feature development phases
- Major challenges and innovative solutions
- Technical architecture evolution
- UI/UX design decisions
- Future roadmap and planned enhancements

### Code Structure
```
perplexity-powerups/
├── manifest.json          # Extension configuration
├── package.json           # Project dependencies
├── content_script.js      # Main functionality (v16 - Dollar Icon & Citation Removal)
├── styles.css            # Custom styling for UI elements
├── popup.html            # Extension popup interface
├── node_modules/          # Installed dependencies
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
