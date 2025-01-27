// // src/content/salesforce.ts

// // Ensure the script runs only on Salesforce pages
// if (window.location.hostname.includes("salesforce.com")) {
//     console.log("Salesforce script loaded.");
  
//     // Example: Add custom functionality for Salesforce
//     function enhanceSalesforceInputs() {
//       const monitoredInputs = document.querySelectorAll("input, textarea");
      
//       monitoredInputs.forEach((input) => {
//         input.addEventListener("focus", () => {
//           (input as HTMLElement).style.backgroundColor = "#f0f8ff"; // Light blue background on focus
//         });
  
//         input.addEventListener("blur", () => {
//           (input as HTMLElement).style.backgroundColor = ""; // Reset background on blur
//         });
//       });
  
//       console.log("Enhanced Salesforce inputs with custom focus behavior.");
//     }
  
//     // Wait for dynamic Salesforce elements to load
//     const observer = new MutationObserver(() => {
//       if (document.querySelector("input, textarea")) {
//         enhanceSalesforceInputs();
//       }
//     });
  
//     observer.observe(document.body, { childList: true, subtree: true });
  
//     // Example: Display a notification on Salesforce
//     function displaySalesforceToast(message: string) {
//       const toast = document.createElement("div");
//       toast.innerText = message;
//       toast.style.position = "fixed";
//       toast.style.bottom = "20px";
//       toast.style.right = "20px";
//       toast.style.backgroundColor = "rgba(0, 0, 0, 0.8)";
//       toast.style.color = "white";
//       toast.style.padding = "10px 20px";
//       toast.style.borderRadius = "5px";
//       toast.style.zIndex = "10000";
//       document.body.appendChild(toast);
  
//       setTimeout(() => {
//         toast.remove();
//       }, 3000);
//     }
  
//     // Display a welcome message on Salesforce
//     displaySalesforceToast("Salesforce custom script is active!");
//   }
  






//   function observeIframes() {
//     const observer = new MutationObserver(() => {
//       const iframes = document.querySelectorAll("iframe"); // Select all iframes
  
//       if (iframes.length > 0) {
//         console.log(`Found ${iframes.length} iframe(s) on the page.`);
  
//         iframes.forEach((iframe) => {
//           iframe.addEventListener('load', () => {
//             try {
//               const iframeDoc = iframe.contentDocument || iframe.contentWindow?.document;
  
//               if (iframeDoc) {
//                 console.log("Iframe content accessible:", iframe);
  
//                 // Check for the contenteditable element inside the iframe
//                 const editableElement = iframeDoc.querySelector('[contenteditable="true"]');
//                 if (editableElement) {
//                   console.log("Found contenteditable element inside iframe:", editableElement);
  
//                   // Attach event listeners
//                   editableElement.addEventListener("keydown", (event) => {
//                     console.log("Key pressed inside contenteditable:", event.key);
//                   });
  
//                   editableElement.addEventListener("input", () => {
//                     console.log("Content changed:", editableElement.innerHTML);
//                   });
//                 } else {
//                   console.log("No contenteditable element found inside this iframe.");
//                 }
//               }
//             } catch (error) {
//               console.error("Unable to access iframe due to cross-origin restrictions:", error);
//             }
//           });
//         });
  
//         // Disconnect observer after handling iframes
//         observer.disconnect();
//       }
//     });
  
//     observer.observe(document.body, { childList: true, subtree: true });
//   }
  
//   // Call the observer function
//   observeIframes();
// (function () {
// alert('test')
// })();

// (function () {
//   // Select all elements with the specified class
//   const elements = document.querySelectorAll<HTMLDivElement>(
//       '.cke_editable.cke_editable_themed.cke_contents_ltr.cke_show_borders'
//   );

//   // Iterate through each element and change its background color
//   elements.forEach((element) => {
//       element.style.backgroundColor = "yellow"; // Set the desired background color
//   });

//   // Log a message for debugging purposes
//   if (elements.length > 0) {
//       console.log(`Changed background color of ${elements.length} elements.`);
//   } else {
//       console.log("No elements with the specified class found.");
//   }
// })();


// ////////////////////////////////////////////////////////////////

