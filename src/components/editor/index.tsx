import { useEffect, useRef, forwardRef, useImperativeHandle } from "react";
import EditorJS, { OutputData } from "@editorjs/editorjs";

export const TemplateEditor = forwardRef(
  (props: { initialData?: OutputData }, ref) => {
    const editorInstance = useRef<EditorJS | null>(null);
    const editorHolder = useRef<HTMLDivElement>(null);

    useEffect(() => {
      if (!editorHolder.current || editorInstance.current) return; // Prevent multiple initializations

      console.log("Initializing Editor.js...");
      const editor = new EditorJS({
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

      editorInstance.current = editor;

      return () => {
        if (editorInstance.current) {
          try {
            editorInstance.current.destroy();
          } catch (error) {
            console.error('Error destroying Editor.js instance', error);
          }
        }
      };
    }, [props.initialData]);

    useImperativeHandle(ref, () => ({
      getData: async (): Promise<OutputData | undefined> => {
        if (!editorInstance.current) return undefined;
        return editorInstance.current.save();
      },
    }));

    return (
        <div
          ref={editorHolder}
          id="editorjs"
          tabIndex={0} // makes the div focusable
          className="p-3 h-12 overflow-hidden border border-slate-200 rounded-lg justify-start transition-all duration-300 focus-within:h-40 focus-within:overflow-auto focus:outline-none"
        />
      );
  }
);
