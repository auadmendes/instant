const automationPNG = chrome.runtime.getURL("../../assets/automation.png");
//import im from ;
//const automationPNG = chrome.runtime.getURL("/assets/automation.png");

const img = document.createElement('img');
img.src = chrome.runtime.getURL("src/assets/automation.png");
img.alt = 'Open Panel';
img.style.width = '60%';
img.style.height = '60%';
img.style.objectFit = 'contain';



const injectFloatingButton = () => {
//   console.log('Injecting floating button...');

  const floatingButton = document.createElement('button');
  floatingButton.style.position = 'fixed';
  floatingButton.style.right = '10px';
  floatingButton.style.top = '49%';
  floatingButton.style.padding = '0';
  floatingButton.style.borderRadius = '50%';
  floatingButton.style.backgroundColor = '#0176d3'; //'#ACE1AF';
  floatingButton.style.color = '#fff';
  floatingButton.style.fontSize = '30px';
  floatingButton.style.border = 'none';
  floatingButton.style.cursor = 'pointer';
  floatingButton.style.width = '40px';
  floatingButton.style.height = '40px';
  floatingButton.style.display = 'flex';
  floatingButton.style.alignItems = 'center';
  floatingButton.style.justifyContent = 'center';
  floatingButton.style.boxShadow = '0 4px 5px rgba(0, 0, 0, 0.2)';
  floatingButton.textContent = '+';
  floatingButton.style.zIndex = '9999';
  floatingButton.appendChild(img);

  let isDragging = false;
  let offsetX: number, offsetY: number;

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
        panel.style.maxWidth = '600px';
        panel.style.height = '400px';
        panel.style.backgroundColor = 'white';
        panel.style.borderRadius = '8px';
        panel.style.boxShadow = '0 4px 5px rgba(0, 0, 0, 0.2)';
        panel.style.overflow = 'auto';
        panel.style.zIndex = '9999';

        panel.innerHTML = `
            <div style="padding: 20px;">
                <h3 style="margin-bottom: 10px; font-size: 18px; font-weight: 600;">Case Overview</h3>
                <div>
                    <p id="caseNumberText">Case Number: Not retrieved yet</p>
                    <p id="subjectText">Subject: Not retrieved yet</p>
                    <p id="descriptionText">Description: Not retrieved yet</p>
                    <button id="getCaseDetailsButton" style="padding: 5px 10px; background: #007bff; color: white; border: none; border-radius: 4px; cursor: pointer; margin-top: 10px;">Get Case Details</button>
                    <button id="getEmailDetailsButton" style="padding: 5px 10px; background: #28a745; color: white; border: none; border-radius: 4px; cursor: pointer; margin-top: 10px;">Get Email Details</button>
                </div>
                <div id="emailDetailsSection" style="margin-top: 20px; display: none;">
                    <h3 style="margin-bottom: 10px;"><strong>Email Details </strong></h3>
                    <ul id="emailDetailsList"></ul>
                </div>
                <div style="display: flex; gap: 10px; margin-top: 10px;">
                    <button id="summarizeButton" style="flex: 1; padding: 5px 10px; background: #ffcc00; color: black; border: none; border-radius: 4px; cursor: pointer;">Summarize</button>
                    <button id="createCommentButton" style="flex: 1; padding: 5px 10px; background: #6c63ff; color: white; border: none; border-radius: 4px; cursor: pointer;">Create Case Comment</button>
                </div>

                <div id="summarySection" style="margin-top: 20px; display: none; padding: 10px; border: 1px solid #ccc; background-color: #f9f9f9;">
                    <h3 style="margin-bottom: 10px;"><strong>Summary</strong></h3>
                    <p id="summaryText">Not generated yet</p>
                </div>
                <div style="margin-top: 20px;">
                    <label for="kbQuestionInput" style="font-weight: 600; display: block; margin-bottom: 5px;">Ask a question to the knowledge base:</label>
                    <textarea id="kbQuestionInput" placeholder="Ask a question or provide extra information..." rows="4" style="width: 100%; padding: 8px; border: 1px solid #ccc; border-radius: 4px; resize: vertical;"></textarea>
                    <!--<input id="kbQuestionInput" type="text" placeholder="e.g., What is the root cause?" style="width: 100%; padding: 8px; border: 1px solid #ccc; border-radius: 4px;" />-->
                    <button id="askKbQuestionButton" style="margin-top: 10px; padding: 5px 10px; background: #673ab7; color: white; border: none; border-radius: 4px; cursor: pointer;">Ask AI</button>
                </div>
            </div>
            <button id="closePanel" style="position: absolute; top: 10px; right: 10px; padding: 5px 10px; background: #ff0000; color: white; border: none; border-radius: 4px; cursor: pointer;">Close</button>
            <!-- -->
            <!--<button id="getTableDataButton" style="padding: 5px 10px; background: #17a2b8; color: white; border: none; border-radius: 4px; cursor: pointer; margin-top: 10px;">Get Table Data</button>-->
            <div id="tableMessageSection" style="margin-top: 10px; font-weight: bold;"></div>
            
            <!-- <button id="getEnvelopeSummary">Get Envelope Summary</button> -->
            <div id="commentResult" style="margin-top: 15px; padding: 10px; background: #fff3cd; border-left: 4px solid #ffeeba; border-radius: 4px; display: none;"></div>
            
            <button id="getKnowledgeBaseButton" style="flex: 1; padding: 5px 10px; background: #00bcd4; color: white; border: none; border-radius: 4px; cursor: pointer;">Get Knowledge Base</button>

            <div id="responsePanel"></div>
        `;

        document.body.appendChild(panel);

        // Get case details
        const getTableDataButton = panel.querySelector('#getTableDataButton') as HTMLElement;
        const tableMessageSection = panel.querySelector('#tableMessageSection') as HTMLElement;
        const getKnowledgeBaseButton = panel.querySelector('#getKnowledgeBaseButton') as HTMLElement;

        const askKbQuestionButton = panel.querySelector('#askKbQuestionButton') as HTMLElement;
        const kbQuestionInput = panel.querySelector('#kbQuestionInput') as HTMLInputElement;

        if (askKbQuestionButton && kbQuestionInput) {
            askKbQuestionButton.addEventListener('click', async () => {
                const question = kbQuestionInput.value.trim();
                if (!question) {
                    alert("Please enter a question.");
                    return;
                }
        
                // Optional: Remove this block to allow sending just the question
                // const kbText = getExtractedKnowledgeBaseText();
                // if (!kbText) {
                //     alert("No knowledge base text found.");
                //     return;
                // }
        
                const response = await fetch('http://localhost:5000/ask', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ question }) // send only the question
                });
        
                const result = await response.json();
        
                const responsePanel = panel?.querySelector('#responsePanel');
                if (responsePanel) {
                    responsePanel.innerHTML = `
                        <div style="margin-top: 20px; padding: 10px; background: #e3f2fd; border-left: 4px solid #2196f3; border-radius: 4px;">
                            <strong>AI Response:</strong>
                            <p>${result.answer}</p>
                        </div>
                    `;
                }
            });
        }
        

        if (getKnowledgeBaseButton) {
            getKnowledgeBaseButton.addEventListener('click', () => {
                const kbText = getExtractedKnowledgeBaseText(); // use your existing function
        
                if (!kbText) {
                    alert("No knowledge base content found.");
                    return;
                }
        
                navigator.clipboard.writeText(kbText)
                    .then(() => {
                        alert("📋 Knowledge Base text copied to clipboard!");
                    })
                    .catch((err) => {
                        console.error("❌ Clipboard error:", err);
                        alert("Failed to copy to clipboard.");
                    });
            });
        }

        if (getTableDataButton) {
            getTableDataButton.addEventListener('click', () => {
                const tableText = getTableDataIAC(); // Extract table data (ensure this function exists)
                console.log("📋 Table Data Extracted:", tableText);
        
                // Show success message instead of displaying data in panel
                tableMessageSection.textContent = "✅ Table loaded successfully!";
                tableMessageSection.style.color = "#155724"; // Dark green
                tableMessageSection.style.backgroundColor = "#d4edda"; // Light green
                tableMessageSection.style.padding = "5px";
                tableMessageSection.style.borderRadius = "4px";
            });
        }

        const getCaseDetailsButton = panel.querySelector('#getCaseDetailsButton');
        const caseNumberText = panel.querySelector('#caseNumberText');
        const subjectText = panel.querySelector('#subjectText');
        const descriptionText = panel.querySelector('#descriptionText');

        if (getCaseDetailsButton) {
            getCaseDetailsButton.addEventListener('click', () => {
                const extractedData = getExtractedData();
                if (caseNumberText) {
                    caseNumberText.innerHTML = `Case Number: <strong>${extractedData["Case Number"] ?? "Not found"}</strong>`;
                }
                if (subjectText) {
                    subjectText.innerHTML = `Subject: <strong>${extractedData["Subject"] ?? "Not found"}</strong>`;
                }
                if (descriptionText) {
                    descriptionText.innerHTML = `Description: <strong>${extractedData["Description"] ?? "Not found"}</strong>`;
                }
            });
        }

        // Get email details
        const getEmailDetailsButton = panel.querySelector('#getEmailDetailsButton') as HTMLElement;
        const emailDetailsSection = panel.querySelector('#emailDetailsSection') as HTMLElement;
        const emailDetailsList = panel.querySelector('#emailDetailsList') as HTMLUListElement;

        if (getEmailDetailsButton) {
            getEmailDetailsButton.addEventListener('click', () => {
                emailDetailsSection.style.display = 'block';

                const extractedEmails = getExtractedEmailData();
                emailDetailsList.innerHTML = '';

                if (extractedEmails.length === 0) {
                    emailDetailsList.innerHTML = '<li>No emails found.</li>';
                    return;
                }

                extractedEmails.forEach(emailText => {
                    const li = document.createElement('li');
                    li.style.borderBottom = '1px solid #e0e0e0';
                    li.style.marginBottom = '10px';
                    li.innerHTML = `<span>${emailText}</span>`;
                    emailDetailsList.appendChild(li);
                });
            });
        }

        // Summarize button
        const summarizeButton = panel.querySelector('#summarizeButton') as HTMLElement;
        const summarySection = panel.querySelector('#summarySection') as HTMLElement;
        const summaryText = panel.querySelector('#summaryText') as HTMLElement;
        const createCommentButton = panel.querySelector('#createCommentButton') as HTMLElement;

        if (createCommentButton) {
            createCommentButton.addEventListener('click', async () => {
                const caseDetails = getExtractedData();
                const emailDetails = getExtractedEmailData();
                const kbQuestionInput = document.querySelector('#kbQuestionInput');
        
                const combinedText = `
                    Case Overview
                    Case Number: ${caseDetails["Case Number"] ?? "Not found"}
        
                    Subject: ${caseDetails["Subject"] ?? "Not found"}
        
                    Description: ${caseDetails["Description"] ?? "Not found"}
        
                    ${emailDetails.length > 0 ? "Email Details:\n" + emailDetails.join("\n") : ""}
                    Extra information from the agent: ${(kbQuestionInput as HTMLInputElement)?.value?.trim() ?? "Not provided"}
                `;
        
                // console.log("📝 Sending data to /comment-only route: ------------------", combinedText);
        
                createCommentButton.textContent = "Generating...";
                createCommentButton.setAttribute('disabled', 'true');
        
                try {
                    const response = await fetch("http://127.0.0.1:5000/comment-only", {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json"
                        },
                        body: JSON.stringify({ text: combinedText })
                    });
        
                    const data = await response.json();
                    console.log("🗒️ Generated Comment:", data.comment);
        
                    const commentResult = panel?.querySelector('#commentResult') as HTMLElement;
                    if (commentResult) {
                        commentResult.innerHTML = data.comment;
                        commentResult.style.display = 'block';
                    }
                } catch (error) {
                    console.error("❌ Error generating comment:", error);
                    alert("Failed to generate comment.");
                } finally {
                    createCommentButton.textContent = "Generate Case Comment";
                    createCommentButton.removeAttribute('disabled');
                }
            });
        }

        if (summarizeButton) {
            summarizeButton.addEventListener('click', async () => {
                const caseDetails = getExtractedData();
                const emailDetails = getExtractedEmailData();
                const kbQuestionInput = document.querySelector('#kbQuestionInput');

                const combinedText = `
                    Case Overview
                    Case Number: ${caseDetails["Case Number"] ?? "Not found"}

                    Subject: ${caseDetails["Subject"] ?? "Not found"}

                    Description: ${caseDetails["Description"] ?? "Not found"}
                    
                    Extra: ${(kbQuestionInput as HTMLInputElement)?.value?.trim() ?? "Not provided"}


                    ${emailDetails.length > 0 ? "Email Details:\n" + emailDetails.join("\n") : ""}
                `;

                console.log("📨 Sending data to summarization API:", combinedText);
                // Seting loading state
                const originalButtonText = summarizeButton.textContent;
                summarizeButton.textContent = "Summarizing...";
                summarizeButton.setAttribute('disabled', 'true');
                summarySection.style.display = 'block';
                summaryText.innerHTML = `<em>Generating summary, please wait...</em>`;

                try {
                    const response = await fetch('http://127.0.0.1:5000/summarize', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({ text: combinedText })
                    });

                    const data = await response.json();

                    console.log("📩 Summary received:", data);

                    summaryText.innerHTML = data.summary ?? "No summary available";
                    summarySection.style.display = 'block';
                } catch (error) {
                    console.error("❌ Error fetching summary:", error);
                    summaryText.innerHTML = "Failed to get summary.";
                    summarySection.style.display = 'block';
                } finally {
                    summarizeButton.textContent = originalButtonText;
                    summarizeButton.removeAttribute('disabled');
                }
            });
        }

        // if (summarizeButton) {
        //     summarizeButton.addEventListener('click', async () => {
        //         const originalButtonText = summarizeButton.textContent; // <-- ✅ fix is here
        
        //         const caseDetails = getExtractedData();
        //         const emailDetails = getExtractedEmailData();
        
        //         const combinedText = `
        //             Case Overview
        //             Case Number: ${caseDetails["Case Number"] ?? "Not found"}
        
        //             Subject: ${caseDetails["Subject"] ?? "Not found"}
        
        //             Description: ${caseDetails["Description"] ?? "Not found"}
        
        //             ${emailDetails.length > 0 ? "Email Details:\n" + emailDetails.join("\n") : ""}
        //         `;
        
        //         // Get optional question input
        //         const kbQuestionInput = document.querySelector('#kbQuestionInput');
        //         const extraQuestion = (kbQuestionInput as HTMLInputElement)?.value.trim();
        
        //         console.log("📨 Sending data to summarization API:", combinedText);
        //         summarizeButton.textContent = "Summarizing...";
        //         summarizeButton.setAttribute('disabled', 'true');
        //         summarySection.style.display = 'block';
        //         summaryText.innerHTML = `<em>Generating summary, please wait...</em>`;
        
        //         try {
        //             // Build payload
        //             const payload: { text: string; question?: string } = { text: combinedText };
        //             if (extraQuestion) {
        //                 payload.question = extraQuestion;
        //             }
        
        //             const response = await fetch('http://127.0.0.1:5000/summarize', {
        //                 method: 'POST',
        //                 headers: {
        //                     'Content-Type': 'application/json'
        //                 },
        //                 body: JSON.stringify(payload)
        //             });
        
        //             const data = await response.json();
        
        //             console.log("📩 Summary received:", data);
        
        //             summaryText.innerHTML = data.summary ?? "No summary available";
        //             summarySection.style.display = 'block';
        //         } catch (error) {
        //             console.error("❌ Error fetching summary:", error);
        //             summaryText.innerHTML = "Failed to get summary.";
        //             summarySection.style.display = 'block';
        //         } finally {
        //             summarizeButton.textContent = originalButtonText;
        //             summarizeButton.removeAttribute('disabled');
        //         }
        //     });
        // }
        

        // Close button
        const closeButton = panel.querySelector('#closePanel');
        if (closeButton) {
            closeButton.addEventListener('click', () => {
                panel?.remove();
                //panel?.remove();
            });
        }
    }
};

  

