// content_script.js

(function() {
  'use strict';

  console.log('Perplexity Enhanced: Initializing (v16 - Dollar Icon & Citation Removal)...');

  // --- MERMAID ICON BUTTON HANDLING ---
  function addMermaidIconButton(wrapperElement, cleanCode) {
    if (wrapperElement.dataset.mermaidLinkAdded === 'true') return;
    wrapperElement.dataset.mermaidLinkAdded = 'true';

    console.log('Perplexity Enhanced: Found a Mermaid block, creating icon button.');

    // Find the toolbar that contains the copy button for this code block
    const preElement = wrapperElement.closest('pre');
    if (!preElement) return;

    // Look for the toolbar with copy button in the code block area
    const codeBlockContainer = preElement.closest('div');
    if (!codeBlockContainer) return;

    // Find toolbar with copy button - look for the specific copy button SVG
    const toolbar = codeBlockContainer.querySelector('div[class*="flex"][class*="items-center"] button svg path[d*="M7 7m0 2.667"]')?.closest('div[class*="flex"][class*="items-center"]');
    if (!toolbar) {
      console.log('Perplexity Enhanced: Could not find code block toolbar for Mermaid button');
      return;
    }

    // Find the copy button to position our Mermaid button next to it
    const copyButton = toolbar.querySelector('button svg path[d*="M7 7m0 2.667"]')?.closest('button');
    if (!copyButton) {
      console.log('Perplexity Enhanced: Could not find copy button in code block toolbar');
      return;
    }

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

    // Create Mermaid icon button
    const mermaidButton = document.createElement('button');
    mermaidButton.className = copyButton.className || 'perplexity-enhanced-button';
    mermaidButton.type = 'button';
    mermaidButton.title = 'Open in Mermaid.live Editor';

    // Create Mermaid icon SVG (flowchart/diagram icon)
    mermaidButton.innerHTML = `
      <div class="flex items-center min-w-0 font-medium gap-1.5 justify-center">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <rect x="3" y="3" width="6" height="6" rx="1"></rect>
          <rect x="15" y="3" width="6" height="6" rx="1"></rect>
          <rect x="9" y="15" width="6" height="6" rx="1"></rect>
          <path d="M6 9v3a3 3 0 0 0 3 3h6a3 3 0 0 0 3-3V9"></path>
          <path d="M12 15V9"></path>
        </svg>
      </div>
    `;

    mermaidButton.addEventListener('click', () => {
      window.open(finalURL, '_blank');
    });

    console.log("Final URL generated:", finalURL);

    // Insert the Mermaid button immediately after the copy button
    copyButton.parentNode.insertBefore(mermaidButton, copyButton.nextSibling);
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
    toolbarElement.dataset.richCopyAdded = 'true';

    // Find the original copy button to position our button right next to it
    const originalCopyButton = toolbarElement.querySelector('button svg path[d*="M7 7m0 2.667"]')?.closest('button');
    if (!originalCopyButton) {
      console.log('Perplexity Enhanced: Could not find original copy button for positioning');
      return;
    }

    const copyRichButton = document.createElement('button');
    copyRichButton.className = originalCopyButton.className || 'perplexity-enhanced-button';
    copyRichButton.type = 'button';
    copyRichButton.title = 'Copy as Rich Text (without citations)';

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
  }

  // --- MAIN OBSERVER & EXECUTION LOGIC ---
  function runEnhancements() {
    // 1. Process Mermaid blocks
    document.querySelectorAll('div.codeWrapper:not([data-mermaid-link-added="true"])').forEach(wrapper => {
      const codeElement = wrapper.querySelector('code');
      if (!codeElement) return;

      const rawCode = codeElement.innerText;
      if (!rawCode) return;

      const firstWord = rawCode.trim().split(/\s+/)[0].toLowerCase();

      const isMermaid = ['mermaid', 'graph', 'flowchart', 'sequencediagram', 'gantt', 'pie', 'classdiagram', 'erdiagram', 'statediagram'].includes(firstWord);

      if (isMermaid) {
        addMermaidIconButton(wrapper, rawCode);
      }
    });

    // 2. Add "Copy Rich" button with dollar icon
    document.querySelectorAll('div[class*="flex"][class*="items-center"][class*="gap-x-"]').forEach(toolbar => {
        const hasCopySVG = toolbar.querySelector('svg path[d*="M7 7m0 2.667"]');
        if (hasCopySVG && !toolbar.dataset.richCopyAdded) {
            addRichCopyButton(toolbar);
        }
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