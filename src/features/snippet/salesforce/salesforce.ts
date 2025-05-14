import { OutputData } from "@editorjs/editorjs";


/**
 * Utility function to escape special regex characters in a string.
 */
function escapeRegExp(string: string): string {
    return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  }

const editorSelectors = [
  '.ql-editor', // Quill Editor
  '.slds-rich-text-area__content', // Salesforce RTE
  'iframe[title="Rich text editor"]', // CKEditor in iframe
  '.cke_wysiwyg_frame iframe', // CKEditor inside iframe
  '.cke_wysiwyg_frame', // CKEditor
];

let editor: HTMLElement | null = document.querySelector<HTMLElement>(editorSelectors.join(", "));

// If inside an iframe, get its body
if (editor instanceof HTMLIFrameElement) {
  editor = editor.contentDocument?.querySelector("body") || null;
}

if (!editor) {
  //console.warn("⚠️ No Salesforce editor found.");
} else {
  console.log("✅ Found Salesforce editor:", editor);

  // Test inserting a snippet manually
  editor.innerHTML += "<br><b>Inserted Snippet Test</b>";
  editor.dispatchEvent(new Event("input", { bubbles: true }));

  // Setup an observer to watch for changes
  const observer = new MutationObserver(() => {
    console.log("📝 Editor content changed!", editor?.innerHTML);
  });

  observer.observe(editor, { childList: true, subtree: true });
  console.log("👀 Now watching for changes in Salesforce editor...");
}


function replaceSnippetsInSalesforceIframe() {
  console.log("🔍 Looking for Salesforce editor...");

  const editorSelectors = [
    '.ql-editor', // Quill Editor (Salesforce Rich Text Editor)
    '.slds-rich-text-area__content', // Salesforce RTE
    'iframe[title="Rich text editor"]', // CKEditor in iframe
    '.cke_wysiwyg_frame iframe', // CKEditor (if inside iframe)
    '.cke_wysiwyg_frame', // CKEditor (direct)
  ];

  // Find the editor
  let editor = document.querySelector<HTMLElement>(editorSelectors.join(", "));

  // If inside an iframe, find the body
  if (editor instanceof HTMLIFrameElement) {
    editor = editor.contentDocument?.querySelector("body") || null;
  }

  if (!editor) {
    console.warn("⚠️ No Salesforce editor found.");
    return;
  }

  console.log("✅ Salesforce editor found:", editor);

  function applySnippets() {
    chrome.storage.local.get("templatesData").then((data) => {
      const templatesArray = data.templatesData || [];
      const snippets = templatesArray.reduce((acc: { [trigger: string]: string }, item: { name: string; template: OutputData }) => {
        const templateText = item.template.blocks
          .map((block) => block.data?.text || "")
          .join(" ")
          .replace(/&nbsp;/g, " ");

        acc[item.name] = templateText;
        return acc;
      }, {});

      if (!editor) return;

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
// function moveCursorToEnd(editor: HTMLElement) {
//   const range = document.createRange();
//   range.selectNodeContents(editor);
//   range.collapse(false);
//   const selection = window.getSelection();
//   selection?.removeAllRanges();
//   selection?.addRange(range);
// }

function moveCursorToEnd(editor: HTMLElement) {
  const range = document.createRange();
  const selection = window.getSelection();

  if (!selection) return;

  // Move cursor to the last child node, ensuring it's a text node
  if (editor.lastChild) {
    range.selectNodeContents(editor.lastChild);
    range.collapse(false); // Collapse to end
  } else {
    range.selectNodeContents(editor);
    range.collapse(false);
  }

  selection.removeAllRanges();
  selection.addRange(range);
  
  // Ensure the editor remains focused
  editor.focus();
}


// Use setTimeout to wait for the editor to load first
setTimeout(() => {
  replaceSnippetsInSalesforceIframe();
}, 2000);


// Tell TypeScript that CKEDITOR exists globally.
declare var CKEDITOR: any;

function attachEditorListener() {
  if (typeof CKEDITOR !== "undefined") {
    // Using CKEditor’s API.
    console.log("✅ CKEDITOR is defined. Attaching CKEditor API listeners.");
    // Loop over all CKEditor instances (Salesforce typically creates one for the editor).
    for (const instanceName in CKEDITOR.instances) {
      if (Object.prototype.hasOwnProperty.call(CKEDITOR.instances, instanceName)) {
        const instance = CKEDITOR.instances[instanceName];
        // Wait for the content DOM to be ready.
        instance.on("contentDom", function () {
          // Get the editable element.
          const editable = instance.editable();
          // Attach a keydown listener via CKEditor’s API.
          editable.attachListener(editable, "keydown", function (evt: any) {
            const keyCode = evt.data.getKey();
            if (keyCode === 13) { // Enter key
              console.log("⌨️ Enter pressed via CKEditor API on instance:", instanceName);
              // Call your snippet replacement function here.
              // e.g., replaceSnippetsUsingEditor(instance);
            }
          });
          console.log("✅ Attached CKEditor listener on instance:", instanceName);
        });
      }
    }
  } else {
    //console.warn("⚠️ CKEDITOR not defined. Falling back to native event listeners.");
    // Fallback: Use native event listeners on the element with id "tinymce"
    const nativeEditor = document.getElementById("tinymce");
    if (nativeEditor && nativeEditor.isContentEditable) {
      nativeEditor.addEventListener("keydown", (event: KeyboardEvent) => {
        if (event.key === "Enter") {
          //console.log("⌨️ Enter pressed via native event listener on #tinymce.");
          // Call your snippet replacement function for native editors.
          // e.g., replaceSnippetsNative(nativeEditor);
        }
      });
      //console.log("✅ Attached native keydown listener to #tinymce.");
    } else {
      //console.warn("⚠️ Native editor element with id 'tinymce' not found or not contenteditable.");
    }
  }
}

// Call the function to attach listeners.
attachEditorListener();

chrome.webNavigation.onHistoryStateUpdated.addListener((details) => {
  console.log("🚦 History state updated in tab", details.tabId, details.url);
  chrome.scripting.executeScript({
    target: { tabId: details.tabId },
    files: ["content_script.js"]  // make sure this file is listed in your manifest under "content_scripts" or as a file to inject
  });
});




