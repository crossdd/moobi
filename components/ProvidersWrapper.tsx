import React from "react";
import {
  PhoneProvider,
  MusicProvider,
  WeatherProvider,
  BrowserProvider,
} from "@/context";
import { ClockProvider } from "@/context/ClockContext";
import { ThemeProvider } from "@/components/theme-provider";
import { ChessGameProvider } from "./screens/chess/GameContext";

const ProvidersWrapper = ({ children }: { children: React.ReactNode }) => {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="dark"
      enableSystem
      disableTransitionOnChange
    >
      <PhoneProvider>
        <MusicProvider>
          <WeatherProvider>
            <BrowserProvider>
              <ClockProvider>
                <ChessGameProvider>
                  {children}
                </ChessGameProvider>
              </ClockProvider>
            </BrowserProvider>
          </WeatherProvider>
        </MusicProvider>
      </PhoneProvider>
    </ThemeProvider>
  );
};
export default ProvidersWrapper;
