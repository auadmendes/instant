import React, { useState, useEffect, useRef } from "react";
import { TemplateEditor } from "../editor";
import { TemplateItem } from "./template-item";
import { OutputData } from "@editorjs/editorjs";

type TemplateProps = {
  name: string;
  template: OutputData;
};

export function Template() {
  const [templateName, setTemplateName] = useState<string>("");
  const [templates, setTemplates] = useState<TemplateProps[]>([]);

  const templateEditorRef = useRef<{ getData: () => Promise<OutputData | undefined> } | null>(null);

  useEffect(() => {
    loadTemplates();
  }, []);

  const loadTemplates = () => {
    chrome.storage.local.get("templatesData", (result) => {
      const storedTemplates: TemplateProps[] = result.templatesData || [];
      setTemplates(storedTemplates);
    });
  };

  async function handleSaveTemplate() {
    if (!templateName.trim()) {
      alert("Please enter a template name.");
      return;
    }

    try {
      let editorData: OutputData | undefined;
      if (templateEditorRef.current) {
        editorData = await templateEditorRef.current.getData();
      }

      if (!editorData || !editorData.blocks || editorData.blocks.length === 0) {
        alert("Please enter some content in the editor.");
        return;
      }

      const newTemplate: TemplateProps = {
        name: templateName,
        template: editorData,
      };

      chrome.storage.local.get("templatesData", (result) => {
        const storedTemplates: TemplateProps[] = result.templatesData || [];
        const updatedTemplates = [...storedTemplates, newTemplate];

        chrome.storage.local.set({ templatesData: updatedTemplates }, () => {
          setTemplates(updatedTemplates);
          setTemplateName("");
          console.log("Template saved:", newTemplate);
        });
      });
    } catch (error) {
      console.error("Error saving template:", error);
    }
  }

  function handleDeleteTemplate(nameToDelete: string) {
    chrome.storage.local.get("templatesData", (result) => {
      const storedTemplates: TemplateProps[] = result.templatesData || [];
      const updatedTemplates = storedTemplates.filter(
        (item) => item.name !== nameToDelete
      );
      chrome.storage.local.set({ templatesData: updatedTemplates }, () => {
        setTemplates(updatedTemplates);
      });
    });
  }

  return (
    <div className="flex flex-col p-3 gap-2">
      <input
        type="text"
        className="w-full p-2 h-8 rounded-md border border-slate-20n outline-none focus:border-gray-400"
        placeholder="Enter template name (e.g., -call)"
        value={templateName}
        onChange={(e) => setTemplateName(e.target.value)}
      />

      <TemplateEditor ref={templateEditorRef} />

      <button
        className="bg-blue-500 text-white px-3 py-2 rounded-md"
        onClick={handleSaveTemplate}
      >
        Save Template
      </button>

      <span className="text-xs text-slate-400">My templates ({templates.length})</span>

      <div className="flex flex-col gap-2">
        {templates.map((item, index) => (
          <TemplateItem
            key={index}
            name={item.name}
            template={item.template}
            onDelete={handleDeleteTemplate}  // Pass the delete function as a prop
          />
        ))}
      </div>
    </div>
  );
}
