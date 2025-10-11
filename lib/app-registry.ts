import { IoInformationCircle } from "react-icons/io5";
import { mobileApps } from "@/constants";

export interface AppMetadata {
  name: string;
  icon: any;
  color: string;
}

// Utility to normalize Tailwind color classes (optional)
function tailwindToHex(color: string): string {
  if (color.includes("gray")) return "#8E8E93";
  if (color.includes("blue")) return "#007AFF";
  if (color.includes("green")) return "#34C759";
  if (color.includes("yellow")) return "#FFCC00";
  if (color.includes("orange")) return "#FF9500";
  if (color.includes("red")) return "#FF3B30";
  if (color.includes("white")) return "#FFFFFF";
  if (color.includes("black")) return "#000000";
  return "#8E8E93"; // Default fallback
}

export const appRegistry = mobileApps.flat().reduce(
  (acc, app) => {
    acc[app.slur] = {
      name: app.name,
      icon: app.icon,
      color: tailwindToHex(app.color),
    };
    return acc;
  },
  {} as Record<string, AppMetadata>,
);

export function getAppMetadata(slur: string): AppMetadata {
  return (
    appRegistry[slur] || {
      name: "Home",
      icon: IoInformationCircle,
      color: "#007AFF",
    }
  );
}
