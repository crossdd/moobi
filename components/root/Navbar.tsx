"use client";

import { navItems } from "@/constants";
import { cn } from "@/lib/utils";
import Link from "next/link";
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
    <FloatingNav className="flex-center max-w-fit fixed top-6 inset-x-0 mx-auto border bg-black border-violet-500/[0.3] rounded-full z-[5000] px-4 py-3 space-x-5">
      {navItems.map(({ name, link }) => (
        <Link
          key={name}
          href={link}
          className={cn(
            "relative items-center transition-colors hover:text-neutral-500",
            active === name.toLowerCase()
              ? "text-violet-500 font-semibold text-lg"
              : "text-neutral-200",
          )}
        >
          {name}
        </Link>
      ))}
    </FloatingNav>
  );
};

export default Navbar