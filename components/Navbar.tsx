"use client";
import React from "react";
import { FloatingNav } from "@/components/ui/floating-navbar";

const Navbar = () => {
  const navItems = [
    {
      name: "About",
      link: "#about",
    },
    {
      name: "Project",
      link: "#projects",
    },
    {
      name: "Testimonials",
      link: "#testimonial",
    },
    {
      name: "Contact",
      link: "#contact",
    },
  ];
  return (
    <div className="relative  w-full">
      <FloatingNav navItems={navItems} />
    </div>
  );
};

export default Navbar;
