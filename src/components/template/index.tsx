// import  { useState, useEffect, useRef } from "react";
// import { TemplateEditor } from "../editor";
// import { TemplateItem } from "./template-item";
// import { OutputData } from "@editorjs/editorjs";

// type TemplateProps = {
//   name: string;
//   template: OutputData;
// };

// export function Template() {
//   const [templateName, setTemplateName] = useState<string>("");
//   const [templates, setTemplates] = useState<TemplateProps[]>([]);

//   const templateEditorRef = useRef<{ getData: () => Promise<OutputData | undefined> } | null>(null);

//   useEffect(() => {
//     loadTemplates();
//   }, []);

//   const loadTemplates = () => {
//     chrome.storage.local.get("templatesData", (result) => {
//       const storedTemplates: TemplateProps[] = result.templatesData || [];
//       setTemplates(storedTemplates);
//     });
//   };

//   async function handleSaveTemplate() {
//     if (!templateName.trim()) {
//       alert("Please enter a template name.");
//       return;
//     }

//     try {
//       let editorData: OutputData | undefined;
//       if (templateEditorRef.current) {
//         editorData = await templateEditorRef.current.getData();
//       }

//       if (!editorData || !editorData.blocks || editorData.blocks.length === 0) {
//         alert("Please enter some content in the editor.");
//         return;
//       }

//       const newTemplate: TemplateProps = {
//         name: templateName,
//         template: editorData,
//       };

//       chrome.storage.local.get("templatesData", (result) => {
//         const storedTemplates: TemplateProps[] = result.templatesData || [];
//         const updatedTemplates = [...storedTemplates, newTemplate];

//         chrome.storage.local.set({ templatesData: updatedTemplates }, () => {
//           setTemplates(updatedTemplates);
//           setTemplateName("");
//           console.log("Template saved:", newTemplate);
//         });
//       });
//     } catch (error) {
//       console.error("Error saving template:", error);
//     }
//   }

//   function handleDeleteTemplate(nameToDelete: string) {
//     chrome.storage.local.get("templatesData", (result) => {
//       const storedTemplates: TemplateProps[] = result.templatesData || [];
//       const updatedTemplates = storedTemplates.filter(
//         (item) => item.name !== nameToDelete
//       );
//       chrome.storage.local.set({ templatesData: updatedTemplates }, () => {
//         setTemplates(updatedTemplates);
//       });
//     });
//   }

//   return (
//     <div className="flex flex-col p-3 gap-2">
//       <input
//         type="text"
//         className="w-full p-2 h-8 rounded-md border border-slate-20n outline-none focus:border-gray-400"
//         placeholder="Enter template name (e.g., -call)"
//         value={templateName}
//         onChange={(e) => setTemplateName(e.target.value)}
//       />

//       <TemplateEditor ref={templateEditorRef} />

//       <button
//         className="bg-blue-500 text-white px-3 py-2 rounded-md"
//         onClick={handleSaveTemplate}
//       >
//         Save Template
//       </button>

//       <span className="text-xs text-slate-400">My templates ({templates.length})</span>

//       <div className="flex flex-col gap-2">
//         {templates.map((item, index) => (
//           <TemplateItem
//             key={index}
//             name={item.name}
//             template={item.template}
//             onDelete={handleDeleteTemplate}  // Pass the delete function as a prop
//           />
//         ))}
//       </div>
//     </div>
//   );
// }

// import { useState, useEffect, useRef, useCallback, memo } from "react";
// import { TemplateEditor } from "../editor";
// import { TemplateItem } from "./template-item";
// import { OutputData } from "@editorjs/editorjs";

// type TemplateProps = {
//   name: string;
//   template: OutputData;
// };

// const Template = memo(() => {  // Memoize the component
//   const [templateName, setTemplateName] = useState<string>("");
//   const [templates, setTemplates] = useState<TemplateProps[]>([]);

