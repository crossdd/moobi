import React from "react";
import {
  PhoneProvider,
  MusicProvider,
  WeatherProvider,
  BrowserProvider,
} from "@/context";
import { ClockProvider } from "@/context/ClockContext";

const ProvidersWrapper = ({ children }: { children: React.ReactNode }) => {
  return (
    <PhoneProvider>
      <MusicProvider>
        <WeatherProvider>
          <BrowserProvider>
            <ClockProvider>{children}</ClockProvider>
          </BrowserProvider>
        </WeatherProvider>
      </MusicProvider>
    </PhoneProvider>
  );
};
export default ProvidersWrapper;
