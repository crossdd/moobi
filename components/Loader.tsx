import {LuLoaderPinwheel} from "react-icons/lu";

const Loader = ({color = "#8b5cf6"}: {color?: string}) => {
    return (
        <div className="absolute inset-0 flex items-center justify-center z-50">
            <LuLoaderPinwheel className="spin-custom" size={42} color={color} />
        </div>
    )
}
export default Loader
