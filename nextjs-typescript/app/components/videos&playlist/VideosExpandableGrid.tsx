"use client";

import {useEffect, useRef, useState} from "react";
import {useInView} from "react-intersection-observer";
import {LoaderCircle} from "lucide-react";
import {IExpandableGridProps} from "@/app/interfaces/IExpandableGridProps";
import {useVideos} from "@/app/components/fetch/useVideos";
import VideoCard from "@/app/components/VideoCard";




export default function VideosExpandableGrid({fetchURL, active, expandable, oneTime = false}  : IExpandableGridProps) {
    if(fetchURL == undefined) return <h1 className="text-5xl text-text">A Fetch URL is Needed!</h1>


    const { videoList, isMore, loading, getVideos } = useVideos(fetchURL);
    const [expandedIndex, setExpandedIndex] = useState<number | null>(null);
    const { ref, inView } = useInView({ threshold: 0.5, triggerOnce: oneTime });

    const handleExpand = (index: number) => {
        setExpandedIndex(expandedIndex === index ? null : index);
    };

    // Load more videos when in view
    useEffect(() => {

        if ((inView && isMore && !loading ) ) {
            getVideos();
        }
    }, [inView, isMore, getVideos, loading]);

    return(
        <div className={active ? " w-full" : "hidden"}>
            {!isMore && videoList.length == 0 && <h1 className="text-2xl md:text-4xl mt-12 text-text-secondary-2 mx-auto w-fit py-8 px-4 rounded-md bg-d-secondary text-center font-bold"> No Videos were Found!</h1>}
            <div
                className="mt-2 z-0 delay-1000 duration-1000 gap-2   w-full  grid grid-cols-12 grid-rows-2 card">

                {(videoList ?? videoList[0] ?? []).map((current, index) => (

                    expandable ? (

                        <VideoCard key={`${current.video.videoId}-${index}`} isGrid={true} index={index} expandable={true}
                                   expandedIndex={expandedIndex} onExpand={handleExpand} content={current}/>
                    ) : (
                        <VideoCard key={`${current.video.videoId}-${index}`} isGrid={true} index={index} expandable={false}
                                   expandedIndex={expandedIndex} onExpand={handleExpand} content={current}/>
                    )
                ))}
            </div>

            {/**/}
            {!isMore && videoList.length > 0 && <p className='text-center'>There are no More Videos to Fetch</p>}
            {!loading && <div ref={ref} className="w-full h-24 flex items-center justify-center"/>}
            {// Are you Loading
                loading && (
                    <div className="mt-12 p-4 justify-center items-center text-text-primary flex flex-row gap-2">
                        <p>Loading</p>
                        <LoaderCircle className="animate-spin w-5 h-5"/>
                    </div>
                )}
        </div>

    )
}


