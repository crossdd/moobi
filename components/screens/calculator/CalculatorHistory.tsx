import { Dispatch, SetStateAction } from "react";
import { FaArrowLeft, FaTrash } from "react-icons/fa6";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { BsClock } from "react-icons/bs";

const CalculatorHistory = ({
  history,
  setHistory,
  setCalcScreen,
}: {
  history:
    | {
        date: string;
        calculations: string[];
      }[]
    | null;
  setHistory: Dispatch<
    SetStateAction<
      | {
          date: string;
          calculations: string[];
        }[]
      | null
    >
  >;
  setCalcScreen: Dispatch<SetStateAction<"board" | "history">>;
}) => {
  return (
    <>
      <div className="sticky left-0 top-0 flex h-10 w-full items-center justify-between bg-black text-lg text-white">
        <Button variant="ghost" onClick={() => setCalcScreen("board")}>
          <FaArrowLeft />
        </Button>

        <h1>History</h1>

        <Button variant="ghost" onClick={() => setHistory([])}>
          <FaTrash />
        </Button>
      </div>

      <ul className="no-visible-scrollbar flex h-[90%] flex-1 flex-col gap-3 overflow-y-scroll pb-16 pr-2">
        {history &&
          history.map((item, index) => (
            <li
              key={index}
              className={cn(
                "w-full space-y-1.5 border-b border-gray-600 py-3 text-right text-lg text-white",
                index === history.length - 1 && "border-none",
              )}
            >
              <div className="text-sm text-gray-500">{item.date}</div>
              <div className="flex flex-col gap-1">
                {item.calculations.map((calculation, index) => (
                  <div key={index} className="text-base text-gray-300">
                    {calculation}
                  </div>
                ))}
              </div>
            </li>
          ))}

        {!history ||
          (history.length === 0 && (
            <div className="flex-center mt-28 h-full w-full flex-col gap-3">
              <BsClock className="h-28 w-28 rounded-full text-gray-500" />
              <span className="text-base text-gray-400">No history yet</span>
            </div>
          ))}
      </ul>
    </>
  );
};
export default CalculatorHistory;
