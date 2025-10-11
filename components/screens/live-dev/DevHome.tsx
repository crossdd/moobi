import React, { FormEvent, useState } from "react";
import { LiaHomeSolid } from "react-icons/lia";
import { CgLink, CgMoreVertical } from "react-icons/cg";
import { BiPlus, BiSolidTerminal } from "react-icons/bi";

const DevPreviewer = () => {
  const [url, setUrl] = useState("");
  const [currentSrc, setCurrentSrc] = useState<string | null>(null);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    if (url.trim() === "") return;
    if (!url.startsWith("http")) {
      setCurrentSrc("http://" + url);
      alert("http://" + url);
    } else {
      setCurrentSrc(url);
      alert(url);
    }
  };

  return (
    <main className="no-visible-scrollbar flex-center relative h-full w-full flex-col overflow-x-hidden bg-black pt-12">
      {/* Address Bar */}
      <div className="flex w-full items-center justify-between gap-3 bg-black p-2 text-white">
        <div className="flex items-center gap-2">
          <LiaHomeSolid size={16} />
          <div className="flex items-center gap-1 rounded-full bg-gray-600 px-1 py-1">
            <CgLink size={16} />
            <form onSubmit={handleSubmit}>
              <input
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                className="border-0 bg-transparent text-xs focus:outline-none focus-visible:ring-0"
              />
            </form>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <BiPlus fill="white" size={16} />
          <div className="flex-center h-6 w-6 rounded-md border-2 border-primary p-1 text-xs font-light text-white">
            1
          </div>
          <CgMoreVertical size={16} />
        </div>
      </div>

      <div className="mt-2 h-[620px] w-[390px] max-w-full overflow-hidden rounded-xl shadow-lg">
        {currentSrc && (
          <iframe
            src={currentSrc}
            className="h-full w-full flex-1 rounded-lg"
            sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
          ></iframe>
        )}

        {!currentSrc && (
          <div className="flex-center relative flex-col">
            <BiSolidTerminal size={70} className="text-white" />
            <p className="px-5 text-center text-gray-300">
              Enter local url, make changes and see it live
            </p>

            <svg
              viewBox="0 0 200 200"
              xmlns="http://www.w3.org/2000/svg"
              width={800}
              className="absolute inset-0 left-1/2 -translate-x-1/2"
            >
              <path
                fill="#111"
                d="M14.3,-23.2C20.9,-11.4,30.4,-9.2,42.5,1.1C54.6,11.5,69.3,30,63.7,34.2C58.2,38.5,32.5,28.6,14.7,31.1C-3.2,33.7,-13.2,48.6,-23.2,50.7C-33.2,52.7,-43.3,41.7,-41.9,30.7C-40.5,19.7,-27.6,8.5,-22.3,-0.8C-16.9,-10.1,-19,-17.6,-16.5,-30.1C-14,-42.5,-7,-60,-1.6,-58.1C3.8,-56.2,7.6,-34.9,14.3,-23.2Z"
                transform="translate(100 100)"
              />
            </svg>
          </div>
        )}
      </div>
    </main>
  );
};
export default DevPreviewer;
