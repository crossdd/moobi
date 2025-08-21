import type { App, StoreScreen } from "@/types";
import React, { Dispatch, SetStateAction } from "react";
import { LuChevronRight, LuStar } from "react-icons/lu";
import Image from "next/image";
import { Button } from "@/components/ui/button";

const AppSections = ({
  title,
  apps,
  setSelectedApp,
  setScreen,
}: {
  title: string;
  apps: App[];
  setSelectedApp: Dispatch<SetStateAction<App | null>>;
  setScreen: Dispatch<SetStateAction<StoreScreen>>;
}) => {
  const handleAppSelect = (app: App) => {
    setSelectedApp(app);
    setScreen("app-details");
  };

  return (
    <div>
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-base font-bold text-white">{title}</h2>
        <Button className="border-0 bg-transparent p-0 text-sm text-blue-400">
          <LuChevronRight className="ml-1 h-4 w-4" />
        </Button>
      </div>
      <div className="space-y-3">
        {apps.map((app) => (
          <div
            key={app.id}
            onClick={() => handleAppSelect(app)}
            className="cursor-pointer p-2"
          >
            <div className="flex items-start gap-3">
              <Image
                src={app.icon}
                alt={app.name}
                width={50}
                height={50}
                className="h-12 w-12 rounded-xl"
              />
              <div className="min-w-0 flex-1">
                <h3 className="truncate text-sm font-medium text-white">
                  {app.name}
                </h3>
                <p className="truncate text-xs text-white/70">{app.category}</p>
                <div className="mt-1 flex items-center gap-2">
                  <span className="text-xs text-white/60">
                    {app.rating.toFixed(1)}
                  </span>
                  <LuStar className="h-3 w-3 text-yellow-400" />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AppSections;