// const snippets: { [trigger: string]: string } = {
//   "-sign": `Best regards,\nLuciano | Docusign Customer\nSupport docusign.com`,
//   "-com": `- [Matter] The client\n- [Action]\n- [Resource] N/A`,
//   "-call": `<i>If you'd like to schedule a meeting, you can use my calendar link to pick a time that works for you: <a href="https://calendly.com/your-link" target="_blank">Calendly link</a>.</i>`,
//   "-plain-call": `If you'd like to schedule a meeting, you can use my calendar link to pick a time that works for you: https://calendly.com/luciano-docusign/30min`,
// };

// // Function to replace the trigger with the snippet
// function replaceTrigger(target: HTMLElement | HTMLInputElement | HTMLTextAreaElement) {
//   const isInputOrTextarea = target.tagName === "INPUT" || target.tagName === "TEXTAREA" || target.tagName === "CONTENTEDITABLE";

//   if (isInputOrTextarea) {
//     // Handle input/textarea fields
//     const inputTarget = target as HTMLInputElement | HTMLTextAreaElement;
//     const cursorPosition = inputTarget.selectionStart || 0;
//     const value = inputTarget.value;

//     // Split text into before and after the cursor
//     const beforeCursor = value.slice(0, cursorPosition);
//     const afterCursor = value.slice(cursorPosition);

//     for (const trigger in snippets) {
//       if (beforeCursor.endsWith(trigger)) {
//         const snippet = target.tagName === "TEXTAREA" && trigger === "-call" ? snippets["-plain-call"] : snippets[trigger];
//         const updatedText =
//           beforeCursor.replace(trigger, snippets[trigger]) + afterCursor;

//         inputTarget.value = updatedText;

//         // Set the cursor position after the snippet
//         const newCursorPosition =
//           updatedText.length - afterCursor.length;
//         inputTarget.setSelectionRange(newCursorPosition, newCursorPosition);

//         break;
//       }
//     }
//   } else if (target.isContentEditable) {
//     // Handle contenteditable elements
//     const selection = window.getSelection();
//     if (!selection || selection.rangeCount === 0) return;

//     const range = selection.getRangeAt(0);
//     const container = range.startContainer;

//     if (container.nodeType !== Node.TEXT_NODE) return;

//     const text = container.textContent || "";
//     const cursorPosition = range.startOffset;

//     // Split text into before and after the cursor
//     const beforeCursor = text.slice(0, cursorPosition);
//     const afterCursor = text.slice(cursorPosition);

//     for (const trigger in snippets) {
//       if (beforeCursor.endsWith(trigger)) {
//         const updatedText =
//           beforeCursor.replace(trigger, snippets[trigger]) + afterCursor;

//         // Update the content
//         container.textContent = updatedText;

//         // Reset cursor position
//         const newCursorPosition =
//           updatedText.length - afterCursor.length;
//         range.setStart(container, newCursorPosition);
//         range.setEnd(container, newCursorPosition);
//         selection.removeAllRanges();
//         selection.addRange(range);

//         break;
//       }
//     }
//   }
// }

// // Function to listen for typing and process triggers
// function handleTyping(event: KeyboardEvent) {
//   const target = event.target as HTMLElement;

//   if (
//     target.tagName === "INPUT" ||
//     target.tagName === "TEXTAREA" ||
//     target.isContentEditable
//   ) {
//     replaceTrigger(target);
//   }
// }


// function processSnippetForInput(target: HTMLInputElement | HTMLTextAreaElement) {
//   const cursorPosition = target.selectionStart || 0;
//   const value = target.value;

//   const beforeCursor = value.slice(0, cursorPosition);
//   const afterCursor = value.slice(cursorPosition);

//   for (const trigger in snippets) {
//     if (beforeCursor.endsWith(trigger)) {
//       // Choose the correct snippet based on the target and trigger
//       const snippet =
//         target.tagName === "TEXTAREA" && trigger === "-call"
//           ? snippets["-plain-call"]
//           : snippets[trigger];

//       // Replace the trigger with the selected snippet
//       const updatedText = beforeCursor.replace(trigger, snippet) + afterCursor;
//       target.value = updatedText;

//       // Move the cursor to the end of the inserted snippet
//       const newCursorPosition = updatedText.length - afterCursor.length;
//       target.setSelectionRange(newCursorPosition, newCursorPosition);

