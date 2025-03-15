"use client"
import {AddVideoToPlaylist} from "@/app/components/fetch/playlistAddVideo";
import {useEffect, useState} from "react";
import clsx from "clsx";

interface VideoCardExpanded {
    expandable: boolean;
    isInLastColumn: boolean;
    isVisible: boolean;
    videoId: number
}

export default function VideoCardExpanded({expandable, isInLastColumn ,isVisible, videoId}:VideoCardExpanded) {
    const { handleAddVideo } = AddVideoToPlaylist({
        category: "LATER",
        videoId: videoId,
        playlistId: null
    });
    const [videoExpanded, setVideoExpanded] = useState<IVideoExpanded | null>(null);
    const getVideoExpanded = async () => {
        const response = await fetch(
            `${process.env.NEXT_PUBLIC_API_FETCH_URL}/search/video/${videoId}?expanded=true`,). then((response) => response.json());
        console.log(response)
        setVideoExpanded(response);
        localStorage.setItem(`videoExpanded-${videoId}`, JSON.stringify(response));

    }
    useEffect(() => {

        if(isVisible && videoExpanded == null) {
            getVideoExpanded()
        }
    }, [isVisible]);

    useEffect(() => {
        return () => {
            setVideoExpanded(null)
        }
    }, []);


    return (

        <section className={clsx(
            !expandable && "min-w-fit w-[320px]",
            (expandable && !isVisible) && " w-full",
            (expandable && isVisible && isInLastColumn) && "w-full h-1/2  row-span-1",
            (expandable && isVisible && !isInLastColumn) && "w-1/2",
            "flex flex-col gap-1 p-2", !isVisible &&  "hidden"
        )}>
            <p className="text-d-text font-semibold text-lg">Category : {videoExpanded?.category}</p>
            <p className="text-d-text font-medium text-base">{ videoExpanded?.description }</p>
            <div className="w-full mt-auto gap-2  flex flex-col ">
                <button
                    onClick={handleAddVideo}
                    className="w-full p-2 border-2 border-d-main  hover:bg-b-main hover:text-b-secondary rounded-2xl "> Add
                    to Watch Later
                </button>
                <div className="flex flex-row gap-2 w-full">
                    <button
                        className="w-1/2 p-2 border-2 border-d-main hover:bg-b-main hover:text-b-secondary rounded-2xl "> Report
                    </button>
                    <button
                        className="w-1/2  p-2 border-2 border-d-main  hover:bg-b-main hover:text-b-secondary rounded-2xl"> Share
                    </button>
                </div>

            </div>

        </section>
    )

}