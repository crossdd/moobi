import { Button } from "@/components/ui/button";
import type { AppCategory, StoreScreen } from "@/types";
import { Dispatch, SetStateAction } from "react";
import { appCategories } from "@/constants";

const AppCategories = ({
  setScreen,
  setSelectedCategory,
}: {
  setScreen: Dispatch<SetStateAction<StoreScreen>>;
  setSelectedCategory: Dispatch<SetStateAction<AppCategory | "all">>;
}) => {
  return (
    <div>
      <h2 className="mb-4 text-xl font-bold text-white">Categories</h2>
      <div className="grid grid-cols-2 gap-3">
        {appCategories.slice(1, 7).map((category) => (
          <Button
            key={category.key}
            onClick={() => {
              setSelectedCategory(category.key as AppCategory | "all");
              setScreen("apps");
            }}
            className="h-auto rounded-xl border border-white/20 bg-white/10 p-4 text-white hover:bg-white/20"
          >
            <div className="flex items-center gap-3">
              <category.icon className="h-4 w-4" />
              <span className="font-medium">{category.name}</span>
            </div>
          </Button>
        ))}
      </div>
    </div>
  );
};
export default AppCategories;
