import Link from "next/link";
import { Flame , Headset, GraduationCap} from 'lucide-react';


interface IExploreButtonProps{
    href:string;
    text:string;
    icon: "fire" | "headset" | "book";
}

export default function ExploreButton({href,text, icon}: IExploreButtonProps) {

    const getIcon = () => {
        switch (icon) {
            case "fire": return <Flame  size={24} />;
            case "headset":return <Headset size={24} />;
            case "book": return <GraduationCap size={24} />;
            default: return null; // Add a fallback if none of the cases match
        }
    }

    return (
        <Link className={"group bg-transparent"} href={href} passHref>
            <button className={"flex flex-row gap-2 max-w-[180px] bg-gradient-black  border-secondary border-2  py-2 px-3 rounded-lg"}>
                <span className={"text-blue group-hover:text-text-accent-yellow duration-300 "}>{getIcon()}</span>
                <span className="text-[22px]">{text}</span>
            </button>
        </Link>
    )
}