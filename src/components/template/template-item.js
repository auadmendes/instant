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
// import { MdDeleteOutline } from "react-icons/md";
// import { OutputData } from "@editorjs/editorjs"; // Import OutputData type
// interface TemplateProps {
//   name: string;
//   template: OutputData;
//   onDelete: (name: string) => void;  // Add the delete handler prop
// }
// export function TemplateItem({ name, template, onDelete }: TemplateProps) {
//   return (
//     <div
//       className="flex justify-between items-center w-full rounded-lg bg-white border border-gray-200 gap-2 p-6 hover:bg-gray-200 hover:bg-opacity-20"
//     >
//       <div className="flex flex-col">
//         <span className="text-gray-500 text-lg font-medium">{name}</span>
//         <span className="font-thin text-xs">
//           {template.blocks.map((block, index) => (
//             <div key={index} dangerouslySetInnerHTML={{ __html: block.data.text }} />
//           ))}
//         </span>
//       </div>
//       <div className="cursor-pointer">
//         <button
//           className="border-0"
//           onClick={() => onDelete(name)}  // Trigger the delete handler when clicked
//         >
//           <MdDeleteOutline className="w-5 h-5 text-gray-500" />
//         </button>
//       </div>
//     </div>
//   );
// }
////////////////////////////////////////
// import { useState, useRef } from "react";
// import { MdDeleteOutline, MdEdit, MdSave } from "react-icons/md";
// import { OutputData } from "@editorjs/editorjs";
// import { TemplateEditor } from "../editor";
// interface TemplateItemProps {
//   name: string;
//   template: OutputData;
//   onDelete: (name: string) => void;
//   onUpdate: (name: string, newTemplate: OutputData) => void;
// }
// export function TemplateItem({
//   name,
//   template,
//   onDelete,
//   onUpdate,
// }: TemplateItemProps) {
//   // Local state to track whether we are in edit mode.
//   const [isEditing, setIsEditing] = useState<boolean>(false);
//   // Create a ref for the TemplateEditor to get updated data.
//   const editorRef = useRef<{ getData: () => Promise<OutputData | undefined> } | null>(null);
//   const handleSave = async () => {
//     if (editorRef.current) {
//       const updatedData = await editorRef.current.getData();
//       if (updatedData) {
//         onUpdate(name, updatedData);
//         setIsEditing(false);
//       }
//     }
//   };
//   return (
//     <div
//       className="flex justify-between items-center w-full rounded-lg bg-white border border-gray-200 gap-2 p-6 hover:bg-gray-200 hover:bg-opacity-20"
//     >
//       <div className="flex flex-col w-full">
//         <span className="text-gray-500 text-lg font-medium">{name}</span>
//         <div className="font-thin text-xs">
//           {isEditing ? (
//             // Render the TemplateEditor with the current template as initialData when editing.
//             <TemplateEditor ref={editorRef} initialData={template} />
//           ) : (
//             // Render the template's content.
//             template.blocks.map((block, index) => (
//               <div key={index} dangerouslySetInnerHTML={{ __html: block.data.text }} />
//             ))
//           )}
//         </div>
//       </div>
//       <div className="flex gap-2 items-center">
//         {isEditing ? (
//           <button onClick={handleSave} className="border-0">
//             <MdSave className="w-5 h-5 text-gray-500" title="Save" />
//           </button>
//         ) : (
//           <button onClick={() => setIsEditing(true)} className="border-0">
//             <MdEdit className="w-5 h-5 text-gray-500" title="Edit" />
//           </button>
//         )}
//         <button onClick={() => onDelete(name)} className="border-0">
//           <MdDeleteOutline className="w-5 h-5 text-gray-500" title="Delete" />
//         </button>
//       </div>
//     </div>
//   );
// }
/////////////////////////
import { useState, useRef } from "react";
import { MdDeleteOutline, MdEdit, MdSave } from "react-icons/md";
import { TemplateEditor } from "../editor";
export function TemplateItem({ name, template, onDelete, onUpdate, }) {
    // Local state to determine if the item is in edit mode.
    const [isEditing, setIsEditing] = useState(false);
    // Reference to the TemplateEditor for the editing instance.
    const editorRef = useRef(null);
    const handleSaveEdit = () => __awaiter(this, void 0, void 0, function* () {
        if (editorRef.current) {
            const updatedData = yield editorRef.current.getData();
            if (updatedData) {
                onUpdate(name, updatedData);
                setIsEditing(false);
            }
        }
    });
    return (_jsxs("div", { className: "flex justify-between items-center w-full rounded-lg bg-white border border-gray-200 gap-2 p-6 hover:bg-gray-200 hover:bg-opacity-20", children: [_jsxs("div", { className: "flex flex-col w-full", children: [_jsx("span", { className: "text-gray-500 text-lg font-medium", children: name }), _jsx("div", { className: "font-thin text-xs", children: isEditing ? (
                        // Render TemplateEditor in edit mode, preloaded with the current template data.
                        _jsx(TemplateEditor, { ref: editorRef, initialData: template })) : (
                        // Render the saved content. (Using dangerouslySetInnerHTML if needed.)
                        template.blocks.map((block, index) => (_jsx("div", { dangerouslySetInnerHTML: { __html: block.data.text } }, index)))) })] }), _jsxs("div", { className: "flex gap-2 items-center", children: [isEditing ? (_jsx("button", { onClick: handleSaveEdit, className: "border-0", children: _jsx(MdSave, { className: "w-5 h-5 text-gray-500", title: "Save" }) })) : (_jsx("button", { onClick: () => setIsEditing(true), className: "border-0", children: _jsx(MdEdit, { className: "w-5 h-5 text-gray-500", title: "Edit" }) })), _jsx("button", { onClick: () => onDelete(name), className: "border-0", children: _jsx(MdDeleteOutline, { className: "w-5 h-5 text-gray-500", title: "Delete" }) })] })] }));
}
