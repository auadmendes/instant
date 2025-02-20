"use strict";
// const observer = new MutationObserver(() => {
//   const fieldsToExtract = ["Case Number", "Subject", "Description"];
//   const extractedData: Record<string, string> = {};
//   // Iterate over each element to extract the relevant data
//   document.querySelectorAll('.test-id__output-root').forEach((element) => {
//     const labelElement = element.querySelector('.test-id__field-label');
//     const valueElement = element.querySelector('.test-id__field-value');
//     if (labelElement && valueElement) {
//       const label = labelElement.textContent?.trim() ?? "";
//       const value = valueElement.textContent?.trim() ?? "";
//       if (fieldsToExtract.indexOf(label) !== -1) {
//         extractedData[label] = value;
//       }
//     }
//   });
//   // If all required fields are found, log and stop the observer
//   if (fieldsToExtract.every(field => extractedData[field])) {
//     //console.log("Extracted Data:", extractedData);
//     observer.disconnect(); // Stop observing once all fields are found
//     return
//   }
// });
// // Start observing the document body for changes in the child nodes (DOM updates)
// observer.observe(document.body, { childList: true, subtree: true });
// // Inject floating button and display extracted data
// const injectFloatingButton = () => {
//   console.log('Injecting floating button...');
//   const floatingButton = document.createElement('button');
//   floatingButton.style.position = 'fixed';
//   floatingButton.style.right = '10px'; // Position it on the right side
//   floatingButton.style.top = '50%'; // Position it vertically in the middle
//   floatingButton.style.padding = '0'; // Remove padding
//   floatingButton.style.borderRadius = '50%'; // Make it a circle
//   floatingButton.style.backgroundColor = '#ACE1AF'; // For testing visibility
//   floatingButton.style.color = '#fff';
//   floatingButton.style.fontSize = '30px'; // Adjust font size to fit well
//   floatingButton.style.border = 'none';
//   floatingButton.style.cursor = 'pointer';
//   floatingButton.style.width = '40px'; // Width of the circle
//   floatingButton.style.height = '40px'; // Height of the circle
//   floatingButton.style.display = 'flex'; // Enable flexbox to center content
//   floatingButton.style.alignItems = 'center'; // Vertically center the text
//   floatingButton.style.justifyContent = 'center'; // Horizontally center the text
//   floatingButton.style.boxShadow = '0 4px 10px rgba(0, 0, 0, 0.2)';
//   floatingButton.textContent = '+'; // The plus symbol
//   // Ensure the button is on top
//   floatingButton.style.zIndex = '9999';
//   // Enable dragging
//   let isDragging = false;
//   let offsetX: number, offsetY: number;
//   floatingButton.addEventListener('mousedown', (event) => {
//     isDragging = true;
//     offsetY = event.clientY - floatingButton.getBoundingClientRect().top;
//     floatingButton.style.cursor = 'grabbing';
//   });
//   document.addEventListener('mousemove', (event) => {
//     if (isDragging) {
//       const y = event.clientY - offsetY;
//       floatingButton.style.top = `${y}px`;
//     }
//   });
//   document.addEventListener('mouseup', () => {
//     isDragging = false;
//     floatingButton.style.cursor = 'pointer';
//   });
//   // Toggle the floating panel
//   floatingButton.addEventListener('click', () => {
//     toggleFloatingPanel();
//   });
//   // Append the button to the body
//   document.body.appendChild(floatingButton);
// };
// // Toggle the floating panel
// const toggleFloatingPanel = () => {
//   let panel = document.getElementById('floatingPanel');
//   if (!panel) {
//     panel = document.createElement('div');
//     panel.id = 'floatingPanel';
//     panel.style.position = 'fixed';
//     panel.style.bottom = '70px';
//     panel.style.right = '20px';
//     panel.style.width = '300px';
//     panel.style.height = '400px';
//     panel.style.backgroundColor = 'white';
//     panel.style.borderRadius = '8px';
//     panel.style.boxShadow = '0 4px 10px rgba(0, 0, 0, 0.2)';
//     panel.style.overflow = 'auto';
//     panel.style.zIndex = '9999'; // Ensure the panel is on top
//     panel.innerHTML = `
//     <div style="padding: 10px;">
//       <h3 style="margin-bottom: 10px; font-size: 18px; font-weight: 600;">Case Overview</h3>
//       <div>
//         <p id="caseNumberText">Case Number: Not retrieved yet</p>
//         <p id="subjectText">Subject: Not retrieved yet</p>
//         <p id="descriptionText">Description: Not retrieved yet</p>
//         <button id="getCaseDetailsButton" style="padding: 5px 10px; background: #007bff; color: white; border: none; border-radius: 4px; cursor: pointer; margin-top: 10px;">Get Case Details</button>
//         <button id="startObserverButton" style="padding: 5px 10px; background: #28a745; color: white; border: none; border-radius: 4px; cursor: pointer; margin-top: 10px;">Start Observer</button>
//       </div>
//       <hr style="margin: 10px 0;">
//       <h4>Email Details:</h4>
//       <div id="emailDetails" style="max-height: 150px; overflow-y: auto; font-size: 14px; border: 1px solid #ddd; padding: 5px; background: #f9f9f9;">
//         No email extracted yet.
//       </div>
//     </div>
//     <button id="closePanel" style="position: absolute; top: 10px; right: 10px; padding: 5px 10px; background: #ff0000; color: white; border: none; border-radius: 4px; cursor: pointer;">Close</button>
//   `;
//     document.body.appendChild(panel);
//     // Event listeners for buttons
//     const getCaseDetailsButton = panel.querySelector('#getCaseDetailsButton') as HTMLButtonElement;
//     const startObserverButton = panel.querySelector('#startObserverButton') as HTMLButtonElement;
//     const closeButton = panel.querySelector('#closePanel') as HTMLButtonElement;
//     if (getCaseDetailsButton) {
//       getCaseDetailsButton.addEventListener('click', () => {
//         const extractedData = getExtractedData();
//         (panel!.querySelector('#caseNumberText') as HTMLElement).textContent = `Case Number: ${extractedData["Case Number"] ?? "Not found"}`;
//         (panel!.querySelector('#subjectText') as HTMLElement).textContent = `Subject: ${extractedData["Subject"] ?? "Not found"}`;
//         (panel!.querySelector('#descriptionText') as HTMLElement).textContent = `Description: ${extractedData["Description"] ?? "Not found"}`;
//       });
//     }
//     if (startObserverButton) {
//       startObserverButton.addEventListener('click', () => {
//         console.log("Observer started!");
//         startEmailObserver(); // Call the function to start the observer
//       });
//     }
//     if (closeButton) {
//       closeButton.addEventListener('click', () => {
//         panel?.remove();
//       });
//     }
//   }
// };
// // MutationObserver function
// function startEmailObserver() {
//   const observeremail = new MutationObserver(() => {
//     extractEmailContent();
//   });
//   observeremail.observe(document.body, { childList: true, subtree: true });
//   extractEmailContent(); // Run immediately
// }
// function extractEmailContent() {
//   const iframe = document.querySelector('ol li iframe') as HTMLIFrameElement | null;
//   if (iframe) {
//     console.log("iframe found");
//     try {
//       const iframeDocument = iframe.contentDocument || iframe.contentWindow?.document;
//       if (iframeDocument) {
//         console.log("iframe document found");
//         const bodyText = iframeDocument.body?.textContent?.trim();
//         if (bodyText) {
//           console.log("Extracted body text from iframe:", bodyText);
//           storeExtractedText(bodyText);
//         } else {
//           console.log("iframe body text is empty or not yet loaded.");
//         }
//       } else {
//         console.log("iframe document is not yet available.");
//       }
//     } catch (error) {
//       console.error("Error accessing iframe content:", error);
//     }
//   } else {
//     console.log("iframe not yet found in the DOM.");
//     const richTextOutput = document.querySelector('emailui-rich-text-output[value]');
//     if (richTextOutput) {
//       console.log("emailui-rich-text-output found");
//       const htmlContent = richTextOutput.getAttribute('value');
//       if (htmlContent) {
//         console.log("emailui-rich-text-output value found:", htmlContent);
//         const parser = new DOMParser();
//         const doc = parser.parseFromString(htmlContent, 'text/html');
//         const bodyText = doc.body?.textContent?.trim();
//         if (bodyText) {
//           console.log("Extracted text from emailui-rich-text-output:", bodyText);
//           storeExtractedText(bodyText);
//         } else {
//           console.log("emailui-rich-text-output: No text in parsed document body");
//         }
//       } else {
//         console.log("emailui-rich-text-output 'value' attribute is empty.");
//       }
//     }
//   }
// }
// function storeExtractedText(text: string) {
//   console.log("Storing extracted text:", text);
//   const emailDetailsElement = document.getElementById("emailDetails");
//   if (emailDetailsElement) {
//     emailDetailsElement.innerText = text;
//   }
// }
// // Function to get the extracted data from MutationObserver
// const getExtractedData = () => {
//   const fieldsToExtract = ["Case Number", "Subject", "Description"];
//   const extractedData: Record<string, string> = {};
//   document.querySelectorAll('.test-id__output-root').forEach((element) => {
//     const labelElement = element.querySelector('.test-id__field-label');
//     const valueElement = element.querySelector('.test-id__field-value');
//     if (labelElement && valueElement) {
//       const label = labelElement.textContent?.trim() ?? "";
//       const value = valueElement.textContent?.trim() ?? "";
//       if (fieldsToExtract.indexOf(label) !== -1) {
//         extractedData[label] = value;
//       }
//     }
//   });
//   return extractedData;
// };
// // Call the function to inject the floating button when the page is loaded
// if (!document.getElementById("floatingButton")) { 
//   injectFloatingButton();
// }
// const observeremail = new MutationObserver(() => {
//   const iframe = document.querySelector('ol li iframe') as HTMLIFrameElement | null;
//   if (iframe) {
//     console.log("iframe found");
//     try {
//       const iframeDocument = iframe.contentDocument || iframe.contentWindow?.document;
//       if (iframeDocument) {
//         console.log("iframe document found");
//         const bodyText = iframeDocument.body?.textContent?.trim();
//         if (bodyText) {
//           console.log("Extracted body text from iframe:", bodyText);
//           observeremail.disconnect(); // Stop observing after extracting the text
//         } else {
//           console.log("iframe body text is empty or not yet loaded.");
//         }
//       } else {
//         console.log("iframe document is not yet available.");
//       }
//     } catch (error) {
//       console.error("Error accessing iframe content:", error);
//     }
//   } else {
//     console.log("iframe not yet found in the DOM.");
//     // Alternative approach using the emailui-rich-text-output tag
//     const richTextOutput = document.querySelector('emailui-rich-text-output[value]');
//     if (richTextOutput) {
//       console.log("emailui-rich-text-output found");
//       const htmlContent = richTextOutput.getAttribute('value');
//       if (htmlContent) {
//         console.log("emailui-rich-text-output value found:", htmlContent);
//         const parser = new DOMParser();
//         const doc = parser.parseFromString(htmlContent, 'text/html');
//         const bodyText = doc.body?.textContent?.trim();
//         if (bodyText) {
//           console.log("Extracted text from emailui-rich-text-output:", bodyText);
//           observeremail.disconnect();
//         } else {
//           console.log("emailui-rich-text-output: No text in parsed document body");
//         }
//       } else {
//         console.log("emailui-rich-text-output 'value' attribute is empty.");
//       }
//     }
//   }
// });
// observeremail.observe(document.body, { childList: true, subtree: true });
// abobe is working fine
//////////////////////////////////////////
/////////////////////////////////
////////////////////////
// const observer = new MutationObserver(() => {
//   const fieldsToExtract = ["Case Number", "Subject", "Description"];
//   const extractedData: Record<string, string> = {};
//   // Iterate over each element to extract the relevant data
//   document.querySelectorAll('.test-id__output-root').forEach((element) => {
//     const labelElement = element.querySelector('.test-id__field-label');
//     const valueElement = element.querySelector('.test-id__field-value');
//     if (labelElement && valueElement) {
//       const label = labelElement.textContent?.trim() ?? ""; // Ensure it's always a string
//       const value = valueElement.textContent?.trim() ?? "";
//       if (fieldsToExtract.indexOf(label) !== -1) {
//         extractedData[label] = value;
//       }
//     }
//   });
//   // If all required fields are found, log and stop the observer
//   if (fieldsToExtract.every(field => extractedData[field])) {
//     console.log("Extracted Data:", extractedData);
//     observer.disconnect(); // Stop observing once all fields are found
//   }
// });
// observer.observe(document.body, { childList: true, subtree: true });
// // Inject floating button and display extracted data
// const injectFloatingButton = () => {
//   console.log('Injecting floating button...');
//   const floatingButton = document.createElement('button');
//   floatingButton.style.position = 'fixed';
//   floatingButton.style.right = '10px'; // Position it on the right side
//   floatingButton.style.top = '50%'; // Position it vertically in the middle
//   floatingButton.style.padding = '0'; // Remove padding
//   floatingButton.style.borderRadius = '50%'; // Make it a circle
//   floatingButton.style.backgroundColor = '#ACE1AF'; // For testing visibility
//   floatingButton.style.color = '#fff';
//   floatingButton.style.fontSize = '30px'; // Adjust font size to fit well
//   floatingButton.style.border = 'none';
//   floatingButton.style.cursor = 'pointer';
//   floatingButton.style.width = '40px'; // Width of the circle
//   floatingButton.style.height = '40px'; // Height of the circle
//   floatingButton.style.display = 'flex'; // Enable flexbox to center content
//   floatingButton.style.alignItems = 'center'; // Vertically center the text
//   floatingButton.style.justifyContent = 'center'; // Horizontally center the text
//   floatingButton.style.boxShadow = '0 4px 10px rgba(0, 0, 0, 0.2)';
//   floatingButton.textContent = '+'; // The plus symbol
//   // Ensure the button is on top
//   floatingButton.style.zIndex = '9999';
//   // Enable dragging
//   let isDragging = false;
//   let offsetX: number, offsetY: number;
//   floatingButton.addEventListener('mousedown', (event) => {
//     isDragging = true;
//     offsetY = event.clientY - floatingButton.getBoundingClientRect().top;
//     floatingButton.style.cursor = 'grabbing';
//   });
//   document.addEventListener('mousemove', (event) => {
//     if (isDragging) {
//       const y = event.clientY - offsetY;
//       floatingButton.style.top = `${y}px`;
//     }
//   });
//   document.addEventListener('mouseup', () => {
//     isDragging = false;
//     floatingButton.style.cursor = 'pointer';
//   });
//   // Toggle the floating panel
//   floatingButton.addEventListener('click', () => {
//     toggleFloatingPanel();
//   });
//   // Append the button to the body
//   document.body.appendChild(floatingButton);
// };
// // Toggle the floating panel
// const toggleFloatingPanel = () => {
//   let panel = document.getElementById('floatingPanel');
//   if (!panel) {
//     panel = document.createElement('div');
//     panel.id = 'floatingPanel';
//     panel.style.position = 'fixed';
//     panel.style.bottom = '70px';
//     panel.style.right = '20px';
//     panel.style.width = '300px';
//     panel.style.height = '400px';
//     panel.style.backgroundColor = 'white';
//     panel.style.borderRadius = '8px';
//     panel.style.boxShadow = '0 4px 10px rgba(0, 0, 0, 0.2)';
//     panel.style.overflow = 'auto';
//     panel.style.zIndex = '9999'; // Ensure the panel is on top
//     panel.innerHTML = `
//       <div style="padding: 10px;">
//         <h3 style="margin-bottom: 10px; font-size: 18px; font-weight: 600;">Case Overview</h3>
//         <div>
//           <p id="caseNumberText">Case Number: Not retrieved yet</p> <!-- Initial placeholder for case number -->
//           <p id="subjectText">Subject: Not retrieved yet</p> <!-- Initial placeholder for subject -->
//           <p id="descriptionText">Description: Not retrieved yet</p> <!-- Initial placeholder for description -->
//           <button id="getCaseDetailsButton" style="padding: 5px 10px; background: #007bff; color: white; border: none; border-radius: 4px; cursor: pointer; margin-top: 10px;">Get Case Details</button>
//           <button id="getEmailDetailsButton" style="padding: 5px 10px; background: #28a745; color: white; border: none; border-radius: 4px; cursor: pointer; margin-top: 10px;">Get Email Details</button>
//         </div>
//         <div id="emailDetailsSection" style="margin-top: 20px; display: none;">
//           <h4 style="margin-bottom: 10px;">Email Details</h4>
//           <ul id="emailDetailsList"></ul>
//         </div>
//       </div>
//       <button id="closePanel" style="position: absolute; top: 10px; right: 10px; padding: 5px 10px; background: #ff0000; color: white; border: none; border-radius: 4px; cursor: pointer;">Close</button>
//     `;
//     document.body.appendChild(panel);
//     // Add click event to the button to fetch and display the case details
//     const getCaseDetailsButton = panel.querySelector('#getCaseDetailsButton');
//     const caseNumberText = panel.querySelector('#caseNumberText');
//     const subjectText = panel.querySelector('#subjectText');
//     const descriptionText = panel.querySelector('#descriptionText');
//     if (getCaseDetailsButton && caseNumberText && subjectText && descriptionText) {
//       getCaseDetailsButton.addEventListener('click', () => {
//         // Extracted data
//         const extractedData = getExtractedData();
//         caseNumberText.textContent = `Case Number: ${extractedData["Case Number"] ?? "Not found"}`;
//         subjectText.textContent = `Subject: ${extractedData["Subject"] ?? "Not found"}`;
//         descriptionText.textContent = `Description: ${extractedData["Description"] ?? "Not found"}`;
//       });
//     }
//     // Add click event to the button to fetch and display the email details
//     const getEmailDetailsButton = document.querySelector('#getEmailDetailsButton') as HTMLElement;
//     const emailDetailsSection = document.querySelector('#emailDetailsSection') as HTMLElement;
//     const emailDetailsList = document.querySelector('#emailDetailsList') as HTMLElement;
//     if (getEmailDetailsButton && emailDetailsSection && emailDetailsList) {
//       getEmailDetailsButton.addEventListener('click', () => {
//         // Fetch and display email details
//         extractEmailDetails(emailDetailsList);
//         emailDetailsSection.style.display = 'block'; // Show the email details section
//       });
//     }
//     // Close panel functionality
//     const closeButton = panel.querySelector('#closePanel');
//     if (closeButton) {
//       closeButton.addEventListener('click', () => {
//         panel?.remove();
//       });
//     }
//   }
// };
// // Function to get the extracted data from MutationObserver
// const getExtractedData = () => {
//   const fieldsToExtract = ["Case Number", "Subject", "Description"];
//   const extractedData: Record<string, string> = {};
//   document.querySelectorAll('.test-id__output-root').forEach((element) => {
//     const labelElement = element.querySelector('.test-id__field-label');
//     const valueElement = element.querySelector('.test-id__field-value');
//     if (labelElement && valueElement) {
//       const label = labelElement.textContent?.trim() ?? "";
//       const value = valueElement.textContent?.trim() ?? "";
//       if (fieldsToExtract.indexOf(label) !== -1) {
//         extractedData[label] = value;
//       }
//     }
//   });
//   return extractedData;
// };
// // Function to extract email details from the email list
// const extractEmailDetails = (emailList: Element) => {
//   const emailDetailsList = document.getElementById('emailDetailsList'); // Make sure it exists
//   if (!emailDetailsList) {
//     console.error("No emailDetailsList found in the DOM.");
//     return;
//   }
//   const emailListItems: string[] = [];
//   emailList.querySelectorAll('li').forEach((liElement) => {
//     const textContent = liElement.textContent?.trim();
//     if (textContent) {
//       emailListItems.push(textContent);
//     }
//   });
//   emailDetailsList.innerHTML = ""; // Clear previous content
//   if (emailListItems.length > 0) {
//     emailListItems.forEach((item) => {
//       const listItem = document.createElement("li");
//       listItem.textContent = item;
//       emailDetailsList.appendChild(listItem);
//     });
//   } else {
//     emailDetailsList.innerHTML = "<li>No email details found.</li>";
//   }
// };
// const observeremail = new MutationObserver(() => {
//   const iframe = document.querySelector('ol li iframe') as HTMLIFrameElement | null;
//   if (iframe) {
//     console.log("iframe found .........................................................");
//     try {
//       const iframeDocument = iframe.contentDocument || iframe.contentWindow?.document;
//       if (iframeDocument) {
//         console.log("iframe document found ----------------------------------------------");
//         const bodyText = iframeDocument.body?.textContent?.trim();
//         if (bodyText) {
//           console.log("Extracted body text from iframe:", bodyText);
//           observeremail.disconnect(); // Stop observing after extracting the text
//         } else {
//           console.log("iframe body text is empty or not yet loaded.");
//         }
//       } else {
//         console.log("iframe document is not yet available.");
//       }
//     } catch (error) {
//       console.error("Error accessing iframe content:", error);
//     }
//   } else {
//     console.log("iframe not yet found in the DOM.");
//     // Alternative approach using the emailui-rich-text-output tag
//     const richTextOutput = document.querySelector('emailui-rich-text-output[value]');
//     if (richTextOutput) {
//       console.log("emailui-rich-text-output found");
//       const htmlContent = richTextOutput.getAttribute('value');
//       if (htmlContent) {
//         console.log("emailui-rich-text-output value found:", htmlContent);
//         const parser = new DOMParser();
//         const doc = parser.parseFromString(htmlContent, 'text/html');
//         const bodyText = doc.body?.textContent?.trim();
//         if (bodyText) {
//           console.log("Extracted text from emailui-rich-text-output:", bodyText);
//           observeremail.disconnect();
//         } else {
//           console.log("emailui-rich-text-output: No text in parsed document body");
//         }
//       } else {
//         console.log("emailui-rich-text-output 'value' attribute is empty.");
//       }
//     }
//   }
// });
// observeremail.observe(document.body, { childList: true, subtree: true });
// // Call the function to inject the floating button when the page is loaded
// injectFloatingButton();
/////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////
///////////////////////////////
/////////////////////
////////////////
////////////
/////////
//////
////
///
//
//   const iframe = document.querySelector('ol li iframe') as HTMLIFrameElement | null;
//   if (iframe) {
//     console.log("iframe found");
//     try {
//       const iframeDocument = iframe.contentDocument || iframe.contentWindow?.document;
//       if (iframeDocument) {
//         console.log("iframe document found");
//         const bodyText = iframeDocument.body?.textContent?.trim();
//         if (bodyText) {
//           console.log("Extracted body text from iframe:", bodyText);
//           observeremail.disconnect(); // Stop observing after extracting the text
//         } else {
//           console.log("iframe body text is empty or not yet loaded.");
//         }
//       } else {
//         console.log("iframe document is not yet available.");
//       }
//     } catch (error) {
//       console.error("Error accessing iframe content:", error);
//     }
//   } else {
//     console.log("iframe not yet found in the DOM.");
//     // Alternative approach using the emailui-rich-text-output tag
//     const richTextOutput = document.querySelector('emailui-rich-text-output[value]');
//     if (richTextOutput) {
//       console.log("emailui-rich-text-output found");
//       const htmlContent = richTextOutput.getAttribute('value');
//       if (htmlContent) {
//         console.log("emailui-rich-text-output value found:", htmlContent);
//         const parser = new DOMParser();
//         const doc = parser.parseFromString(htmlContent, 'text/html');
//         const bodyText = doc.body?.textContent?.trim();
//         if (bodyText) {
//           console.log("Extracted text from emailui-rich-text-output:", bodyText);
//           observeremail.disconnect();
//         } else {
//           console.log("emailui-rich-text-output: No text in parsed document body");
//         }
//       } else {
//         console.log("emailui-rich-text-output 'value' attribute is empty.");
//       }
//     }
//   }
// });
// const observer = new MutationObserver(() => {
//   const fieldsToExtract = ["Case Number", "Subject", "Description"];
//   const extractedData: Record<string, string> = {};
//   document.querySelectorAll('.test-id__output-root').forEach((element) => {
//       const labelElement = element.querySelector('.test-id__field-label');
//       const valueElement = element.querySelector('.test-id__field-value');
//       if (labelElement && valueElement) {
//           const label = labelElement.textContent?.trim() ?? "";
//           const value = valueElement.textContent?.trim() ?? "";
//           if (fieldsToExtract.indexOf(label) !== -1) {
//               extractedData[label] = value;
//           }
//       }
//   });
//   if (fieldsToExtract.every(field => extractedData[field])) {
//       console.log("Extracted Data:", extractedData);
//       observer.disconnect();
//   }
// });
// observer.observe(document.body, { childList: true, subtree: true });
// const injectFloatingButton = () => {
//   console.log('Injecting floating button...');
//   const floatingButton = document.createElement('button');
//   floatingButton.style.position = 'fixed';
//   floatingButton.style.right = '10px';
//   floatingButton.style.top = '50%';
//   floatingButton.style.padding = '0';
//   floatingButton.style.borderRadius = '50%';
//   floatingButton.style.backgroundColor = '#ACE1AF';
//   floatingButton.style.color = '#fff';
//   floatingButton.style.fontSize = '30px';
//   floatingButton.style.border = 'none';
//   floatingButton.style.cursor = 'pointer';
//   floatingButton.style.width = '40px';
//   floatingButton.style.height = '40px';
//   floatingButton.style.display = 'flex';
//   floatingButton.style.alignItems = 'center';
//   floatingButton.style.justifyContent = 'center';
//   floatingButton.style.boxShadow = '0 4px 10px rgba(0, 0, 0, 0.2)';
//   floatingButton.textContent = '+';
//   floatingButton.style.zIndex = '9999';
//   let isDragging = false;
//   let offsetX: number, offsetY: number;
//   floatingButton.addEventListener('mousedown', (event) => {
//       isDragging = true;
//       offsetY = event.clientY - floatingButton.getBoundingClientRect().top;
//       floatingButton.style.cursor = 'grabbing';
//   });
//   document.addEventListener('mousemove', (event) => {
//       if (isDragging) {
//           const y = event.clientY - offsetY;
//           floatingButton.style.top = `${y}px`;
//       }
//   });
//   document.addEventListener('mouseup', () => {
//       isDragging = false;
//       floatingButton.style.cursor = 'pointer';
//   });
//   floatingButton.addEventListener('click', () => {
//       toggleFloatingPanel();
//   });
//   document.body.appendChild(floatingButton);
// };
// const toggleFloatingPanel = () => {
//   let panel = document.getElementById('floatingPanel');
//   if (!panel) {
//       panel = document.createElement('div');
//       panel.id = 'floatingPanel';
//       panel.style.position = 'fixed';
//       panel.style.bottom = '70px';
//       panel.style.right = '20px';
//       panel.style.width = '300px';
//       panel.style.height = '400px';
//       panel.style.backgroundColor = 'white';
//       panel.style.borderRadius = '8px';
//       panel.style.boxShadow = '0 4px 10px rgba(0, 0, 0, 0.2)';
//       panel.style.overflow = 'auto';
//       panel.style.zIndex = '9999';
//       panel.innerHTML = `
//           <div style="padding: 10px;">
//               <h3 style="margin-bottom: 10px; font-size: 18px; font-weight: 600;">Case Overview</h3>
//               <div>
//                   <p id="caseNumberText">Case Number: Not retrieved yet</p>
//                   <p id="subjectText">Subject: Not retrieved yet</p>
//                   <p id="descriptionText">Description: Not retrieved yet</p>
//                   <button id="getCaseDetailsButton" style="padding: 5px 10px; background: #007bff; color: white; border: none; border-radius: 4px; cursor: pointer; margin-top: 10px;">Get Case Details</button>
//                   <button id="getEmailDetailsButton" style="padding: 5px 10px; background: #28a745; color: white; border: none; border-radius: 4px; cursor: pointer; margin-top: 10px;">Get Email Details</button>
//               </div>
//               <div id="emailDetailsSection" style="margin-top: 20px; display: none;">
//                   <h4 style="margin-bottom: 10px;">Email Details</h4>
//                   <ul id="emailDetailsList"></ul>  </div>
//           </div>
//           <button id="closePanel" style="position: absolute; top: 10px; right: 10px; padding: 5px 10px; background: #ff0000; color: white; border: none; border-radius: 4px; cursor: pointer;">Close</button>
//       `;
//       document.body.appendChild(panel);
//       const getCaseDetailsButton = panel.querySelector('#getCaseDetailsButton');
//       const caseNumberText = panel.querySelector('#caseNumberText');
//       const subjectText = panel.querySelector('#subjectText');
//       const descriptionText = panel.querySelector('#descriptionText');
//       if (getCaseDetailsButton && caseNumberText && subjectText && descriptionText) {
//           getCaseDetailsButton.addEventListener('click', () => {
//               const extractedData = getExtractedData();
//               caseNumberText.textContent = `Case Number: ${extractedData["Case Number"] ?? "Not found"}`;
//               subjectText.textContent = `Subject: ${extractedData["Subject"] ?? "Not found"}`;
//               descriptionText.textContent = `Description: ${extractedData["Description"] ?? "Not found"}`;
//           });
//       }
//       const getEmailDetailsButton = document.querySelector('#getEmailDetailsButton') as HTMLElement;
//       const emailDetailsSection = document.querySelector('#emailDetailsSection') as HTMLElement;
//       const emailDetailsContent = document.querySelector('#emailDetailsContent') as HTMLElement;
//       if (getEmailDetailsButton && emailDetailsSection && emailDetailsContent) {
//           getEmailDetailsButton.addEventListener('click', () => {
//               const emailContent = getExtractedEmailData();
//               emailDetailsContent.textContent = `Email Content: ${emailContent ?? "Not found"}`;
//               emailDetailsSection.style.display = 'block';
//           });
//       }
//       const closeButton = panel.querySelector('#closePanel');
//       if (closeButton) {
//           closeButton.addEventListener('click', () => {
//               panel?.remove();
//           });
//       }
//   }
// };
// const getExtractedData = () => {
//   const fieldsToExtract = ["Case Number", "Subject", "Description"];
//   const extractedData: Record<string, string> = {};
//   document.querySelectorAll('.test-id__output-root').forEach((element) => {
//       const labelElement = element.querySelector('.test-id__field-label');
//       const valueElement = element.querySelector('.test-id__field-value');
//       if (labelElement && valueElement) {
//           const label = labelElement.textContent?.trim() ?? "";
//           const value = valueElement.textContent?.trim() ?? "";
//           if (fieldsToExtract.indexOf(label) !== -1) {
//               extractedData[label] = value;
//           }
//       }
//   });
//   return extractedData;
// };
// const observeremail = new MutationObserver(() => {
//   const listItems = document.querySelectorAll('ol li');
//   if (listItems.length > 0) {
//       let extractedEmails: string[] = []; // Array to store extracted email content
//       listItems.forEach(listItem => {
//           const emailContentDiv = listItem.querySelector('.preamble_custom-summary');
//           if (emailContentDiv) {
//               const emailContent = emailContentDiv.textContent?.trim();
//               if (emailContent) {
//                   console.log('Extracted email content:', emailContent);
//                   extractedEmails.push(emailContent); // Add to the array
//               }
//           }
//       });
//       if (extractedEmails.length > 0) {
//           // Update the panel with the extracted emails
//           updateEmailPanel(extractedEmails);
//           observeremail.disconnect(); // Stop observing after processing all items
//       }
//   }
// });
// observeremail.observe(document.body, { childList: true, subtree: true });
// // Function to update the email panel
// const updateEmailPanel = (emails: string[]) => {
//   const emailDetailsList = document.querySelector('#emailDetailsList') as HTMLUListElement;
//   if (emailDetailsList) {
//       emailDetailsList.innerHTML = ''; // Clear previous list items
//       emails.forEach(email => {
//           const listItem = document.createElement('li');
//           listItem.textContent = email;
//           emailDetailsList.appendChild(listItem);
//       });
//   }
// };
// observeremail.observe(document.body, { childList: true, subtree: true });
// const getExtractedEmailData = () => {
//   let emailContent = null;
//   const iframe = document.querySelector('ol li iframe') as HTMLIFrameElement | null;
//   if (iframe) {
//       try {
//           const iframeDocument = iframe.contentDocument || iframe.contentWindow?.document;
//           if (iframeDocument) {
//               emailContent = iframeDocument.body?.textContent?.trim();
//               console.log('>>>>>>>>>>>>>>   ',emailContent, '   <<<<<<<<<<<<<<<<<<<<<' )
//           }
//       } catch (error) {
//           console.error("Error accessing iframe content:", error);
//       }
//   } else {
//       const richTextOutput = document.querySelector('emailui-rich-text-output[value]');
//       if (richTextOutput) {
//           const htmlContent = richTextOutput.getAttribute('value');
//           if (htmlContent) {
//               const parser = new DOMParser(); // Corrected usage
//               const doc = parser.parseFromString(htmlContent, 'text/html');
//               emailContent = doc.body?.textContent?.trim();
//           }
//       }
//   }
//   return emailContent;
// };
// injectFloatingButton();
// const observeremail = new MutationObserver(() => {
//   const iframe = document.querySelector('ol li iframe') as HTMLIFrameElement | null;
//   if (iframe) {
//       try {
//           const iframeDocument = iframe.contentDocument || iframe.contentWindow?.document;
//           if (iframeDocument) {
//               const bodyText = iframeDocument.body?.textContent?.trim();
//               console.log(' ====================================  ', bodyText, '   ==================================')
//               if (bodyText) {
//                   observeremail.disconnect();
//               }
//           }
//       } catch (error) {
//           console.error("Error accessing iframe content:", error);
//       }
//   } else {
//       const richTextOutput = document.querySelector('emailui-rich-text-output[value]');
//       if (richTextOutput) {
//         const htmlContent = richTextOutput.getAttribute('value');
//         if (htmlContent) {
//             const parser = new DOMParser(); // Corrected line
//             const doc = parser.parseFromString(htmlContent, 'text/html');
//             const bodyText = doc.body?.textContent?.trim();
//             if (bodyText) {
//                 observeremail.disconnect();
//             }
//         }
//     }
//   }
// });
const observer = new MutationObserver(() => {
    const fieldsToExtract = ["Case Number", "Subject", "Description"];
    const extractedData = {};
    document.querySelectorAll('.test-id__output-root').forEach((element) => {
        var _a, _b, _c, _d;
        const labelElement = element.querySelector('.test-id__field-label');
        const valueElement = element.querySelector('.test-id__field-value');
        if (labelElement && valueElement) {
            const label = (_b = (_a = labelElement.textContent) === null || _a === void 0 ? void 0 : _a.trim()) !== null && _b !== void 0 ? _b : "";
            const value = (_d = (_c = valueElement.textContent) === null || _c === void 0 ? void 0 : _c.trim()) !== null && _d !== void 0 ? _d : "";
            if (fieldsToExtract.indexOf(label) !== -1) {
                extractedData[label] = value;
            }
        }
    });
    if (fieldsToExtract.every(field => extractedData[field])) {
        console.log("Extracted Data:", extractedData);
        observer.disconnect();
    }
});
observer.observe(document.body, { childList: true, subtree: true });
const injectFloatingButton = () => {
    console.log('Injecting floating button...');
    const floatingButton = document.createElement('button');
    floatingButton.style.position = 'fixed';
    floatingButton.style.right = '10px';
    floatingButton.style.top = '50%';
    floatingButton.style.padding = '0';
    floatingButton.style.borderRadius = '50%';
    floatingButton.style.backgroundColor = '#ACE1AF';
    floatingButton.style.color = '#fff';
    floatingButton.style.fontSize = '30px';
    floatingButton.style.border = 'none';
    floatingButton.style.cursor = 'pointer';
    floatingButton.style.width = '40px';
    floatingButton.style.height = '40px';
    floatingButton.style.display = 'flex';
    floatingButton.style.alignItems = 'center';
    floatingButton.style.justifyContent = 'center';
    floatingButton.style.boxShadow = '0 4px 10px rgba(0, 0, 0, 0.2)';
    floatingButton.textContent = '+';
    floatingButton.style.zIndex = '9999';
    let isDragging = false;
    let offsetX, offsetY;
    floatingButton.addEventListener('mousedown', (event) => {
        isDragging = true;
        offsetY = event.clientY - floatingButton.getBoundingClientRect().top;
        floatingButton.style.cursor = 'grabbing';
    });
    document.addEventListener('mousemove', (event) => {
        if (isDragging) {
            const y = event.clientY - offsetY;
            floatingButton.style.top = `${y}px`;
        }
    });
    document.addEventListener('mouseup', () => {
        isDragging = false;
        floatingButton.style.cursor = 'pointer';
    });
    floatingButton.addEventListener('click', () => {
        toggleFloatingPanel();
    });
    document.body.appendChild(floatingButton);
};
const toggleFloatingPanel = () => {
    let panel = document.getElementById('floatingPanel');
    if (!panel) {
        panel = document.createElement('div');
        panel.id = 'floatingPanel';
        panel.style.position = 'fixed';
        panel.style.bottom = '70px';
        panel.style.right = '20px';
        panel.style.width = '300px';
        panel.style.height = '400px';
        panel.style.backgroundColor = 'white';
        panel.style.borderRadius = '8px';
        panel.style.boxShadow = '0 4px 10px rgba(0, 0, 0, 0.2)';
        panel.style.overflow = 'auto';
        panel.style.zIndex = '9999';
        panel.innerHTML = `
          <div style="padding: 10px;">
              <h3 style="margin-bottom: 10px; font-size: 18px; font-weight: 600;">Case Overview</h3>
              <div>
                  <p id="caseNumberText">Case Number: Not retrieved yet</p>
                  <p id="subjectText">Subject: Not retrieved yet</p>
                  <p id="descriptionText">Description: Not retrieved yet</p>
                  <button id="getCaseDetailsButton" style="padding: 5px 10px; background: #007bff; color: white; border: none; border-radius: 4px; cursor: pointer; margin-top: 10px;">Get Case Details</button>
                  <button id="getEmailDetailsButton" style="padding: 5px 10px; background: #28a745; color: white; border: none; border-radius: 4px; cursor: pointer; margin-top: 10px;">Get Email Details</button>
              </div>
              <div id="emailDetailsSection" style="margin-top: 20px; display: none;">
                  <h4 style="margin-bottom: 10px;">Email Details</h4>
                  <ul id="emailDetailsList"></ul>
              </div>
          </div>
          <button id="closePanel" style="position: absolute; top: 10px; right: 10px; padding: 5px 10px; background: #ff0000; color: white; border: none; border-radius: 4px; cursor: pointer;">Close</button>
      `;
        document.body.appendChild(panel);
        const getCaseDetailsButton = panel.querySelector('#getCaseDetailsButton');
        const caseNumberText = panel.querySelector('#caseNumberText');
        const subjectText = panel.querySelector('#subjectText');
        const descriptionText = panel.querySelector('#descriptionText');
        if (getCaseDetailsButton && caseNumberText && subjectText && descriptionText) {
            getCaseDetailsButton.addEventListener('click', () => {
                var _a, _b, _c;
                const extractedData = getExtractedData();
                caseNumberText.innerHTML = `Case Number: <strong>${(_a = extractedData["Case Number"]) !== null && _a !== void 0 ? _a : "Not found"}</strong>`;
                subjectText.innerHTML = `Subject: <strong>${(_b = extractedData["Subject"]) !== null && _b !== void 0 ? _b : "Not found"}</strong>`;
                descriptionText.innerHTML = `Description: <strong>${(_c = extractedData["Description"]) !== null && _c !== void 0 ? _c : "Not found"}</strong>`;
            });
        }
        const getEmailDetailsButton = panel.querySelector('#getEmailDetailsButton');
        const emailDetailsSection = panel.querySelector('#emailDetailsSection');
        const emailDetailsList = panel.querySelector('#emailDetailsList');
        if (getEmailDetailsButton && emailDetailsSection && emailDetailsList) {
            getEmailDetailsButton.addEventListener('click', () => {
                emailDetailsSection.style.display = 'block';
                observeremail.observe(document.body, { childList: true, subtree: true });
            });
        }
        const closeButton = panel.querySelector('#closePanel');
        if (closeButton) {
            closeButton.addEventListener('click', () => {
                panel === null || panel === void 0 ? void 0 : panel.remove();
            });
        }
    }
};
const getExtractedData = () => {
    const fieldsToExtract = ["Case Number", "Subject", "Description"];
    const extractedData = {};
    document.querySelectorAll('.test-id__output-root').forEach((element) => {
        var _a, _b, _c, _d;
        const labelElement = element.querySelector('.test-id__field-label');
        const valueElement = element.querySelector('.test-id__field-value');
        if (labelElement && valueElement) {
            const label = (_b = (_a = labelElement.textContent) === null || _a === void 0 ? void 0 : _a.trim()) !== null && _b !== void 0 ? _b : "";
            const value = (_d = (_c = valueElement.textContent) === null || _c === void 0 ? void 0 : _c.trim()) !== null && _d !== void 0 ? _d : "";
            if (fieldsToExtract.indexOf(label) !== -1) {
                extractedData[label] = value;
            }
        }
    });
    return extractedData;
};
const observeremail = new MutationObserver(() => {
    const listItems = document.querySelectorAll('ol li');
    if (listItems.length > 0) {
        let extractedEmails = [];
        listItems.forEach(listItem => {
            var _a;
            const emailContentDiv = listItem.querySelector('.preamble_custom-summary');
            if (emailContentDiv) {
                const emailContent = (_a = emailContentDiv.textContent) === null || _a === void 0 ? void 0 : _a.trim();
                if (emailContent) {
                    console.log('Extracted email content:', emailContent);
                    extractedEmails.push(emailContent);
                }
            }
        });
        if (extractedEmails.length > 0) {
            updateEmailPanel(extractedEmails);
            observeremail.disconnect();
        }
    }
});
const updateEmailPanel = (emails) => {
    const emailDetailsList = document.querySelector('#emailDetailsList');
    if (emailDetailsList) {
        emailDetailsList.innerHTML = '';
        emails.forEach(email => {
            const listItem = document.createElement('li');
            listItem.textContent = email;
            emailDetailsList.appendChild(listItem);
        });
    }
};
const getExtractedEmailData = () => {
    var _a, _b, _c, _d, _e;
    let emailContent = null;
    const iframe = document.querySelector('ol li iframe');
    if (iframe) {
        try {
            const iframeDocument = iframe.contentDocument || ((_a = iframe.contentWindow) === null || _a === void 0 ? void 0 : _a.document);
            if (iframeDocument) {
                emailContent = (_c = (_b = iframeDocument.body) === null || _b === void 0 ? void 0 : _b.textContent) === null || _c === void 0 ? void 0 : _c.trim();
                console.log('>>>>>>>>>>>>>>    ', emailContent, '    <<<<<<<<<<<<<<<<<<<<<');
            }
        }
        catch (error) {
            console.error("Error accessing iframe content:", error);
        }
    }
    else {
        const richTextOutput = document.querySelector('emailui-rich-text-output[value]');
        if (richTextOutput) {
            const htmlContent = richTextOutput.getAttribute('value');
            if (htmlContent) {
                const parser = new DOMParser();
                const doc = parser.parseFromString(htmlContent, 'text/html');
                emailContent = (_e = (_d = doc.body) === null || _d === void 0 ? void 0 : _d.textContent) === null || _e === void 0 ? void 0 : _e.trim();
            }
        }
    }
    return emailContent;
};
injectFloatingButton();
