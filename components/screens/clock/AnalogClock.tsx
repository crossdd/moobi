import { useEffect, useState } from "react";

const AnalogClock = () => {
  const [now, setNow] = useState(new Date());

  // Clock Ticking
  useEffect(() => {
    const t = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(t);
  }, []);

  const hours = now.getHours() % 12;
  const minutes = now.getMinutes();
  const seconds = now.getSeconds();

  const hourAngle = (hours % 12) * 30 + minutes * 0.5;
  const minuteAngle = minutes * 6;
  const secondAngle = seconds * 6;

  return (
    <div className="flex-center w-full flex-col">
      <div className="relative h-80 w-80 scale-[0.8] rounded-full bg-white/5">
        {/* Hour ticks */}
        {Array.from({ length: 12 }).map((_, i) => (
          <div
            key={i}
            className="absolute h-8 w-1 rounded-full bg-white/70"
            style={{
              top: "10px",
              left: "50%",
              transformOrigin: "50% 150px",
              transform: `translateX(-50%) rotate(${i * 30}deg)`,
            }}
          />
        ))}
        {/* Minute ticks */}
        {Array.from({ length: 60 }).map((_, i) =>
          i % 5 ? (
            <div
              key={i}
              className="absolute h-4 w-0.5 rounded-full bg-white/30"
              style={{
                top: "10px",
                left: "50%",
                transformOrigin: "50% 150px",
                transform: `translateX(-50%) rotate(${i * 6}deg)`,
              }}
            />
          ) : null,
        )}

        {/* Hands */}
        <div
          className="absolute h-24 w-1.5 rounded-full bg-white shadow-lg"
          style={{
            top: "50%",
            left: "50%",
            transformOrigin: "50% 100%",
            transform: `translate(-50%,-100%) rotate(${hourAngle}deg)`,
          }}
        />
        <div
          className="absolute h-32 w-1 rounded-full bg-white shadow-lg"
          style={{
            top: "50%",
            left: "50%",
            transformOrigin: "50% 100%",
            transform: `translate(-50%,-100%) rotate(${minuteAngle}deg)`,
          }}
        />
        <div
          className="absolute h-36 w-0.5 rounded-full bg-blue-500 shadow-lg"
          style={{
            top: "50%",
            left: "50%",
            transformOrigin: "50% 90%",
            transform: `translate(-50%,-90%) rotate(${secondAngle}deg)`,
            transition: "transform 0.12s ease-out",
          }}
        />
        {/* Center cap */}
        <div className="flex-center absolute left-1/2 top-1/2 h-4 w-4 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white shadow">
          <div className="h-3 w-3 rounded-full bg-black" />
        </div>
      </div>

      <div className="text-center font-mono text-lg text-gray-300">
        <div className="">
          {now.toLocaleTimeString("en-US", { hour12: false })}
        </div>

        <div className="">
          Local time{" "}
          {now.toLocaleDateString("en-US", {
            day: "numeric",
            month: "2-digit",
          })}
        </div>
      </div>
    </div>
  );
};
export default AnalogClock;
