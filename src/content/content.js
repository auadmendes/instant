"use strict";
// import { OutputData } from "@editorjs/editorjs";
// /**
//  * Retrieves the snippets from Chrome storage and converts them to a key-value map.
//  */
// function getSnippets(callback: (snippets: { [trigger: string]: string }) => void): void {
//   chrome.storage.local.get("templatesData", (data) => {
//     const templatesArray = data.templatesData || [];
//     const snippets = templatesArray.reduce((acc: { [x: string]: any; }, item: { name: string | number; template: any; }) => {
//       acc[item.name] = item.template;
//       return acc;
//     }, {} as { [trigger: string]: string });
//     callback(snippets);
//   });
// }
// /**
//  * Handler for keydown events.
//  * It delegates to contenteditable or input/textarea handlers depending on the event target.
//  */
// // function handleKeydown(event: KeyboardEvent, target: HTMLElement): void {
// //   if (!target) return;
// //   if (target.isContentEditable) {
// //     // For contenteditable elements, retrieve snippets first.
// //     getSnippets((snippets) => {
// //       handleContentEditableInput(target, snippets);
// //     });
// //   } else if (target.tagName === "INPUT" || target.tagName === "TEXTAREA") {
// //     // For inputs and textareas, call your existing function (which retrieves snippets on its own).
// //     handleInputField(event, target as HTMLInputElement | HTMLTextAreaElement);
// //   }
// // }
// function handleInputField(event: KeyboardEvent, target: HTMLInputElement | HTMLTextAreaElement | HTMLElement): void {
//   chrome.storage.local.get("templatesData", (data) => {
//     const templatesArray = data.templatesData || [];
//     console.log("This is the DATA: ", data)
//     // Convert array to a key-value object for easier lookup
//     const snippets = templatesArray.reduce((acc: { [key: string]: string }, item: { name: string; template: OutputData }) => {
//       // Extract only the plain text for input fields (remove HTML tags but preserve breaks as \n)
//       const templatePlainText = item.template.blocks
//         .map((block: { data: { text: string } }) => block.data.text)
//         .join(" ") // Join all text blocks into a single string
//         .replace(/&nbsp;/g, " ") // Replace non-breaking space HTML entity with a regular space
//         .replace(/<br>/g, '\n') // Replace <br> with \n for input/textarea
//         .replace(/<[^>]+>/g, ''); // Remove all HTML tags (for plain text)
//       // Extract HTML for contentEditable
//       const templateHTML = item.template.blocks
//         .map((block: { data: { text: string } }) => block.data.text)
//         .join(" "); // Keep as HTML if needed for contentEditable
//       acc[item.name] = target instanceof HTMLInputElement || target instanceof HTMLTextAreaElement
//         ? templatePlainText // Store plain text for input fields
//         : templateHTML; // Store HTML for contentEditable
//       return acc;
//     }, {} as { [key: string]: string });
//     let value = target instanceof HTMLInputElement || target instanceof HTMLTextAreaElement ? target.value : target.innerHTML;
//     const cursorPosition = (target instanceof HTMLInputElement || target instanceof HTMLTextAreaElement) ? (target.selectionStart || 0) : 0;
//     const beforeCursor = value.slice(0, cursorPosition);
//     const afterCursor = value.slice(cursorPosition);
//     for (const trigger in snippets) {
//       if (beforeCursor.endsWith(trigger)) {
//         const snippet = snippets[trigger];
//         if (target instanceof HTMLInputElement || target instanceof HTMLTextAreaElement) {
//           // Replace <br> with \n in input/textarea
//           const updatedText = beforeCursor.replace(trigger, snippet) + afterCursor;
//           target.value = updatedText;
//           // Restore cursor position
//           const newCursorPosition = updatedText.length;
//           target.setSelectionRange(newCursorPosition, newCursorPosition);
//         } else if (target instanceof HTMLElement && target.isContentEditable) {
//           // Replace \n with <br> in contentEditable (to preserve line breaks in HTML)
//           const updatedHTML = beforeCursor.replace(trigger, snippet).replace(/\n/g, "<br>") + afterCursor;
//           target.innerHTML = updatedHTML;
//           // Restore cursor position in contentEditable
//           const range = window.getSelection()?.getRangeAt(0);
//           if (range && target.firstChild) {
//             range.setStart(target.firstChild, updatedHTML.length); // Set cursor to the end of the updated text
//             range.setEnd(target.firstChild, updatedHTML.length);
//             const selection = window.getSelection();
//             selection?.removeAllRanges();
//             selection?.addRange(range);
//           }
//         }
//         console.log(`Snippet "${trigger}" replaced from storage.`);
//         break;
//       }
//     }
//   });
// }
// /**
//  * Handler for contenteditable elements.
//  * It uses the current selection, and if the text immediately before the cursor ends with a snippet trigger,
//  * replaces that trigger with the corresponding snippet.
//  */
// // function handleContentEditableInput(target: HTMLElement, snippets: { [trigger: string]: string }): void {
// //   const selection = window.getSelection();
// //   if (!selection || selection.rangeCount === 0) return;
// //   const range = selection.getRangeAt(0);
// //   const container = range.startContainer;
// //   // Ensure we're working with a text node.
// //   if (container.nodeType !== Node.TEXT_NODE) return;
// //   const text = container.textContent || "";
// //   const cursorPosition = range.startOffset;
// //   const beforeCursor = text.slice(0, cursorPosition);
// //   const afterCursor = text.slice(cursorPosition);
// //   for (const trigger in snippets) {
// //     if (beforeCursor.endsWith(trigger)) {
// //       const snippet = snippets[trigger];
// //       // Remove the trigger and insert the snippet.
// //       const newText = beforeCursor.slice(0, -trigger.length) + snippet + afterCursor;
// //       container.textContent = newText;
// //       // Calculate new cursor position.
// //       const newCursorPosition = (beforeCursor.slice(0, -trigger.length) + snippet).length;
// //       // Update the selection to be at the new cursor position.
// //       const newRange = document.createRange();
// //       newRange.setStart(container, newCursorPosition);
// //       newRange.collapse(true);
// //       selection.removeAllRanges();
// //       selection.addRange(newRange);
// //       console.log(`Snippet "${trigger}" replaced in contenteditable.`);
// //       break;
// //     }
// //   }
// // }
// // Global keydown listener that delegates based on the target type.
// document.addEventListener("keydown", (event) => {
//   const target = event.target as HTMLElement;
//   if (target instanceof HTMLInputElement || target instanceof HTMLTextAreaElement || target.isContentEditable) {
//     handleInputField(event, target);
//   }
// });
