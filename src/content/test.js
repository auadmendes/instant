"use strict";
// // Working
// // fine
// const snippets: { [trigger: string]: string } = {
//     "-sign": "Luciano | Docusign Customer Support <docusign.com>",
//     "-comment": `- [Matter] The client<br>
//   - [Action]<br>
//   - [Resource] N/A`,
//   };
//   // Handle input in contenteditable
//   function handleInput(event: KeyboardEvent) {
//     const target = event.target as HTMLElement;
//     if (target.isContentEditable) {
//       const selection = window.getSelection();
//       const cursorPosition = selection?.anchorOffset;
//       const value = target.innerHTML;
//       if (cursorPosition !== null) {
//         const words = value.split(" ");
//         const lastWord = words[words.length - 1];
//         if (snippets[lastWord]) {
//           words[words.length - 1] = snippets[lastWord];
//           target.innerHTML = words.join(" ");
//         }
//       }
//     }
//   }
//   document.addEventListener("input", handleInput);
//     // Handle contenteditable elements
//     function handleEditableInput(event: KeyboardEvent, target: HTMLElement) {
//       const selection = window.getSelection();
//       if (!selection || selection.rangeCount === 0) return;
//       const range = selection.getRangeAt(0);
//       const cursorPosition = range.endOffset;
//       const containerText = range.startContainer.textContent || "";
//       const textBeforeCursor = containerText.slice(0, cursorPosition);
//       const words = textBeforeCursor.split(" ");
//       const lastWord = words[words.length - 1];
//       if (snippets[lastWord]) {
//         words[words.length - 1] = snippets[lastWord];
//         const updatedText = words.join(" ");
//         range.startContainer.textContent = updatedText + containerText.slice(cursorPosition);
//         const newCursorPosition = updatedText.length;
//         selection.collapse(range.startContainer, newCursorPosition);
//       }
//     }
//     // Apply focus and blur styles for all applicable fields
//     function handleFocus(event: FocusEvent) {
//       const target = event.target as HTMLElement;
//       if (
//         target &&
//         (target.tagName === "INPUT" ||
//           target.tagName === "TEXTAREA" ||
//           target.getAttribute("contenteditable") === "true")
//       ) {
//         target.style.backgroundColor = "#ccc"; // Highlight focused element
//       }
//     }
//     function handleBlur(event: FocusEvent) {
//       const target = event.target as HTMLElement;
//       if (
//         target &&
//         (target.tagName === "INPUT" ||
//           target.tagName === "TEXTAREA" ||
//           target.getAttribute("contenteditable") === "true")
//       ) {
//         target.style.backgroundColor = ""; // Remove highlight on blur
//       }
//     }
//     // Add event listeners globally
//     document.addEventListener("keydown", handleInput);
//     document.addEventListener("focus", handleFocus, true);
//     document.addEventListener("blur", handleBlur, true);
//     // Gmail-specific handler
//     function waitForGmailFields() {
//       const observer = new MutationObserver(() => {
//         const subjectBox = document.querySelector('input[name="subjectbox"]');
//         const bodyDiv = document.querySelector('[aria-label="Corpo da mensagem"][contenteditable="true"]');
//         if (subjectBox) {
//           subjectBox.addEventListener("keydown", handleInput);
//           subjectBox.addEventListener("focus", handleFocus);
//           subjectBox.addEventListener("blur", handleBlur);
//         }
//         if (bodyDiv) {
//           bodyDiv.addEventListener("keydown", handleInput);
//           bodyDiv.addEventListener("focus", handleFocus);
//           bodyDiv.addEventListener("blur", handleBlur);
//         }
//         // Disconnect observer after adding the listeners
//         if (subjectBox && bodyDiv) {
//           observer.disconnect();
//         }
//       });
//       observer.observe(document.body, { childList: true, subtree: true });
//     }
//     // Initialize Gmail-specific handling
//     waitForGmailFields();
//    // Handle text input and textarea fields
//     // function handleTextInput(event: KeyboardEvent, target: HTMLInputElement | HTMLTextAreaElement) {
//     //   const cursorPosition = target.selectionStart;
//     //   const value = target.value;
//     //   if (cursorPosition !== null) {
//     //     const words = value.slice(0, cursorPosition).split(" ");
//     //     const lastWord = words[words.length - 1];
//     //     if (snippets[lastWord]) {
//     //       words[words.length - 1] = snippets[lastWord];
//     //       target.value = words.join(" ") + value.slice(cursorPosition);
//     //       const newCursorPosition = words.join(" ").length;
//     //       target.setSelectionRange(newCursorPosition, newCursorPosition);
//     //     }
//     //   }
//     // }
