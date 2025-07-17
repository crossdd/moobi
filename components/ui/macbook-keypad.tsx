import { cn } from "@/lib/utils";
import {
    TbBrightnessDown,
    TbBrightnessUp,
    TbCaretDownFilled,
    TbCaretLeftFilled,
    TbCaretRightFilled,
    TbCaretUpFilled,
    TbChevronUp,
    TbCommand,
    TbMicrophone,
    TbMoon,
    TbPlayerSkipForward,
    TbPlayerTrackNext,
    TbPlayerTrackPrev,
    TbSearch,
    TbTable,
    TbVolume,
    TbVolume2,
    TbVolume3,
    TbWorld,
} from "react-icons/tb";

const Keypad = ({
    onKeyClick,
    shiftActive,
}: {
    onKeyClick: (key: string) => void
    shiftActive: boolean
}) => {
    return (
        <div className="mx-1 h-full rounded-md bg-[#050505] p-1">
            {/* First Row */}
            <Row>
                <KBtn
                    className="w-10 items-end justify-start pb-[2px] pl-[4px]"
                    childrenClassName="items-start"
                    onClick={() => onKeyClick("esc")}
                >
                    esc
                </KBtn>
                <KBtn onClick={() => onKeyClick("f1")}>
                    <TbBrightnessDown className="h-[6px] w-[6px]" />
                    <span className="mt-1 inline-block">F1</span>
                </KBtn>
                <KBtn onClick={() => onKeyClick("f2")}>
                    <TbBrightnessUp className="h-[6px] w-[6px]" />
                    <span className="mt-1 inline-block">F2</span>
                </KBtn>
                <KBtn onClick={() => onKeyClick("f3")}>
                    <TbTable className="h-[6px] w-[6px]" />
                    <span className="mt-1 inline-block">F3</span>
                </KBtn>
                <KBtn onClick={() => onKeyClick("f4")}>
                    <TbSearch className="h-[6px] w-[6px]" />
                    <span className="mt-1 inline-block">F4</span>
                </KBtn>
                <KBtn onClick={() => onKeyClick("f5")}>
                    <TbMicrophone className="h-[6px] w-[6px]" />
                    <span className="mt-1 inline-block">F5</span>
                </KBtn>
                <KBtn onClick={() => onKeyClick("f6")}>
                    <TbMoon className="h-[6px] w-[6px]" />
                    <span className="mt-1 inline-block">F6</span>
                </KBtn>
                <KBtn onClick={() => onKeyClick("f7")}>
                    <TbPlayerTrackPrev className="h-[6px] w-[6px]" />
                    <span className="mt-1 inline-block">F7</span>
                </KBtn>
                <KBtn onClick={() => onKeyClick("f8")}>
                    <TbPlayerSkipForward className="h-[6px] w-[6px]" />
                    <span className="mt-1 inline-block">F8</span>
                </KBtn>
                <KBtn onClick={() => onKeyClick("f9")}>
                    <TbPlayerTrackNext className="h-[6px] w-[6px]" />
                    <span className="mt-1 inline-block">F9</span>
                </KBtn>
                <KBtn onClick={() => onKeyClick("f10")}>
                    <TbVolume3 className="h-[6px] w-[6px]" />
                    <span className="mt-1 inline-block">F10</span>
                </KBtn>
                <KBtn onClick={() => onKeyClick("f11")}>
                    <TbVolume2 className="h-[6px] w-[6px]" />
                    <span className="mt-1 inline-block">F11</span>
                </KBtn>
                <KBtn onClick={() => onKeyClick("f12")}>
                    <TbVolume className="h-[6px] w-[6px]" />
                    <span className="mt-1 inline-block">F12</span>
                </KBtn>
                <KBtn onClick={() => onKeyClick("power")}>
                    <div className="h-4 w-4 rounded-full bg-gradient-to-b from-neutral-900 from-20% via-black via-50% to-neutral-900 to-95% p-px">
                        <div className="h-full w-full rounded-full bg-black" />
                    </div>
                </KBtn>
            </Row>

            {/* Second row */}
            <Row>
                <KBtn onClick={() => onKeyClick(shiftActive ? "~" : "`")}>
                    <span className="block">~</span>
                    <span className="mt-1 block">`</span>
                </KBtn>

                <KBtn onClick={() => onKeyClick(shiftActive ? "!" : "1")}>
                    <span className="block">!</span>
                    <span className="block">1</span>
                </KBtn>
                <KBtn onClick={() => onKeyClick(shiftActive ? "@" : "2")}>
                    <span className="block">@</span>
                    <span className="block">2</span>
                </KBtn>
                <KBtn onClick={() => onKeyClick(shiftActive ? "#" : "3")}>
                    <span className="block">#</span>
                    <span className="block">3</span>
                </KBtn>
                <KBtn onClick={() => onKeyClick(shiftActive ? "$" : "4")}>
                    <span className="block">$</span>
                    <span className="block">4</span>
                </KBtn>
                <KBtn onClick={() => onKeyClick(shiftActive ? "%" : "5")}>
                    <span className="block">%</span>
                    <span className="block">5</span>
                </KBtn>
                <KBtn onClick={() => onKeyClick(shiftActive ? "^" : "6")}>
                    <span className="block">^</span>
                    <span className="block">6</span>
                </KBtn>
                <KBtn onClick={() => onKeyClick(shiftActive ? "&" : "7")}>
                    <span className="block">&</span>
                    <span className="block">7</span>
                </KBtn>
                <KBtn onClick={() => onKeyClick(shiftActive ? "*" : "8")}>
                    <span className="block">*</span>
                    <span className="block">8</span>
                </KBtn>
                <KBtn onClick={() => onKeyClick(shiftActive ? "(" : "9")}>
                    <span className="block">(</span>
                    <span className="block">9</span>
                </KBtn>
                <KBtn onClick={() => onKeyClick(shiftActive ? ")" : "0")}>
                    <span className="block">)</span>
                    <span className="block">0</span>
                </KBtn>
                <KBtn onClick={() => onKeyClick(shiftActive ? "_" : "-")}>
                    <span className="block">&mdash;</span>
                    <span className="block">_</span>
                </KBtn>
                <KBtn onClick={() => onKeyClick(shiftActive ? "+" : "=")}>
                    <span className="block">+</span>
                    <span className="block"> = </span>
                </KBtn>
                <KBtn
                    className="w-10 items-end justify-end pb-[2px] pr-[4px]"
                    childrenClassName="items-end"
                    onClick={() => onKeyClick("delete")}
                >
                    delete
                </KBtn>
            </Row>

            {/* Third row */}
            <Row>
                <KBtn
                    className="w-10 items-end justify-start pb-[2px] pl-[4px]"
                    childrenClassName="items-start"
                    onClick={() => onKeyClick("tab")}
                >
                    tab
                </KBtn>
                <KBtn onClick={() => onKeyClick(shiftActive ? "Q" : "q")}>
                    <span className="block">Q</span>
                </KBtn>

                <KBtn onClick={() => onKeyClick(shiftActive ? "W" : "w")}>
                    <span className="block">W</span>
                </KBtn>
                <KBtn onClick={() => onKeyClick(shiftActive ? "E" : "e")}>
                    <span className="block">E</span>
                </KBtn>
                <KBtn onClick={() => onKeyClick(shiftActive ? "R" : "r")}>
                    <span className="block">R</span>
                </KBtn>
                <KBtn onClick={() => onKeyClick(shiftActive ? "T" : "t")}>
                    <span className="block">T</span>
                </KBtn>
                <KBtn onClick={() => onKeyClick(shiftActive ? "Y" : "y")}>
                    <span className="block">Y</span>
                </KBtn>
                <KBtn onClick={() => onKeyClick(shiftActive ? "U" : "u")}>
                    <span className="block">U</span>
                </KBtn>
                <KBtn onClick={() => onKeyClick(shiftActive ? "I" : "i")}>
                    <span className="block">I</span>
                </KBtn>
                <KBtn onClick={() => onKeyClick(shiftActive ? "O" : "o")}>
                    <span className="block">O</span>
                </KBtn>
                <KBtn onClick={() => onKeyClick(shiftActive ? "P" : "p")}>
                    <span className="block">P</span>
                </KBtn>
                <KBtn onClick={() => onKeyClick(shiftActive ? "{" : "[")}>
                    <span className="block">{"{"}</span>
                    <span className="block">{"["}</span>
                </KBtn>
                <KBtn onClick={() => onKeyClick(shiftActive ? "}" : "]")}>
                    <span className="block">{"}"}</span>
                    <span className="block">{"]"}</span>
                </KBtn>
                <KBtn onClick={() => onKeyClick(shiftActive ? "|" : "\\")}>
                    <span className="block">{"|"}</span>
                    <span className="block">{"\\"}</span>
                </KBtn>
            </Row>

            {/* Fourth Row */}
            <Row>
                <KBtn
                    className="relative w-[2.8rem] items-end justify-start pb-[2px] pl-[4px]"
                    childrenClassName="items-start"
                    onClick={() => onKeyClick("caps lock")}
                >
                    <span className={`w-1 h-1 absolute right-1 top-1 rounded-full ${shiftActive ? "bg-white" : "bg-gray-500"}`} />
                    caps lock
                </KBtn>
                <KBtn onClick={() => onKeyClick(shiftActive ? "A" : "a")}>
                    <span className="block">A</span>
                </KBtn>

                <KBtn onClick={() => onKeyClick(shiftActive ? "S" : "s")}>
                    <span className="block">S</span>
                </KBtn>
                <KBtn onClick={() => onKeyClick(shiftActive ? "D" : "d")}>
                    <span className="block">D</span>
                </KBtn>
                <KBtn onClick={() => onKeyClick(shiftActive ? "F" : "f")}>
                    <span className="block">F</span>
                </KBtn>
                <KBtn onClick={() => onKeyClick(shiftActive ? "G" : "g")}>
                    <span className="block">G</span>
                </KBtn>
                <KBtn onClick={() => onKeyClick(shiftActive ? "H" : "h")}>
                    <span className="block">H</span>
                </KBtn>
                <KBtn onClick={() => onKeyClick(shiftActive ? "J" : "j")}>
                    <span className="block">J</span>
                </KBtn>
                <KBtn onClick={() => onKeyClick(shiftActive ? "K" : "k")}>
                    <span className="block">K</span>
                </KBtn>
                <KBtn onClick={() => onKeyClick(shiftActive ? "L" : "l")}>
                    <span className="block">L</span>
                </KBtn>
                <KBtn onClick={() => onKeyClick(shiftActive ? ":" : ";")}>
                    <span className="block">{":"}</span>
                    <span className="block">{";"}</span>
                </KBtn>
                <KBtn onClick={() => onKeyClick(shiftActive ? '"' : "'")}>
                    <span className="block">{'"'}</span>
                    <span className="block">{"'"}</span>
                </KBtn>
                <KBtn
                    className="w-[2.85rem] items-end justify-end pb-[2px] pr-[4px] cursor-pointer"
                    childrenClassName="items-end"
                    onClick={() => onKeyClick("return")}
                >
                    return
                </KBtn>
            </Row>

            {/* Fifth Row */}
            <Row>
                <KBtn
                    className="w-[3.65rem] items-end justify-start pb-[2px] pl-[4px]"
                    childrenClassName="items-start"
                    onClick={() => onKeyClick("shift")}
                >
                    shift
                </KBtn>
                <KBtn onClick={() => onKeyClick(shiftActive ? "Z" : "z")}>
                    <span className="block">Z</span>
                </KBtn>
                <KBtn onClick={() => onKeyClick(shiftActive ? "X" : "x")}>
                    <span className="block">X</span>
                </KBtn>
                <KBtn onClick={() => onKeyClick(shiftActive ? "C" : "c")}>
                    <span className="block">C</span>
                </KBtn>
                <KBtn onClick={() => onKeyClick(shiftActive ? "V" : "v")}>
                    <span className="block">V</span>
                </KBtn>
                <KBtn onClick={() => onKeyClick(shiftActive ? "B" : "b")}>
                    <span className="block">B</span>
                </KBtn>
                <KBtn onClick={() => onKeyClick(shiftActive ? "N" : "n")}>
                    <span className="block">N</span>
                </KBtn>
                <KBtn onClick={() => onKeyClick(shiftActive ? "M" : "m")}>
                    <span className="block">M</span>
                </KBtn>
                <KBtn onClick={() => onKeyClick(shiftActive ? "<" : ",")}>
                    <span className="block">{"<"}</span>
                    <span className="block">{","}</span>
                </KBtn>
                <KBtn onClick={() => onKeyClick(shiftActive ? ">" : ".")}>
                    <span className="block">{">"}</span>
                    <span className="block">{"."}</span>
                </KBtn>{" "}
                <KBtn onClick={() => onKeyClick(shiftActive ? "?" : "/")}>
                    <span className="block">{"?"}</span>
                    <span className="block">{"/"}</span>
                </KBtn>
                <KBtn
                    className="w-[3.65rem] items-end justify-end pb-[2px] pr-[4px]"
                    childrenClassName="items-end"
                    onClick={() => onKeyClick("shift")}
                >
                    shift
                </KBtn>
            </Row>

            {/* sixth Row */}
            <Row>
                <KBtn className="" childrenClassName="h-full justify-between py-[4px]">
                    <div className="flex w-full justify-end pr-1">
                        <span className="block">fn</span>
                    </div>
                    <div className="flex w-full justify-start pl-1">
                        <TbWorld className="h-[6px] w-[6px]" />
                    </div>
                </KBtn>
                <KBtn className="" childrenClassName="h-full justify-between py-[4px]">
                    <div className="flex w-full justify-end pr-1">
                        <TbChevronUp className="h-[6px] w-[6px]" />
                    </div>
                    <div className="flex w-full justify-start pl-1">
                        <span className="block">control</span>
                    </div>
                </KBtn>
                <KBtn className="" childrenClassName="h-full justify-between py-[4px]">
                    <div className="flex w-full justify-end pr-1">
                        <OptionKey className="h-[6px] w-[6px]" />
                    </div>
                    <div className="flex w-full justify-start pl-1">
                        <span className="block">option</span>
                    </div>
                </KBtn>
                <KBtn className="w-8" childrenClassName="h-full justify-between py-[4px]">
                    <div className="flex w-full justify-end pr-1">
                        <TbCommand className="h-[6px] w-[6px]" />
                    </div>
                    <div className="flex w-full justify-start pl-1">
                        <span className="block">command</span>
                    </div>
                </KBtn>
                <KBtn className="w-[8.2rem]" onClick={() => onKeyClick("space")}></KBtn>
                <KBtn className="w-8" childrenClassName="h-full justify-between py-[4px]">
                    <div className="flex w-full justify-start pl-1">
                        <TbCommand className="h-[6px] w-[6px]" />
                    </div>
                    <div className="flex w-full justify-start pl-1">
                        <span className="block">command</span>
                    </div>
                </KBtn>
                <KBtn className="" childrenClassName="h-full justify-between py-[4px]">
                    <div className="flex w-full justify-start pl-1">
                        <OptionKey className="h-[6px] w-[6px]" />
                    </div>
                    <div className="flex w-full justify-start pl-1">
                        <span className="block">option</span>
                    </div>
                </KBtn>
                <div className="mt-[2px] flex h-6 w-[4.9rem] flex-col items-center justify-end rounded-[4px] p-[0.5px]">
                    <KBtn className="h-3 w-6" onClick={() => onKeyClick("arrow-up")}>
                        <TbCaretUpFilled className="h-[6px] w-[6px]" />
                    </KBtn>
                    <div className="flex">
                        <KBtn className="h-3 w-6" onClick={() => onKeyClick("arrow-left")}>
                            <TbCaretLeftFilled className="h-[6px] w-[6px]" />
                        </KBtn>
                        <KBtn className="h-3 w-6" onClick={() => onKeyClick("arrow-down")}>
                            <TbCaretDownFilled className="h-[6px] w-[6px]" />
                        </KBtn>
                        <KBtn className="h-3 w-6" onClick={() => onKeyClick("arrow-right")}>
                            <TbCaretRightFilled className="h-[6px] w-[6px]" />
                        </KBtn>
                    </div>
                </div>
            </Row>
        </div>
    )
}

export default Keypad

const KBtn = ({
    className,
    children,
    childrenClassName,
    backlit = true,
    onClick
}: {
    className?: string;
    children?: React.ReactNode;
    childrenClassName?: string;
    backlit?: boolean;
    onClick?: () => void;
}) => {
    return (
        <div
            className={cn(
                "rounded-[4px] border border-main-darkMode p-[0.5px]",
                backlit && "bg-white/[0.2] shadow-xl shadow-violet-500",
            )}
            onClick={onClick}
        >
            <div
                className={cn(
                    "flex h-6 w-6 items-center justify-center rounded-[3.5px] bg-[#0A090D]",
                    className,
                )}
                style={{
                    boxShadow:
                        "0px -0.5px 2px 0 #0D0D0F inset, -0.5px 0px 2px 0 #0D0D0F inset",
                }}
            >
                <div
                    className={cn(
                        "flex w-full flex-col items-center justify-center text-[5px] cursor-default",
                        childrenClassName,
                        backlit && "text-white",
                    )}
                >
                    {children}
                </div>
            </div>
        </div>
    );
};

const Row = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className="mb-[2px] flex w-full flex-shrink-0 gap-[2px]">
            {children}
        </div>
    );
};

const OptionKey = ({ className }: { className: string }) => {
    return (
        <svg
            fill="none"
            version="1.1"
            id="icon"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 32 32"
            className={className}
        >
            <rect
                stroke="currentColor"
                strokeWidth={2}
                x="18"
                y="5"
                width="10"
                height="2"
            />
            <polygon
                stroke="currentColor"
                strokeWidth={2}
                points="10.6,5 4,5 4,7 9.4,7 18.4,27 28,27 28,25 19.6,25 "
            />
            <rect
                id="_Transparent_Rectangle_"
                className="st0"
                width="32"
                height="32"
                stroke="none"
            />
        </svg>
    );
};