"use strict";

// Function to copy text and store it in Chrome Storage
function copyToClipboard(text: string): void {
    if (!text.trim()) return; // Ignore empty copies
  
    chrome.storage.local.get({ copiedItems: [] }, (data) => {
      const copiedItems: string[] = data.copiedItems || [];
      copiedItems.push(text); // Store text without extra commas
  
      chrome.storage.local.set({ copiedItems }, () => {
        console.log(`Copied: "${text}"`);
      });
    });
  }
  

// Function to retrieve and paste stored text
function pasteClipboard(): void {
    chrome.storage.local.get("copiedItems", (data) => {
      const copiedItems: string[] = data.copiedItems || [];
  
      if (copiedItems.length === 0) {
        console.log("Clipboard is empty.");
        return;
      }
  
      // Join texts correctly with ", " instead of spaces before commas
      const aggregatedText = copiedItems.join(", ");
  
      chrome.storage.local.set({ copiedItems: [] }, () => {
        console.log("Clipboard cleared after pasting.");
      });
  
      const activeElement = document.activeElement as HTMLInputElement | HTMLTextAreaElement;
      
      if (activeElement && (activeElement.tagName === "INPUT" || activeElement.tagName === "TEXTAREA")) {
        const start = activeElement.selectionStart || 0;
        const end = activeElement.selectionEnd || 0;
        activeElement.value =
          activeElement.value.substring(0, start) +
          aggregatedText +
          activeElement.value.substring(end);
        activeElement.selectionStart = activeElement.selectionEnd = start + aggregatedText.length;
      } else {
        // Paste in contentEditable or the document body
        document.execCommand("insertText", false, aggregatedText);
      }
  
      console.log("Pasted:", aggregatedText);
    });
  }
  

// Listen for Ctrl + Shift + C to copy
document.addEventListener("keydown", (event: KeyboardEvent) => {
    if (event.ctrlKey && event.shiftKey && event.key.toLowerCase() === "c") {
      event.preventDefault(); // Prevent Chrome DevTools from opening
      event.stopPropagation(); // Ensure no other listeners interfere
  
      const selection = window.getSelection();
      if (selection && selection.toString().trim().length > 0) {
        copyToClipboard(selection.toString());
        console.log("Copied using Ctrl + Shift + C");
      }
    }
  });
  
  

// Listen for Ctrl + Shift + V to paste
document.addEventListener("keydown", (event: KeyboardEvent) => {
  if (event.ctrlKey && event.shiftKey && event.key.toLowerCase() === "v") {
    event.preventDefault();
    pasteClipboard();
  }
});
