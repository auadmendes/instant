
// const snippets: { [trigger: string]: string } = {
//     "#sign": "Luciano Horta & Jaquelaine Bueno Horta",
//   };
  
//   // Function to replace the trigger with the snippet
//   function handleInput(event: KeyboardEvent) {
//     const target = event.target as HTMLInputElement | HTMLTextAreaElement;
  
//     // Ensure the target is a valid text input or textarea
//     if (!target || !(target.tagName === "INPUT" || target.tagName === "TEXTAREA")) {
//       return;
//     }
  
//     const cursorPosition = target.selectionStart;
//     const value = target.value;
  
//     if (cursorPosition !== null) {
//       // Get the word before the cursor
//       const words = value.slice(0, cursorPosition).split(" ");
//       const lastWord = words[words.length - 1];
  
//       // Check if the last word matches a snippet trigger
//       if (snippets[lastWord]) {
//         // Replace the trigger with the snippet
//         words[words.length - 1] = snippets[lastWord];
//         target.value = words.join(" ") + value.slice(cursorPosition);
  
//         // Move the cursor to the end of the inserted snippet
//         const newCursorPosition = words.join(" ").length;
//         target.setSelectionRange(newCursorPosition, newCursorPosition);
//       }
//     }
//   }
  
//   // Listen for keydown events to check for triggers
//   document.addEventListener("keydown", handleInput);
  

//
//
//
//////////////////////////////////////////////////////


// const snippets: { [trigger: string]: string } = {
//     "-sign": "Luciano Horta & Jaquelaine Bueno Horta",
//   };
  
//   // Function to replace the trigger with the snippet
//   function handleInput(event: KeyboardEvent) {
//     const target = event.target as HTMLInputElement | HTMLTextAreaElement;
  
//     // Ensure the target is a valid text input or textarea
//     if (!target || !(target.tagName === "INPUT" || target.tagName === "TEXTAREA")) {
//       return;
//     }
  
//     const cursorPosition = target.selectionStart;
//     const value = target.value;
  
//     if (cursorPosition !== null) {
//       // Get the word before the cursor
//       const words = value.slice(0, cursorPosition).split(" ");
//       const lastWord = words[words.length - 1];
  
//       // Check if the last word matches a snippet trigger
//       if (snippets[lastWord]) {
//         // Replace the trigger with the snippet
//         words[words.length - 1] = snippets[lastWord];
//         target.value = words.join(" ") + value.slice(cursorPosition);
  
//         // Move the cursor to the end of the inserted snippet
//         const newCursorPosition = words.join(" ").length;
//         target.setSelectionRange(newCursorPosition, newCursorPosition);
//       }
//     }
//   }
  
//   // Function to handle focus on input fields
//   function handleFocus(event: FocusEvent) {
//     const target = event.target as HTMLInputElement | HTMLTextAreaElement;
//     if (target && (target.tagName === "INPUT" || target.tagName === "TEXTAREA")) {
//       target.style.backgroundColor = "pink";  // Change background color to pink on focus
//     }
//   }
  
//   // Function to handle blur on input fields
//   function handleBlur(event: FocusEvent) {
//     const target = event.target as HTMLInputElement | HTMLTextAreaElement;
//     if (target && (target.tagName === "INPUT" || target.tagName === "TEXTAREA")) {
//       target.style.backgroundColor = "";  // Reset background color on blur
//     }
//   }
  
//   // Listen for keydown events to check for triggers
//   document.addEventListener("keydown", handleInput);
  
//   // Listen for focus events to change background color
//   document.addEventListener("focus", handleFocus, true); // The "true" parameter ensures it works on child elements
  
//   // Listen for blur events to reset background color
//   document.addEventListener("blur", handleBlur, true); // The "true" parameter ensures it works on child elements
  
//   function waitForElement(selector: string, callback: (element: HTMLElement) => void) {
//     const observer = new MutationObserver((mutations) => {
//       for (const mutation of mutations) {
//         if (mutation.type === "childList") {
//           const element = document.querySelector(selector);
//           if (element) {
//             callback(element as HTMLElement);
//             observer.disconnect(); // Stop observing once the element is found
//           }
//         }
//       }
//     });
  
//     observer.observe(document.body, { childList: true, subtree: true });
//   }
  
//   waitForElement('input[name="subjectbox"]', (subjectBox) => {
//     subjectBox.addEventListener("keydown", handleInput);
//     subjectBox.addEventListener("focus", handleFocus);
//     subjectBox.addEventListener("blur", handleBlur);
//   });
  
//   function queryShadowDom(root: ShadowRoot | Document, selector: string): HTMLElement | null {
//     return root.querySelector(selector);
//   }
  
//   waitForElement('input[name="subjectbox"]', (subjectBox) => {
//     // Add event listeners as before
//   });
  


// Aqui está o que funciona no Gmail

