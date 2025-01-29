// import { Home } from 'lucide-react'
import { GrCircleQuestion, GrHome } from "react-icons/gr";
export function Header() {
    return (
        <header>
            <div className="flex gap-1">
                <button 
                    className='p-2 border-0 w-14 hover:text-trustly'
                    onClick={() => {}}
                    type='button'>
                <GrHome />
                </button>
                <button 
                    className='p-2 border-0 w-14 hover:text-trustly'
                    onClick={() => {}}
                    type='button'>
                <GrCircleQuestion />
                </button>
            </div>
        </header>
    )
}