//       break;
//     }
//   }
// }

// // Event listener for handling input changes
// function handleInput(event: KeyboardEvent) {
//   const target = event.target as HTMLElement;

//   if (target.tagName === "INPUT" || target.tagName === "TEXTAREA") {
//     processSnippetForInput(target as HTMLInputElement | HTMLTextAreaElement);
//   }
// }

// // Attach event listeners to the document
// document.addEventListener("keydown", handleInput);


// // Attach event listeners
// document.addEventListener("input", handleTyping);



//////////////////////////////////////////////////////////////////////

// // Snippets configuration
// const snippets: { [trigger: string]: string } = {
//   "-sign": "Luciano | Docusign Customer Support <docusign.com>",
//   "-comment": `
//   - [Matter] The client<br>
//   - [Action]<br>
//   - [Resource] N/A`,
//   "-call": `<p>If you'd like to schedule a meeting, you can use my calendar link to pick a time that works for you: <a href="https://calendly.com/your-link" target="_blank">Calendly link</a>.</p>`,
// };

// // General Input Handler
// function handleInput(event: KeyboardEvent) {
//   const target = event.target as HTMLElement;

//   if (target.tagName === "INPUT" || target.tagName === "TEXTAREA") {
//     processSnippetForInput(target as HTMLInputElement | HTMLTextAreaElement);
//   } else if (target.isContentEditable) {
//     processSnippetForContentEditable(target);
//   }
// }

// // Process snippets for input/textarea fields
// function processSnippetForInput(target: HTMLInputElement | HTMLTextAreaElement) {
//   const value = target.value;
//   const cursorPosition = target.selectionStart || 0;

//   const beforeCursor = value.slice(0, cursorPosition);
//   const afterCursor = value.slice(cursorPosition);

//   for (const trigger in snippets) {
//     if (beforeCursor.endsWith(trigger)) {
//       const updatedText = beforeCursor.replace(trigger, snippets[trigger]) + afterCursor;
//       target.value = updatedText;
//       console.log("Snippedt adicionado")
//       // Move the cursor to the end of the inserted snippet
//       const newCursorPosition = updatedText.length - afterCursor.length;
//       target.setSelectionRange(newCursorPosition, newCursorPosition);
//       break;
//     }
//   }
// }

// // Process snippets for contenteditable fields
// function processSnippetForContentEditable(target: HTMLElement) {
//   const selection = window.getSelection();
//   if (!selection || selection.rangeCount === 0) return;

//   const range = selection.getRangeAt(0);
//   const container = range.startContainer;

//   if (container.nodeType !== Node.TEXT_NODE) return;

//   const text = container.textContent || "";
//   const cursorPosition = range.startOffset;

//   const beforeCursor = text.slice(0, cursorPosition);
//   const afterCursor = text.slice(cursorPosition);

//   for (const trigger in snippets) {
//     if (beforeCursor.endsWith(trigger)) {
//       const updatedText = beforeCursor.replace(trigger, snippets[trigger]) + afterCursor;
//       console.log("Snippedt atualizado")
//       // Replace content in the contenteditable element
//       container.textContent = updatedText;

//       // Reset cursor position
//       const newCursorPosition = updatedText.length - afterCursor.length;
//       range.setStart(container, newCursorPosition);
//       range.setEnd(container, newCursorPosition);
//       selection.removeAllRanges();
//       selection.addRange(range);

//       console.log(`Snippet "${trigger}" replaced successfully.`);
//       break;
//     }
//   }
// }

// // Attach listeners to contenteditable elements dynamically
// function attachListenersToContentEditable() {
//   const editableElements = document.querySelectorAll('[contenteditable="true"]');

//   editableElements.forEach((editableElement) => {
//     if (!editableElement.getAttribute("data-snippet-attached")) {
//       console.log('ATTACHED AQUI.................')
//       editableElement.addEventListener("keydown", handleInput);
//       editableElement.setAttribute("data-snippet-attached", "true");
//       console.log("Listener attached to:", editableElement);
//     }
//   });
// }



// /////// testing Here



// /////// testing Here



// // Observer for dynamically added contenteditable elements
// function observeContentEditableElements() {
//   const observer = new MutationObserver(() => {
//     attachListenersToContentEditable();
//   });

