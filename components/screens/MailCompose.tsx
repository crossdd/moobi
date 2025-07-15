"use client"

import {FormEvent, useState} from "react"
import emailjs from '@emailjs/browser'
import {useMedia} from "@/context/MediaContext";
import {BiPaperPlane, BiPencil} from "react-icons/bi";
import {BsCheckCircle, BsEmojiSmile} from "react-icons/bs";
import {GrGallery} from "react-icons/gr";
import {LuLoaderPinwheel} from "react-icons/lu";

const MailCompose = () => {
    const {setCurrentScreen} = useMedia()

    const [fromEmail, setFromEmail] = useState("")
    const [toEmail, setToEmail] = useState("epiphanusonyeso05@gmail.com")
    const [subject, setSubject] = useState("")
    const [body, setBody] = useState("")
    const [errors, setErrors] = useState({
        fromEmail: "",
        toEmail: "",
        subject: "",
        body: "",
    })
    const [isSending, setIsSending] = useState(false)
    const [showSuccess, setShowSuccess] = useState(false)

    // Validate email format
    const validateEmail = (email: string) => {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        return re.test(email)
    }

    const validateForm = () => {
        const newErrors = {
            fromEmail: "",
            toEmail: "",
            subject: "",
            body: "",
        }

        let isValid = true

        if (!fromEmail.trim()) {
            newErrors.fromEmail = "Your email is required"
            isValid = false
        } else if (!validateEmail(fromEmail)) {
            newErrors.fromEmail = "Invalid email address"
            isValid = false
        }

        if (!toEmail.trim()) {
            newErrors.toEmail = "Add at least one recipient"
            isValid = false
        } else if (!validateEmail(toEmail)) {
            newErrors.toEmail = "Invalid email address"
            isValid = false
        }

        // if (!subject.trim()) {
        //     newErrors.subject = "Subject is required"
        //     isValid = false
        // }

        if (!body.trim()) {
            newErrors.body = "What's your message?"
            isValid = false
        }

        setErrors(newErrors)
        return isValid
    }

    const resetForm = () => {
        setFromEmail("")
        setToEmail("epiphanusonyeso05@gmail.com")
        setSubject("")
        setBody("")
    }

    // const isNotComplete = !fromEmail.trim() || !toEmail.trim() || !body.trim() || !subject.trim()

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const isValid = validateForm()
        if (!isValid) return;

        setIsSending(true)

        const sendEmail = await emailjs.send(
            process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!,
            process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID!,
            {
                to_email: toEmail,
                from_email: fromEmail,
                subject,
                body
            },
            {
                publicKey: process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY!,
                limitRate: { throttle: 5000 },
            })

        if (sendEmail.status === 200) {
            setIsSending(false)
            setShowSuccess(true)
            resetForm()

            const timer = setTimeout(() => {
                setShowSuccess(false)
            }, 2000)
            return () => clearTimeout(timer)
        } else {
            setIsSending(false)
            setErrors({
                fromEmail: '',
                toEmail: '',
                subject: '',
                body: "There seems to be an error"
            })
        }
    }

    return (
        <form onSubmit={handleSubmit} className="relative w-full h-full overflow-y-scroll mt-10 no-visible-scrollbar">
            {/* Navigation Bar */}
            <div className="border-b border-gray-300">
                <div className="flex justify-between items-center px-4 py-3">
                    <button
                        type="button"
                        className="text-blue-500 font-medium"
                        onClick={() => setCurrentScreen('home')}
                    >Cancel</button>
                    <button
                        type="submit"
                        disabled={isSending}
                        className={`text-blue-500 font-medium disabled:text-blue-500/65`}
                    >
                        {!isSending ? <BiPaperPlane /> : <LuLoaderPinwheel className="spin-custom" />}
                    </button>
                </div>
            </div>

            {/* Email Form */}
            <div className="flex-1 overflow-y-auto">
                {/* Success Message */}
                {showSuccess && (
                    <div className="bg-green-100 text-green-700 p-4 animate-fade-in-out">
                        <div className="flex items-center gap-2">
                            <BsCheckCircle size={18}/>
                            <p>Email sent</p>
                        </div>
                    </div>
                )}

                {/* To Field */}
                <div className="border-b border-gray-300">
                    <div className="flex px-4 py-2">
                        <div className="w-16 text-gray-500 pt-2">To:</div>
                        <div className="flex-1">
                            <input
                                type="email"
                                value={toEmail}
                                onChange={(e) => setToEmail(e.target.value)}
                                className="text-sm w-full py-2 focus:outline-none bg-transparent text-white"
                            />
                            {errors.toEmail && <div className="text-red-400 text-xs mt-1">{errors.toEmail}</div>}
                        </div>
                    </div>
                </div>

                {/* From Field */}
                <div className="border-b border-gray-300">
                    <div className="flex px-4 py-2">
                        <div className="w-16 text-gray-500 pt-2">From:</div>
                        <div className="flex-1">
                            <input
                                type="email"
                                value={fromEmail}
                                onChange={(e) => setFromEmail(e.target.value)}
                                placeholder="your@email.com"
                                className="text-sm w-full py-2 focus:outline-none bg-transparent text-white"
                            />
                            {errors.fromEmail && <div className="text-red-400 text-xs mt-1">{errors.fromEmail}</div>}
                        </div>
                    </div>
                </div>

                {/* Subject Field */}
                <div className="border-b border-gray-300">
                    <div className="flex px-4 py-2">
                        <div className="w-16 text-gray-500 pt-2">Subject:</div>
                        <div className="flex-1 flex-col">
                            <input
                                type="text"
                                value={subject}
                                onChange={(e) => setSubject(e.target.value)}
                                placeholder="Let's work together"
                                className="text-sm w-full py-2 focus:outline-none bg-transparent text-white"
                            />
                            {errors.subject && <div className="text-red-400 text-xs mt-1">{errors.subject}</div>}
                        </div>
                    </div>
                </div>

                {/* Message Body */}
                <div className="flex-1 p-4">
                    <textarea
                        value={body}
                        onChange={(e) => setBody(e.target.value)}
                        placeholder="Type your message here..."
                        className="text-sm w-full h-64 focus:outline-none resize-none bg-transparent text-white"
                    />
                    {errors.body && <div className="text-red-400 text-xs mt-1">{errors.body}</div>}
                </div>
            </div>

            {/* Bottom Toolbar */}
            <div className="border-t border-gray-300 p-2">
                <div className="flex justify-between">
                    <div className="p-2 rounded-full">
                        <svg className="w-6 h-6 text-gray-600" fill="currentColor" viewBox="0 0 20 20">
                            <path
                                fillRule="evenodd"
                                d="M8 4a3 3 0 00-3 3v4a3 3 0 006 0V7a1 1 0 112 0v4a5 5 0 01-10 0V7a5 5 0 0110 0v1.5a1.5 1.5 0 01-3 0V7a1 1 0 012 0v4a3 3 0 01-6 0V7a3 3 0 013-3h2a3 3 0 013 3v4a3 3 0 01-3 3H9a1 1 0 000 2h2a5 5 0 005-5V7a5 5 0 00-5-5H8z"
                                clipRule="evenodd"
                            />
                        </svg>
                    </div>

                    <div className="p-2 rounded-full text-gray-300">
                        <GrGallery size={20} />
                    </div>

                    <div className="p-2 rounded-full text-gray-300">
                       <BsEmojiSmile size={20} />
                    </div>

                    <div className="p-2 rounded-full text-gray-300">
                        <BiPencil size={20} />
                    </div>
                </div>
            </div>
        </form>
    )
}

export default MailCompose