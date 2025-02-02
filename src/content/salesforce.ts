import { OutputData } from "@editorjs/editorjs";

/**
 * Utility function to escape special regex characters in a string.
 */
function escapeRegExp(string: string): string {
    return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  }

  function replaceSnippetsInSalesforceIframe(): void {
    // Retrieve the templates/snippets from Chrome storage
    chrome.storage.local.get("templatesData", (data) => {
      const templatesArray = data.templatesData || [];

      // Convert the array into a key-value mapping: trigger => snippet
      const snippets = templatesArray.reduce((acc: { [x: string]: any; }, item: { name: string | number; template: OutputData; }) => {
        // Extract the text from the template (same way as handleInputField)
        const templateText = item.template.blocks
          .map((block: { data: { text: string } }) => block.data.text)
          .join(' ') // Join all text blocks into a single string
          .replace(/&nbsp;/g, ' '); // Replace non-breaking space HTML entity with a regular space

        // Store the extracted text as the snippet
        acc[item.name] = templateText;
        return acc;
      }, {} as { [trigger: string]: string });

      // Select all CKEditor iframes by class name
      const iframes = document.querySelectorAll<HTMLIFrameElement>('.cke_wysiwyg_frame');
      if (!iframes || iframes.length === 0) {
        return;
      }

      iframes.forEach((iframe) => {
        if (!iframe || !iframe.contentDocument || !iframe.contentDocument.body) {
          console.warn('Iframe or iframe body not found.');
          return;
        }

        // Get the body of the iframe
        const iframeBody = iframe.contentDocument.body;

        // Optional: add a border for visual debugging
        iframeBody.style.border = '1px solid gray';

        // Get the current HTML content of the iframe
        const contentIframe = iframeBody.innerHTML;

        // First, replace all occurrences of "-test" with the specified test string
        let updatedContent = contentIframe  //.replace(/-test/g, "This is my test now.");

        // Loop through the snippets and replace all trigger occurrences with their snippet text
        for (const trigger in snippets) {
          const snippet = snippets[trigger];
          // Build a regex to match the trigger string globally. 
          const regex = new RegExp(escapeRegExp(trigger), 'g');
          updatedContent = updatedContent.replace(regex, snippet);
        }

        // Only update the iframe content if changes occurred
        if (contentIframe !== updatedContent) {
          iframeBody.innerHTML = updatedContent;

          // Place the cursor at the end of the iframe's content
          const selection = iframe.contentWindow?.getSelection();
          const range = iframe.contentDocument.createRange();
          const lastChild = iframeBody.lastChild;
          if (lastChild) {
            const textLength = lastChild.textContent?.length || 0;
            range.setStart(lastChild, textLength);
            range.collapse(true);
            selection?.removeAllRanges();
            selection?.addRange(range);
          }

          console.log("Replaced content in CKEditor iframe using snippets and moved cursor to the end.");
        }
      });
    });
}

  
  // Run the replacement function every 600 milliseconds
  setInterval(replaceSnippetsInSalesforceIframe, 600);
  