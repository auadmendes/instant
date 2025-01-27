const snippets: { [trigger: string]: string } = {
  "-sign": `Best regards,\nLuciano | Docusign Customer\nSupport docusign.com`,
  "-com": `- [Matter] The client\n- [Action]\n- [Resource] N/A`,
  "-com-html": `<p>- [Matter] The client</br>- [Action]</br>- [Resource] N/A</p>`,
  "-call": `<i>If you'd like to schedule a meeting, you can use my calendar link to pick a time that works for you: <a href="https://calendly.com/luciano-docusign/30min" target="_blank" rel="noopener noreferrer">Calendly link</a>.</i>`,
  "-plain-call": `If you'd like to schedule a meeting, you can use my calendar link to pick a time that works for you: https://calendly.com/luciano-docusign/30min`,
  "-test": `My test = My test`
};

// Function to handle dynamic trigger replacement in text
function handleKeydown(event: KeyboardEvent, target: HTMLElement) {
  if (!target) {
      return;
  }

  if (target.isContentEditable) {
      handleContentEditableInput(target);
  } else if (target.tagName === "INPUT" || target.tagName === "TEXTAREA") {
      handleInputField(event, target as HTMLInputElement | HTMLTextAreaElement);
  }
}

function handleContentEditableInput(target: HTMLElement) {
  const selection = window.getSelection();
  if (!selection || selection.rangeCount === 0) return;

  const range = selection.getRangeAt(0);
  const container = range.startContainer;

  if (container.nodeType !== Node.TEXT_NODE) return;

  const text = container.textContent || "";
  const cursorPosition = range.startOffset;

  const beforeCursor = text.slice(0, cursorPosition);
  const afterCursor = text.slice(cursorPosition);

  for (const trigger in snippets) {
      if (beforeCursor.endsWith(trigger)) {
          // Replacing
          const updatedHTML = beforeCursor.replace(trigger, snippets[trigger]) + afterCursor;

          // Create a temporary element to parse and inject HTML
          const tempElement = document.createElement("div");
          tempElement.innerHTML = updatedHTML;

          // Replace the current content
          const nodes = Array.from(tempElement.childNodes);
          const parent = container.parentNode;
          if (parent) {
              parent.replaceChild(document.createTextNode(beforeCursor.slice(0, -trigger.length)), container);
              nodes.forEach((node) => parent.appendChild(node));
          }

          console.log(`Snippet "${trigger}" replaced in contenteditable.`);
          break;
      }
  }
}

function handleInputField(event: KeyboardEvent, target: HTMLInputElement | HTMLTextAreaElement) {
  const value = target.value;
  const cursorPosition = target.selectionStart || 0;

  const beforeCursor = value.slice(0, cursorPosition);
  const afterCursor = value.slice(cursorPosition);

  for (const trigger in snippets) {
      if (beforeCursor.endsWith(trigger)) {
          const snippet = target.tagName === "TEXTAREA" && trigger === "-call" ? snippets["-plain-call"] : snippets[trigger];
          const updatedText = beforeCursor.replace(trigger, snippet) + afterCursor;

          target.value = updatedText;

          const newCursorPosition = updatedText.length - afterCursor.length;
          target.setSelectionRange(newCursorPosition, newCursorPosition);

          console.log(`Snippet "${trigger}" replaced in input/textarea.`);
          break;
      }
  }
}







//

// Start observing the document
document.addEventListener("keydown", (event) => handleKeydown(event as KeyboardEvent, event.target as HTMLElement));

// Start observing the document
// document.addEventListener("DOMContentLoaded", () => {
//   console.log("Attaching listeners to iframes...");
//   attachListenersToAllIframes();
//   monitorDynamicIframes();
//   attachListenersToContentEditable(); // Initial attachment for outside iframe elements
// });

/////////////////////////////////////////////////////////////////

function changeCKEditorBackgroundColor(color: string) {
  const iframes = document.querySelectorAll<HTMLIFrameElement>('iframe.cke_wysiwyg_frame');

  if (iframes.length === 0) {
      console.error('No CKEditor iframe found.');
      return;
  }

  if (iframes.forEach) {
      iframes.forEach((iframe) => {
          try {
              const iframeDoc = iframe.contentDocument || iframe.contentWindow?.document;
              if (!iframeDoc) {
                  console.warn('Unable to access iframe document.');
                  return;
              }

              // Try to find the focused editable div using the cke_focus class
              const editableElement = iframeDoc.querySelector('.cke_wysiwyg_div.cke_focus');

              if (editableElement) {
                  (editableElement as HTMLElement).style.backgroundColor = color;
                  console.log(`Background color changed to ${color} in CKEditor.`);
              } else {
                  // If the focus class isn't present, try to find the generic editable div
                  const genericEditableElement = iframeDoc.querySelector('.cke_wysiwyg_div');
                  if (genericEditableElement) {
                      (genericEditableElement as HTMLElement).style.backgroundColor = color;
                      console.log(`Background color changed to ${color} in CKEditor (generic).`);
                  } else {
                      console.error('No editable element found inside the CKEditor iframe.');
                  }
              }
          } catch (err) {
              console.warn('Error accessing iframe:', err);
          }
      });
  }
}

// Example usage
document.addEventListener('DOMContentLoaded', () => {
  const newColor = 'yellow'; // Change this to the desired background color
  changeCKEditorBackgroundColor(newColor);
});


//Working for Salesforce
function replaceTestStringsInIframe(): void {
  // Select the iframe with the class 'cke_wysiwyg_frame'
  const iframes = document.querySelectorAll<HTMLIFrameElement>('.cke_wysiwyg_frame');

  if (!iframes || iframes.length === 0) {
      //console.warn('Iframe with class "cke_wysiwyg_frame" not found.');
      return;
  }

  if (iframes.forEach) {
      iframes.forEach((iframe) => {
          if (!iframe || !iframe.contentDocument || !iframe.contentDocument.body) {
              console.warn('Iframe or iframe body not found.');
              return;
          }

          // Get the body inside the iframe
          const iframeBody = iframe.contentDocument.body;

          // Add a red border to the body
          iframeBody.style.border = '1px solid gray';

          const contentIframe = iframeBody.innerHTML;

        // Replace all occurrences of "-myTest"
            const updatedContent = contentIframe.replace(/-test/g, "This is my test now.");
            if (contentIframe !== updatedContent) {
                iframeBody.innerHTML = updatedContent;
            }

          // Find the editable div
          const editableDiv = iframeBody.querySelector<HTMLElement>('.cke_wysiwyg_div');

          if (!editableDiv) {
              console.warn('No element with class "cke_wysiwyg_div" found inside the iframe.');
              return;
          }

          let content = editableDiv.innerHTML;
          for (const trigger in snippets) {
              const snippet = snippets[trigger];
              const regex = new RegExp(escapeRegExp(trigger), 'g');
              content = content.replace(regex, snippet);
          }

          editableDiv.innerHTML = content;
          console.log("Snippet replaced in CKEditor iframe using 'replaceTestStringsInIframe'.");
      });
  }
}

// Run the function every 2 seconds
setInterval(replaceTestStringsInIframe, 1000);



