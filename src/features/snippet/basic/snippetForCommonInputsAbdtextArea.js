/**
 * Retrieves the snippets from Chrome storage and converts them to a key-value map.
 */
function getSnippets(callback) {
    chrome.storage.local.get("templatesData", (data) => {
        const templatesArray = data.templatesData || [];
        const snippets = templatesArray.reduce((acc, item) => {
            acc[item.name] = item.template;
            return acc;
        }, {});
        callback(snippets);
    });
}
function handleInputField(event, target) {
    chrome.storage.local.get("templatesData", (data) => {
        var _a;
        const templatesArray = data.templatesData || [];
        console.log("This is the DATA: ", data);
        // Convert array to a key-value object for easier lookup
        const snippets = templatesArray.reduce((acc, item) => {
            // Extract only the plain text for input fields (remove HTML tags but preserve breaks as \n)
            const templatePlainText = item.template.blocks
                .map((block) => block.data.text)
                .join(" ") // Join all text blocks into a single string
                .replace(/&nbsp;/g, " ") // Replace non-breaking space HTML entity with a regular space
                .replace(/<br>/g, '\n') // Replace <br> with \n for input/textarea
                .replace(/<[^>]+>/g, ''); // Remove all HTML tags (for plain text)
            // Extract HTML for contentEditable
            const templateHTML = item.template.blocks
                .map((block) => block.data.text)
                .join(" "); // Keep as HTML if needed for contentEditable
            acc[item.name] = target instanceof HTMLInputElement || target instanceof HTMLTextAreaElement
                ? templatePlainText // Store plain text for input fields
                : templateHTML; // Store HTML for contentEditable
            return acc;
        }, {});
        let value = target instanceof HTMLInputElement || target instanceof HTMLTextAreaElement ? target.value : target.innerHTML;
        const cursorPosition = (target instanceof HTMLInputElement || target instanceof HTMLTextAreaElement) ? (target.selectionStart || 0) : 0;
        const beforeCursor = value.slice(0, cursorPosition);
        const afterCursor = value.slice(cursorPosition);
        for (const trigger in snippets) {
            if (beforeCursor.endsWith(trigger)) {
                const snippet = snippets[trigger];
                if (target instanceof HTMLInputElement || target instanceof HTMLTextAreaElement) {
                    // Replace <br> with \n in input/textarea
                    const updatedText = beforeCursor.replace(trigger, snippet) + afterCursor;
                    target.value = updatedText;
                    // Restore cursor position
                    const newCursorPosition = updatedText.length;
                    target.setSelectionRange(newCursorPosition, newCursorPosition);
                }
                else if (target instanceof HTMLElement && target.isContentEditable) {
                    // Replace \n with <br> in contentEditable (to preserve line breaks in HTML)
                    const updatedHTML = beforeCursor.replace(trigger, snippet).replace(/\n/g, "<br>") + afterCursor;
                    target.innerHTML = updatedHTML;
                    // Restore cursor position in contentEditable
                    const range = (_a = window.getSelection()) === null || _a === void 0 ? void 0 : _a.getRangeAt(0);
                    if (range && target.firstChild) {
                        range.setStart(target.firstChild, updatedHTML.length); // Set cursor to the end of the updated text
                        range.setEnd(target.firstChild, updatedHTML.length);
                        const selection = window.getSelection();
                        selection === null || selection === void 0 ? void 0 : selection.removeAllRanges();
                        selection === null || selection === void 0 ? void 0 : selection.addRange(range);
                    }
                }
                console.log(`Snippet "${trigger}" replaced from storage.`);
                break;
            }
        }
    });
}
// Global keydown listener that delegates based on the target type.
document.addEventListener("keydown", (event) => {
    const target = event.target;
    if (target instanceof HTMLInputElement || target instanceof HTMLTextAreaElement || target.isContentEditable) {
        handleInputField(event, target);
    }
});
export {};
