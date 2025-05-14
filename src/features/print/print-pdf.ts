document.addEventListener("DOMContentLoaded", () => {
    // Check if the button already exists
    if (document.getElementById("custom-print-btn")) return;

    // Create a new button
    const btn = document.createElement("button");
    btn.id = "custom-print-btn";
    btn.innerText = "Print PDF";
    
    // Style the button
    btn.style.position = "fixed";
    btn.style.bottom = "20px";
    btn.style.right = "20px";
    btn.style.padding = "10px 20px";
    btn.style.background = "#007bff";
    btn.style.color = "white";
    btn.style.border = "none";
    btn.style.borderRadius = "5px";
    btn.style.cursor = "pointer";
    btn.style.zIndex = "1000";
    
    // Add event listener to trigger print
    btn.addEventListener("click", () => {
        console.log("Print button clicked!");
        window.print(); // This opens the print preview
    });

    // Append the button to the page
    document.body.appendChild(btn);
});