//   const templateEditorRef = useRef<{ getData: () => Promise<OutputData | undefined> } | null>(null);

//   useEffect(() => {
//     loadTemplates();
//   }, []);

//   const loadTemplates = useCallback(() => {
//     chrome.storage.local.get("templatesData", (result) => {
//       const storedTemplates: TemplateProps[] = result.templatesData || [];
//       setTemplates(storedTemplates);
//     });
//   }, []);

//   const handleSaveTemplate = useCallback(async () => {
//     if (!templateName.trim()) {
//       alert("Please enter a template name.");
//       return;
//     }

//     try {
//       let editorData: OutputData | undefined;
//       if (templateEditorRef.current) {
//         editorData = await templateEditorRef.current.getData();
//       }

//       if (!editorData || !editorData.blocks || editorData.blocks.length === 0) {
//         alert("Please enter some content in the editor.");
//         return;
//       }

//       const newTemplate: TemplateProps = {
//         name: templateName,
//         template: editorData,
//       };

//       chrome.storage.local.get("templatesData", (result) => {
//         const storedTemplates: TemplateProps[] = result.templatesData || [];
//         const updatedTemplates = [...storedTemplates, newTemplate];

//         chrome.storage.local.set({ templatesData: updatedTemplates }, () => {
//           setTemplates(updatedTemplates);
//           setTemplateName("");
//           console.log("Template saved:", newTemplate);
//         });
//       });
//     } catch (error) {
//       console.error("Error saving template:", error);
//     }
//   }, [templateName, templateEditorRef, templates]);

//   const handleDeleteTemplate = useCallback((nameToDelete: string) => {
//     chrome.storage.local.get("templatesData", (result) => {
//       const storedTemplates: TemplateProps[] = result.templatesData || [];
//       const updatedTemplates = storedTemplates.filter(
//         (item) => item.name !== nameToDelete
//       );
//       chrome.storage.local.set({ templatesData: updatedTemplates }, () => {
//         setTemplates(updatedTemplates);
//       });
//     });
//   }, []);

//   return (
//     <div className="flex flex-col p-3 gap-2">
//       <input
//         type="text"
//         className="w-full p-2 h-8 rounded-md border border-slate-200 outline-none focus:border-gray-400"
//         placeholder="Enter template name (e.g., -call)"
//         value={templateName}
//         onChange={(e) => setTemplateName(e.target.value)}
//       />

//       <TemplateEditor ref={templateEditorRef} />

//       <button
//         className="bg-blue-500 text-white px-3 py-2 rounded-md"
//         onClick={handleSaveTemplate}
//       >
//         Save Template
//       </button>

//       <span className="text-xs text-slate-400">My templates ({templates.length})</span>

//       <div className="flex flex-col gap-2">
//         {templates.map((item, index) => (
//           <TemplateItem
//             key={index}
//             name={item.name}
//             template={item.template}
//             onDelete={handleDeleteTemplate}
//           />
//         ))}
//       </div>
//     </div>
//   );
// });

// export default Template;

console.log('anything!')

import React, { useState, useEffect, useRef, useCallback, memo } from "react";
import { TemplateEditor } from "../editor";
import { TemplateItem } from "./template-item";
import { OutputData } from "@editorjs/editorjs";

type TemplatePropsType = {
  name: string;
  template: OutputData;
};

