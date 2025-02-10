var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { jsx as _jsx } from "react/jsx-runtime";
// import { useEffect, useRef, forwardRef, useImperativeHandle } from "react";
// import EditorJS, { OutputData } from "@editorjs/editorjs";
// export const TemplateEditor = forwardRef(
//   (props: { initialData?: OutputData }, ref) => {
//     const editorInstance = useRef<EditorJS | null>(null);
//     const editorHolder = useRef<HTMLDivElement>(null);
//     useEffect(() => {
//       if (!editorHolder.current || editorInstance.current) return; // Prevent multiple initializations
//       console.log("Initializing Editor.js...");
//       editorInstance.current = new EditorJS({
//         holder: editorHolder.current,
//         tools: {
//           paragraph: {},
//         },
//         placeholder: "Type your template content here...",
//         data: props.initialData || undefined,
//         onReady: () => {
//           console.log("Editor.js is ready!");
//         },
//       });
//       return () => {
//         if (editorInstance.current) {
//           console.log("Destroying Editor.js...");
//           editorInstance.current.destroy?.(); // Safe call to avoid errors
//           editorInstance.current = null; // Reset reference after destroying
//         }
//       };
//     }, [props.initialData]);
//     useImperativeHandle(ref, () => ({
//       getData: async (): Promise<OutputData | undefined> => {
//         return editorInstance.current?.save(); // Safe optional chaining
//       },
//     }));
//     return (
//       <div
//         ref={editorHolder}
//         id="editorjs"
//         tabIndex={0} // Makes the div focusable
//         className="p-3 h-12 overflow-hidden border border-slate-200 rounded-lg justify-start 
//         transition-all duration-300 focus-within:h-960 focus-within:overflow-auto focus:outline-none"
//       />
//     );
//   }
// );
import { useEffect, useRef, forwardRef, useImperativeHandle } from "react";
import EditorJS from "@editorjs/editorjs";
export const TemplateEditor = forwardRef((props, ref) => {
    const editorInstance = useRef(null);
    const editorHolder = useRef(null);
    useEffect(() => {
        if (!editorHolder.current || editorInstance.current)
            return; // Prevent multiple initializations
        console.log("Initializing Editor.js...");
        editorInstance.current = new EditorJS({
            holder: editorHolder.current,
            tools: {
                paragraph: {},
            },
            placeholder: "Type your template content here...",
            data: props.initialData || undefined,
            onReady: () => {
                console.log("Editor.js is ready!");
            },
        });
        return () => {
            var _a, _b;
            if (editorInstance.current) {
                console.log("Destroying Editor.js...");
                (_b = (_a = editorInstance.current).destroy) === null || _b === void 0 ? void 0 : _b.call(_a);
                editorInstance.current = null;
            }
        };
    }, [props.initialData]);
    useImperativeHandle(ref, () => ({
        getData: () => __awaiter(void 0, void 0, void 0, function* () {
            if (!editorInstance.current)
                return undefined;
            const data = yield editorInstance.current.save();
            console.log("Raw saved data:", data);
            // Filter out empty blocks
            if (data && data.blocks) {
                data.blocks = data.blocks.filter((block) => block.data &&
                    typeof block.data.text === "string" &&
                    block.data.text.trim().length > 0);
            }
            console.log("Filtered saved data:", data);
            return data;
        }),
    }));
    return (_jsx("div", { ref: editorHolder, id: "editorjs", tabIndex: 0, className: "w-full p-3 h-12 overflow-hidden border border-slate-200 rounded-lg justify-start \r\n        transition-all duration-300 focus-within:h-40 focus-within:overflow-auto focus:outline-none" }));
});