const getExtractedData = () => {
    const fieldsToExtract = ["Subject", "Description"];
    const fieldsToExtractSubject = ["Case Number"];
    const extractedData: Record<string, string> = {};

    // Select the active container
    const activeDiv = document.querySelector('.windowViewMode-maximized.active.lafPageHost');

    if (!activeDiv) {
        console.warn("Active div not found.");
        return extractedData;
    }

    // Find all relevant sections inside the active div
    const sectionContents = activeDiv.querySelectorAll('.test-id__section-content.slds-section__content.section__content.slds-p-horizontal_small');
    const sectionContent = activeDiv.querySelector('.test-id__section-content.slds-section__content.section__content.slds-p-horizontal_small');

    if (!sectionContent) {
        console.warn("Section content not found within active div.");
        return extractedData;
    }

    if (!sectionContents.length) {
        console.warn("No section content found within active div.");
        return extractedData;
    }

    sectionContent.querySelectorAll('.test-id__output-root').forEach((element) => {
        const labelElement = element.querySelector('.test-id__field-label');
        const valueElement = element.querySelector('.test-id__field-value lightning-formatted-text');

        if (labelElement && valueElement) {
            const label = labelElement.textContent?.trim() ?? "";
            let value = valueElement.textContent?.trim() ?? "";

            // Handle multi-line descriptions (replace <br> with newlines)
            value = value.replace(/<br\s*\/?>/gi, "\n");

            if (fieldsToExtractSubject.includes(label)) {
                extractedData[label] = value;
            }
        }
    });

    // Loop through each section to find Subject and Description
    sectionContents.forEach((section) => {
        section.querySelectorAll('records-record-layout-item').forEach((recordItem) => {
            const labelElement = recordItem.querySelector('.test-id__field-label');
            const valueElement = recordItem.querySelector('.test-id__field-value lightning-formatted-text');

            if (labelElement && valueElement) {
                const label = labelElement.textContent?.trim() ?? "";
                let value = valueElement.textContent?.trim() ?? "";

                // Handle multi-line descriptions (replace <br> with newlines)
                value = value.replace(/<br\s*\/?>/gi, "\n");

                if (fieldsToExtract.includes(label)) {
                    extractedData[label] = value;
                }
            }
        });
    });

    return extractedData;
};


