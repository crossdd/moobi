import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import {techIcons} from "@/constants";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getTechIcon(tech: string) {
  return techIcons[tech.toLowerCase()];
}