//   observer.observe(document.body, { childList: true, subtree: true });
// }

// // Gmail-specific handling
// function observeGmailFields() {
//   const observer = new MutationObserver(() => {
//     const bodyDiv = document.querySelector('[aria-label="Corpo da mensagem"][contenteditable="true"]');
//     if (bodyDiv && !bodyDiv.getAttribute("data-snippet-attached")) {
//       bodyDiv.addEventListener("keydown", handleInput);
//       bodyDiv.setAttribute("data-snippet-attached", "true");
//       console.log("Gmail listeners attached.");
//       observer.disconnect();
//     }
//   });

//   observer.observe(document.body, { childList: true, subtree: true });
// }

// // Salesforce-specific handling
// function observeSalesforceFields() {
//   const observer = new MutationObserver(() => {
//     const emailField = document.querySelector('[contenteditable="true"][aria-label="Email Body"]');
//     const commentField = document.querySelector('[contenteditable="true"][aria-label="Comment"]');

//     [emailField, commentField].forEach((field) => {
//       if (field && !field.getAttribute("data-snippet-attached")) {
//         field.addEventListener("keydown", handleInput);
//         field.setAttribute("data-snippet-attached", "true");
//         console.log("Salesforce listeners attached to:", field);
//       }
//     });

//     if (emailField || commentField) observer.disconnect();
//   });

//   observer.observe(document.body, { childList: true, subtree: true });
// }

// // Focus and Blur Handlers for Styling
// function handleFocus(event: FocusEvent) {
//   const target = event.target as HTMLElement;
//   if (target.isContentEditable || target.tagName === "INPUT" || target.tagName === "TEXTAREA") {
//     target.style.backgroundColor = "rgba(224, 247, 250, 0.1)";
//   }
// }

// function handleBlur(event: FocusEvent) {
//   const target = event.target as HTMLElement;
//   if (target.isContentEditable || target.tagName === "INPUT" || target.tagName === "TEXTAREA") {
//     target.style.backgroundColor = "";
//   }
// }

// // Add global listeners for focus and blur
// document.addEventListener("keydown", handleInput);
// document.addEventListener("focus", handleFocus, true);
// document.addEventListener("blur", handleBlur, true);

// // Initialize observers
// observeGmailFields();
// observeSalesforceFields();
// observeContentEditableElements();


/////////////////////////////////////////////////////////////////////////////////////////change snippets
// function handleInputField(event: KeyboardEvent, target: HTMLInputElement | HTMLTextAreaElement) {
//     const value = target.value;
//     const cursorPosition = target.selectionStart || 0;
  
//     const beforeCursor = value.slice(0, cursorPosition);
//     const afterCursor = value.slice(cursorPosition);
  
//     for (const trigger in snippets) {
//       if (beforeCursor.endsWith(trigger)) {
//         // Select the appropriate snippet based on the trigger and context
//         let snippet = snippets[trigger];
//         if (trigger === "-com" && target.tagName === "TEXTAREA") {
//           snippet = snippets["-com-html"];
//         }
//         if (trigger === "-call" && target.tagName === "TEXTAREA") {
//           snippet = snippets["-plain-call"];
//         }
  
//         // Replace the trigger with the selected snippet
//         const updatedText = beforeCursor.replace(trigger, snippet) + afterCursor;
  
//         // Update the input/textarea content
//         target.value = updatedText;
  
//         // Set the cursor position after the inserted snippet
//         const newCursorPosition = updatedText.length - afterCursor.length;
//         target.setSelectionRange(newCursorPosition, newCursorPosition);
  
//         console.log(`Snippet "${trigger}" replaced with "${snippet}" in input/textarea.`);
//         break;
//       }
//     }
//   }

// "background": {
//     "scripts": [
//       "libs/constants.ts",
//       "libs/utils.ts",
//       "libs/background.ts"
//     ],
//     "persistent" : true
//   },












////////////////////////////////////////

