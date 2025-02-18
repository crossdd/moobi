"use client";
import React from "react";
import { FloatingNav } from "@/components/ui/floating-navbar";
import { navItems } from "@/constants";

const Navbar = () => {
  return (
    <div className="relative  w-full">
      <FloatingNav navItems={navItems} />
    </div>
  );
};

export default Navbar;
