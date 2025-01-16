const snippets: { [trigger: string]: string } = {
  "-sign": "Luciano | Docusign Customer Support <docusign.com>",
  "-comment": `
  - [Matter] The client<br>
  - [Action]<br>
  - [Resource] N/A`,
  "-call": `If you'd like to schedule a meeting, you can use my calendar link to pick a time that works for you: <a href="https://calendly.com/your-link" target="_blank">Calendly link</a>.`,
};


// Handle input in the contenteditable field
function handleContentEditableInput(event: KeyboardEvent) {
  const target = event.target as HTMLElement;
  const selection = window.getSelection();

  if (!selection || !selection.rangeCount) return;

  const range = selection.getRangeAt(0);
  const cursorPosition = range.startOffset;
  const container = range.startContainer;

  const text = container.textContent || "";
  const beforeCursor = text.slice(0, cursorPosition);
  const afterCursor = text.slice(cursorPosition);

  for (const trigger in snippets) {
    if (beforeCursor.includes(trigger)) {
      const updatedText = beforeCursor.replace(trigger, snippets[trigger]) + afterCursor;

      container.textContent = updatedText;

      // Update cursor position
      const newCursorPosition =
        beforeCursor.length - trigger.length + snippets[trigger].length;
      range.setStart(container, newCursorPosition);
      range.setEnd(container, newCursorPosition);
      selection.removeAllRanges();
      selection.addRange(range);

      break;
    }
  }
}

// General Input Handler
function handleInput(event: KeyboardEvent) {
  const target = event.target as HTMLElement;

  // Handle standard input and textarea fields
  if (target.tagName === "INPUT" || target.tagName === "TEXTAREA") {
    processSnippetForInput(target as HTMLInputElement | HTMLTextAreaElement);
  }

  // Handle contenteditable fields
  if (target.isContentEditable) {
    processSnippetForContentEditable(target);
  }
}

// Process snippets for standard inputs
function processSnippetForInput(target: HTMLInputElement | HTMLTextAreaElement) {
  const cursorPosition = target.selectionStart || 0;
  const value = target.value;

  const beforeCursor = value.slice(0, cursorPosition);
  const afterCursor = value.slice(cursorPosition);

  // Check for a snippet trigger in the text before the cursor
  for (const trigger in snippets) {
    if (beforeCursor.includes(trigger)) {
      const updatedText = beforeCursor.replace(trigger, snippets[trigger]) + afterCursor;
      target.value = updatedText;

      // Move cursor to the end of the inserted snippet
      const newCursorPosition = updatedText.indexOf(snippets[trigger]) + snippets[trigger].length;
      target.setSelectionRange(newCursorPosition, newCursorPosition);
      break;
    }
  }
}

// Process snippets for contenteditable fields
function processSnippetForContentEditable(target: HTMLElement) {
  const selection = window.getSelection();
  if (!selection || selection.rangeCount === 0) return;

  const range = selection.getRangeAt(0);
  const container = range.startContainer;
  const cursorPosition = range.startOffset;

  const text = container.textContent || "";
  const beforeCursor = text.slice(0, cursorPosition);
  const afterCursor = text.slice(cursorPosition);

  // Check for a snippet trigger in the text before the cursor
  for (const trigger in snippets) {
    if (beforeCursor.includes(trigger)) {
      const updatedText = beforeCursor.replace(trigger, snippets[trigger]) + afterCursor;

      container.textContent = updatedText;

      // Update cursor position
      const newCursorPosition =
        beforeCursor.length - trigger.length + snippets[trigger].length;
      range.setStart(container, newCursorPosition);
      range.setEnd(container, newCursorPosition);
      selection.removeAllRanges();
      selection.addRange(range);

      break;
    }
  }
}

// Focus and Blur Styles
function handleFocus(event: FocusEvent) {
  const target = event.target as HTMLElement;
  if (
    target &&
    (target.tagName === "INPUT" ||
      target.tagName === "TEXTAREA" ||
      target.getAttribute("contenteditable") === "true")
  ) {
    target.style.backgroundColor = "#ccc";
  }
}

function handleBlur(event: FocusEvent) {
  const target = event.target as HTMLElement;
  if (
    target &&
    (target.tagName === "INPUT" ||
      target.tagName === "TEXTAREA" ||
      target.getAttribute("contenteditable") === "true")
  ) {
    target.style.backgroundColor = "";
  }
}

// Gmail-specific handling
function waitForGmailFields() {
  const observer = new MutationObserver(() => {
    const subjectBox = document.querySelector('input[name="subjectbox"]');
    const bodyDiv = document.querySelector('[aria-label="Corpo da mensagem"][contenteditable="true"]');

    if (subjectBox) {
      subjectBox.addEventListener("keydown", handleInput);
      subjectBox.addEventListener("focus", handleFocus);
      subjectBox.addEventListener("blur", handleBlur);
    }

    if (bodyDiv) {
      bodyDiv.addEventListener("keydown", handleInput);
      bodyDiv.addEventListener("focus", handleFocus);
      bodyDiv.addEventListener("blur", handleBlur);
    }

    // Disconnect observer after adding listeners
    if (subjectBox && bodyDiv) {
      observer.disconnect();
    }
  });

  observer.observe(document.body, { childList: true, subtree: true });
}

// Salesforce-specific handling
function waitForSalesforceFields() {
  let listenersAdded = false;

  const observer = new MutationObserver(() => {
    const replyBox = document.querySelector(
      'body[contenteditable="true"][aria-label="Email Body"]'
    );

    if (replyBox && !listenersAdded) {
      replyBox.addEventListener("keydown", handleInput);
      replyBox.addEventListener("focus", handleFocus);
      replyBox.addEventListener("blur", handleBlur);

      listenersAdded = true;
      observer.disconnect();
    }
  });

  observer.observe(document.body, { childList: true, subtree: true });
}

// Global Event Listeners
document.addEventListener("keydown", handleInput);
document.addEventListener("focus", handleFocus, true);
document.addEventListener("blur", handleBlur, true);

// Initialize Gmail-specific handling
waitForGmailFields();

// Initialize Salesforce-specific handling
waitForSalesforceFields();
