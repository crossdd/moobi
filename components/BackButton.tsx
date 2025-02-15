'use client'

import { ArrowLeft } from "lucide-react"
import { useRouter } from "next/navigation"
import { Button } from "./ui/button"

const BackButton = () => {
    const router = useRouter()

    return (
        <Button
            onClick={() => router.back()}
            className="inline-flex items-center text-sm text-violet-500 mb-8"
        >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Go Back
        </Button>

    )
}

export default BackButton