// const snippets: { [trigger: string]: string } = {
//     "-sign": `Best regards,\nLuciano | Docusign Customer\nSupport docusign.com`,
//     "-com": `- [Matter] The client\n- [Action]\n- [Resource] N/A`,
//     "-com-html": `<p>- [Matter] The client</br>- [Action]</br>- [Resource] N/A</p>`,
//     "-call": `<i>If you'd like to schedule a meeting, you can use my calendar link to pick a time that works for you: <a href="https://calendly.com/luciano-docusign/30min" target="_blank" rel="noopener noreferrer">Calendly link</a>.</i>`,
//     "-plain-call": `If you'd like to schedule a meeting, you can use my calendar link to pick a time that works for you: https://calendly.com/luciano-docusign/30min`,
//     "-test": `My test = My test`
// };

// // Function to handle dynamic trigger replacement in text
// function handleKeydown(event: KeyboardEvent) {
//     const target = event.target as HTMLElement;

//     if (!target || !(target.isContentEditable || target.tagName === "INPUT" || target.tagName === "TEXTAREA")) {
//         return;
//     }

//     if (target.isContentEditable) {
//         handleContentEditableInput(target);
//     } else if (target.tagName === "INPUT" || target.tagName === "TEXTAREA") {
//         handleInputField(event, target as HTMLInputElement | HTMLTextAreaElement);
//     }
// }

// function handleContentEditableInput(target: HTMLElement) {
//     const selection = window.getSelection();
//     if (!selection || selection.rangeCount === 0) return;

//     const range = selection.getRangeAt(0);
//     const container = range.startContainer;

//     if (container.nodeType !== Node.TEXT_NODE) return;

//     const text = container.textContent || "";
//     const cursorPosition = range.startOffset;

//     const beforeCursor = text.slice(0, cursorPosition);
//     const afterCursor = text.slice(cursorPosition);

//     for (const trigger in snippets) {
//         if (beforeCursor.endsWith(trigger)) {
//             // Replacing
//             const updatedHTML = beforeCursor.replace(trigger, snippets[trigger]) + afterCursor;

//             // Create a temporary element to parse and inject HTML
//             const tempElement = document.createElement("div");
//             tempElement.innerHTML = updatedHTML;

//             // Replace the current content
//             const nodes = Array.from(tempElement.childNodes);
//             const parent = container.parentNode;
//             if (parent) {
//                 parent.replaceChild(document.createTextNode(beforeCursor.slice(0, -trigger.length)), container);
//                 nodes.forEach((node) => parent.appendChild(node));
//             }

//             console.log(`Snippet "${trigger}" replaced in contenteditable.`);
//             break;
//         }
//     }
// }

// function handleInputField(event: KeyboardEvent, target: HTMLInputElement | HTMLTextAreaElement) {
//     const value = target.value;
//     const cursorPosition = target.selectionStart || 0;

//     const beforeCursor = value.slice(0, cursorPosition);
//     const afterCursor = value.slice(cursorPosition);

//     for (const trigger in snippets) {
//         if (beforeCursor.endsWith(trigger)) {
//             const snippet = target.tagName === "TEXTAREA" && trigger === "-call" ? snippets["-plain-call"] : snippets[trigger];
//             const updatedText = beforeCursor.replace(trigger, snippet) + afterCursor;

//             target.value = updatedText;

//             const newCursorPosition = updatedText.length - afterCursor.length;
//             target.setSelectionRange(newCursorPosition, newCursorPosition);

//             console.log(`Snippet "${trigger}" replaced in input/textarea.`);
//             break;
//         }
//     }
// }

// // Attach listener for dynamic contenteditable fields
// function attachListenersToContentEditable() {
//     const editableElements = document.body.querySelectorAll(
//         'input, textarea, [contenteditable="true"]'
//     );

//     editableElements.forEach((element) => {
//         element.addEventListener("keydown", (event) => {
//             handleKeydown(event as KeyboardEvent);
//         });
//     });
// }

// // Monitor for dynamically added contenteditable fields
// function monitorDynamicContentEditable() {
//     const observer = new MutationObserver(() => {
//         attachListenersToContentEditable();
//     });

//     observer.observe(document.body, { childList: true, subtree: true });
// }

// // Start observing the document
// document.addEventListener("keydown", handleKeydown);

// //  function to attach the keydown listener to the cke_wysiwyg_div
// function attachCKEditorListeners(iframe: HTMLIFrameElement) {
//     try {
//         const iframeDocument = iframe.contentDocument || iframe.contentWindow?.document;
//         if (!iframeDocument) return;