const updateEmailPanel = (emails: string[]) => {
  const emailDetailsList = document.querySelector('#emailDetailsList') as HTMLUListElement;
  if (emailDetailsList) {
    emailDetailsList.innerHTML = '';
    emails.forEach(email => {
        const listItem = document.createElement('li');
        listItem.textContent = email;
        emailDetailsList.appendChild(listItem);
    });
}
};

const getTableDataIAC = () => {
    const table = document.querySelector('.ContentOverFlow table'); // Find the table
    if (!table) {
        console.warn("Table not found.");
        return "Table not found.";
    }

    let tableData: string[][] = [];

    table.querySelectorAll('tr').forEach((row) => {
        let rowData: string[] = [];
        row.querySelectorAll('td, th').forEach((cell) => {
            rowData.push(cell.textContent?.trim() ?? ""); // Extract cell text
        });
        tableData.push(rowData);
    });

    return tableData.map(row => row.join(' | ')).join('\n'); // Format the data
};


// const getExtractedEmailData = () => {
//     const extractedEmails: string[] = [];

//     // Find the container with `.resizeCaptureFrameWrapper > .skip-feed-wrapper`
//     const container = document.querySelector('.resizeCaptureFrameWrapper .skip-feed-wrapper');

//     if (!container) {
//         console.warn("Container not found.");
//         return extractedEmails;
//     }

