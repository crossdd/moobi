import {LuLoaderPinwheel} from "react-icons/lu";

const Loader = () => {
    return (
        <div className="absolute inset-0 flex items-center justify-center z-50">
            <LuLoaderPinwheel className="spin-custom" size={42} color="#8b5cf6" />
        </div>
    )
}
export default Loader
