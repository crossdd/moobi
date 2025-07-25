import {skills} from "@/constants";

const infos = [
    {
        label: "Name",
        value: "Epiphanus"
    },
    {
        label: "Codename",
        value: "Patron"
    },
    {
        label: "Active years",
        value: "3+"
    },
    {
        label: "Projects Completed",
        value: "10+"
    },
    {
        label: "Open Source Contributions",
        value: "3+"
    },
    {
        label: "Specialization",
        value: "Frontend Engineering"
    },
    {
        label: "Platforms",
        value: "Web, Mobile"
    },
    {
        label: "Languages",
        value: "English, Igbo"
    },
]

const InfoScreen = () => {
    const stacks = Object.keys(skills)

    return (
        <div className="relative w-full h-full mt-10 px-3 overflow-y-scroll no-visible-scrollbar pb-24">
            <div className="relative pb-5 pt-2 rounded-lg">
                <div className="absolute inset-0 bg-gradient-to-r from-purple to-walnut-300 rounded-2xl blur-xl opacity-10"></div>
                <h1 className="text-3xl font-bold text-white">About</h1>
            </div>

            <ul className="flex flex-col gap-5 mt-4">
                <h3 className="text-lg font-bold text-gray-300 border-b pb-2 rounded-b-md">General</h3>
                {infos.map(info => (
                    <li key={info.label} className="text-white flex items-center justify-between w-full">
                        <p className="text-gray-400 text-base w-[60%]">{info.label}</p>
                        <p className="text-gray-200 text-base font-serif w-[40%]">{info.value}</p>
                    </li>
                ))}

                <h3 className="text-lg font-bold text-gray-300 border-b pb-2 rounded-b-md mt-4">Technologies Used</h3>

                {stacks.map(stack => (
                    <li key={stack} className="text-white flex flex-col gap-1 w-full">
                        <p className="text-gray-300 text-base capitalize w-[60%]">{stack}</p>

                       <p className="text-sm text-gray-400">
                           {skills[stack].join(", ")}
                       </p>
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default InfoScreen