//     // Find the <div> that contains the feed
//     const feedDiv = container.querySelector('div[data-feed-type="Record"]');

//     if (!feedDiv) {
//         console.warn("Feed div not found.");
//         return extractedEmails;
//     }

//     // Find the <ol> inside the feed div
//     const listElement = feedDiv.querySelector('ol');

//     if (!listElement) {
//         console.warn("Ordered list <ol> not found.");
//         return extractedEmails;
//     }

//     // Loop through each <li> inside the <ol>
//     listElement.querySelectorAll('li').forEach((listItem) => {
//         const emailText = listItem.textContent?.trim() ?? "";
//         if (emailText) {
//             extractedEmails.push(emailText);
//         }
//     });
//     console.log("📧 Extracted Emails ------------------------------------------------------ :", extractedEmails);
//     return extractedEmails;
// };

// const getExtractedEmailData = (): string[] => {
//     const extractedEmails: string[] = [];

//     // Step 1: Find the container
//     const container = document.querySelector('.resizeCaptureFrameWrapper .skip-feed-wrapper');
//     if (!container) {
//         console.warn("⚠️ Container not found.");
//         return extractedEmails;
//     }

//     // Step 2: Find all record feed divs inside the container (there might be more than one!)
//     const feedDivs = container.querySelectorAll('div[data-feed-type="Record"]');

