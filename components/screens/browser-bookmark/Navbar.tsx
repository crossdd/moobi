import {cn} from "@/lib/utils";
import Link from "next/link";
import {BsGithub} from "react-icons/bs";
import {FaHome} from "react-icons/fa";
import {FaFileCsv} from "react-icons/fa6";

const Navbar = () => {
  return (
    <nav className="flex-center max-w-fit fixed top-24 inset-x-0 mx-auto  backdrop-blur-3xl rounded-xl px-4 py-2 space-x-5 bg-black/30 z-20 border border-white hover:bg-primary/5 transition-colors delay-100 duration-200">
      <Link
        href="/"
        className={cn(
          "relative items-center transition-colors hover:text-opacity-80 text-white"
        )}
      >
        <FaHome size={16} />
      </Link>

      <div className="h-5 w-px bg-gray-600" />

      <Link href="https://github.com/patroncodes" className={cn(
        "relative items-center transition-colors hover:text-opacity-80 text-white"
      )}>
        <BsGithub size={16} />
      </Link>

      <Link href="/epiphanus-resume.pdf" download className={cn(
        "relative items-center transition-colors hover:text-opacity-80 text-white"
      )}>
        <FaFileCsv size={16} />
      </Link>

      <div className="h-5 w-px bg-gray-600" />

      <button className="relative items-center transition-colors hover:text-opacity-80 text-slate-400">
        <Link
          href="mailto:onyesoepiphanus@gmail.com"
          className={cn(
            "shimmer-btn text-sm px-3 py-2 rounded-full text-white"
          )}
        >
          Hire Me
        </Link>
      </button>
    </nav>
  );
};

export default Navbar