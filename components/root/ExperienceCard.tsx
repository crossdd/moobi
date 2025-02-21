import { type LucideProps } from "lucide-react";
import React, { useEffect, useState } from "react";

type Card = {
    year: string;
    title: string;
    content: string;
    backgroundColor: string;
    icon: React.ForwardRefExoticComponent<Omit<LucideProps, "ref"> & React.RefAttributes<SVGSVGElement>>;
}
const ExperienceCard = (
    {
        card,
        index,
        awayCards
    }:
        {
            card: Card,
            index: number,
            awayCards: boolean[]
        }) => {
    const [isDesktop, setIsDesktop] = useState(false)

    useEffect(() => {
        if (typeof window !== 'undefined') {
            setIsDesktop(window.innerWidth >= 768)
        }
    }, [])

    return (
        <div
            className="flex flex-col justify-between w-[350px] h-[350px] rounded-[25px] absolute top-[calc(50%-175px)] left-[calc(50%-175px)] transition-transform duration-500 ease-in-out px-9 py-9 shadow-lg"
            style={{
                background: card.backgroundColor,
                transform: `
                ${awayCards[index] ? "translateY(-120vh) rotate(-48deg)" : "translateY(0)"}
                ${isDesktop ? `rotate(${-10 * index}deg)` : "rotate(0deg)"}
              `,
                zIndex: 4 - index,
            }}
        >
            <div className="flex justify-between items-center">
                <span className="font-poppins text-sm text-white">{card.year}</span>
                <card.icon className="w-8 h-8 text-white" />
            </div>
            <div>
                <h3 className="font-poppins text-2xl font-bold text-white mb-2">
                    {card.title}
                </h3>
                <p className="font-poppins text-lg text-white">{card.content}</p>
            </div>
        </div>
    )
}

export default ExperienceCard