// const snippets: { [trigger: string]: string } = {
//     "-sign": "Luciano Horta & Jaquelaine Bueno Horta",
//   };
  
//   // Function to replace the trigger with the snippet in contenteditable elements
//   function handleEditableInput(event: KeyboardEvent) {
//     const target = event.target as HTMLElement;
  
//     // Ensure the target is a valid contenteditable element
//     if (!target || target.getAttribute("contenteditable") !== "true") {
//       return;
//     }
  
//     const selection = window.getSelection();
//     if (!selection || selection.rangeCount === 0) return;
  
//     const range = selection.getRangeAt(0);
//     const cursorPosition = range.endOffset;
//     const containerText = range.startContainer.textContent || "";
  
//     // Get the text before the cursor
//     const textBeforeCursor = containerText.slice(0, cursorPosition);
//     const words = textBeforeCursor.split(" ");
//     const lastWord = words[words.length - 1];
  
//     // Check if the last word matches a snippet trigger
//     if (snippets[lastWord]) {
//       // Replace the trigger with the snippet
//       words[words.length - 1] = snippets[lastWord];
//       const updatedText = words.join(" ");
  
//       // Update the range with the new text
//       range.startContainer.textContent = updatedText + containerText.slice(cursorPosition);
//       const newCursorPosition = updatedText.length;
  
//       // Move the cursor to the end of the inserted snippet
//       selection.collapse(range.startContainer, newCursorPosition);
//     }
//   }
  
//   // Function to handle focus on contenteditable elements
//   function handleEditableFocus(event: FocusEvent) {
//     const target = event.target as HTMLElement;
//     if (target && target.getAttribute("contenteditable") === "true") {
//       target.style.backgroundColor = "pink"; // Change background color to pink on focus
//     }
//   }
  
//   // Function to handle blur on contenteditable elements
//   function handleEditableBlur(event: FocusEvent) {
//     const target = event.target as HTMLElement;
//     if (target && target.getAttribute("contenteditable") === "true") {
//       target.style.backgroundColor = ""; // Reset background color on blur
//     }
//   }
  
//   // Wait for the Gmail body to be available and add event listeners
//   function waitForGmailBody() {
//     const observer = new MutationObserver(() => {
//       const bodyDiv = document.querySelector('[aria-label="Corpo da mensagem"][contenteditable="true"]');
//       if (bodyDiv) {
//         bodyDiv.addEventListener("keydown", handleEditableInput);
//         bodyDiv.addEventListener("focus", handleEditableFocus);
//         bodyDiv.addEventListener("blur", handleEditableBlur);
//         observer.disconnect(); // Stop observing once the element is found
//       }
//     });
  
//     observer.observe(document.body, { childList: true, subtree: true });
//   }
  
//   // Initialize the script
//   waitForGmailBody();









// Working
// fine

// const snippets: { [trigger: string]: string } = {
//     "-sign": "Luciano Horta & Jaquelaine Bueno Horta",
//   };
  
//   // Function to handle input and contenteditable fields
//   function handleInput(event: KeyboardEvent) {
//     const target = event.target as HTMLElement;
  
//     if (!target) return;
  
//     if (target.tagName === "INPUT" || target.tagName === "TEXTAREA") {
//       handleTextInput(event, target as HTMLInputElement | HTMLTextAreaElement);
//     } else if (target.getAttribute("contenteditable") === "true") {
//       handleEditableInput(event, target);
//     }
//   }
  
//   // Handle text input and textarea fields
//   function handleTextInput(event: KeyboardEvent, target: HTMLInputElement | HTMLTextAreaElement) {
//     const cursorPosition = target.selectionStart;
//     const value = target.value;
  
//     if (cursorPosition !== null) {
//       const words = value.slice(0, cursorPosition).split(" ");
//       const lastWord = words[words.length - 1];
  
//       if (snippets[lastWord]) {
//         words[words.length - 1] = snippets[lastWord];
//         target.value = words.join(" ") + value.slice(cursorPosition);
  
//         const newCursorPosition = words.join(" ").length;
//         target.setSelectionRange(newCursorPosition, newCursorPosition);
//       }
//     }
//   }
  
//   // Handle contenteditable elements
//   function handleEditableInput(event: KeyboardEvent, target: HTMLElement) {
//     const selection = window.getSelection();
//     if (!selection || selection.rangeCount === 0) return;
  
//     const range = selection.getRangeAt(0);
//     const cursorPosition = range.endOffset;
//     const containerText = range.startContainer.textContent || "";
  
//     const textBeforeCursor = containerText.slice(0, cursorPosition);
//     const words = textBeforeCursor.split(" ");
//     const lastWord = words[words.length - 1];
  
//     if (snippets[lastWord]) {
//       words[words.length - 1] = snippets[lastWord];
//       const updatedText = words.join(" ");
  
//       range.startContainer.textContent = updatedText + containerText.slice(cursorPosition);
//       const newCursorPosition = updatedText.length;
  
