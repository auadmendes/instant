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
