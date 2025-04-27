'use client'

import { ReactNode, useEffect, useRef, useState } from "react";
import Keypad from "./macbook-keypad";
import Lid from "./macbook-lid";

export const MacbookScroll = ({
  title,
  badge,
}: {
  title?: ReactNode;
  badge: ReactNode;
}) => {
  const [message, setMessage] = useState("")
  const [shiftKeyActive, setShiftKeyActive] = useState(false)
  const [cursorPosition, setCursorPosition] = useState(0)
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  const handleKeyClick = (key: string) => {
    // Focus the textarea to ensure it receives updates
    textareaRef.current?.focus()

    if (key === "delete" || key === "backspace") {
      if (cursorPosition > 0) {
        setMessage((prev) => prev.substring(0, cursorPosition - 1) + prev.substring(cursorPosition))
        setCursorPosition((prev) => Math.max(0, prev - 1))
      }
    } else if (key === "shift") {
      setShiftKeyActive((prev) => !prev)
    } else if (key === "caps lock") {
      setShiftKeyActive((prev) => !prev)
    } else if (key === "return") {
      setMessage((prev) => prev.substring(0, cursorPosition) + "\n" + prev.substring(cursorPosition))
      setCursorPosition((prev) => prev + 1)
    } else if (key === "tab") {
      // Prevent default tab behavior (which would move focus)
      setMessage((prev) => prev.substring(0, cursorPosition) + "    " + prev.substring(cursorPosition))
      setCursorPosition((prev) => prev + 4)
    } else if (key === "space") {
      setMessage((prev) => prev.substring(0, cursorPosition) + " " + prev.substring(cursorPosition))
      setCursorPosition((prev) => prev + 1)
    } else if (key === "arrow-left") {
      setCursorPosition((prev) => Math.max(0, prev - 1))
    } else if (key === "arrow-right") {
      setCursorPosition((prev) => Math.min(message.length, prev + 1))
    } else if (key === "arrow-up") {
      // Find the current line and position within that line
      const lines = message.split("\n")
      let currentLine = 0
      let posInCurrentLine = 0
      let charsProcessed = 0

      for (let i = 0; i < lines.length; i++) {
        const lineLength = lines[i].length + (i < lines.length - 1 ? 1 : 0) // +1 for newline except last line
        if (charsProcessed + lineLength > cursorPosition) {
          currentLine = i
          posInCurrentLine = cursorPosition - charsProcessed
          break
        }
        charsProcessed += lineLength
      }

      // If we're already on the first line, do nothing
      if (currentLine > 0) {
        const prevLine = lines[currentLine - 1]
        const newPosInLine = Math.min(posInCurrentLine, prevLine.length)

        // Calculate the new absolute cursor position
        let newPosition = 0
        for (let i = 0; i < currentLine - 1; i++) {
          newPosition += lines[i].length + 1 // +1 for newline
        }
        newPosition += newPosInLine

        setCursorPosition(newPosition)
      }
    } else if (key === "arrow-down") {
      // Find the current line and position within that line
      const lines = message.split("\n")
      let currentLine = 0
      let posInCurrentLine = 0
      let charsProcessed = 0

      for (let i = 0; i < lines.length; i++) {
        const lineLength = lines[i].length + (i < lines.length - 1 ? 1 : 0) // +1 for newline except last line
        if (charsProcessed + lineLength > cursorPosition) {
          currentLine = i
          posInCurrentLine = cursorPosition - charsProcessed
          break
        }
        charsProcessed += lineLength
      }

      // If we're already on the last line, do nothing
      if (currentLine < lines.length - 1) {
        const nextLine = lines[currentLine + 1]
        const newPosInLine = Math.min(posInCurrentLine, nextLine.length)

        // Calculate the new absolute cursor position
        let newPosition = 0
        for (let i = 0; i <= currentLine; i++) {
          newPosition += lines[i].length + (i < lines.length - 1 ? 1 : 0) // +1 for newline except last line
        }
        newPosition += newPosInLine

        setCursorPosition(Math.min(newPosition, message.length))
      }
    } else if (key.length === 1) {
      // Regular character
      setMessage((prev) => prev.substring(0, cursorPosition) + key + prev.substring(cursorPosition))
      setCursorPosition((prev) => prev + 1)
    }
  }

  // Update textarea selection when cursorPosition changes
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.selectionStart = cursorPosition
      textareaRef.current.selectionEnd = cursorPosition
    }
  }, [cursorPosition])

  return (
    <div className="flex flex-shrink-0 xsx:scale-[0.6] scale-[0.7] transform flex-col items-center justify-start gap-8 [perspective:800px] md:scale-90 xl:scale-100">
      <h1 className="relative max-w-3xl text-center text-4xl font-bold tracking-wide text-neutral-800 dark:text-white md:text-6xl">
        {title}
      </h1>

      <div>
        {/* Lid */}
        <Lid
          message={message}
          setMessage={setMessage}
          setCursorPosition={setCursorPosition}
          textareaRef={textareaRef}
        />
        {/* Base area */}
        <div className="relative h-[22rem] w-[32rem] overflow-hidden rounded-2xl bg-[#272729]">
          <div className="relative h-10 w-full">
            <div className="absolute inset-x-0 mx-auto h-4 w-[80%] bg-[#050505]" />
          </div>
          <div className="relative flex">
            <div className="mx-auto h-full w-[10%] overflow-hidden">
              <SpeakerGrid />
            </div>
            <div className="mx-auto h-full w-[80%]">
              <Keypad onKeyClick={handleKeyClick} shiftActive={shiftKeyActive} />
            </div>
            <div className="mx-auto h-full w-[10%] overflow-hidden">
              <SpeakerGrid />
            </div>
          </div>
          <Trackpad />
          <div className="absolute inset-x-0 bottom-0 mx-auto h-2 w-20 rounded-tl-3xl rounded-tr-3xl bg-gradient-to-t from-[#272729] to-[#050505]" />
          <div className="absolute bottom-4 left-4">
            {badge}
          </div>
        </div>
      </div>
    </div>
  );
};

const Trackpad = () => {
  return (
    <div
      className="bg-black/15 mx-auto my-1 h-32 w-[40%] rounded-xl"
      style={{
        boxShadow: "0px 0px 1px 1px #00000020 inset",
      }}
    />
  );
};

const SpeakerGrid = () => {
  return (
    <div
      className="mt-2 flex h-40 gap-[2px] px-[0.5px]"
      style={{
        backgroundImage:
          "radial-gradient(circle, #08080A 0.5px, transparent 0.5px)",
        backgroundSize: "3px 3px",
      }}
    ></div>
  );
};


