"use client";

import emailjs from "@emailjs/browser";
import React, { FormEvent, useCallback, useRef, useState, } from "react";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa6";
import { cn } from "@/lib/utils";
import { LuLoaderPinwheel } from "react-icons/lu";

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
    const [type, setType] = useState<"email" | "message">("email");
    const [email, setEmail] = useState("");
    const [placeholder, setPlaceholder] = useState("Enter your email |");
    const [isSending, setIsSending] = useState(false);
    const [animating, setAnimating] = useState(false);

    const canvasRef = useRef<HTMLCanvasElement>(null);
    const newDataRef = useRef<any[]>([]);

    const draw = useCallback(() => {
        if (!textareaRef.current) return;
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        canvas.width = 800;
        canvas.height = 800;
        ctx.clearRect(0, 0, 800, 800);

        const computedStyles = getComputedStyle(textareaRef.current);
        const fontSize = parseFloat(computedStyles.getPropertyValue("font-size"));
        ctx.font = `${fontSize * 2}px ${computedStyles.fontFamily}`;
        ctx.fillStyle = "#8b5cf6";
        ctx.fillText(message, 16, 40);

        const imageData = ctx.getImageData(0, 0, 800, 800);
        const pixelData = imageData.data;
        const newData: any[] = [];

        for (let t = 0; t < 800; t++) {
            let i = 4 * t * 800;
            for (let n = 0; n < 800; n++) {
                let e = i + 4 * n;
                if (
                    pixelData[e] !== 0 &&
                    pixelData[e + 1] !== 0 &&
                    pixelData[e + 2] !== 0
                ) {
                    newData.push({
                        x: n,
                        y: t,
                        color: [
                            pixelData[e],
                            pixelData[e + 1],
                            pixelData[e + 2],
                            pixelData[e + 3],
                        ],
                    });
                }
            }
        }

        newDataRef.current = newData.map(({ x, y, color }) => ({
            x,
            y,
            r: 1,
            color: `rgba(${color[0]}, ${color[1]}, ${color[2]}, ${color[3]})`,
        }));
    }, [message, textareaRef]);

    const animate = (start: number) => {
        const animateFrame = (pos: number = 0) => {
            requestAnimationFrame(() => {
                const newArr = [];
                for (let i = 0; i < newDataRef.current.length; i++) {
                    const current = newDataRef.current[i];
                    if (current.x < pos) {
                        newArr.push(current);
                    } else {
                        if (current.r <= 0) {
                            current.r = 0;
                            continue;
                        }
                        current.x += Math.random() > 0.5 ? 1 : -1;
                        current.y += Math.random() > 0.5 ? 1 : -1;
                        current.r -= 0.05 * Math.random();
                        newArr.push(current);
                    }
                }

                newDataRef.current = newArr;

                const ctx = canvasRef.current?.getContext("2d");
                if (ctx) {
                    ctx.clearRect(pos, 0, 800, 800);
                    newDataRef.current.forEach((t) => {
                        const { x: n, y: i, r: s, color } = t;
                        if (n > pos) {
                            ctx.beginPath();
                            ctx.rect(n, i, s, s);
                            ctx.fillStyle = color;
                            ctx.strokeStyle = color;
                            ctx.stroke();
                        }
                    });
                }

                if (newDataRef.current.length > 0) {
                    animateFrame(pos - 8);
                } else {
                    setMessage("");
                    setAnimating(false);
                }
            });
        };

        animateFrame(start);
    };

    const vanishAndSubmit = () => {
        setAnimating(true);
        draw();

        const maxX = newDataRef.current.reduce(
            (prev, current) => (current.x > prev ? current.x : prev),
            0
        );

        animate(maxX);
    };

    const handleTextareaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setMessage(e.target.value);
    };

    const handleTextareaSelect = (e: React.SyntheticEvent<HTMLTextAreaElement>) => {
        const target = e.target as HTMLTextAreaElement;
        setCursorPosition(target.selectionStart || 0);
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
        if (e.key === "Tab") {
            e.preventDefault();
            const target = e.target as HTMLTextAreaElement;
            const start = target.selectionStart || 0;
            const end = target.selectionEnd || 0;
            const newValue = message.substring(0, start) + "    " + message.substring(end);
            setMessage(newValue);
            setCursorPosition(start + 4);
        }
    };

    const timeout = (placeholder: string, timer?: number) => {
        setTimeout(() => {
            setPlaceholder(placeholder);
        }, timer || 2000)
    }

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setPlaceholder("")

        if (type === "email") {
            const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

            if (regex.test(message.trim())) {
                setEmail(message);
                vanishAndSubmit();

                setMessage("")
                setType("message");
                timeout("What's your message?")
                return;
            }

            vanishAndSubmit()
            setMessage("");

            timeout("Invalid email", 1300)
            return;
        }

        setIsSending(true);

        const sendEmail = await emailjs.send(
            process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!,
            process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID!,
            {
                from_email: email,
                to_email: "epiphanusonyeso05@gmail.com",
                subject: "New message from portfolio",
                body: message,
            },
            {
                publicKey: process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY!,
                limitRate: { throttle: 5000 },
            }
        );

        if (sendEmail.status === 200) {
            vanishAndSubmit(); // Animate
            setEmail("")
            setMessage("")

            setIsSending(false);
            timeout("I've received your email. Thanks for reaching out", 1000)

            timeout("Enter your email", 7000)
        } else {
            setIsSending(false);
            setPlaceholder("Hmm..something went wrong. Please try again.");
        }
    };

    const goBackToEmail = () => {
        setType("email");
        setMessage(email);
    };


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
                <div className="relative flex items-center">
                    <button
                        type="button"
                        className={cn(
                            "absolute -top-7 -left-16 w-8 h-8 ml-4 bg-violet-500 rounded-full p-1.5 opacity-0 transition-opacity duration-500",
                            email !== "" && "opacity-90",
                            (isSending || type === 'email') && "opacity-0"
                        )}
                        onClick={goBackToEmail}
                    >
                        <FaArrowLeft fill="white" size={20} />
                    </button>

                    <canvas
                        className={cn(
                            "absolute pointer-events-none transform scale-50 top-2 left-2 origin-top-left filter pr-20",
                            !animating ? "opacity-0" : "opacity-100"
                        )}
                        ref={canvasRef}
                    />

                    <textarea
                        ref={textareaRef}
                        value={message}
                        onChange={handleTextareaChange}
                        onKeyDown={handleKeyDown}
                        onSelect={handleTextareaSelect}
                        placeholder={placeholder}
                        className={cn(
                            "w-full h-full bg-transparent text-white/60 font-mono text-xl resize-none outline-none border-none focus:ring-0 placeholder-white/50 font-bold",
                            animating && "text-transparent dark:text-transparent",
                            isSending && "hidden"
                        )}
                        style={{ caretColor: "#8b5cf6" }}
                    />

                    {isSending && (
                        <div className="absolute inset-0 flex items-center justify-center z-50">
                            <LuLoaderPinwheel className="spin-custom" size={42} color="#8b5cf6" />
                        </div>
                    )}

                    <button
                        type="submit"
                        className={cn(
                            "w-8 h-8 ml-4 bg-violet-500 rounded-full p-1.5 opacity-0 transition-opacity duration-500",
                            message.length > 0 && "opacity-90",
                            isSending && "opacity-0"
                        )}
                    >
                        <FaArrowRight fill="white" size={20} />
                    </button>
                </div>
            </div>
        </form>
    );
};

export default Lid
