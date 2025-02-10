import { OutputData } from "@editorjs/editorjs";

// --- Helper Functions ---
function escapeRegExp(text: string): string {
  return text.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function moveCursorToEnd(editor: HTMLElement): void {
  const range = document.createRange();
  range.selectNodeContents(editor);
  range.collapse(false);
  const selection = window.getSelection();
  selection?.removeAllRanges();
  selection?.addRange(range);
  console.log("Gmail: Cursor moved to end.");
}

// --- Snippet Replacement for Gmail ---
// This function retrieves your snippet templates from Chrome storage
// and replaces any trigger strings in the Gmail compose area.
function replaceSnippetsInGmail(): void {
  console.log("Gmail: Running snippet replacement...");

  // Gmail’s compose area is typically an editable <div> with role="textbox".
  const editor = document.querySelector('div[role="textbox"][contenteditable="true"]') as HTMLElement | null;
  if (!editor) {
   // console.warn("Gmail: Editor not found.");
    return;
  }
  console.log("Gmail: Editor found:", editor);

  chrome.storage.local.get("templatesData")
    .then((data) => {
      const templatesArray = data.templatesData || [];
      const snippets = templatesArray.reduce((acc: { [trigger: string]: string }, item: { name: string; template: OutputData }) => {
        if (!item.template || !item.template.blocks) return acc;
        const templateText = item.template.blocks
          .map((block) => block.data?.text || "")
          .join(" ")
          .replace(/&nbsp;/g, " ");
        acc[item.name] = templateText;
        return acc;
      }, {} as { [trigger: string]: string });
      console.log("Gmail: Snippet mapping:", snippets);

      const contentBefore = editor.innerHTML;
      let updatedContent = contentBefore;
      for (const trigger in snippets) {
        const regex = new RegExp(escapeRegExp(trigger), "gi");
        updatedContent = updatedContent.replace(regex, snippets[trigger]);
      }
      if (contentBefore !== updatedContent) {
        console.log("Gmail: Replacing snippet:", contentBefore, "→", updatedContent);
        editor.innerHTML = updatedContent;
        editor.dispatchEvent(new Event("input", { bubbles: true }));
        editor.dispatchEvent(new Event("change", { bubbles: true }));
        moveCursorToEnd(editor);
      } else {
        console.log("Gmail: No snippet replacements needed.");
      }
    })
    .catch((error) => {
      console.error("Gmail: Error retrieving templates:", error);
    });
}

// --- Listener Attachment for Gmail ---
// Attach listeners to the Gmail compose area.
function attachGmailEditorListeners(): void {
  const editor = document.querySelector('div[role="textbox"][contenteditable="true"]') as HTMLElement | null;
  if (!editor) {
   // console.warn("Gmail: Cannot attach listeners, editor not found.");
    return;
  }
  if (editor.dataset.listenerAttached === "true") return;
  editor.addEventListener("input", replaceSnippetsInGmail);
  editor.addEventListener("keydown", (event: KeyboardEvent) => {
    if (event.key === "Enter") {
      console.log("Gmail: Enter key pressed in editor.");
      setTimeout(replaceSnippetsInGmail, 100);
    }
  });
  editor.dataset.listenerAttached = "true";
  console.log("Gmail: Listener attached to editor:", editor);
}

// --- Global Monitoring for Gmail ---
// Use a MutationObserver and a heartbeat check to ensure listeners stay attached.
function monitorGmailEditorGlobally(): void {
  // Initial scan and attachment.
  attachGmailEditorListeners();
  replaceSnippetsInGmail();

  // MutationObserver: reattach listeners if the compose area is re-rendered.
  const observer = new MutationObserver(() => {
    attachGmailEditorListeners();
    replaceSnippetsInGmail();
  });
  observer.observe(document.body, { childList: true, subtree: true });
  console.log("Gmail: Global MutationObserver attached.");

  // Heartbeat check: every 2 seconds.
  setInterval(() => {
    console.log("Gmail: Heartbeat checking editor...");
    attachGmailEditorListeners();
    replaceSnippetsInGmail();
  }, 2000);
}

// Start monitoring Gmail.
monitorGmailEditorGlobally();

// if (window.location.hostname.includes("mail.google.com")) {
//   console.log("Gmail detected – initializing Gmail snippet replacement.");
//   monitorGmailEditorGlobally();
// }
