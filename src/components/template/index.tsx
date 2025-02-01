import { useState, useEffect } from "react";

import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

import { TemplateItem } from "./template-item";

type TemplateProps = {
  name: string;
  template: string;
};

export function Template() {
  const [templateName, setTemplateName] = useState<string>(""); // Template call (-template)
  const [templateContent, setTemplateContent] = useState<string>(""); // Actual template text
  const [templates, setTemplates] = useState<TemplateProps[]>([]); // Stored templates

  // Load stored templates when the component mounts
  useEffect(() => {
    async function loadTemplates() {
      try {
        const storedTemplates = await getStoredTemplates();
        setTemplates(storedTemplates);
      } catch (error) {
        console.warn(error);
        setTemplates([]); // Default to empty array if no data is found
      }
    }
    loadTemplates();
  }, []);

  async function handleSaveTemplate() {
    if (!templateName.trim() || !templateContent.trim()) return; // Prevent empty saves

    try {
      const newTemplate: TemplateProps = { name: templateName, template: templateContent };

      // Get existing templates from storage
      const storedTemplates = await getStoredTemplates();

      // Avoid duplicates
      const updatedTemplates = [...storedTemplates, newTemplate];

      // Save to Chrome storage
      await chrome.storage.local.set({ templatesData: updatedTemplates });

      // Update state
      setTemplates(updatedTemplates);
      setTemplateName(""); // Clear input fields after saving
      setTemplateContent("");
    } catch (error) {
      console.error("Error saving template:", error);
    }
  }

  async function handleDeleteTemplate(templateName: string) {
    try {
      // Get existing templates from storage
      const storedTemplates = await getStoredTemplates();
      console.log(JSON.stringify(storedTemplates))
      // Remove the selected template
      const updatedTemplates = storedTemplates.filter((item) => item.name !== templateName);

      // Save updated templates back to Chrome storage
      await chrome.storage.local.set({ templatesData: updatedTemplates });

      // Update state
      setTemplates(updatedTemplates);
    } catch (error) {
      console.error("Error deleting template:", error);
    }
  }

  return (
    <div className="flex flex-col p-3 gap-2">
      <input
        type="text"
        className="w-full p-2 h-8 rounded-md border border-slate-400"
        placeholder="Enter template name (e.g., -template)"
        value={templateName}
        onChange={(e) => setTemplateName(e.target.value)}
      />
      
      <textarea
        className="w-full p-2 rounded-md border border-slate-400 h-24"
        placeholder="Enter template content..."
        value={templateContent}
        onChange={(e) => setTemplateContent(e.target.value)}
      />
      <div className="border p-2 rounded-md">
                <ReactMarkdown remarkPlugins={[remarkGfm]}>
                    {templateContent}
                </ReactMarkdown>
            </div>

      <button
        className="bg-blue-500 text-white px-3 py-2 rounded-md"
        onClick={handleSaveTemplate}
      >
        Save Template
      </button>

      <span className="text-xs text-slate-400">
        My templates ({templates.length})
      </span>

      <div className="flex flex-col gap-2">
        {templates.map((item, index) => (
          <div key={index} className="flex justify-between items-center border p-2 rounded-md">
            <TemplateItem name={item.name} template={item.template} />
            <button
              className="bg-red-500 text-white px-2 py-1 rounded-md"
              onClick={() => handleDeleteTemplate(item.name)}
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

// Function to get stored templates
export async function getStoredTemplates(): Promise<TemplateProps[]> {
  return new Promise((resolve, reject) => {
    chrome.storage.local.get("templatesData", (result) => {
      const templatesDataStored: TemplateProps[] = result.templatesData || [];
      resolve(templatesDataStored);
    });
  });
}
