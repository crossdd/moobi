"use client";

import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { ReactNode } from "react";

const AnimatedText = ({
  title,
  subtitle,
  children,
  otherClasses,
}: {
  title: ReactNode;
  subtitle?: string;
  children?: ReactNode;
  otherClasses?: string;
}) => {
  return (
    <motion.div
      initial={{ opacity: 0.0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{
        delay: 0.3,
        duration: 0.8,
        ease: "easeInOut",
      }}
      className={cn(
        "relative flex flex-col gap-4 items-center justify-center px-4",
        otherClasses
      )}
    >
      <h1 className="heading text-center">{title}</h1>
      <h2 className="text-base md:text-xl text-neutral-700 dark:text-neutral-300">
        {subtitle}
      </h2>

      {children}
    </motion.div>
  );
};

export default AnimatedText;
