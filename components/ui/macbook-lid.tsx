import emailjs from "@emailjs/browser";
import { FormEvent, useState } from "react";
import { FaArrowRight } from "react-icons/fa6";

const Lid = ({
    message,
    setMessage,
    setCursorPosition,
    textareaRef,
}: {
    message: string;
    setMessage: React.Dispatch<React.SetStateAction<string>>;
    setCursorPosition: React.Dispatch<React.SetStateAction<number>>;
    textareaRef: React.RefObject<HTMLTextAreaElement | null>;
}) => {
    const [placeholder, setPlaceholder] = useState("Want to work with me? Drop your email and I will get back to you! P.S. This keyboard works")
    const [isSuccess, setIsSuccess] = useState(false)

    const handleTextareaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setMessage(e.target.value)
    }

    const handleTextareaSelect = (e: React.SyntheticEvent<HTMLTextAreaElement>) => {
        const target = e.target as HTMLTextAreaElement
        setCursorPosition(target.selectionStart || 0)
    }

    const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
        // Prevent tab from moving focus
        if (e.key === "Tab") {
            e.preventDefault()
            const target = e.target as HTMLTextAreaElement
            const start = target.selectionStart || 0
            const end = target.selectionEnd || 0

            // Insert tab at cursor position
            const newValue = message.substring(0, start) + "    " + message.substring(end)
            setMessage(newValue)

            // Move cursor after the inserted tab
            setCursorPosition(start + 4)
        }
    }

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        const sendEmail = await emailjs.send(
            process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!,
            process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID!,
            {
                email: message,
            },
            {
                publicKey: process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY!,
                limitRate: { throttle: 5000 },
            })

        console.log({ sendEmail })
        if (sendEmail.status === 200) {
            setMessage("")
            setPlaceholder("I have received your email. Be back in a jiffy!")
            setIsSuccess(true)
        } else {
            setPlaceholder("Something went wrong. Please try again.")
        }
    }

    return (
        <form onSubmit={handleSubmit} className="relative [perspective:800px]">
            <div
                style={{
                    transform: "perspective(800px) rotateX(-25deg) translateZ(0px)",
                    transformOrigin: "bottom",
                    transformStyle: "preserve-3d",
                }}
                className="relative h-[12rem] w-[32rem] rounded-2xl border border-neutral-500 bg-[#010101] p-2"
            />
            <div
                style={{
                    transform: "perspective(1200px) rotateX(-45deg) translateY(50px) translateZ(0px)",
                    transformOrigin: "top",
                    transformStyle: "preserve-3d",
                }}
                className="absolute inset-0 flex flex-col gap-4 justify-start h-full w-[32rem] p-4"
            >
                <div className="flex items-center">
                    <textarea
                        ref={textareaRef}
                        value={message}
                        onChange={handleTextareaChange}
                        onKeyDown={handleKeyDown}
                        onSelect={handleTextareaSelect}
                        disabled={isSuccess}
                        autoFocus
                        placeholder={placeholder}
                        className="w-full h-full bg-transparent text-white font-mono text-lg resize-none outline-none border-none focus:ring-0 placeholder-white/50"
                        style={{ caretColor: "#8b5cf6" }}
                    />

                    {message.length > 0 && (
                        <button type="submit" className="w-7 h-7 bg-violet-500 rounded-full p-1">
                            <FaArrowRight fill="white" size={20} />
                        </button>
                    )}
                </div>
            </div>
        </form>
    )
}

export default Lid