# perplexity.powerup
A chrome extension that provides much needed powerups to Perplexity

## Features

This Chrome extension enhances your Perplexity.ai experience with two main features:

1.  **Mermaid.js Graph Rendering**:
    *   Automatically detects and renders Mermaid code blocks (e.g., ` ```mermaid ... ``` `) within Perplexity responses as interactive SVG diagrams.
    *   **Toggle View**: Provides a "Show Code" / "Show Graph" button for each diagram, allowing users to easily switch between viewing the rendered graph and the raw Mermaid code block.
    *   **Copy Graph Image**: Adds a "Copy Graph" button that copies the rendered diagram to the clipboard as a PNG image, suitable for pasting into documents or image editors.
    *   Adds an "Open in Mermaid.live" link below each rendered graph, allowing users to easily view, edit, and share the diagram in the official online editor.

2.  **"Copy as Rich Text" Button**:
    *   Adds a "Copy Rich" button next to Perplexity's native "Copy" button in the response toolbars.
    *   When clicked, copies the main content of the Perplexity response to the clipboard as HTML (rich text). This allows pasting into applications like Google Docs, Word, or email clients while attempting to preserve formatting like headings, lists, bold/italic text, etc.

## Setup Guide: How to Install

This guide will walk you through installing and running the "Perplexity Enhanced" Chrome extension on your computer. Since this is a custom-developed extension, you'll load it as an "unpacked extension" in developer mode.

**Prerequisites:**

*   **Google Chrome:** Ensure you have Google Chrome browser installed.
*   **Extension Files:** You'll need the folder containing all the extension files (`manifest.json`, `content_script.js`, `styles.css`, `lib/` folder, `icons/` folder, `popup.html`). Download these files from this repository (e.g., by clicking the green "Code" button and then "Download ZIP", then extracting the ZIP). Let's call the main folder `perplexity-enhanced-extension` (or `perplexity.powerup-main` if you download the ZIP).

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
    *   **For Mermaid Rendering:**
        *   Ask Perplexity a question that should return a Mermaid diagram (e.g., "Draw a flowchart for making tea using Mermaid syntax").
        *   Look for the Mermaid code block to be replaced by a rendered diagram.
        *   Check for the "Open in Mermaid.live" link below the diagram.
    *   **For Rich Text Copy:**
        *   After Perplexity generates a response, hover over or focus on the response to make the action buttons appear.
        *   You should see a "Copy Rich" button next to Perplexity's standard "Copy" button.
        *   Click it, then try pasting into a rich text editor (like Google Docs, Word, or an email composer) to see if the formatting is preserved.

**Troubleshooting:**

*   **Errors during loading:** If Chrome shows an error when you try to "Load unpacked," the error message usually points to an issue in the `manifest.json` file. Double-check its syntax. The console on the `chrome://extensions` page (there's often an "Errors" button on the extension's card) can provide more details.
*   **Extension not working:**
    *   Ensure you've refreshed any Perplexity pages that were open *before* you loaded the extension.
    *   Open the Chrome Developer Tools (press F12 or Ctrl+Shift+I) on the Perplexity page. Check the **Console** tab for any errors logged by `content_script.js`. These errors can give clues about what might be going wrong.
    *   Double-check that the `matches` pattern in `manifest.json` (`"*://*.perplexity.ai/*"`) is correct for the URL you are on.
*   **Button/Diagram not appearing:** This is often due to changes in Perplexity's website structure. The selectors in `content_script.js` used to find elements might need updating. This is common for extensions that modify third-party websites.

**Updating the Extension:**

If you modify the local code for this extension:
1.  Save the changes in your local files.
2.  Go back to the `chrome://extensions` page.
3.  Find the "Perplexity Enhanced" extension card.
4.  Click the reload icon (a circular arrow) on the extension's card. This will reload the extension with your latest changes.
5.  Refresh any Perplexity pages to see the updates.
