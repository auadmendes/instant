import { MdDeleteOutline } from "react-icons/md";
import { OutputData } from "@editorjs/editorjs"; // Import OutputData type

interface TemplateProps {
  name: string;
  template: OutputData;
  onDelete: (name: string) => void;  // Add the delete handler prop
}

export function TemplateItem({ name, template, onDelete }: TemplateProps) {
  return (
    <div
      className="flex justify-between items-center w-full rounded-lg bg-white border border-gray-200 gap-2 p-6 hover:bg-gray-200 hover:bg-opacity-20"
    >
      <div className="flex flex-col">
        <span className="text-gray-500 text-lg font-medium">{name}</span>
        <span className="font-thin text-xs">
          {template.blocks.map((block, index) => (
            <div key={index} dangerouslySetInnerHTML={{ __html: block.data.text }} />
          ))}
        </span>
      </div>
      <div className="cursor-pointer">
        <button
          className="border-0"
          onClick={() => onDelete(name)}  // Trigger the delete handler when clicked
        >
          <MdDeleteOutline className="w-5 h-5 text-gray-500" />
        </button>
      </div>
    </div>
  );
}
