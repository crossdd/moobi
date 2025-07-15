"use client"

import Link from "next/link"
import {useState} from "react"

export default function PhoneDialer() {
  const [phoneNumber, setPhoneNumber] = useState("")

  const slice = (number: string, start: number, end?: number) => {
    return number.slice(start, end)
  }

  const formatPhoneNumber = (number: string) => {
    // Remove all non-digits
    const allowPlus = number.startsWith("+")
    const digits = number.replace(/\D/g, "")

    // List of area codes (country calling codes) for the 10 most influential countries
    const influentialCodes = ['1', '44', '49', '33', '81', '86', '91', '7', '39', '234'] // US, UK, Germany, France, Japan, China, India, Russia, Italy, Nigeria

    // Find if the start of the number matches any of the country codes
    const matchCode = influentialCodes.find(code => digits.startsWith(code))

    const plus = (matchCode || allowPlus) ? '+' : ''

    if (digits.length <= 3) {
      return digits
    } else if (digits.length <= 6) {
      return `(${plus}${slice(digits, 0, 3)}) ${slice(digits, 3)}`
    } else {
      return `(${plus}${slice(digits, 0, 3)}) ${slice(digits, 3, 6)}${slice(digits, 6) && `-${slice(digits, 6, 9)}`}${slice(digits, 9) && `-${slice(digits, 9, 13)}`}`
    }
  }

  const addDigit = (digit: string) => {
    const currentDigits = phoneNumber.replace(/\D/g, "")
    if (currentDigits.length < 13) {
      const newNumber = currentDigits + digit
      setPhoneNumber(formatPhoneNumber(newNumber))
    }
  }

  const removeDigit = () => {
    const currentDigits = phoneNumber.replace(/\D/g, "")
    if (currentDigits.length > 0) {
      const newNumber = currentDigits.slice(0, -1)
      setPhoneNumber(formatPhoneNumber(newNumber))
    }
  }

  const getDialableNumber = () => {
    return phoneNumber.replace(/[^\d+]/g, ""); // keep digits and "+"
  };

  let pressTimer: NodeJS.Timeout;

  const handlePressStart = () => {
    pressTimer = setTimeout(() => {
      setPhoneNumber((prev) => {
        if (!prev.startsWith("+")) {
          return "+" + prev;
        }
        return prev;
      });
    }, 500);
  };


  const handlePressEnd = () => {
    clearTimeout(pressTimer);
  };

  const handleZeroClick = () => {
    clearTimeout(pressTimer)
    addDigit("0")
  };


  const keypadButtons = [
    { number: "1", letters: "" },
    { number: "2", letters: "ABC" },
    { number: "3", letters: "DEF" },
    { number: "4", letters: "GHI" },
    { number: "5", letters: "JKL" },
    { number: "6", letters: "MNO" },
    { number: "7", letters: "PQRS" },
    { number: "8", letters: "TUV" },
    { number: "9", letters: "WXYZ" },
    { number: "*", letters: "" },
    { number: "0", letters: "+" },
    { number: "#", letters: "" },
  ]

  return (
    <div className="relative w-full h-full overflow-y-scroll mt-16 no-visible-scrollbar flex-center">
      {/* Phone Number Display */}
      <div className="flex-1 flex flex-col justify-center px-8">
        <div className="text-center mb-8">
          <div className="text-xl font-light text-white mb-2 tracking-wider">{phoneNumber || "Enter number"}</div>
        </div>

        {/* Keypad */}
        <div className="grid grid-cols-3 gap-4 mb-8">
          {keypadButtons.map((button, index) => {
            const isZero = button.number === "0"

            return(
                <button
                    key={index}
                    onMouseDown={isZero ? handlePressStart : undefined}
                    onTouchStart={isZero ? handlePressStart : undefined}
                    onMouseUp={isZero ? handlePressEnd : undefined}
                    onMouseLeave={isZero ? handlePressEnd : undefined}
                    onTouchEnd={isZero ? handlePressEnd : undefined}
                    onClick={isZero ? handleZeroClick : () => addDigit(button.number)}
                    className="w-14 h-14 mx-auto bg-gray-800 bg-opacity-50 rounded-full flex flex-col items-center justify-center text-white hover:bg-gray-700 hover:bg-opacity-50 transition-all duration-150 active:scale-95"
                >
                  <span className="text-2xl font-light">{button.number}</span>
                  {button.letters && (
                      <span className="text-xs text-gray-400 font-medium tracking-widest">{button.letters}</span>
                  )}
                </button>
            )
          })}
        </div>

        {/* Action Buttons */}
        <div className="flex items-center justify-between mb-8 w-full">
          {/* Video Call */}
          <button
            className="w-14 h-14 bg-gray-800 bg-opacity-50 rounded-full flex items-center justify-center text-white hover:bg-gray-700 hover:bg-opacity-50 transition-all duration-150 active:scale-95">
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M17 10.5V7a1 1 0 00-1-1H4a1 1 0 00-1 1v10a1 1 0 001 1h12a1 1 0 001-1v-3.5l4 4v-11l-4 4z" />
            </svg>
          </button>

          {/* Call Button */}
          <Link
            href={`tel:${getDialableNumber()}`}
            className="w-16 h-16 rounded-full flex items-center justify-center text-white transition-all duration-150 active:scale-95 bg-green-500 hover:bg-green-600"
          >
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z" />
            </svg>
          </Link>

          {/* Backspace Button */}
          <button
            onClick={removeDigit}
            disabled={!phoneNumber}
            className={`w-14 h-14 bg-gray-800 bg-opacity-50 rounded-full flex items-center justify-center text-white transition-all duration-150 active:scale-95 ${phoneNumber ? "hover:bg-gray-700 hover:bg-opacity-50" : "opacity-50"
              }`}
          >
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M22 3H7c-.69 0-1.23.35-1.59.88L0 12l5.41 8.11c.36.53.9.89 1.59.89h15c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-3 12.59L17.59 17 14 13.41 10.41 17 9 15.59 12.59 12 9 8.41 10.41 7 14 10.59 17.59 7 19 8.41 15.41 12 19 15.59z" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  )
}
