"use client";

import {useState} from "react";
import Image from "next/image";
import clsx from "clsx";
import {ChevronRight} from "lucide-react";
import SidebarLink from "@/app/components/SidebarLink";
export default function Sidebar() {
    const [menuExpanded, setMenuExpanded] = useState(false)

    const addbar = (e: React.MouseEvent<HTMLElement>) => {
        const target = e.target as HTMLElement;
        target.classList.remove("scrollbar-hide");
    }

    const hideBar = (e: React.MouseEvent<HTMLElement>) => {
        const target = e.target as HTMLElement;
        target.classList.add("scrollbar-hide");
    }


    return(
        <nav
            onMouseEnter={addbar}
            onMouseLeave={hideBar}
            className={
                clsx("rounded-r-3xl py-4 px-2 duration-500 fixed hover:overflow-x-clip z-[9999]  scrollbar-hide overflow-y-scroll  bg-d-sidebar  h-screen",
                    menuExpanded && "w-[286px] max-w-[286px] px-6 fixed",
                    !menuExpanded && "w-0 md:w-[80px] max-w-[80px]")
            }>
            {/*  Button to open/Close  */}
            <button
                onClick={() => setMenuExpanded(!menuExpanded)}
                className={
                    clsx("top-[10%] left-[80px] hover:bg-blue duration-500  z-50 outline rounded-full bg-background-dashboard-nav  p-1 fixed ", menuExpanded && "rotate-180 left-[260px]")
                }>
                <ChevronRight/>
            </button>
            {/*  Start of the actual Nav  */}
            <div className={"w-full flex justify-center items-center py-4 duration-500 relative "}>
                <Image
                    className="rounded-2xl block object-cover duration-500"
                    src="/Images/streamingLogo.svg"
                    alt="Login Image"
                    width={90} height={90}
                    priority
                />
            </div>
            <div className={"flex flex-col justify-center py-8  gap-2 items-center "}>
                <p className="text-text-secondary self-start">Explore</p>
                <SidebarLink href={"/dashboard/explore/trending"} text={"Trending"} menuExpanded={menuExpanded}/>
                <SidebarLink href={"/dashboard/subscription"} text={"Subscription"} menuExpanded={menuExpanded}/>
                <SidebarLink href={"/dashboard/explore/gaming"} text={"Gaming"} menuExpanded={menuExpanded}/>
            </div>
            <div className={"flex flex-col justify-center border-t-[0.5px] py-10  gap-2 items-center "}>
                <p className="text-text-secondary self-start">You</p>
                <SidebarLink href={"/dashboard/you"} text={"Your Account"} menuExpanded={menuExpanded}/>
                <SidebarLink href={"/dashboard/watchLater"} text={"Watch Later"} menuExpanded={menuExpanded}/>
                <SidebarLink href={"/dashboard/likedVideos"} text={"Liked Videos"} menuExpanded={menuExpanded}/>
                <SidebarLink href={"/dashboard/playlist"} text={"Playlist"} menuExpanded={menuExpanded}/>
                <SidebarLink href={"/dashboard/upload/create"} text={"Add video"} menuExpanded={menuExpanded}/>
            </div>
            <div className={"flex flex-col justify-center border-t-[0.5px] py-3  gap-2 items-center "}>
                <SidebarLink href={"/dashboard/setting"} text={"Settings"} menuExpanded={menuExpanded}/>
                <SidebarLink href={"/feedback"} text={"Send Feedback"} menuExpanded={menuExpanded}/>

            </div>
        </nav>
    )
}