//     if (!feedDivs.length) {
//         console.warn("⚠️ No feed divs found.");
//         return extractedEmails;
//     }

//     // Step 3: For each feed, extract its <ol> and <li> content
//     feedDivs.forEach(feedDiv => {
//         const listElement = feedDiv.querySelector('ol');
//         if (!listElement) {
//             console.warn("⚠️ No <ol> found in one of the feed divs.");
//             return;
//         }

//         // Step 4: Loop through each <li> and get its trimmed text content
//         listElement.querySelectorAll('li').forEach(listItem => {
//             const rawText = listItem.textContent?.trim();
//             if (rawText && rawText.length > 0) {
//                 extractedEmails.push(rawText);
//             }
//         });
//     });

//     console.log("📧 Extracted Clean Email Texts:", extractedEmails);
//     return extractedEmails;
// };

const getExtractedEmailData = (): string[] => {
    const extractedEmails: string[] = [];

    const container = document.querySelector('.resizeCaptureFrameWrapper .skip-feed-wrapper');
    if (!container) {
        console.warn("⚠️ Container not found.");
        return extractedEmails;
    }

    const feedDivs = container.querySelectorAll('div[data-feed-type="Record"]');
    if (!feedDivs.length) {
        console.warn("⚠️ No feed divs found.");
        return extractedEmails;
    }

    feedDivs.forEach(feedDiv => {
        const listElement = feedDiv.querySelector('ol');
        if (!listElement) return;

        listElement.querySelectorAll('li').forEach(listItem => {
            const rawText = listItem.textContent?.trim() ?? "";

            // Skip if it matches a system metadata block (starts with common labels)
            const isSystemMetadata = /^Subject:|^Business Impact:|^Genesys Queue Name:|^Image|^Contact Name:|^Status Detail:|^Preferred Contact Method:|^Support Alert Notes:/i.test(rawText);
            
            if (rawText.length > 0 && !isSystemMetadata) {
                extractedEmails.push(rawText);
            }
        });
    });

    console.log("📧 Extracted Clean Email Texts:", extractedEmails);
    return extractedEmails;
};

