import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const getWeatherBackground = (condition: string) => {
  const conditionLower = condition.toLowerCase();

  if (conditionLower.includes("sunny") || conditionLower.includes("clear")) {
    return "linear-gradient(135deg, #FFD700 0%, #FFA500 50%, #FF8C00 100%)";
  } else if (conditionLower.includes("cloud")) {
    return "linear-gradient(135deg, #87CEEB 0%, #B0C4DE 50%, #D3D3D3 100%)";
  } else if (
    conditionLower.includes("rain") ||
    conditionLower.includes("drizzle")
  ) {
    return "linear-gradient(135deg, #4682B4 0%, #5F9EA0 50%, #708090 100%)";
  } else if (conditionLower.includes("snow")) {
    return "linear-gradient(135deg, #F0F8FF 0%, #E6E6FA 50%, #D8BFD8 100%)";
  } else if (
    conditionLower.includes("thunder") ||
    conditionLower.includes("storm")
  ) {
    return "linear-gradient(135deg, #2F4F4F 0%, #696969 50%, #808080 100%)";
  } else {
    return "linear-gradient(135deg, #87CEEB 0%, #98D8E8 50%, #B0E0E6 100%)";
  }
};

export const getTemperature = (
  isCelsius: boolean,
  tempC: number,
  tempF: number,
) => {
  return isCelsius ? `${Math.round(tempC)}°` : `${Math.round(tempF)}°`;
};
