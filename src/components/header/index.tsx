import { GrCircleQuestion, GrHome } from "react-icons/gr";
import { LuTimer } from "react-icons/lu";

export function Header() {
    return (
        <header className="flex items-start justify-between p-3 bg-slate-100 w-full h-20">
            <div className="flex gap-1">
                <button 
                    className='p-2 border-0 w-8 bg-slate-50 hover:bg-slate-200 transition-all rounded-full'
                    onClick={() => {}}
                    type='button'>
                    <GrHome className="w-4 h-4 text-gray-500"/>
                </button>
                <button 
                    className='p-2 border-0 bg-slate-50 hover:bg-slate-200 transition-all rounded-full'
                    onClick={() => {}}
                    type='button'>
                    <GrCircleQuestion className="w-4 h-4 text-gray-500"/>
                </button>
            </div>
            <div className="flex items-center justify-center gap-2">
                <div 
                    className="flex items-center justify-center gap-1 
                    rounded-full p-2 bg-slate-50 hover:bg-slate-200 transition-all">
                    <button 
                        className='border-0'
                        onClick={() => {}}
                        type='button'>
                        <LuTimer />
                    </button>
                    <span className="text-xs">
                        50 min saved
                    </span>
                </div>
                <div 
                    className="flex items-center justify-center rounded-full 
                    h-6 w-6 p-1 bg-slate-50 hover:bg-slate-200 transition-all 
                    cursor-pointer">
                    L
                </div>
            </div>
        </header>
    )
}