"use client"

import React, {useEffect} from "react";
import {useVideos} from "@/app/components/fetch/useVideos";
import {useInView} from "react-intersection-observer";
import {IExpandableGridProps} from "@/app/interfaces/IExpandableGridProps";
import VideoCard from "@/app/components/VideoCard";

export default function VideoRow({fetchURL, active = true, expandable = false, oneTime = false}  : IExpandableGridProps) {
    if(fetchURL == undefined) return <h1 className="text-5xl text-text">A Fetch URL is Needed!</h1>

    const { videoList, isMore, loading, getVideos } = useVideos(fetchURL);
    const { ref, inView } = useInView({ threshold: 0.5, triggerOnce: oneTime });
    useEffect(() => {
        if (inView && isMore) {
            getVideos().then(r => console.log("r"));
        }
    }, [inView, isMore, getVideos]);

    return (
        <div
            className=" h-fit flex flex-row flex-nowrap overflow-y-hidden overflow-x-auto gap-6 items-center py-4 justify-start  w-full min-h-48   pr-6 scroll-smooth">
            {!isMore && videoList.length == 0 && <h1 className="text-2xl md:text-4xl mt-12 text-text-secondary-2 mx-auto w-fit py-8 px-4 rounded-md bg-d-secondary text-center font-bold"> No Videos were Found!</h1>}

            {(videoList ?? videoList[0] ?? []).map((current, index) => (
                <div key={`${current.video.videoId}-${index}`} className={"max-w-[350px] "}>
                    <VideoCard index={index} isGrid={false} expandable={false} expandedIndex={ null} onExpand={ (index: number)=> {}} content={ current} />
                </div>
            ))}
            {!loading && <div ref={ref} className="w-full h-24 flex items-center justify-center"/>}

        </div>
    )

}