// src/content/salesforce.ts

// Ensure the script runs only on Salesforce pages
if (window.location.hostname.includes("salesforce.com")) {
    console.log("Salesforce script loaded.");
  
    // Example: Add custom functionality for Salesforce
    function enhanceSalesforceInputs() {
      const monitoredInputs = document.querySelectorAll("input, textarea");
      
      monitoredInputs.forEach((input) => {
        input.addEventListener("focus", () => {
          (input as HTMLElement).style.backgroundColor = "#f0f8ff"; // Light blue background on focus
        });
  
        input.addEventListener("blur", () => {
          (input as HTMLElement).style.backgroundColor = ""; // Reset background on blur
        });
      });
  
      console.log("Enhanced Salesforce inputs with custom focus behavior.");
    }
  
    // Wait for dynamic Salesforce elements to load
    const observer = new MutationObserver(() => {
      if (document.querySelector("input, textarea")) {
        enhanceSalesforceInputs();
      }
    });
  
    observer.observe(document.body, { childList: true, subtree: true });
  
    // Example: Display a notification on Salesforce
    function displaySalesforceToast(message: string) {
      const toast = document.createElement("div");
      toast.innerText = message;
      toast.style.position = "fixed";
      toast.style.bottom = "20px";
      toast.style.right = "20px";
      toast.style.backgroundColor = "rgba(0, 0, 0, 0.8)";
      toast.style.color = "white";
      toast.style.padding = "10px 20px";
      toast.style.borderRadius = "5px";
      toast.style.zIndex = "10000";
      document.body.appendChild(toast);
  
      setTimeout(() => {
        toast.remove();
      }, 3000);
    }
  
    // Display a welcome message on Salesforce
    displaySalesforceToast("Salesforce custom script is active!");
  }
  



