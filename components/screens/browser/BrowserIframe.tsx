import {useBrowser} from "@/context/BrowserContext";
import {useEffect, useState} from "react";
import Link from "next/link";
import {Button} from "@/components/ui/button";
import Loader from "@/components/Loader";

const BrowserIframe = () => {
    const {currentSearch, setCurrentBrowserScreen} = useBrowser()
    const [isLoading, setIsLoading] = useState(true)
    const [isEmbeddable, setIsEmbeddable] = useState(true)

    useEffect(() => {
        checkIfEmbeddable()
    }, [])

    if(!currentSearch) {
        setCurrentBrowserScreen('browser-search-results')
        return;
    }

    const checkIfEmbeddable = async () => {
        try {
            const res = await fetch(`/api/browser/ping?url=${encodeURIComponent(currentSearch?.link)}`);
            const data = await res.json();

           setIsEmbeddable(data.status === "ok");
        } catch (err) {
            console.log(err)
           setIsEmbeddable(false)
        } finally {
            setIsLoading(false)
        }
    };


    return (
        <div className="relative w-full h-full">
            {isLoading && (
                <div className="flex-center">
                    <Loader />
                </div>
            )}

            {isEmbeddable ? (
                <iframe
                    src={currentSearch.link}
                    className="w-full h-full rounded-lg"
                    sandbox="allow-scripts allow-same-origin allow-popups"
                ></iframe>
            ) : (
                <div className="flex-center flex-col gap-4 text-white px-6 h-[90%]">
                    <h1 className="text-2xl text-center">Site cannot be embedded in an iframe.</h1>
                    <Button asChild variant="link" className="shimmer-btn">
                        <Link
                            href={currentSearch.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-lg"
                        >
                            View in a new tab
                        </Link>
                    </Button>
                </div>
                )}
        </div>
    )
}
export default BrowserIframe
