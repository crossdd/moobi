import { IoIosHelp } from "react-icons/io";

const appInfo = [
  {
    label: "App",
    value: "Moobi",
  },
  {
    label: "Version",
    value: "v1.0.1",
  },
  {
    label: "Built With",
    value: "Next.js, Tailwind, Appwrite, Twilio",
  },
];

const developerInfo = [
  {
    label: "Name",
    value: "Epiphanus",
  },
  {
    label: "Codename",
    value: "Patron",
  },
  {
    label: "Active years",
    value: "3+",
  },
  {
    label: "Projects Completed",
    value: "10+",
  },
  {
    label: "Open Source Contributions",
    value: "3+",
  },
  {
    label: "Specialization",
    value: "Frontend Engineering",
  },
  {
    label: "Platforms",
    value: "Web, Mobile",
  },
  {
    label: "Languages",
    value: "English, Igbo",
  },
  {
    label: "Philosophy",
    value: "Simple • Flashy • Antique • Modern",
  },
];

const InfoScreen = () => {
  return (
    <div className="no-visible-scrollbar relative mt-10 h-full w-full overflow-y-scroll px-3 pb-24">
      <div className="flex w-full items-center justify-between text-white">
        <h1 className="py-4 text-3xl font-bold">About</h1>

        <IoIosHelp color="white" className="h-10 w-10" />
      </div>

      <ul className="mt-4 flex flex-col gap-5">
        <h3 className="text-lg font-bold text-gray-300">General</h3>
        {appInfo.map((info) => (
          <li key={info.label} className="flex w-full text-white">
            <p className="w-[60%] text-base text-gray-400">{info.label}</p>
            <p className="w-[40%] font-serif text-base text-gray-200">
              {info.value}
            </p>
          </li>
        ))}
      </ul>

      <ul className="mt-8 flex flex-col gap-5">
        <h3 className="text-lg font-bold text-gray-300">Developer</h3>
        {developerInfo.map((info) => (
          <li key={info.label} className="flex w-full text-white">
            <p className="w-[60%] text-base text-gray-400">{info.label}</p>
            <p className="w-[40%] font-serif text-base text-gray-200">
              {info.value}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default InfoScreen;
