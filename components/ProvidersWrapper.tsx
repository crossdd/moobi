import React from "react";
import {
  MediaProvider,
  MusicProvider,
  WeatherProvider,
  BrowserProvider,
} from "@/context";

const ProvidersWrapper = ({ children }: { children: React.ReactNode }) => {
  return (
    <MediaProvider>
      <MusicProvider>
        <WeatherProvider>
          <BrowserProvider>{children}</BrowserProvider>
        </WeatherProvider>
      </MusicProvider>
    </MediaProvider>
  );
};
export default ProvidersWrapper;
