import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "framer-motion";

export const SkillRings = ({
    index,
    borderRadius = "1.75rem",
    children,
    containerClassName,
    className,
    isCollapsed,
    ...otherProps
}: {
    index: number,
    borderRadius?: string;
    children: React.ReactNode;
    containerClassName?: string;
    className?: string;
    isCollapsed: boolean
    [key: string]: any;
}) => {
    const getPosition = (index: number) => {
        const positions = [
            { x: "50%", y: "50%" },
            { x: "-50%", y: "50%" },
            { x: "50%", y: "-50%" },
            { x: "-50%", y: "-50%" },
        ];
        return positions[index];
    };

    return (
        <AnimatePresence>
            <motion.div
                className={containerClassName}
                style={{
                    borderRadius: borderRadius,
                }}
                initial={getPosition(index)}
                animate={{
                    x: isCollapsed ? getPosition(index).x : "0%",
                    y: isCollapsed ? getPosition(index).y : "0%",
                    zIndex: isCollapsed ? 4 - index : 0,
                }}
                transition={{ duration: 0.5 }}
                {...otherProps}
            >
                <div
                    className={cn(className, {
                        "opacity-0 transition-opacity delay-200 ease-in-out": isCollapsed,
                    })}
                    style={{
                        borderRadius: `calc(${borderRadius} * 0.96)`,
                    }}
                >
                    {children}
                </div>
            </motion.div>
        </AnimatePresence>
    );
};
