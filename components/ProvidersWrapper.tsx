import React from "react";
import {
  PhoneProvider,
  MusicProvider,
  WeatherProvider,
  BrowserProvider,
} from "@/context";

const ProvidersWrapper = ({ children }: { children: React.ReactNode }) => {
  return (
    <PhoneProvider>
      <MusicProvider>
        <WeatherProvider>
          <BrowserProvider>{children}</BrowserProvider>
        </WeatherProvider>
      </MusicProvider>
    </PhoneProvider>
  );
};
export default ProvidersWrapper;