const Template = memo(() => {
  const [templateName, setTemplateName] = useState<string>("");
  const [templates, setTemplates] = useState<TemplatePropsType[]>([]);

  // Reference for the main TemplateEditor (for new templates)
  const templateEditorRef = useRef<{ getData: () => Promise<OutputData | undefined> } | null>(null);

  useEffect(() => {
    loadTemplates();
  }, []);

  const loadTemplates = useCallback(() => {
    chrome.storage.local.get("templatesData", (result) => {
      const storedTemplates: TemplatePropsType[] = result.templatesData || [];
      setTemplates(storedTemplates);
    });
  }, []);

  const handleSaveTemplate = useCallback(async () => {
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
      const newTemplate: TemplatePropsType = {
        name: templateName,
        template: editorData,
      };

      chrome.storage.local.get("templatesData", (result) => {
        const storedTemplates: TemplatePropsType[] = result.templatesData || [];
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
  }, [templateName]);

  const handleDeleteTemplate = useCallback((nameToDelete: string) => {
    chrome.storage.local.get("templatesData", (result) => {
      const storedTemplates: TemplatePropsType[] = result.templatesData || [];
      const updatedTemplates = storedTemplates.filter(
        (item) => item.name !== nameToDelete
      );
      chrome.storage.local.set({ templatesData: updatedTemplates }, () => {
        setTemplates(updatedTemplates);
      });
    });
  }, []);

  // Called when an individual template is edited and saved.
  const handleUpdateTemplate = useCallback((name: string, updatedTemplate: OutputData) => {
    chrome.storage.local.get("templatesData", (result) => {
      const storedTemplates: TemplatePropsType[] = result.templatesData || [];
      const updatedTemplates = storedTemplates.map((item) =>
        item.name === name ? { ...item, template: updatedTemplate } : item
      );
      chrome.storage.local.set({ templatesData: updatedTemplates }, () => {
        setTemplates(updatedTemplates);
        console.log("Template updated:", updatedTemplate);
      });
    });
  }, []);

  return (
    <div className="flex flex-col p-3 gap-2">
      <input
        type="text"
        className="w-full p-2 h-8 rounded-md border border-slate-200 outline-none focus:border-gray-400"
        placeholder="Enter template name (e.g., -call)"
        value={templateName}
        onChange={(e) => setTemplateName(e.target.value)}
      />

      {/* Main TemplateEditor for creating new templates */}
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
            onDelete={handleDeleteTemplate}
            onUpdate={handleUpdateTemplate}
          />
        ))}
      </div>
    </div>
  );
});

export default Template;

console.log('anything!')

// import React, { useState, useEffect, useRef, useCallback, memo } from "react";
// import { TemplateEditor } from "../editor";
// import { TemplateItem } from "./template-item";
// import { OutputData } from "@editorjs/editorjs";

// type TemplatePropsType = {
//   name: string;
//   template: OutputData;
//   _id?: string; // Add _id for MongoDB
// };

// const Template = memo(() => {
//   const [templateName, setTemplateName] = useState<string>("");
//   const [templates, setTemplates] = useState<TemplatePropsType[]>([]);

//   // Reference for the main TemplateEditor (for new templates)
//   const templateEditorRef = useRef<{ getData: () => Promise<OutputData | undefined> } | null>(null);

//   useEffect(() => {
//     loadTemplates();
//   }, []); // Only runs once when the component mounts
  
//   const loadTemplates = useCallback(() => {
//     chrome.storage.local.get("templatesData", (result) => {
//       const storedTemplates: TemplatePropsType[] = result.templatesData || [];
//       setTemplates(storedTemplates); // Update React state to reflect templates
//       console.log("Templates loaded from Chrome storage:", storedTemplates);
//     });
//   }, []);
  

//   // const loadTemplates = useCallback(() => {
//   //   // Fetch templates from the backend API (MongoDB)
//   //   fetch("http://localhost:5000/get-templates")
//   //     .then((response) => response.json())
//   //     .then((data) => {
//   //       setTemplates(data.templates || []);
//   //       chrome.storage.local.set({ templatesData: data.templates || [] }); // Sync with Chrome storage
//   //     })
//   //     .catch((error) => console.error("Error fetching templates:", error));
//   // }, []);

//   const handleSaveTemplate = useCallback(async () => {
//     if (!templateName.trim()) {
//         alert("Please enter a template name.");
//         return;
//     }

