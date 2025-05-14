
import { useEffect, useRef, forwardRef, useImperativeHandle } from "react";
import EditorJS, { OutputData } from "@editorjs/editorjs";

export const TemplateEditor = forwardRef(
  (props: { initialData?: OutputData }, ref) => {
    const editorInstance = useRef<EditorJS | null>(null);
    const editorHolder = useRef<HTMLDivElement>(null);

    useEffect(() => {
      if (!editorHolder.current || editorInstance.current) return; // Prevent multiple initializations

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
        if (editorInstance.current) {
          console.log("Destroying Editor.js...");
          editorInstance.current.destroy?.();
          editorInstance.current = null;
        }
      };
    }, [props.initialData]);

    useImperativeHandle(ref, () => ({
      getData: async (): Promise<OutputData | undefined> => {
        if (!editorInstance.current) return undefined;
        const data = await editorInstance.current.save();
        console.log("Raw saved data:", data);
        // Filter out empty blocks
        if (data && data.blocks) {
          data.blocks = data.blocks.filter(
            (block) =>
              block.data &&
              typeof block.data.text === "string" &&
              block.data.text.trim().length > 0
          );
        }
        console.log("Filtered saved data:", data);
        return data;
      },
    }));

    return (
      <div
        ref={editorHolder}
        id="editorjs"
        tabIndex={0} // Makes the div focusable
        className="w-full p-3 h-12 overflow-hidden border border-slate-200 rounded-lg justify-start 
        transition-all duration-300 focus-within:h-40 focus-within:overflow-auto focus:outline-none"
      />
    );
  }
);

//import { useEffect, useRef, forwardRef, useImperativeHandle } from "react";
// import EditorJS, { OutputData, ToolConstructable } from "@editorjs/editorjs";

// // Import Editor.js tools
// import Paragraph from "@editorjs/paragraph";
// import Header from "@editorjs/header";
// import List from "@editorjs/list";
// import Marker from "@editorjs/marker";
// import Checklist from "@editorjs/checklist";
// import InlineCode from "@editorjs/inline-code";
// import LinkTool from "@editorjs/link";

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
//           paragraph: Paragraph as unknown as ToolConstructable,
//           header: {
//             class: Header as unknown as ToolConstructable,
//             config: {
//               levels: [2, 3, 4],
//               defaultLevel: 2,
//             },
//           },
//           list: List as unknown as ToolConstructable,
//           marker: Marker as unknown as ToolConstructable,
//           checklist: Checklist as unknown as ToolConstructable,
//           inlineCode: InlineCode as unknown as ToolConstructable,
//           linkTool: {
//             class: LinkTool as unknown as ToolConstructable,
//             config: {
//               endpoint: "https://your-backend.com/fetchUrl", // Optional: Replace with a real API for link previews
//             },
//           },
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
//           editorInstance.current.destroy?.();
//           editorInstance.current = null;
//         }
//       };
//     }, [props.initialData]);

//     useImperativeHandle(ref, () => ({
//       getData: async (): Promise<OutputData | undefined> => {
//         if (!editorInstance.current) return undefined;
//         const data = await editorInstance.current.save();
//         console.log("Raw saved data:", data);

//         // Improved filtering to recognize more content types
//         if (data && data.blocks) {
//           data.blocks = data.blocks.filter((block) => {
//             if (!block.data) return false;

//             if (typeof block.data.text === "string" && block.data.text.trim().length > 0) {
//               return true; // Keep text blocks
//             }

//             if (Array.isArray(block.data.items) && block.data.items.length > 0) {
//               return true; // Keep lists and checklists
//             }

//             if (block.type === "header" && block.data.text?.trim().length > 0) {
//               return true; // Keep headers
//             }

//             return false;
//           });
//         }

//         console.log("Filtered saved data:", data);
//         return data;
//       },
//     }));

//     return (
//       <div
//         ref={editorHolder}
//         id="editorjs"
//         tabIndex={0} // Makes the div focusable
//         className="w-full p-3 h-12 overflow-hidden border border-slate-200 rounded-lg justify-start 
//         transition-all duration-300 focus-within:h-40 focus-within:overflow-auto focus:outline-none"
//       />
//     );
//   }
// );