//       selection.collapse(range.startContainer, newCursorPosition);
//     }
//   }
  
//   // Apply focus and blur styles for all applicable fields
//   function handleFocus(event: FocusEvent) {
//     const target = event.target as HTMLElement;
//     if (
//       target &&
//       (target.tagName === "INPUT" ||
//         target.tagName === "TEXTAREA" ||
//         target.getAttribute("contenteditable") === "true")
//     ) {
//       target.style.backgroundColor = "#ccc"; // Highlight focused element
//     }
//   }
  
//   function handleBlur(event: FocusEvent) {
//     const target = event.target as HTMLElement;
//     if (
//       target &&
//       (target.tagName === "INPUT" ||
//         target.tagName === "TEXTAREA" ||
//         target.getAttribute("contenteditable") === "true")
//     ) {
//       target.style.backgroundColor = ""; // Remove highlight on blur
//     }
//   }
  
//   // Add event listeners globally
//   document.addEventListener("keydown", handleInput);
//   document.addEventListener("focus", handleFocus, true);
//   document.addEventListener("blur", handleBlur, true);
  
//   // Gmail-specific handler
//   function waitForGmailFields() {
//     const observer = new MutationObserver(() => {
//       const subjectBox = document.querySelector('input[name="subjectbox"]');
//       const bodyDiv = document.querySelector('[aria-label="Corpo da mensagem"][contenteditable="true"]');
  
//       if (subjectBox) {
//         subjectBox.addEventListener("keydown", handleInput);
//         subjectBox.addEventListener("focus", handleFocus);
//         subjectBox.addEventListener("blur", handleBlur);
//       }
  
//       if (bodyDiv) {
//         bodyDiv.addEventListener("keydown", handleInput);
//         bodyDiv.addEventListener("focus", handleFocus);
//         bodyDiv.addEventListener("blur", handleBlur);
//       }
  
//       // Disconnect observer after adding the listeners
//       if (subjectBox && bodyDiv) {
//         observer.disconnect();
//       }
//     });
  
//     observer.observe(document.body, { childList: true, subtree: true });
//   }
  
//   // Initialize Gmail-specific handling
//   waitForGmailFields();
  

const snippets: { [trigger: string]: string } = {
    "-sign": "Luciano Horta & Jaquelaine Bueno Horta",
  };
  
  // Function to process text inputs or contenteditable elements
  function processInput(target: HTMLElement, cursorPosition: number | null) {
    if (!cursorPosition) return;
  
    let value = target.textContent || target.value || "";
    const words = value.slice(0, cursorPosition).split(" ");
    const lastWord = words[words.length - 1];
  
    if (snippets[lastWord]) {
      words[words.length - 1] = snippets[lastWord];
      const newText = words.join(" ") + value.slice(cursorPosition);
  
      if (target instanceof HTMLInputElement || target instanceof HTMLTextAreaElement) {
        target.value = newText;
        target.setSelectionRange(words.join(" ").length, words.join(" ").length);
      } else if (target.isContentEditable) {
        target.textContent = newText;
        const selection = window.getSelection();
        if (selection) {
          const range = document.createRange();
          range.setStart(target.firstChild || target, words.join(" ").length);
          range.collapse(true);
          selection.removeAllRanges();
          selection.addRange(range);
        }
      }
    }
  }
  
  // Function to handle keydown events
  function handleKeydown(event: KeyboardEvent) {
    const target = event.target as HTMLElement;
    const cursorPosition =
      target instanceof HTMLInputElement || target instanceof HTMLTextAreaElement
        ? (target as HTMLInputElement).selectionStart
        : window.getSelection()?.getRangeAt(0).endOffset;
  
    processInput(target, cursorPosition);
  }
  
  // Function to find elements, including inside shadow DOM
  function queryAllDeep(selector: string, root: Document | ShadowRoot = document): HTMLElement[] {
    const elements = Array.from(root.querySelectorAll<HTMLElement>(selector));
    const shadowElements: HTMLElement[] = [];
  
    elements.forEach((element) => {
      if (element.shadowRoot) {
        shadowElements.push(...queryAllDeep(selector, element.shadowRoot));
      }
    });
  
    return [...elements, ...shadowElements];
  }
  
  // Attach listeners dynamically
  function attachListeners() {
    const inputs = queryAllDeep("input, textarea, [contenteditable='true']");
    inputs.forEach((input) => {
      input.addEventListener("keydown", handleKeydown, { capture: true });
    });
  }
  
  // Use a MutationObserver to detect dynamic changes
  function observeDynamicChanges() {
    const observer = new MutationObserver(() => {
      attachListeners();
    });
  
    observer.observe(document.body, { childList: true, subtree: true });
  }
  
  // Initialize the script
  document.addEventListener("DOMContentLoaded", () => {
    attachListeners();
    observeDynamicChanges();
  });
  