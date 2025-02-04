/**
 * Utility function to escape special regex characters in a string.
 */
function escapeRegExp(string) {
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
//////////////////////////
// function replaceSnippetsInSalesforceIframe(): void {
//   Check if the extension context is still valid
//   if (!chrome || !chrome.storage || !chrome.storage.local) {
//     console.error("Chrome extension context invalidated.");
//     return;
//   }
//   Retrieve the templates/snippets from Chrome storage
//   chrome.storage.local.get("templatesData", (data) => {
//     if (chrome.runtime.lastError) {
//       console.error("Error accessing Chrome storage:", chrome.runtime.lastError);
//       return;
//     }
//     const templatesArray = data.templatesData || [];
//     Convert the array into a key-value mapping: trigger => snippet (plain text)
//     const snippets = templatesArray.reduce(
//       (acc: { [trigger: string]: string }, item: { name: string | number; template: OutputData }) => {
//         Extract the text from the template
//         const templateText = item.template.blocks
//           .map((block: { data: { text: string } }) => block.data.text)
//           .join(' ')
//           .replace(/&nbsp;/g, ' ');
//         acc[item.name] = templateText;
//         return acc;
//       },
//       {} as { [trigger: string]: string }
//     );
//     Select all CKEditor iframes by class name (for Salesforce)
//     const iframes = document.querySelectorAll<HTMLIFrameElement>('.cke_wysiwyg_frame');
//     if (!iframes || iframes.length === 0) {
//       return;
//     }
//     iframes.forEach((iframe) => {
//       if (!iframe || !iframe.contentDocument || !iframe.contentDocument.body) {
//         console.warn("Iframe or iframe body not found.");
//         return;
//       }
//       Get the body of the iframe
//       const iframeBody = iframe.contentDocument.body;
//       Optional: add a border for visual debugging
//       iframeBody.style.border = "1px solid gray";
//       Get the current HTML content of the iframe
//       const contentIframe = iframeBody.innerHTML;
//       Replace all occurrences of snippet triggers
//       let updatedContent = contentIframe;
//       for (const trigger in snippets) {
//         const snippet = snippets[trigger];
//         const regex = new RegExp(escapeRegExp(trigger), "g");
//         updatedContent = updatedContent.replace(regex, snippet);
//       }
//       Only update the iframe content if changes occurred
//       if (contentIframe !== updatedContent) {
//         iframeBody.innerHTML = updatedContent;
//         Dispatch an input event so the editor recognizes the change.
//         const inputEvent = new Event("input", { bubbles: true });
//         iframeBody.dispatchEvent(inputEvent);
//         Place the cursor at the end of the iframe's content (if possible)
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
//         console.log("Replaced content in CKEditor iframe, dispatched input event, and moved cursor to the end.");
//       }
//     });
//   });
// }
//setInterval(replaceSnippetsInSalesforceIframe, 600);
//frame src="" frameborder="0" class="cke_wysiwyg_frame cke_reset" title="Email Body" aria-describedby="cke_48" tabindex="0" allowtransparency="true" style="width: 100%; height: 100%;"></iframe>
/////////////////////
/**
* Escapes special characters in a string to safely create a RegExp.
*/
/**
 * Replaces snippet triggers (like "-test") in Salesforce’s CKEditor iframes
 * by retrieving the snippets from Chrome storage, updating the iframe’s content,
 * and dispatching an input event to ensure the internal editor model updates.
 */
// declare global {
//   interface Window {
//     CKEDITOR: any;
//   }
// }
// function waitForCKEditor(callback: () => void) {
//   const interval = setInterval(() => {
//     if (typeof window !== "undefined" && "CKEDITOR" in window && window.CKEDITOR.instances) {
//       clearInterval(interval);
//       callback();
//     }
//   }, 500);
// }
// function replaceSnippetsInCKEditor() {
//   if (!window.CKEDITOR) {
//     console.warn("CKEditor is not loaded yet.");
//     return;
//   }
//   chrome.storage.local.get("templatesData", (data) => {
//     if (chrome.runtime.lastError) {
//       console.error("Error accessing Chrome storage:", chrome.runtime.lastError);
//       return;
//     }
//     const templatesArray = data.templatesData || [];
//     const snippets = templatesArray.reduce(
//       (acc: { [trigger: string]: string }, item: { name: string; template: { blocks: { data: { text: string } }[] } }) => {
//         const templateText = item.template.blocks
//           .map((block: { data: { text: string } }) => block.data.text)
//           .join(" ")
//           .replace(/&nbsp;/g, " ");
//         acc[item.name] = templateText;
//         return acc;
//       },
//       {} as { [trigger: string]: string }
//     );
//     Object.keys(window.CKEDITOR.instances).forEach((instanceName) => {
//       const editor = window.CKEDITOR.instances[instanceName];
//       if (!editor || !editor.getData) return;
//       let content = editor.getData();
//       let updatedContent = content;
//       for (const trigger in snippets) {
//         const snippet = snippets[trigger];
//         const regex = new RegExp(escapeRegExp(trigger), "g");
//         updatedContent = updatedContent.replace(regex, snippet);
//       }
//       if (content !== updatedContent) {
//         editor.setData(updatedContent);
//         console.log(`Snippets replaced in CKEditor instance: ${instanceName}`);
//       }
//     });
//   });
// }
// waitForCKEditor(() => {
//   console.log("CKEditor is ready!");
//   replaceSnippetsInCKEditor();
// });
// waitForCKEditor(() => {
//   console.log("✅ CKEditor detected!", window.CKEDITOR.instances);
//   replaceSnippetsInCKEditor();
// });
/////////
// chrome.storage.local.get("templatesData", (data) => {
//   console.log("📂 Retrieved Snippets:", data.templatesData);
//   if (!data.templatesData || data.templatesData.length === 0) {
//     console.warn("⚠️ No snippets found in Chrome storage.");
//     return;
//   }
//   const templatesArray = data.templatesData || [];
//   const snippets = templatesArray.reduce(
//     (acc: { [trigger: string]: string }, item: { name: string; template: { blocks: { data: { text: string } }[] } }) => {
//       const templateText = item.template.blocks
//         .map((block: { data: { text: string } }) => block.data.text)
//         .join(" ")
//         .replace(/&nbsp;/g, " ");
//       acc[item.name] = templateText;
//       return acc;
//     },
//     {} as { [trigger: string]: string }
//   );
//   // Add missing closing bracket here 👇
// });
//old
// function replaceSnippetsInSalesforceIframe(): void {
//   if (!chrome || !chrome.storage || !chrome.storage.local) {
//       //console.error("❌ Chrome extension context invalidated.");
//       return;
//   }
//   chrome.storage.local.get("templatesData")
//       .then((data) => {
//           if (chrome.runtime.lastError) {
//              // console.error("❌ Error accessing Chrome storage:", chrome.runtime.lastError);
//               return;
//           }
//           const templatesArray = data.templatesData || [];
//          // console.log("📂 Retrieved Snippets:", templatesArray);
//           const snippets = templatesArray.reduce((acc: { [trigger: string]: string }, item: { name: string; template: OutputData }) => {
//               if (!item.template || !item.template.blocks) {
//                 //  console.warn(`⚠️ Template for ${item.name} is missing blocks or is malformed.`);
//                   return acc;
//               }
//               const templateText = item.template.blocks
//                   .map((block) => block.data?.text || "")
//                   .join(" ")
//                   .replace(/&nbsp;/g, " ");
//               acc[item.name] = templateText;
//               return acc;
//           }, {} as { [trigger: string]: string });
//           const editors = document.querySelectorAll<HTMLElement>(
//               '.cke_wysiwyg_frame iframe, .cke_wysiwyg_frame, .ql-editor, .slds-rich-text-area__content, iframe[title="Rich text editor"]'
//           );
//           if (!editors.length) {
//              // console.warn("⚠️ No rich text editor found.");
//               return;
//           }
//           editors.forEach((editorElement) => {
//               let editor: HTMLElement | null = editorElement;
//               if (editorElement instanceof HTMLIFrameElement) {
//                   const iframeBody = editorElement.contentDocument?.querySelector('body'); // Get body
//                   if (iframeBody) { // Check if iframeBody is not null or undefined
//                     editor = iframeBody;
//                   } else {
//                      // console.warn("⚠️ Could not find editor body inside iframe.");
//                       return;
//                   }
//               } else {
//                   editor = editorElement;
//               }
//              // console.log("📝 Found Editor:", editor);
//               if (!editor || !editor.isContentEditable) {
//                 //  console.warn("⚠️ Target is not contentEditable or editor is null.");
//                   return;
//               }
//               const contentBefore = editor.innerHTML;
//             //  console.log("🔍 Before Replacement:", contentBefore);
//               let updatedContent = contentBefore;
//               for (const trigger in snippets) {
//                   const snippet = snippets[trigger];
//                   const regex = new RegExp(escapeRegExp(trigger), "g");
//                   updatedContent = updatedContent.replace(regex, snippet);
//               }
//               if (contentBefore === updatedContent) {
//                 //  console.log("⏭️ No changes detected.");
//                   return;
//               }
//               editor.innerHTML = updatedContent;
//              // console.log("✅ After Replacement:", updatedContent);
//               const inputEvent = new Event("input", { bubbles: true });
//               editor.dispatchEvent(inputEvent);
//               const changeEvent = new Event("change", { bubbles: true });
//               editor.dispatchEvent(changeEvent);
//             //  console.log("🔄 Dispatched input and change events to notify editor.");
//               editor?.focus(); // Use optional chaining here as well
//               const range = document.createRange();
//               range.selectNodeContents(editor!); // Non-null assertion since we've checked above
//               range.collapse(false);
//               const selection = window.getSelection();
//               selection?.removeAllRanges();
//               selection?.addRange(range);
//             //  console.log("📌 Moved cursor to end.");
//           });
//       })
//       .catch((error) => {
//          // console.error("❌ Error getting templates from storage:", error);
//       });
// }
// setInterval(replaceSnippetsInSalesforceIframe, 1000);
function replaceSnippetsInSalesforceIframe() {
    var _a;
    console.log("🔍 Looking for Salesforce editor...");
    const editorSelectors = [
        '.ql-editor', // Quill Editor (Salesforce Rich Text Editor)
        '.slds-rich-text-area__content', // Salesforce RTE
        'iframe[title="Rich text editor"]', // CKEditor in iframe
        '.cke_wysiwyg_frame iframe', // CKEditor (if inside iframe)
        '.cke_wysiwyg_frame', // CKEditor (direct)
    ];
    // Find the editor
    let editor = document.querySelector(editorSelectors.join(", "));
    // If inside an iframe, find the body
    if (editor instanceof HTMLIFrameElement) {
        editor = ((_a = editor.contentDocument) === null || _a === void 0 ? void 0 : _a.querySelector("body")) || null;
    }
    if (!editor) {
        console.warn("⚠️ No Salesforce editor found.");
        return;
    }
    console.log("✅ Salesforce editor found:", editor);
    function applySnippets() {
        chrome.storage.local.get("templatesData").then((data) => {
            const templatesArray = data.templatesData || [];
            const snippets = templatesArray.reduce((acc, item) => {
                const templateText = item.template.blocks
                    .map((block) => { var _a; return ((_a = block.data) === null || _a === void 0 ? void 0 : _a.text) || ""; })
                    .join(" ")
                    .replace(/&nbsp;/g, " ");
                acc[item.name] = templateText;
                return acc;
            }, {});
            if (!editor)
                return;
            let updatedContent = editor.innerHTML;
            for (const trigger in snippets) {
                const snippet = snippets[trigger];
                const regex = new RegExp(escapeRegExp(trigger), "g");
                updatedContent = updatedContent.replace(regex, snippet);
            }
            if (editor.innerHTML !== updatedContent) {
                console.log(`✏️ Replacing snippet:`, editor.innerHTML, "→", updatedContent);
                editor.innerHTML = updatedContent;
                editor.dispatchEvent(new Event("input", { bubbles: true }));
                moveCursorToEnd(editor);
            }
        }).catch(console.error);
    }
    // Watch for changes in the editor
    const observer = new MutationObserver(() => applySnippets());
    observer.observe(editor, { childList: true, subtree: true });
    console.log("👀 Started observing the Salesforce editor.");
}
// Ensures the cursor moves to the end after replacing text
function moveCursorToEnd(editor) {
    const range = document.createRange();
    range.selectNodeContents(editor);
    range.collapse(false);
    const selection = window.getSelection();
    selection === null || selection === void 0 ? void 0 : selection.removeAllRanges();
    selection === null || selection === void 0 ? void 0 : selection.addRange(range);
}
// Use setTimeout to wait for the editor to load first
setTimeout(() => {
    replaceSnippetsInSalesforceIframe();
}, 2000);
export {};
