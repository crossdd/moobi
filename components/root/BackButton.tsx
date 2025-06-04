'use client'

import { Button } from '../ui/button'
import { LuArrowLeft } from 'react-icons/lu'
import { useRouter } from 'next/navigation'

const BackButton = () => {
    const router = useRouter()

    return (
        <Button onClick={() => router.back()} className="flex items-center gap-3 px-4 py-3 text-sm text-gray-300 hover:text-white transition-colors group">
            <LuArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
            <span>Go Back</span>
        </Button>
    )
}

export default BackButton