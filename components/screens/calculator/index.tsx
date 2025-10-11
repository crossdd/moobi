import { useState } from "react";
import CalculatorBoard from "@/components/screens/calculator/CalculatorBoard";
import CalculatorHistory from "@/components/screens/calculator/CalculatorHistory";

const Calculator = () => {
  const [history, setHistory] = useState<
    | {
        date: string;
        calculations: string[];
      }[]
    | null
  >(null);
  const [calcScreen, setCalcScreen] = useState<"board" | "history">("board");

  return (
    <div className="relative mb-7 mt-12 h-full w-full px-3">
      {calcScreen === "board" ? (
        <CalculatorBoard
          history={history}
          setCalcScreen={setCalcScreen}
          setHistory={setHistory}
        />
      ) : (
        <CalculatorHistory
          history={history}
          setHistory={setHistory}
          setCalcScreen={setCalcScreen}
        />
      )}
    </div>
  );
};

export default Calculator;
