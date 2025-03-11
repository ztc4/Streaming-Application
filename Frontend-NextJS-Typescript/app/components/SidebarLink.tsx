
import Link from "next/link";
import {
    Clock9,
    Heart,
    ListVideo,
    Plus,
    UserRound,
    Gamepad,
    GraduationCap,
    Flame,
    Settings,
    MessageSquareWarning, UserCheck
} from "lucide-react";
import clsx from "clsx";


interface ILinkProps {
    href: string;
    text: string;
    menuExpanded: boolean;

}

export default function SidebarLink({href, text, menuExpanded = false}: ILinkProps){

    const getIcon = () => {
        switch (href) {
            case "/dashboard/you": return <UserRound/>;
            case "/dashboard/watchLater": return <Clock9 />;
            case "/dashboard/likedVideos": return <Heart />;
            case "/dashboard/playlist": return <ListVideo />;
            case "/dashboard/upload/create": return <Plus />;
            case "/dashboard/explore/gaming" : return <Gamepad/> ;
            case "/dashboard/subscription" : return <UserCheck />;
            case "/dashboard/explore/trending" : return <Flame strokeWidth={3} />;
            case "/dashboard/setting": return <Settings />;
            case "/feedback": return <MessageSquareWarning />;

        }
    }

    return (
        <Link
            title={text}
            aria-label={"Navigate to Different Page"}
            aria-description={ "Go to " + text }
            className={clsx("w-full h-[48px] bg-d-secondary group hover:bg-gradient-blue rounded-full duration-1000 ", !menuExpanded && " w-[48px] ")}
            href={href} passHref>
            <button
                aria-hidden={true}
                className={clsx(" flex flex-row w-full h-full items-center text-blue group-hover:text-text", !
                    menuExpanded && "justify-center w-[48px]",
                    menuExpanded && "px-2 pl-4 py-2 gap-2 ")}
            >
                {getIcon()}
                <span
                    className={clsx("font-medium text-lg duration-500  text-text-secondary group-hover:text-white overflow-hidden whitespace-nowrap truncate",
                        !menuExpanded && "  delay-700 hidden")}
                >
                    {text}
                </span>
            </button>
        </Link>
    )
}