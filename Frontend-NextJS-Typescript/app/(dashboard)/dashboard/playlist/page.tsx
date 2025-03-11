"use client"

import Playlist from "@/app/components/videos&playlist/Playlist";

export default function YourAccountPage(){
    return(
        <div className={"ml-auto flex w-full  h-full justify-start "}>
            <Playlist key={"/playlist/me?"} fetchURL={"/playlist/me?"} active={true}/>

        </div>
    )
}