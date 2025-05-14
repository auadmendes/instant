var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
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
console.log('anything!');
import { useState, useEffect, useRef, useCallback, memo } from "react";
import { TemplateEditor } from "../editor";
import { TemplateItem } from "./template-item";
const Template = memo(() => {
    const [templateName, setTemplateName] = useState("");
    const [templates, setTemplates] = useState([]);
    // Reference for the main TemplateEditor (for new templates)
    const templateEditorRef = useRef(null);
    useEffect(() => {
        loadTemplates();
    }, []);
    const loadTemplates = useCallback(() => {
        chrome.storage.local.get("templatesData", (result) => {
            const storedTemplates = result.templatesData || [];
            setTemplates(storedTemplates);
        });
    }, []);
    const handleSaveTemplate = useCallback(() => __awaiter(void 0, void 0, void 0, function* () {
        if (!templateName.trim()) {
            alert("Please enter a template name.");
            return;
        }
        try {
            let editorData;
            if (templateEditorRef.current) {
                editorData = yield templateEditorRef.current.getData();
            }
            if (!editorData || !editorData.blocks || editorData.blocks.length === 0) {
                alert("Please enter some content in the editor.");
                return;
            }
            const newTemplate = {
                name: templateName,
                template: editorData,
            };
            chrome.storage.local.get("templatesData", (result) => {
                const storedTemplates = result.templatesData || [];
                const updatedTemplates = [...storedTemplates, newTemplate];
                chrome.storage.local.set({ templatesData: updatedTemplates }, () => {
                    setTemplates(updatedTemplates);
                    setTemplateName("");
                    console.log("Template saved:", newTemplate);
                });
            });
        }
        catch (error) {
            console.error("Error saving template:", error);
        }
    }), [templateName]);
    const handleDeleteTemplate = useCallback((nameToDelete) => {
        chrome.storage.local.get("templatesData", (result) => {
            const storedTemplates = result.templatesData || [];
            const updatedTemplates = storedTemplates.filter((item) => item.name !== nameToDelete);
            chrome.storage.local.set({ templatesData: updatedTemplates }, () => {
                setTemplates(updatedTemplates);
            });
        });
    }, []);
    // Called when an individual template is edited and saved.
    const handleUpdateTemplate = useCallback((name, updatedTemplate) => {
        chrome.storage.local.get("templatesData", (result) => {
            const storedTemplates = result.templatesData || [];
            const updatedTemplates = storedTemplates.map((item) => item.name === name ? Object.assign(Object.assign({}, item), { template: updatedTemplate }) : item);
            chrome.storage.local.set({ templatesData: updatedTemplates }, () => {
                setTemplates(updatedTemplates);
                console.log("Template updated:", updatedTemplate);
            });
        });
    }, []);
    return (_jsxs("div", { className: "flex flex-col p-3 gap-2", children: [_jsx("input", { type: "text", className: "w-full p-2 h-8 rounded-md border border-slate-200 outline-none focus:border-gray-400", placeholder: "Enter template name (e.g., -call)", value: templateName, onChange: (e) => setTemplateName(e.target.value) }), _jsx(TemplateEditor, { ref: templateEditorRef }), _jsx("button", { className: "bg-blue-500 text-white px-3 py-2 rounded-md", onClick: handleSaveTemplate, children: "Save Template" }), _jsxs("span", { className: "text-xs text-slate-400", children: ["My templates (", templates.length, ")"] }), _jsx("div", { className: "flex flex-col gap-2", children: templates.map((item, index) => (_jsx(TemplateItem, { name: item.name, template: item.template, onDelete: handleDeleteTemplate, onUpdate: handleUpdateTemplate }, index))) })] }));
});
export default Template;
console.log('anything!');