//     try {
//         let editorData: OutputData | undefined;
//         if (templateEditorRef.current) {
//             editorData = await templateEditorRef.current.getData();
//         }

//         if (!editorData || !editorData.blocks || editorData.blocks.length === 0) {
//             alert("Please enter some content in the editor.");
//             return;
//         }

//         const newTemplate: TemplatePropsType = {
//             name: templateName,
//             template: editorData,  // Use the entire OutputData object here
//         };

//         // Save template to MongoDB via Flask API
//         const response = await fetch("http://localhost:5000/save-template", {
//             method: "POST",
//             headers: {
//                 "Content-Type": "application/json",
//             },
//             body: JSON.stringify({
//                 title: newTemplate.name,
//                 template: newTemplate.template,  // Send the entire OutputData object
//             }),
//         });

//         if (!response.ok) {
//             alert(response.statusText);
//             throw new Error("Failed to save template to MongoDB.");
//         }

//         const data = await response.json();
//         console.log(data.message); // Success message from backend

//         // Add the _id to the newTemplate object
//         const templateWithId: TemplatePropsType = {
//             ...newTemplate,
//             _id: data._id,  // _id from MongoDB response
//         };

//         // Save the template with _id to Chrome storage
//         chrome.storage.local.get("templatesData", (result) => {
//             const storedTemplates: TemplatePropsType[] = result.templatesData || [];
//             const updatedTemplates = [...storedTemplates, templateWithId];
//             chrome.storage.local.set({ templatesData: updatedTemplates }, () => {
//                 setTemplates(updatedTemplates);
//                 setTemplateName("");
//                 console.log("Template saved with _id:", templateWithId);
//             });
//         });

//     } catch (error) {
//         console.error("Error saving template:", error);
//     }
// }, [templateName]);



//   const handleDeleteTemplate = useCallback((nameToDelete: string) => {
//     chrome.storage.local.get("templatesData", (result) => {
//       const storedTemplates: TemplatePropsType[] = result.templatesData || [];
//       const updatedTemplates = storedTemplates.filter(
//         (item) => item.name !== nameToDelete
//       );
//       chrome.storage.local.set({ templatesData: updatedTemplates }, () => {
//         setTemplates(updatedTemplates);
//       });
//     });
//   }, []);

//   const handleUpdateTemplate = useCallback((name: string, updatedTemplate: OutputData) => {
//     chrome.storage.local.get("templatesData", (result) => {
//       const storedTemplates: TemplatePropsType[] = result.templatesData || [];
//       const updatedTemplates = storedTemplates.map((item) =>
//         item.name === name ? { ...item, template: updatedTemplate } : item
//       );
//       chrome.storage.local.set({ templatesData: updatedTemplates }, () => {
//         setTemplates(updatedTemplates);
//         console.log("Template updated:", updatedTemplate);
//       });
//     });
//   }, []);

//   return (
//     <div className="flex flex-col p-3 gap-2">
//       <input
//         type="text"
//         className="w-full p-2 h-8 rounded-md border border-slate-200 outline-none focus:border-gray-400"
//         placeholder="Enter template name (e.g., -call)"
//         value={templateName}
//         onChange={(e) => setTemplateName(e.target.value)}
//       />

//       {/* Main TemplateEditor for creating new templates */}
//       <TemplateEditor ref={templateEditorRef} />

//       <button
//         className="bg-blue-500 text-white px-3 py-2 rounded-md"
//         onClick={handleSaveTemplate}
//       >
//         Save Template
//       </button>

//       <span className="text-xs text-slate-400">My templates ({templates.length})</span>

//       <div className="flex flex-col gap-2">
//         {templates.map((item, index) => (
//           <TemplateItem
//             key={index}
//             name={item.name}
//             template={item.template}
//             onDelete={handleDeleteTemplate}
//             onUpdate={handleUpdateTemplate}
//           />
//         ))}
//       </div>
//     </div>
//   );
// });

// export default Template;
