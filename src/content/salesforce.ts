// const sign = `<p>Best regards, </br>Luciano | <strong>Docusign Customer Support</strong> </br><a href="docusign.com" target="_blank" rel="noopener noreferrer">docusign.com</a></p>`;
// const plainSign = 
// `Best regards,
// Luciano | Docusign Customer Support
// docusign.com
// `;
// const com = `- [Matter] The client\n- [Action]\n- [Resource] N/A`;
// const comHtml = `<p>- [Matter] The client</br>- [Action]</br>- [Resource] N/A</p>`;
// const call = `<i>If you'd like to schedule a meeting, you can use my calendar link to pick a time that works for you: <a href="https://calendly.com/luciano-docusign/30min" target="_blank" rel="noopener noreferrer">Calendly link</a>.</i>`;
// const plainCall = `If you'd like to schedule a meeting, you can use my calendar link to pick a time that works for you: https://calendly.com/luciano-docusign/30min`;
// const plainLink = `https://calendly.com/luciano-docusign/30min`;
// const link = '<a href="https://calendly.com/luciano-docusign/30min" target="_blank" rel="noopener noreferrer">Calendly link</a>';

// const snippets: { [trigger: string]: string } = {
//   "-sign": sign,
//   "-plain-sign": plainSign,
//   "-com": com,
//   "-com-html": comHtml,
//   "-call": call,
//   "-plain-call": plainCall,
//   "-plain-link": plainLink,
//   "-link": link,
//   "-thx": `Thank you in advance!`
// };

// //Salesforce
// function replaceTestStringsInIframe(): void {
//     // Select the iframe with the class 'cke_wysiwyg_frame'
//     const iframes = document.querySelectorAll<HTMLIFrameElement>('.cke_wysiwyg_frame');
  
//     if (!iframes || iframes.length === 0) {
//       return;
//     }
  
//     iframes.forEach((iframe) => {
//       if (!iframe || !iframe.contentDocument || !iframe.contentDocument.body) {
//         console.warn('Iframe or iframe body not found.');
//         return;
//       }
  
//       // Get the body inside the iframe
//       const iframeBody = iframe.contentDocument.body;
  
//       // Add a border for visual debugging
//       iframeBody.style.border = '1px solid gray';
  
//       // Get the current content of the iframe
//       const contentIframe = iframeBody.innerHTML;
  
//       // Replace all occurrences of "-test" (original functionality)
//       let updatedContent = contentIframe.replace(/-test/g, "This is my test now.");
  
//       // Loop through the snippets and replace triggers in the iframe content
//       for (const trigger in snippets) {
//         const snippet = snippets[trigger];
//         const regex = new RegExp(escapeRegExp(trigger), 'g');
//         updatedContent = updatedContent.replace(regex, snippet);
//       }
  
//       // Only update the iframe content if it has changed
//       if (contentIframe !== updatedContent) {
//         iframeBody.innerHTML = updatedContent;
  
//         // Place the cursor at the end of the iframe's content
//         const selection = iframe.contentWindow?.getSelection();
//         const range = iframe.contentDocument.createRange();
//         const lastChild = iframeBody.lastChild;
  
//         if (lastChild) {
//           range.setStart(lastChild, lastChild.textContent?.length || 0);
//           range.collapse(true);
//           selection?.removeAllRanges();
//           selection?.addRange(range);
//         }
  
//         console.log("Replaced content in CKEditor iframe using snippets and moved cursor to the end.");
//       }
//     });
//   }
    
//   // Utility function to escape special characters in regex
//   function escapeRegExp(string: string): string {
//     return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'); // Escapes regex special characters
//   }
    
//   // Run the function every 0.5 seconds
//   setInterval(replaceTestStringsInIframe, 600);



/**
 * Utility function to escape special regex characters in a string.
 */
function escapeRegExp(string: string): string {
    return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  }
  
  /**
   * Retrieves the snippets from Chrome storage and replaces trigger strings 
   * in all CKEditor iframes used in Salesforce.
   */
  function replaceSnippetsInSalesforceIframe(): void {
    // Retrieve the templates/snippets from Chrome storage
    chrome.storage.local.get("templatesData", (data) => {
      const templatesArray = data.templatesData || [];
      
      // Convert the array into a key-value mapping: trigger => snippet
      const snippets = templatesArray.reduce((acc: { [x: string]: any; }, item: { name: string | number; template: any; }) => {
        acc[item.name] = item.template;
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
        let updatedContent = contentIframe.replace(/-test/g, "This is my test now.");
        
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
  