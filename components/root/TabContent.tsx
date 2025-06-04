'use client'

import { useWindowSize } from "@/hooks/useWindowSize"
import { ReactNode } from "react"
import { LuCheckCheck } from "react-icons/lu"

const TabContent = ({ contents, children }: { contents: string[], children?: ReactNode }) => {
    const { width } = useWindowSize()
    const isSmall = width < 360

    // const content = isSmall ? contents.slice(0, 2) : contents

    return (
        <div className="w-full flex overflow-hidden relative xsx:h-[20rem] xs:h-[18rem] rounded-2xl p-10 shadow-xl backdrop-blur-xl bg-black/10 border border-white/20">
            <ul className="flex flex-col gap-3">
                {contents.map((item, idx) => (
                    <li key={idx} className='font-medium flex gap-4'>
                        <div className='w-4'>
                            <LuCheckCheck color='#8b5cf6' size={23} />
                        </div>
                        <span className={`flex lg:text-2xl ${isSmall ? 'text-base' : 'text-xl'}`}>
                            {item}
                        </span>
                    </li>
                ))}
            </ul>

            {children}
        </div>
    )
}

export default TabContent