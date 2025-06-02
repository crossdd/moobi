"use client";

import { navItems } from "@/constants";
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";
import { FloatingNav } from "../ui/floating-navbar";

const Navbar = () => {
  const [active, setActive] = useState("");

  const sections = navItems.map(item => item.name.toLowerCase())

  useEffect(() => {
    const observers: IntersectionObserver[] = [];

    sections.forEach(id => {
      const section = document.getElementById(id)

      if (!section) return;

      const observer = new IntersectionObserver(([entry]) => {
        if (entry.isIntersecting) {
          setActive(id);
        }
      },
        { threshold: 0.6 }
      );

      observer.observe(section);
      observers.push(observer);
    })

    return () => {
      observers.forEach(observer => observer.disconnect())
    }
  }, [sections])

  return (
    <FloatingNav className="flex-center max-w-fit fixed top-6 inset-x-0 mx-auto bg-black ring-2 ring-neutral-800 rounded-full z-[5000] px-4 py-3 space-x-5">
      {navItems.map(({ name, link }) => (
        <a
          key={name}
          href={link}
          className={cn(
            "relative items-center transition-colors hover:text-opacity-80",
            active === name.toLowerCase()
              ? "text-violet-500 font-semibold text-lg"
              : "text-neutral-200",
          )}
        >
          {name}
        </a>
      ))}
    </FloatingNav>
  );
};

export default Navbar