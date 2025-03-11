"use client"

import VideosExpandableGrid from "@/app/components/videos&playlist/VideosExpandableGrid";

export default function ExportPage(){
    return(
        <div className={"flex flex-col justify-end w-full h-full pt-12  gap-6  px-8 cursor-default "}>
            <VideosExpandableGrid fetchURL={"/search/videos?sortBy=likes&order=ascending"} expandable={true} active={true} oneTime={false} />

        </div>
    )
}