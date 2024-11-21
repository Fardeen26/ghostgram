"use client"

import { useDarkMode } from "@/hooks/useDarkMode";
import { MoonIcon, SunIcon } from "lucide-react";

export default function PublicPageNavbar() {
    const { isDarkMode, toggleDarkMode } = useDarkMode();
    return (
        <nav className="flex justify-center pt-6">
            <div className="flex justify-end w-[55vw] max-sm:w-full max-sm:px-10">
                <div className='flex items-center border p-2 rounded-full' onClick={toggleDarkMode}>
                    <button>
                        {isDarkMode ? <MoonIcon className='w-[18px] h-[18px] max-sm:w-[14px] max-sm:h-[14px]' /> : <SunIcon className='w-5 h-5 max-sm:w-[15px] max-sm:h-[15px]' />}
                    </button>
                </div>
            </div>
        </nav>
    )
}