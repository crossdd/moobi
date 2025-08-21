import React from "react";
import {
  PhoneProvider,
  MusicProvider,
  WeatherProvider,
  BrowserProvider,
} from "@/context";
import { ClockProvider } from "@/context/ClockContext";
import { ThemeProvider } from "@/components/theme-provider";

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
              <ClockProvider>{children}</ClockProvider>
            </BrowserProvider>
          </WeatherProvider>
        </MusicProvider>
      </PhoneProvider>
    </ThemeProvider>
  );
};
export default ProvidersWrapper;
