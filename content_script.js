// content_script.js

(function() {
  'use strict';

  console.log('Perplexity Powerups: Initializing (v17 - Debug Mermaid Icon)...');

  // --- MERMAID ICON BUTTON HANDLING ---
  function addMermaidIconButton(wrapperElement, cleanCode) {
    if (wrapperElement.dataset.mermaidLinkAdded === 'true') return;
    wrapperElement.dataset.mermaidLinkAdded = 'true';

    console.log('Perplexity Powerups: Found a Mermaid block, creating icon button.');

    // Store the Mermaid data for later use when we find the toolbar
    wrapperElement.dataset.mermaidCode = cleanCode;

    // --- THE CORRECT ENCODING STRATEGY ---
    // 1. Create the JSON object with the code.
    const mermaidJsonObject = {
      code: cleanCode,
      mermaid: { "theme": "default" }
    };

    // 2. Serialize the JSON object to a string.
    const jsonString = JSON.stringify(mermaidJsonObject);

    // 3. Base64-encode the JSON string using the robust method.
    const base64Code = btoa(unescape(encodeURIComponent(jsonString)));

    // 4. Construct the URL with the correct #base64: prefix.
    const finalURL = `https://mermaid.live/edit#base64:${base64Code}`;

    // Store the URL for later use
    wrapperElement.dataset.mermaidUrl = finalURL;

    console.log("Final URL generated:", finalURL);
  }

  function addMermaidButtonToToolbar(toolbarElement, mermaidUrl) {
    if (toolbarElement.dataset.mermaidButtonAdded === 'true') return;
    toolbarElement.dataset.mermaidButtonAdded = 'true';

    // Find the original copy button to position our button right next to it
    const originalCopyButton = toolbarElement.querySelector('button[data-testid="copy-code-button"]') ||
                              toolbarElement.querySelector('button svg path[d*="M7 7m0 2.667"]')?.closest('button');
    if (!originalCopyButton) {
      console.log('Perplexity Powerups: Could not find original copy button for Mermaid positioning');
      return;
    }

    // Create Mermaid icon button
    const mermaidButton = document.createElement('button');
    mermaidButton.className = originalCopyButton.className || 'perplexity-enhanced-button';
    mermaidButton.type = 'button';
    mermaidButton.title = 'Open in Mermaid.live Editor';
    mermaidButton.style.marginLeft = '8px'; // Add some spacing
    mermaidButton.dataset.perplexityPowerupsButton = 'mermaid'; // Unique identifier

    // Create Mermaid icon SVG (flowchart/diagram icon)
    mermaidButton.innerHTML = `
      <div class="flex items-center min-w-0 font-medium gap-1.5 justify-center">
        <div class="flex shrink-0 items-center justify-center size-4">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <rect x="3" y="3" width="6" height="6" rx="1"></rect>
            <rect x="15" y="3" width="6" height="6" rx="1"></rect>
            <rect x="9" y="15" width="6" height="6" rx="1"></rect>
            <path d="M6 9v3a3 3 0 0 0 3 3h6a3 3 0 0 0 3-3V9"></path>
            <path d="M12 15V9"></path>
          </svg>
        </div>
      </div>
    `;

    mermaidButton.addEventListener('click', () => {
      window.open(mermaidUrl, '_blank');
    });

    console.log('Perplexity Powerups: Adding Mermaid button to toolbar');

    // Insert the Mermaid button immediately after the copy button
    originalCopyButton.parentNode.insertBefore(mermaidButton, originalCopyButton.nextSibling);
  }

  // --- RICH TEXT COPY HANDLING ---
  function cleanContentForCopy(htmlContent) {
    // Create a temporary div to manipulate the HTML
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = htmlContent;

    // Remove citation references (e.g., [1], [2], etc.)
    const citationPattern = /\[\d+\]/g;
    tempDiv.innerHTML = tempDiv.innerHTML.replace(citationPattern, '');

    // Remove elements that contain source links or citations
    // Common selectors for Perplexity's citation/source elements
    const citationSelectors = [
      'sup', // superscript citations
      '[class*="citation"]',
      '[class*="source"]',
      '[class*="reference"]',
      'a[href*="source"]',
      'div[class*="sources"]',
      'div[class*="Citations"]',
      'section[class*="sources"]'
    ];

    citationSelectors.forEach(selector => {
      const elements = tempDiv.querySelectorAll(selector);
      elements.forEach(el => el.remove());
    });

    // Remove any remaining source links at the end
    const paragraphs = tempDiv.querySelectorAll('p');
    paragraphs.forEach(p => {
      const text = p.textContent.trim();
      // Remove paragraphs that start with "Sources:" or similar
      if (text.match(/^(Sources?|References?|Citations?):/i)) {
        p.remove();
      }
    });

    // Clean up any empty elements left behind
    const emptyElements = tempDiv.querySelectorAll('*:empty:not(br):not(hr):not(img)');
    emptyElements.forEach(el => el.remove());

    return tempDiv.innerHTML;
  }

  function addRichCopyButton(toolbarElement) {
    if (toolbarElement.dataset.richCopyAdded === 'true') return;

    // Additional check to prevent duplicates - look for existing rich copy buttons
    const existingRichButton = toolbarElement.querySelector('button[data-perplexity-powerups-button="rich-copy"]') ||
                              toolbarElement.querySelector('button[title*="Rich Text"]') ||
                              toolbarElement.querySelector('svg path[d*="M17 5H9.5a3.5"]')?.closest('button');
    if (existingRichButton) {
      console.log('Perplexity Powerups: Rich copy button already exists, skipping');
      return; // Already has a rich copy button
    }

    toolbarElement.dataset.richCopyAdded = 'true';

    // Find the original copy button to position our button right next to it
    const originalCopyButton = toolbarElement.querySelector('button[data-testid="copy-code-button"]') ||
                              toolbarElement.querySelector('button svg path[d*="M7 7m0 2.667"]')?.closest('button');
    if (!originalCopyButton) {
      console.log('Perplexity Powerups: Could not find original copy button for positioning');
      return;
    }

    const copyRichButton = document.createElement('button');
    copyRichButton.className = originalCopyButton.className || 'perplexity-enhanced-button';
    copyRichButton.type = 'button';
    copyRichButton.title = 'Copy as Rich Text (without citations)';
    copyRichButton.dataset.perplexityPowerupsButton = 'rich-copy'; // Unique identifier

    // Create dollar icon SVG
    copyRichButton.innerHTML = `
      <div class="flex items-center min-w-0 font-medium gap-1.5 justify-center">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <line x1="12" y1="1" x2="12" y2="23"></line>
          <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path>
        </svg>
      </div>
    `;

    copyRichButton.addEventListener('click', () => {
      const mainResponseContainer = toolbarElement.closest('div[class*="border-b"]');
      if (!mainResponseContainer) return alert('Copy Rich: Could not find main response container.');

      const proseElement = mainResponseContainer.querySelector('div[class*="prose"]');
      if (!proseElement) return alert('Copy Rich: Could not find content to copy.');

      // Clean the content before copying
      const cleanedHtml = cleanContentForCopy(proseElement.innerHTML);
      const blob = new Blob([cleanedHtml], { type: 'text/html' });
      const clipboardItem = new ClipboardItem({ 'text/html': blob });

      navigator.clipboard.write([clipboardItem]).then(() => {
        const originalContent = copyRichButton.innerHTML;
        copyRichButton.innerHTML = `
          <div class="flex items-center min-w-0 font-medium gap-1.5 justify-center">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <polyline points="20,6 9,17 4,12"></polyline>
            </svg>
          </div>
        `;
        setTimeout(() => { copyRichButton.innerHTML = originalContent; }, 2000);
      }).catch(err => console.error('Failed to copy rich text:', err));
    });

    // Insert the dollar button immediately after the original copy button
    originalCopyButton.parentNode.insertBefore(copyRichButton, originalCopyButton.nextSibling);

    // Add the "$C" button for copying WITH citations
    addRichCopyWithCitationsButton(toolbarElement, copyRichButton);
  }

  function addRichCopyWithCitationsButton(toolbarElement, previousButton) {
    if (toolbarElement.dataset.richCopyWithCitationsAdded === 'true') return;

    // Additional check to prevent duplicates - look for existing "$C" buttons
    const existingCitationButton = toolbarElement.querySelector('button[data-perplexity-powerups-button="rich-copy-citations"]') ||
                                  toolbarElement.querySelector('button[title*="Rich Text (with citations)"]');
    if (existingCitationButton) {
      console.log('Perplexity Powerups: Rich copy with citations button already exists, skipping');
      return;
    }

    toolbarElement.dataset.richCopyWithCitationsAdded = 'true';

    const copyRichWithCitationsButton = document.createElement('button');
    copyRichWithCitationsButton.className = previousButton.className || 'perplexity-enhanced-button';
    copyRichWithCitationsButton.type = 'button';
    copyRichWithCitationsButton.title = 'Copy Rich Text with Citations';
    copyRichWithCitationsButton.dataset.perplexityPowerupsButton = 'rich-copy-citations'; // Unique identifier

    // Create clipboard with checkmark icon - simple and reliable
    copyRichWithCitationsButton.innerHTML = `
      <div class="flex items-center min-w-0 font-medium gap-1.5 justify-center">
        <div class="flex shrink-0 items-center justify-center size-4">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <!-- Clipboard icon -->
            <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"></path>
            <rect x="8" y="2" width="8" height="4" rx="1" ry="1"></rect>
            <!-- Small checkmark to indicate "with citations" -->
            <polyline points="9,11 12,14 16,10"></polyline>
          </svg>
        </div>
      </div>
    `;

    copyRichWithCitationsButton.addEventListener('click', () => {
      const mainResponseContainer = toolbarElement.closest('div[class*="border-b"]');
      if (!mainResponseContainer) return alert('Copy Rich with Citations: Could not find main response container.');

      const proseElement = mainResponseContainer.querySelector('div[class*="prose"]');
      if (!proseElement) return alert('Copy Rich with Citations: Could not find content to copy.');

      // Copy content WITHOUT cleaning citations - preserve original formatting
      const originalHtml = proseElement.innerHTML;
      const blob = new Blob([originalHtml], { type: 'text/html' });
      const clipboardItem = new ClipboardItem({ 'text/html': blob });

      navigator.clipboard.write([clipboardItem]).then(() => {
        const originalContent = copyRichWithCitationsButton.innerHTML;
        copyRichWithCitationsButton.innerHTML = `
          <div class="flex items-center min-w-0 font-medium gap-1.5 justify-center">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <polyline points="20,6 9,17 4,12"></polyline>
            </svg>
          </div>
        `;
        setTimeout(() => { copyRichWithCitationsButton.innerHTML = originalContent; }, 2000);
      }).catch(err => console.error('Failed to copy rich text with citations:', err));
    });

    // Insert the "$C" button immediately after the "$" button
    previousButton.parentNode.insertBefore(copyRichWithCitationsButton, previousButton.nextSibling);
  }

  function addGoogleDocButton(toolbarElement, previousButton) {
    if (toolbarElement.dataset.googleDocButtonAdded === 'true') return;
    toolbarElement.dataset.googleDocButtonAdded = 'true';

    const googleDocButton = document.createElement('button');
    googleDocButton.className = previousButton.className || 'perplexity-enhanced-button';
    googleDocButton.type = 'button';
    googleDocButton.title = 'Copy Rich Text to New Google Doc';
    googleDocButton.dataset.perplexityPowerupsButton = 'google-doc-copy';
    googleDocButton.style.marginLeft = '8px';
    googleDocButton.innerHTML = `
      <div class="flex items-center min-w-0 font-medium gap-1.5 justify-center">
        <div class="flex shrink-0 items-center justify-center size-4">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <rect x="4" y="3" width="16" height="18" rx="2"/>
            <rect x="7" y="6" width="10" height="2" rx="1"/>
            <rect x="7" y="10" width="10" height="2" rx="1"/>
            <rect x="7" y="14" width="6" height="2" rx="1"/>
          </svg>
        </div>
      </div>
    `;

    googleDocButton.addEventListener('click', async () => {
      const mainResponseContainer = toolbarElement.closest('div[class*="border-b"]');
      if (!mainResponseContainer) return alert('Google Doc: Could not find main response container.');
      const proseElement = mainResponseContainer.querySelector('div[class*="prose"]');
      if (!proseElement) return alert('Google Doc: Could not find content to copy.');
      const originalHtml = proseElement.innerHTML;
      const blob = new Blob([originalHtml], { type: 'text/html' });
      const clipboardItem = new ClipboardItem({ 'text/html': blob });
      await navigator.clipboard.write([clipboardItem]);
      window.open('https://docs.new', '_blank');
      const originalContent = googleDocButton.innerHTML;
      googleDocButton.innerHTML += ' <span style="color:#34A853;font-size:12px;">Copied! Paste in Google Doc</span>';
      setTimeout(() => { googleDocButton.innerHTML = originalContent; }, 2500);
    });

    previousButton.parentNode.insertBefore(googleDocButton, previousButton.nextSibling);
  }

  function addGoogleDocButtonToRichCopyToolbar(richCopyToolbar) {
    if (richCopyToolbar.querySelector('button[data-perplexity-powerups-button="google-doc-copy"]')) return;

    // Find the last rich copy button (with or without citations)
    const lastRichCopyBtn = richCopyToolbar.querySelector('button[data-perplexity-powerups-button="rich-copy-citations"]') ||
                            richCopyToolbar.querySelector('button[data-perplexity-powerups-button="rich-copy"]');
    if (!lastRichCopyBtn) return;

    const googleDocButton = document.createElement('button');
    googleDocButton.className = lastRichCopyBtn.className || 'perplexity-enhanced-button';
    googleDocButton.type = 'button';
    googleDocButton.title = 'Copy Rich Text to New Google Doc';
    googleDocButton.dataset.perplexityPowerupsButton = 'google-doc-copy';
    googleDocButton.style.marginLeft = '8px';
    googleDocButton.innerHTML = `
      <div class="flex items-center min-w-0 font-medium gap-1.5 justify-center">
        <div class="flex shrink-0 items-center justify-center size-4">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <rect x="4" y="3" width="16" height="18" rx="2"/>
            <rect x="7" y="6" width="10" height="2" rx="1"/>
            <rect x="7" y="10" width="10" height="2" rx="1"/>
            <rect x="7" y="14" width="6" height="2" rx="1"/>
          </svg>
        </div>
      </div>
    `;

    googleDocButton.addEventListener('click', async () => {
      // Find the closest prose element for this response
      const mainResponseContainer = richCopyToolbar.closest('div[class*="border-b"]');
      if (!mainResponseContainer) return alert('Google Doc: Could not find main response container.');
      const proseElement = mainResponseContainer.querySelector('div[class*="prose"]');
      if (!proseElement) return alert('Google Doc: Could not find content to copy.');
      const originalHtml = proseElement.innerHTML;
      const blob = new Blob([originalHtml], { type: 'text/html' });
      const clipboardItem = new ClipboardItem({ 'text/html': blob });
      await navigator.clipboard.write([clipboardItem]);
      window.open('https://docs.new', '_blank');
      const originalContent = googleDocButton.innerHTML;
      googleDocButton.innerHTML += ' <span style="color:#34A853;font-size:12px;">Copied! Paste in Google Doc</span>';
      setTimeout(() => { googleDocButton.innerHTML = originalContent; }, 2500);
    });

    lastRichCopyBtn.parentNode.insertBefore(googleDocButton, lastRichCopyBtn.nextSibling);
  }

  // --- MAIN OBSERVER & EXECUTION LOGIC ---
  function runEnhancements() {
    // 1. Process Mermaid blocks and add buttons to their toolbars
    document.querySelectorAll('div.codeWrapper:not([data-mermaid-link-added="true"])').forEach(wrapper => {
      const codeElement = wrapper.querySelector('code');
      if (!codeElement) return;

      const rawCode = codeElement.innerText;
      if (!rawCode) return;

      const firstWord = rawCode.trim().split(/\s+/)[0].toLowerCase();

      const isMermaid = ['mermaid', 'graph', 'flowchart', 'sequencediagram', 'gantt', 'pie', 'classdiagram', 'erdiagram', 'statediagram'].includes(firstWord);

      if (isMermaid) {
        addMermaidIconButton(wrapper, rawCode);

        // Find the toolbar within this code block and add the Mermaid button
        const copyButton = wrapper.querySelector('button[data-testid="copy-code-button"]');
        console.log('Perplexity Powerups: Looking for copy button in Mermaid block:', copyButton);
        if (copyButton && wrapper.dataset.mermaidUrl && !copyButton.dataset.mermaidButtonAdded) {
          // Use the copy button's parent container as the toolbar
          const toolbar = copyButton.parentElement;
          console.log('Perplexity Powerups: Found toolbar for Mermaid button:', toolbar);
          addMermaidButtonToToolbar(toolbar, wrapper.dataset.mermaidUrl);
        }
      }
    });

    // 2. Add "Copy Rich" button with dollar icon to regular response toolbars (not code blocks)
    document.querySelectorAll('div[class*="flex"][class*="items-center"][class*="gap-x-"]:not([data-rich-copy-added])').forEach(toolbar => {
      // Skip if this is inside a code block (Mermaid or regular code)
      if (toolbar.closest('div.codeWrapper') || toolbar.closest('pre')) {
        return;
      }

      // Skip if already has rich copy buttons
      if (toolbar.querySelector('button[data-perplexity-powerups-button="rich-copy"]') ||
          toolbar.querySelector('button[data-perplexity-powerups-button="rich-copy-citations"]') ||
          toolbar.querySelector('button[title*="Rich Text"]')) {
        return;
      }

      // Look for copy buttons that are NOT the code copy button
      const hasCopyButton = toolbar.querySelector('svg path[d*="M7 7m0 2.667"]') &&
                           !toolbar.querySelector('button[data-testid="copy-code-button"]');

      if (hasCopyButton && !toolbar.dataset.richCopyAdded) {
        addRichCopyButton(toolbar);
      }
    });

    // 3. Add Google Doc button to the correct toolbar
    document.querySelectorAll('div.gap-x-xs.flex.items-center[data-rich-copy-added][data-rich-copy-with-citations-added]').forEach(richCopyToolbar => {
      addGoogleDocButtonToRichCopyToolbar(richCopyToolbar);
    });
  }

  const observer = new MutationObserver(() => {
    setTimeout(runEnhancements, 500);
  });

  observer.observe(document.body, {
    childList: true,
    subtree: true
  });

  runEnhancements();

})();