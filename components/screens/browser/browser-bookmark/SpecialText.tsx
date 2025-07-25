import { cn } from '@/lib/utils';
import React from 'react'

const SpecialText = (
    {
        as: Tag = "span",
        text,
        stroke = 2,
        strokeColor = "#8b5cf6",
        className
    }: {
        as?: React.ElementType;
        text: string;
        stroke?: number;
        strokeColor?: string
        className?: string;
    }) => {
    return (
        <Tag
            className={cn("text-primary", className)}
            style={{
                WebkitTextStroke: `${stroke}px ${strokeColor}`,
                WebkitTextFillColor: "transparent",
            }}>
            {text}
        </Tag>
    )
}
export default SpecialText
