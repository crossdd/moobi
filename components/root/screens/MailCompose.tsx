"use client"

import { Dispatch, FormEvent, SetStateAction, useState } from "react"
import emailjs from '@emailjs/browser'

interface MailComposeProps {
    setCurrentScreen: Dispatch<SetStateAction<ScreenDisplay>>
}

const MailCompose = ({ setCurrentScreen }: MailComposeProps) => {
    const [fromEmail, setFromEmail] = useState("")
    const [subject, setSubject] = useState("")
    const [body, setBody] = useState("")
    const [errors, setErrors] = useState({
        fromEmail: "",
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
            subject: "",
            body: "",
        }

        let isValid = true

        if (!fromEmail) {
            newErrors.fromEmail = "Sender email is required"
            isValid = false
        } else if (!validateEmail(fromEmail)) {
            newErrors.fromEmail = `The address <${fromEmail}> is invalid`
            isValid = false
        }

        if (!subject.trim()) {
            newErrors.body = "Subject is required"
            isValid = false
        }

        if (!body.trim()) {
            newErrors.body = "Message body is required"
            isValid = false
        }

        setErrors(newErrors)
        return isValid
    }

    const resetForm = () => {
        setFromEmail("")
        setSubject("")
        setBody("")
    }

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const isValid = validateForm()
        if (!isValid) return;

        setIsSending(true)

        const sendEmail = await emailjs.send(
            process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!,
            process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID!,
            {
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
                subject: '',
                body: "There seems to be an error"
            })
        }
    }

    return (
        <form onSubmit={handleSubmit} className="w-full h-full bg-gray-100 flex flex-col">
            {/* Navigation Bar */}
            <div className="bg-gray-100 border-b border-gray-300">
                <div className="flex justify-between items-center px-4 py-3">
                    <button
                        type="button"
                        className="text-blue-500 font-medium"
                        onClick={() => setCurrentScreen('home')}
                    >Cancel</button>
                    <button
                        type="submit"
                        // disabled={!isFormValid() || isSending}
                        className={`text-blue-500 font-medium disabled:text-blue-500/65`}
                    >
                        {isSending ? "Sending..." : "Send"}
                    </button>
                </div>
            </div>

            {/* Email Form */}
            <div className="flex-1 overflow-y-auto">
                {/* Success Message */}
                {showSuccess && (
                    <div className="bg-green-100 border-l-4 border-green-500 text-green-700 p-4 mb-4 animate-fade-in-out">
                        <div className="flex items-center">
                            <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                                <path
                                    fillRule="evenodd"
                                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                                    clipRule="evenodd"
                                />
                            </svg>
                            <p>Email sent successfully!</p>
                        </div>
                    </div>
                )}

                {/* To Field */}
                <div className="border-b border-gray-300 bg-white">
                    <div className="flex px-4 py-2">
                        <div className="w-16 text-gray-500 pt-2">To:</div>
                        <div className="flex-1">
                            <input
                                type="email"
                                value="onyesoepiphanus@gmail.com"
                                disabled
                                className="w-full py-2 text-sm"
                            />
                        </div>
                    </div>
                </div>

                {/* From Field */}
                <div className="border-b border-gray-300 bg-white">
                    <div className="flex px-4 py-2">
                        <div className="w-16 text-gray-500 pt-2">From:</div>
                        <div className="flex-1">
                            <input
                                type="email"
                                value={fromEmail}
                                onChange={(e) => setFromEmail(e.target.value)}
                                placeholder="your@email.com"
                                className="w-full py-2 focus:outline-none"
                            />
                            {errors.fromEmail && <div className="text-red-500 text-xs mt-1">{errors.fromEmail}</div>}
                        </div>
                    </div>
                </div>

                {/* Subject Field */}
                <div className="border-b border-gray-300 bg-white">
                    <div className="flex px-4 py-2">
                        <div className="w-16 text-gray-500 pt-2">Subject:</div>
                        <div className="flex-1 flex-col">
                            <input
                                type="text"
                                value={subject}
                                onChange={(e) => setSubject(e.target.value)}
                                placeholder="Subject"
                                className="w-full py-2 focus:outline-none"
                            />
                            {errors.body && <div className="text-red-500 text-xs mt-1">{errors.body}</div>}
                        </div>
                    </div>
                </div>

                {/* Message Body */}
                <div className="flex-1 bg-white p-4">
                    <textarea
                        value={body}
                        onChange={(e) => setBody(e.target.value)}
                        placeholder="Type your message here..."
                        className="w-full h-64 focus:outline-none resize-none"
                    />
                    {errors.body && <div className="text-red-500 text-xs mt-1">{errors.body}</div>}
                </div>
            </div>

            {/* Bottom Toolbar */}
            <div className="bg-gray-200 border-t border-gray-300 p-2">
                <div className="flex justify-between">
                    <button className="p-2 rounded-full hover:bg-gray-300">
                        <svg className="w-6 h-6 text-gray-600" fill="currentColor" viewBox="0 0 20 20">
                            <path
                                fillRule="evenodd"
                                d="M8 4a3 3 0 00-3 3v4a3 3 0 006 0V7a1 1 0 112 0v4a5 5 0 01-10 0V7a5 5 0 0110 0v1.5a1.5 1.5 0 01-3 0V7a1 1 0 012 0v4a3 3 0 01-6 0V7a3 3 0 013-3h2a3 3 0 013 3v4a3 3 0 01-3 3H9a1 1 0 000 2h2a5 5 0 005-5V7a5 5 0 00-5-5H8z"
                                clipRule="evenodd"
                            />
                        </svg>
                    </button>

                    <button className="p-2 rounded-full hover:bg-gray-300">
                        <svg className="w-6 h-6 text-gray-600" fill="currentColor" viewBox="0 0 20 20">
                            <path
                                fillRule="evenodd"
                                d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z"
                                clipRule="evenodd"
                            />
                        </svg>
                    </button>

                    <button className="p-2 rounded-full hover:bg-gray-300">
                        <svg className="w-6 h-6 text-gray-600" fill="currentColor" viewBox="0 0 20 20">
                            <path
                                fillRule="evenodd"
                                d="M10 18a8 8 0 100-16 8 8 0 000 16zM7 9a1 1 0 100-2 1 1 0 000 2zm7-1a1 1 0 11-2 0 1 1 0 012 0zm-7.536 5.879a1 1 0 001.415 0 3 3 0 014.242 0 1 1 0 001.415-1.415 5 5 0 00-7.072 0 1 1 0 000 1.415z"
                                clipRule="evenodd"
                            />
                        </svg>
                    </button>

                    <button className="p-2 rounded-full hover:bg-gray-300">
                        <svg className="w-6 h-6 text-gray-600" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                        </svg>
                    </button>
                </div>
            </div>
        </form>
    )
}

export default MailCompose