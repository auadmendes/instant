import { OutputData } from "@editorjs/editorjs";

/**
 * Utility function to escape special regex characters in a string.
 */
function escapeRegExp(string: string): string {
    return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  }

//   function replaceSnippetsInSalesforceIframe(): void {
//     // Retrieve the templates/snippets from Chrome storage
//     chrome.storage.local.get("templatesData", (data) => {
//       const templatesArray = data.templatesData || [];

//       // Convert the array into a key-value mapping: trigger => snippet
//       const snippets = templatesArray.reduce((acc: { [x: string]: any; }, item: { name: string | number; template: OutputData; }) => {
//         // Extract the text from the template (same way as handleInputField)
//         const templateText = item.template.blocks
//           .map((block: { data: { text: string } }) => block.data.text)
//           .join(' ') // Join all text blocks into a single string
//           .replace(/&nbsp;/g, ' '); // Replace non-breaking space HTML entity with a regular space

//         // Store the extracted text as the snippet
//         acc[item.name] = templateText;
//         return acc;
//       }, {} as { [trigger: string]: string });

//       // Select all CKEditor iframes by class name
//       const iframes = document.querySelectorAll<HTMLIFrameElement>('.cke_wysiwyg_frame');
//       if (!iframes || iframes.length === 0) {
//         return;
//       }

//       iframes.forEach((iframe) => {
//         if (!iframe || !iframe.contentDocument || !iframe.contentDocument.body) {
//           console.warn('Iframe or iframe body not found.');
//           return;
//         }

//         // Get the body of the iframe
//         const iframeBody = iframe.contentDocument.body;

//         // Optional: add a border for visual debugging
//         iframeBody.style.border = '1px solid gray';

//         // Get the current HTML content of the iframe
//         const contentIframe = iframeBody.innerHTML;

//         // First, replace all occurrences of "-test" with the specified test string
//         let updatedContent = contentIframe  //.replace(/-test/g, "This is my test now.");

//         // Loop through the snippets and replace all trigger occurrences with their snippet text
//         for (const trigger in snippets) {
//           const snippet = snippets[trigger];
//           // Build a regex to match the trigger string globally. 
//           const regex = new RegExp(escapeRegExp(trigger), 'g');
//           updatedContent = updatedContent.replace(regex, snippet);
//         }

//         // Only update the iframe content if changes occurred
//         if (contentIframe !== updatedContent) {
//           iframeBody.innerHTML = updatedContent;

//           // Place the cursor at the end of the iframe's content
//           const selection = iframe.contentWindow?.getSelection();
//           const range = iframe.contentDocument.createRange();
//           const lastChild = iframeBody.lastChild;
//           if (lastChild) {
//             const textLength = lastChild.textContent?.length || 0;
//             range.setStart(lastChild, textLength);
//             range.collapse(true);
//             selection?.removeAllRanges();
//             selection?.addRange(range);
//           }

