"use strict";
document.addEventListener("keydown", (event) => {
    if (event.ctrlKey && event.shiftKey && event.key.toLowerCase() === "f") {
        event.preventDefault(); // Prevent default browser search
        openCustomSearch();
    }
});
let highlights = []; // Store highlighted elements
function openCustomSearch() {
    var _a, _b, _c, _d, _e;
    let searchBar = document.getElementById("custom-search-bar");
    if (!searchBar) {
        searchBar = document.createElement("div");
        searchBar.id = "custom-search-bar";
        searchBar.style.position = "fixed";
        searchBar.style.top = "10px";
        searchBar.style.left = "50%";
        searchBar.style.transform = "translateX(-50%)";
        searchBar.style.backgroundColor = "#fff";
        searchBar.style.padding = "10px";
        searchBar.style.border = "1px solid #ccc";
        searchBar.style.zIndex = "10000";
        searchBar.style.cursor = "move"; // Draggable indicator
        searchBar.style.display = "flex";
        searchBar.style.alignItems = "center";
        searchBar.style.gap = "5px";
        searchBar.innerHTML = `
      <span id="drag-handle" style="cursor: grab; padding: 5px;">⠿</span>
      <input type="text" id="custom-search-input" placeholder="Search words, separated by commas" style="width: 250px; padding: 5px;">
      <button id="custom-prev-btn">⬆</button>
      <button id="custom-next-btn">⬇</button>
      <button id="custom-search-btn">Search</button>
      <button id="custom-clear-btn">Clear</button>
      <button id="custom-close-btn">✖</button>
    `;
        document.body.appendChild(searchBar);
        // Focus the input so you can paste right away.
        document.getElementById("custom-search-input").focus();
        (_a = document.getElementById("custom-search-btn")) === null || _a === void 0 ? void 0 : _a.addEventListener("click", () => {
            const query = document.getElementById("custom-search-input").value;
            highlightSearch(query);
        });
        (_b = document.getElementById("custom-clear-btn")) === null || _b === void 0 ? void 0 : _b.addEventListener("click", () => {
            clearHighlights();
        });
        (_c = document.getElementById("custom-close-btn")) === null || _c === void 0 ? void 0 : _c.addEventListener("click", () => {
            clearHighlights(); // Clear highlights when closing
            searchBar.remove();
        });
        (_d = document.getElementById("custom-prev-btn")) === null || _d === void 0 ? void 0 : _d.addEventListener("click", () => navigateHighlights(-1));
        (_e = document.getElementById("custom-next-btn")) === null || _e === void 0 ? void 0 : _e.addEventListener("click", () => navigateHighlights(1));
        makeDraggable(searchBar);
    }
    else {
        // If it already exists, just focus on the input.
        document.getElementById("custom-search-input").focus();
    }
}
function makeDraggable(element) {
    const dragHandle = document.getElementById("drag-handle");
    let offsetX = 0, offsetY = 0, isDragging = false;
    dragHandle.addEventListener("mousedown", (event) => {
        isDragging = true;
        offsetX = event.clientX - element.getBoundingClientRect().left;
        offsetY = event.clientY - element.getBoundingClientRect().top;
        dragHandle.style.cursor = "grabbing";
    });
    document.addEventListener("mousemove", (event) => {
        if (!isDragging)
            return;
        element.style.left = `${event.clientX - offsetX}px`;
        element.style.top = `${event.clientY - offsetY}px`;
        element.style.transform = "none"; // Remove centering
    });
    document.addEventListener("mouseup", () => {
        isDragging = false;
        dragHandle.style.cursor = "grab";
    });
}
function highlightSearch(query) {
    clearHighlights();
    highlights = []; // reset highlighted elements
    const words = query.split(",").map(word => word.trim()).filter(word => word.length > 0);
    if (words.length === 0)
        return;
    const colors = ["#ffff00", "#ffb3b3", "#b3ffb3", "#b3b3ff", "#ff66ff"];
    let colorIndex = 0;
    words.forEach(word => {
        highlightWord(word, colors[colorIndex % colors.length]);
        colorIndex++;
    });
}
function highlightWord(word, color) {
    const regex = new RegExp(`(${escapeRegExp(word)})`, "gi");
    function replaceTextWithSpan(node) {
        var _a;
        if (node.nodeType === Node.TEXT_NODE && node.nodeValue) {
            const matches = node.nodeValue.match(regex);
            if (matches) {
                const span = document.createElement("span");
                span.innerHTML = node.nodeValue.replace(regex, `<mark style="background-color: ${color};">$1</mark>`);
                (_a = node.parentNode) === null || _a === void 0 ? void 0 : _a.replaceChild(span, node);
                // Save each mark element for navigation
                span.querySelectorAll("mark").forEach((mark) => {
                    highlights.push(mark);
                });
            }
        }
        else {
            node.childNodes.forEach(replaceTextWithSpan);
        }
    }
    document.body.childNodes.forEach(replaceTextWithSpan);
}
function escapeRegExp(text) {
    return text.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}
function clearHighlights() {
    document.querySelectorAll("mark").forEach(mark => {
        const parent = mark.parentNode;
        if (parent) {
            parent.replaceChild(document.createTextNode(mark.textContent || ""), mark);
        }
    });
    highlights = [];
    currentHighlightIndex = -1;
}
let currentHighlightIndex = -1;
function navigateHighlights(direction) {
    if (highlights.length === 0)
        return;
    // Remove previous highlight outline.
    if (currentHighlightIndex >= 0 && currentHighlightIndex < highlights.length) {
        highlights[currentHighlightIndex].style.outline = "none";
    }
    currentHighlightIndex += direction;
    if (currentHighlightIndex < 0)
        currentHighlightIndex = highlights.length - 1;
    if (currentHighlightIndex >= highlights.length)
        currentHighlightIndex = 0;
    const target = highlights[currentHighlightIndex];
    target.style.outline = "3px solid red";
    target.scrollIntoView({ behavior: "smooth", block: "center" });
    console.log(`Navigated to highlight ${currentHighlightIndex + 1} of ${highlights.length}`);
}
