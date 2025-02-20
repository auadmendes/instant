// linkify.ts

// document.addEventListener("paste", (event: ClipboardEvent) => {
//     const clipboardData = event.clipboardData || (window as any).clipboardData;
//     const pastedText = clipboardData.getData("text");
//     // Basic URL regex; you can refine this if needed.
//     const urlRegex = /^(https?:\/\/)?([\da-z\.-]+\.[a-z\.]{2,6})([\/\w\.-]*)*\/?$/i;
//     if (urlRegex.test(pastedText)) {
//       event.preventDefault();
//       const selection = window.getSelection();
//       if (selection && selection.rangeCount > 0) {
//         const range = selection.getRangeAt(0);
//         let selectedText = range.toString().trim();
//         // If no text is selected, use the pasted URL as link text.
//         const linkText = selectedText || pastedText;
//         // Ensure the URL starts with http:// or https://
//         const url = /^https?:\/\//i.test(pastedText) ? pastedText : `https://${pastedText}`;
//         // Create the anchor element.
//         const anchor = document.createElement("a");
//         anchor.href = url;
//         anchor.textContent = linkText;
//         // Insert the anchor into the document.
//         range.deleteContents();
//         range.insertNode(anchor);
//         // Move the caret after the inserted link.
//         range.setStartAfter(anchor);
//         range.collapse(true);
//         selection.removeAllRanges();
//         selection.addRange(range);
//         console.log("Linkify: Inserted link", anchor);
//       }
//     }
//   });
  