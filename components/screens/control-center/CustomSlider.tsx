
import { Slider } from "@/components/ui/slider";
import { cn } from "@/lib/utils";
import { Dispatch, SetStateAction } from "react";
import { IconType } from "react-icons";

const CustomSlider = (props: {
    icon: IconType;
    value: number[];
    onChange: Dispatch<SetStateAction<number[]>>;
}) => (
    <div className="relative h-40 w-12 flex items-center justify-center">
        <div className="absolute inset-0 rounded-full bg-black/40 overflow-hidden">
            <div
                className="absolute bottom-0 left-0 w-full bg-white transition-all duration-200"
                style={{ height: `${props.value[0]}%` }}
            />
        </div>

        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10 text-white/80 text-center pointer-events-none">
            <props.icon className={cn("h-6 w-6 mx-auto", props.value[0] > 50 && "text-black/70")} />
        </div>

        <Slider
            value={props.value}
            onValueChange={props.onChange}
            max={100}
            step={1}
            orientation="vertical"
            className="absolute h-full w-full"
            showThumb={false}
            showTrack={false}
        />
    </div>

);

export default CustomSlider