//           console.log("Replaced content in CKEditor iframe using snippets and moved cursor to the end.");
//         }
//       });
//     });
// }

  
  // Run the replacement function every 600 milliseconds
  
  // function replaceSnippetsInSalesforceIframe(): void {
  //   // Check if the extension context is still valid
  //   if (!chrome || !chrome.storage || !chrome.storage.local) {
  //     console.error("Chrome extension context invalidated.");
  //     return;
  //   }
  
  //   // Retrieve the templates/snippets from Chrome storage
  //   chrome.storage.local.get("templatesData", (data) => {
  //     if (chrome.runtime.lastError) {
  //       console.error("Error accessing Chrome storage:", chrome.runtime.lastError);
  //       return;
  //     }
  
  //     const templatesArray = data.templatesData || [];
  
  //     // Convert the array into a key-value mapping: trigger => snippet
  //     const snippets = templatesArray.reduce((acc: { [x: string]: any }, item: { name: string | number; template: OutputData }) => {
  //       // Extract the text from the template
  //       const templateText = item.template.blocks
  //         .map((block: { data: { text: string } }) => block.data.text)
  //         .join(' ')
  //         .replace(/&nbsp;/g, ' '); // Replace non-breaking space HTML entity with a regular space
  
  //       acc[item.name] = templateText;
  //       return acc;
  //     }, {} as { [trigger: string]: string });
  
  //     // Select all CKEditor iframes by class name
  //     const iframes = document.querySelectorAll<HTMLIFrameElement>('.cke_wysiwyg_frame');
  //     if (!iframes || iframes.length === 0) {
  //       //console.warn("No CKEditor iframes found.");
  //       return;
  //     }
  
  //     iframes.forEach((iframe) => {
  //       if (!iframe || !iframe.contentDocument || !iframe.contentDocument.body) {
  //         console.warn("Iframe or iframe body not found.");
  //         return;
  //       }
  
  //       // Get the body of the iframe
  //       const iframeBody = iframe.contentDocument.body;
  
  //       // Optional: add a border for visual debugging
  //       iframeBody.style.border = "1px solid gray";
  
  //       // Get the current HTML content of the iframe
  //       const contentIframe = iframeBody.innerHTML;
  
  //       // Replace all occurrences of snippets
  //       let updatedContent = contentIframe;
  //       for (const trigger in snippets) {
  //         const snippet = snippets[trigger];
  //         const regex = new RegExp(escapeRegExp(trigger), "g");
  //         updatedContent = updatedContent.replace(regex, snippet);
  //       }
  
  //       // Only update the iframe content if changes occurred
  //       if (contentIframe !== updatedContent) {
  //         iframeBody.innerHTML = updatedContent;
  
  //         // Place the cursor at the end of the iframe's content
  //         const selection = iframe.contentWindow?.getSelection();
  //         const range = iframe.contentDocument.createRange();
  //         const lastChild = iframeBody.lastChild;
  //         if (lastChild) {
  //           const textLength = lastChild.textContent?.length || 0;
  //           range.setStart(lastChild, textLength);
  //           range.collapse(true);
  //           selection?.removeAllRanges();
  //           selection?.addRange(range);
  //         }
  
  //         console.log("Replaced content in CKEditor iframe and moved cursor to the end.");
  //       }
  //     });
  //   });
  // }

  function replaceSnippetsInSalesforceIframe(): void {
    // Check if the extension context is still valid
    if (!chrome || !chrome.storage || !chrome.storage.local) {
      console.error("Chrome extension context invalidated.");
      return;
    }
  
    // Retrieve the templates/snippets from Chrome storage
    chrome.storage.local.get("templatesData", (data) => {
      if (chrome.runtime.lastError) {
        console.error("Error accessing Chrome storage:", chrome.runtime.lastError);
        return;
      }
  
      const templatesArray = data.templatesData || [];
  
      // Convert the array into a key-value mapping: trigger => snippet (plain text)
      const snippets = templatesArray.reduce(
        (acc: { [trigger: string]: string }, item: { name: string | number; template: OutputData }) => {
          // Extract the text from the template
          const templateText = item.template.blocks
            .map((block: { data: { text: string } }) => block.data.text)
            .join(' ')
            .replace(/&nbsp;/g, ' ');
    
          acc[item.name] = templateText;
          return acc;
        },
        {} as { [trigger: string]: string }
      );
  
      // Select all CKEditor iframes by class name (for Salesforce)
      const iframes = document.querySelectorAll<HTMLIFrameElement>('.cke_wysiwyg_frame');
      if (!iframes || iframes.length === 0) {
        return;
      }
  
      iframes.forEach((iframe) => {
        if (!iframe || !iframe.contentDocument || !iframe.contentDocument.body) {
          console.warn("Iframe or iframe body not found.");
          return;
        }
  
        // Get the body of the iframe
        const iframeBody = iframe.contentDocument.body;
  
        // Optional: add a border for visual debugging
        iframeBody.style.border = "1px solid gray";
  
        // Get the current HTML content of the iframe
        const contentIframe = iframeBody.innerHTML;
  
        // Replace all occurrences of snippet triggers
        let updatedContent = contentIframe;
        for (const trigger in snippets) {
          const snippet = snippets[trigger];
          const regex = new RegExp(escapeRegExp(trigger), "g");
          updatedContent = updatedContent.replace(regex, snippet);
        }
  
        // Only update the iframe content if changes occurred
        if (contentIframe !== updatedContent) {
          iframeBody.innerHTML = updatedContent;
  
          // Dispatch an input event so the editor recognizes the change.
          const inputEvent = new Event("input", { bubbles: true });
          iframeBody.dispatchEvent(inputEvent);
  
          // Place the cursor at the end of the iframe's content (if possible)
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
  
          console.log("Replaced content in CKEditor iframe, dispatched input event, and moved cursor to the end.");
        }
      });
    });
  }
  
  
  
  setInterval(replaceSnippetsInSalesforceIframe, 600);
  
  //frame src="" frameborder="0" class="cke_wysiwyg_frame cke_reset" title="Email Body" aria-describedby="cke_48" tabindex="0" allowtransparency="true" style="width: 100%; height: 100%;"></iframe>