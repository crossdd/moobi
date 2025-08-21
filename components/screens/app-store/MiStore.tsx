import { useState } from "react";
import { Button } from "@/components/ui/button";
import { LuGamepad2, LuSearch, LuSmartphone } from "react-icons/lu";
import { BiBell } from "react-icons/bi";
import { mockApps } from "@/constants";
import { type App, type AppCategory, type StoreScreen } from "@/types";
import AppSections from "@/components/screens/app-store/AppSections";
import { IoLogoAppleAppstore } from "react-icons/io5";
import { cn } from "@/lib/utils";
import AppSearch from "@/components/screens/app-store/AppSearch";
import AppDetails from "@/components/screens/app-store/AppDetails";

const MiStore = () => {
  const [screen, setScreen] = useState<StoreScreen>("apps");
  const [selectedCategory, setSelectedCategory] = useState<AppCategory | "all">(
    "all",
  );
  const [installedApps, setInstalledApps] = useState<Set<string>>(new Set());
  const [selectedApp, setSelectedApp] = useState<App | null>(null);

  const featuredApps = mockApps.filter((app) => app.isFeatured);
  const editorChoiceApps = mockApps.filter((app) => app.isEditorChoice);

  return (
    <div className="no-visible-scrollbar relative mt-12 flex h-full w-full flex-col overflow-y-scroll bg-white text-black dark:bg-black dark:text-white">
      <div className="px-4 pb-28">
        {(screen === "apps" || screen === "games") && (
          <div className="space-y-6">
            <div className="flex w-full items-center justify-between">
              <IoLogoAppleAppstore className="h-8 w-8 text-white" />

              <BiBell className="h-5 w-5 text-white/70" />
            </div>

            <div className="sticky left-0 top-0 z-20 flex w-full items-center justify-around border-b pt-4 dark:border-white/10 dark:bg-black">
              {["For you", "Categories"].map((tab) => (
                <div
                  key={tab}
                  // onClick={() => setScreen(tab.name.toLowerCase() as StoreScreen)}
                  className="flex flex-col items-center gap-2 border-0 bg-transparent text-white/60 hover:bg-transparent"
                >
                  <span className="text-xs">{tab}</span>

                  <span
                    className={cn("h-0.5 w-8 rounded-t-full bg-blue-600")}
                  />
                </div>
              ))}
            </div>

            <AppSections
              title="Featured"
              apps={featuredApps}
              setSelectedApp={setSelectedApp}
              setScreen={setScreen}
            />

            <AppSections
              title="Editor's Choice"
              apps={editorChoiceApps}
              setSelectedApp={setSelectedApp}
              setScreen={setScreen}
            />

            <AppSections
              title="Suggested for you"
              apps={mockApps}
              setSelectedApp={setSelectedApp}
              setScreen={setScreen}
            />
          </div>
        )}

        {screen === "search" && (
          <AppSearch
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
            setSelectedApp={setSelectedApp}
            setScreen={setScreen}
          />
        )}

        {selectedApp && (
          <AppDetails
            selectedApp={selectedApp}
            setSelectedApp={setSelectedApp}
            setInstalledApps={setInstalledApps}
            installedApps={installedApps}
            setScreen={setScreen}
          />
        )}
      </div>

      {/* BOTTOM */}
      <div className="fixed bottom-0 left-0 flex w-full items-center justify-around border-t p-4 dark:border-white/10 dark:bg-black">
        {[
          {
            name: "Games",
            icon: <LuGamepad2 className="h-4 w-4" />,
          },
          {
            name: "Apps",
            icon: <LuSmartphone className="h-4 w-4" />,
          },
          {
            name: "Search",
            icon: <LuSearch className="h-4 w-4" />,
          },
        ].map((tab) => (
          <Button
            key={tab.name}
            onClick={() => setScreen(tab.name.toLowerCase() as StoreScreen)}
            className="flex flex-col items-center gap-1 border-0 bg-transparent p-2 text-white/60 hover:bg-transparent"
          >
            <span
              className={cn("", {
                "rounded-xl bg-blue-200 p-1 text-blue-800":
                  screen === (tab.name.toLowerCase() as StoreScreen),
              })}
            >
              {tab.icon}
            </span>

            <span className="text-xs">{tab.name}</span>
          </Button>
        ))}
      </div>
    </div>
  );
};
export default MiStore;
