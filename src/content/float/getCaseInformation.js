"use strict";
const getExtractedCaseInformationData = () => {
    const fieldsToExtract = ["Case Number", "Subject", "Description"];
    const extractedData = {};
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
        var _a, _b, _c, _d;
        const labelElement = element.querySelector('.test-id__field-label');
        const valueElement = element.querySelector('.test-id__field-value');
        if (labelElement && valueElement) {
            const label = (_b = (_a = labelElement.textContent) === null || _a === void 0 ? void 0 : _a.trim()) !== null && _b !== void 0 ? _b : "";
            const value = (_d = (_c = valueElement.textContent) === null || _c === void 0 ? void 0 : _c.trim()) !== null && _d !== void 0 ? _d : "";
            if (fieldsToExtract.includes(label)) {
                extractedData[label] = value;
            }
        }
    });
    return extractedData;
};
