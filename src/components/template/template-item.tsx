import { MdDeleteOutline } from "react-icons/md";

interface TemplateProps {
    name:string;
    template: string;
}

export function TemplateItem({name, template}: TemplateProps) {
    return (
        <div 
            className="flex justify-between items-center 
            w-full rounded-lg bg-slate-200 gap-2 p-6 hover:bg-indigo-400 hover:bg-opacity-20">
            <div className="flex flex-col">
                <span className="text-gray-500 text-lg font-medium">
                    {name}
                </span>
                <span className="font-thin text-xs">
                    {template}
                </span>
            </div>
            <div>
                <button className="border-0">
                    <MdDeleteOutline className="w-5 h-5 text-gray-500" />
                </button>
            </div>
        </div>
    )
}