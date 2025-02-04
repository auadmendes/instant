"use strict";
const snippets = {
    "-sign": `Best regards,\nLuciano | Docusign Customer\nSupport docusign.com`,
    "-com": `- [Matter] The client\n- [Action]\n- [Resource] N/A`,
    "-com-html": `<p>- [Matter] The client</br>- [Action]</br>- [Resource] N/A</p>`,
    "-call": `<em>If you'd like to schedule a meeting, you can use my calendar link to pick a time that works for you: [<a href="https://calendly.com/luciano-docusign/30min" target="_blank" rel="noopener noreferrer">Calendly link</a>].</em>`,
    "-plain-call": `If you'd like to schedule a meeting, you can use my calendar link to pick a time that works for you: https://calendly.com/luciano-docusign/30min`,
};
// This function will run only for Gmail (mail.google.com)
function handleContentEditableInput(event, target) {
    // Check if we're on Gmail; adjust this if necessary.
    if (!window.location.host.includes("mail.google.com")) {
        return;
    }
    const selection = window.getSelection();
    if (!selection || selection.rangeCount === 0)
        return;
    const range = selection.getRangeAt(0);
    let container = range.startContainer;
    // If container is not a text node, attempt to find a text node child.
    if (container.nodeType !== Node.TEXT_NODE) {
        for (let i = 0; i < container.childNodes.length; i++) {
            if (container.childNodes[i].nodeType === Node.TEXT_NODE) {
                container = container.childNodes[i];
                break;
            }
        }
    }
    if (container.nodeType !== Node.TEXT_NODE)
        return;
    const text = container.textContent || "";
    const cursorPosition = range.startOffset;
    const beforeCursor = text.slice(0, cursorPosition);
    const afterCursor = text.slice(cursorPosition);
    for (const trigger in snippets) {
        if (beforeCursor.endsWith(trigger)) {
            event.preventDefault();
            // Replace the trigger with the snippet
            const newContent = beforeCursor.slice(0, -trigger.length) + snippets[trigger] + afterCursor;
            // Update the entire contenteditable innerHTML
            target.innerHTML = newContent;
            // Set the cursor at the end of the content.
            const newRange = document.createRange();
            newRange.selectNodeContents(target);
            newRange.collapse(false);
            selection.removeAllRanges();
            selection.addRange(newRange);
            // Change background color to red (only for Gmail)
            target.style.backgroundColor = "red";
            console.log(`Snippet "${trigger}" replaced in Gmail contenteditable and background set to red.`);
            break;
        }
    }
}
// Handler for input/textarea fields (unchanged)
function handleInputField(event, target) {
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
// Main keydown handler that delegates based on element type
function whenKeydown(event) {
    const target = event.target;
    if (!target || !(target.isContentEditable || target.tagName === "INPUT" || target.tagName === "TEXTAREA")) {
        return;
    }
    if (target.isContentEditable) {
        handleContentEditableInput(event, target);
    }
    else {
        handleInputField(event, target);
    }
}
// Attach listeners to editable elements in the document
function attachListenersToEditableFields(root = document) {
    const editableElements = root.querySelectorAll('input, textarea, [contenteditable="true"]');
    editableElements.forEach((element) => {
        element.addEventListener("keydown", (evt) => {
            whenKeydown(evt);
        });
    });
    console.log(`Attached listeners to ${editableElements.length} editable elements.`);
}
// Attach listeners to iframes recursively
function attachListenersToIframe(iframe) {
    var _a;
    try {
        const iframeDocument = iframe.contentDocument || ((_a = iframe.contentWindow) === null || _a === void 0 ? void 0 : _a.document);
        if (!iframeDocument)
            return;
        attachListenersToEditableFields(iframeDocument);
        console.log("Listeners attached to iframe content.");
    }
    catch (err) {
        console.warn("Unable to access iframe due to cross-origin restrictions.", err);
    }
}
function attachListenersToAllIframes(parentDocument = document) {
    const iframes = parentDocument.querySelectorAll("iframe");
    iframes.forEach((iframe) => {
        attachListenersToIframe(iframe);
        iframe.addEventListener("load", () => {
            var _a;
            const iframeDocument = iframe.contentDocument || ((_a = iframe.contentWindow) === null || _a === void 0 ? void 0 : _a.document);
            if (iframeDocument) {
                attachListenersToAllIframes(iframeDocument);
            }
        });
    });
    console.log(`Listeners attached to ${iframes.length} iframes.`);
}
// Monitor dynamic elements
function monitorDynamicElements() {
    const observer = new MutationObserver(() => {
        attachListenersToEditableFields();
        attachListenersToAllIframes();
    });
    observer.observe(document.body, { childList: true, subtree: true });
}
// Initialize when DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
    console.log("Initializing Gmail snippet listener...");
    attachListenersToEditableFields();
    attachListenersToAllIframes();
    monitorDynamicElements();
});
// Also attach a global keydown listener for elements outside iframes
document.addEventListener("keydown", whenKeydown);
