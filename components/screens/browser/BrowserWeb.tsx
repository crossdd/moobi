import {useBrowser} from "@/context/BrowserContext";

const BrowserWeb = () => {
    const {currentSearch} = useBrowser()

    return (
        <div className="relative w-full h-full">
            <iframe
                src={currentSearch?.link}
                className="w-full h-full rounded-lg"
                sandbox="allow-scripts allow-same-origin allow-popups"
            ></iframe>
        </div>
    )
}
export default BrowserWeb
