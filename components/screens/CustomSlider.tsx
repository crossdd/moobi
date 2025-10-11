import { Slider } from "@/components/ui/slider";
import { cn } from "@/lib/utils";
import { IconType } from "react-icons";

const CustomSlider = (props: {
  icon: IconType;
  value: number;
  onChange: (value: number) => void;
}) => (
  <div className="relative flex h-40 w-12 items-center justify-center">
    <div className="absolute inset-0 overflow-hidden rounded-full bg-black/40">
      <div
        className="absolute bottom-0 left-0 w-full bg-white transition-all duration-200"
        style={{ height: `${props.value}%` }}
      />
    </div>

    <div className="pointer-events-none absolute left-1/2 top-1/2 z-10 -translate-x-1/2 -translate-y-1/2 text-center text-white/80">
      <props.icon
        className={cn("mx-auto h-6 w-6", props.value > 50 && "text-black/70")}
      />
    </div>

    <Slider
      value={[props.value]}
      onValueChange={(value) => props.onChange(value[0])}
      max={100}
      step={1}
      orientation="vertical"
      className="absolute h-full w-full"
      showThumb={false}
      showTrack={false}
    />
  </div>
);

export default CustomSlider;