//         const editableElement = iframeDocument.querySelector<HTMLElement>('.cke_wysiwyg_div');

//         if (editableElement) {
//             editableElement.addEventListener("keydown", (event) => {
//                 handleKeydown(event as KeyboardEvent);
//             });
//             console.log("Attached keydown listener to CKEditor");
//         } else {
//             console.log("CKEditor editable div not found");
//         }
//     } catch (err) {
//         console.warn("Unable to access iframe due to cross-origin restrictions.", err);
//     }
// }

// function attachCKEditorChangeListener(iframe: HTMLIFrameElement) {
//     try {
//         const iframeDocument = iframe.contentDocument || iframe.contentWindow?.document;
//         if (!iframeDocument) return;

//         // Find the CKEditor instance within the iframe
//         const ckEditorInstance = (iframe.contentWindow as any)?.CKEDITOR?.instances;

//         if (ckEditorInstance) {
//             for (const editorId in ckEditorInstance) {
//                 const editor = ckEditorInstance[editorId];
//                 if (editor) {
//                     editor.on('change', () => {
//                         console.log(`CKEditor instance "${editorId}" content changed.`);
//                         // You can call changeCKEditorBackgroundColor here if needed
//                         // For example: changeCKEditorBackgroundColor('lightgreen');
//                     });
//                     console.log(`Attached 'change' listener to CKEditor instance "${editorId}"`);
//                 }
//             }
//         }
//     } catch (err) {
//         console.warn("Unable to access iframe or CKEditor instance due to cross-origin restrictions.", err);
//     }
// }


// // Recursively attach listeners to nested iframes
// function attachListenersToAllIframes(parentDocument: Document = document) {
//     const iframes = parentDocument.querySelectorAll<HTMLIFrameElement>("iframe");
//     iframes.forEach((iframe) => {
//         attachCKEditorListeners(iframe);
//         attachCKEditorChangeListener(iframe);

//         // Attach listeners to nested iframes after load
//         iframe.addEventListener("load", () => {
//             const iframeDocument = iframe.contentDocument || iframe.contentWindow?.document;
//             if (iframeDocument) {
//                 attachListenersToAllIframes(iframeDocument);
//             }
//         });
//     });
// }

// // Monitor for dynamically added iframes
// function monitorDynamicIframes() {
//     const observer = new MutationObserver(() => {
//         attachListenersToAllIframes();
//     });

//     observer.observe(document.body, { childList: true, subtree: true });
// }

// // Initialize dynamic field monitoring
// monitorDynamicContentEditable();

// // Start observing the document
// document.addEventListener("DOMContentLoaded", () => {
//     console.log("Attaching listeners to iframes...");
//     attachListenersToAllIframes();
//     monitorDynamicIframes();
//     attachListenersToContentEditable(); // Initial attachment for outside iframe elements
// });

// /////////////////////////////////////////////////////////////////

// function changeCKEditorBackgroundColor(color: string) {
//     // Locate all iframes with CKEditor
//     const iframes = document.querySelectorAll<HTMLIFrameElement>('iframe.cke_wysiwyg_frame');

//     if (iframes.length === 0) {
//         console.error('No CKEditor iframe found.');
//         return;
//     }

//     // Iterate over the iframes and apply the background color
//     iframes.forEach((iframe) => {
//         try {
//             const iframeDoc = iframe.contentDocument || iframe.contentWindow?.document;
//             if (!iframeDoc) {
//                 console.warn('Unable to access iframe document.');
//                 return;
//             }

//             // Access the contenteditable area inside the iframe
//             const editableElement = iframeDoc.querySelector('[contenteditable="true"]');

//             if (editableElement) {
//                 // Change the background color of the contenteditable element
//                 (editableElement as HTMLElement).style.backgroundColor = color;

//                 console.log(`Background color changed to ${color} in CKEditor.`);
//             } else {
//                 console.error('No contenteditable element found inside the CKEditor iframe.');
//             }
//         } catch (err) {
//             console.warn('Error accessing iframe:', err);
//         }
//     });
// }

// // Example usage
// document.addEventListener('DOMContentLoaded', () => {
//     const newColor = 'yellow'; // Change this to the desired background color
//     changeCKEditorBackgroundColor(newColor);
// });