const getExtractedKnowledgeBaseText = (): string => {
    let knowledgeText = "";

    // Step 1: Get the active Salesforce container
    const activeDiv = document.querySelector('.windowViewMode-maximized.active.lafPageHost');
    if (!activeDiv) {
        console.warn("🧠 Active div not found.");
        return knowledgeText;
    }

    // Step 2: Select all the target rows
    const rows = activeDiv.querySelectorAll('records-record-layout-row.slds-form__row');
    if (!rows.length) {
        console.warn("🧠 No records-record-layout-row elements found.");
        return knowledgeText;
    }

    rows.forEach(row => {
        // Look for slots or textual content within the row
        const slot = row.querySelector('slot');
        if (slot) {
            const text = slot.textContent?.trim() ?? "";
            if (text.length > 0) {
                knowledgeText += text + "\n\n";
            }
        }
    });

    knowledgeText = knowledgeText.trim();

    if (knowledgeText.length === 0) {
        console.warn("🧠 No meaningful text found in Knowledge_base section.");
    }

    return knowledgeText;
};

const copyTextToClipboard = (text: string) => {
    navigator.clipboard.writeText(text).then(() => {
        console.log("📋 Knowledge_base copied to clipboard!");
    }).catch(err => {
        console.error("❌ Failed to copy to clipboard:", err);
    });
};


injectFloatingButton();

