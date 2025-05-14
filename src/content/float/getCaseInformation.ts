const getExtractedCaseInformationData = () => {
    const fieldsToExtract = ["Case Number", "Subject", "Description"];
    const extractedData: Record<string, string> = {};
  
    // Select the active container
    const activeDiv = document.querySelector('.windowViewMode-maximized.active.lafPageHost');
  
    if (!activeDiv) {
      console.warn("Active div not found.");
      return extractedData;
    }
  
    // Find the relevant section inside the active div
    const sectionContent = activeDiv.querySelector('.test-id__section-content.slds-section__content.section__content.slds-p-horizontal_small');
  
    if (!sectionContent) {
      console.warn("Section content not found within active div.");
      return extractedData;
    }
  
    // Extract data only from elements inside this section
    sectionContent.querySelectorAll('.test-id__output-root').forEach((element) => {
      const labelElement = element.querySelector('.test-id__field-label');
      const valueElement = element.querySelector('.test-id__field-value');
  
      if (labelElement && valueElement) {
        const label = labelElement.textContent?.trim() ?? "";
        const value = valueElement.textContent?.trim() ?? "";
  
        if (fieldsToExtract.includes(label)) {
          extractedData[label] = value;
        }
      }
    });
  
    return extractedData;
  };
  