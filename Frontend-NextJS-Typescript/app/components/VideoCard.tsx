"use client"

import {IVideoCardProps as IVideoCardProps} from "@/app/interfaces/IVideoCardProps";
import {useEffect, useState} from "react";
import clsx from "clsx";
import {EllipsisVertical} from "lucide-react";
import {formatDistanceToNow} from "date-fns";
import SubscribeButton from "@/app/components/SubscribeButton";
import Link from "next/link";
import {AddVideoToPlaylist} from "@/app/components/fetch/playlistAddVideo";
import axios from "axios";
import Cookies from "js-cookie";
import VideoCardExpanded from "@/app/components/VideoCardExpanded";

interface IProps {
    isGrid: boolean;
    index: number;
    expandable: boolean;
    expandedIndex: number | null;
    onExpand: (index: number) => void  ;
    content: IVideoCardProps;

}

export default function VideoCard({index,expandable = false, isGrid = false,  expandedIndex = null, onExpand = (index: number)=> {}, content}: IProps) {


    const isVisible = expandedIndex === index;
    const [expandedData, setExpandedData] = useState<String| undefined>(undefined);
    const [isInLastColumn, setIsInLastColumn] = useState<boolean>(false);
    const [formattedDate, setFormattedDate] = useState<string | null>(null);

    // Only format date in the client
    useEffect(() => {
        const date = new Date(content.video.createdAt);
        const fDate = formatDistanceToNow(date, { addSuffix: true });
        setFormattedDate(fDate);
    }, [content.video.createdAt]);

    useEffect(() => {
        if (expandable) {
            let innerWidth = 1500;
            if (
                (innerWidth >= 1540 && index % 4 === 3)
                || (innerWidth >= 1280 && index % 3 === 2)
                || (innerWidth >= 640 && innerWidth <= 1280 && index % 2 === 1)
                || (innerWidth <= 640)
            ) {
                setIsInLastColumn(true)
            } else {
                setIsInLastColumn(false)
            }
        }
        return ()=> {
            setExpandedData(undefined)
            setIsInLastColumn(false)
            setFormattedDate(null)
        }
    }, [])

    const handleExpand = ()=>{
        if(expandedData == undefined){
            setExpandedData("Now we have some Data!")
        }
       onExpand(index)
    }
    return(
        <article
            className={clsx(
                !expandable && !isGrid && "row-span-1 flex flex-row flex-wrap col-span-4 w-fit max-w-[640px]",
                isGrid && "col-span-12 lg:col-span-6 xl:col-span-4",
                (expandable && !isVisible) && "col-span-12 lg:col-span-6 xl:col-span-4" ,
                (expandable && isVisible && isInLastColumn) && "row-span-2 col-span-12 lg:col-span-6 xl:col-span-4",
                (expandable && isVisible && !isInLastColumn) && " flex lg:col-span-12 xl:col-span-8",
                "bg-d-secondary w-full  h-full rounded-2xl p-2 row-span-1  duration-500"
            )}>
            <section className={clsx(
                !expandable && "min-w-fit w-[320px]",
                isGrid && !expandable  && "w-full",
                (expandable && !isVisible) && " w-full",
                (expandable && isVisible && isInLastColumn) && "w-full h-1/2  row-span-1",
                (expandable && isVisible && !isInLastColumn) && "w-1/2",
                "flex flex-col gap-1"
            )}>
                <header className="flex ">
                    <div
                        className="size-9 bg-input rounded-full"
                        role="img"
                        aria-label="Channel profile picture">
                    </div>
                    <h4 id="channel-name" className="font-semibold self-start">
                        <span>@</span>
                        {content.video.user.username}
                    </h4>
                    <div className=" ml-auto  min-w-fit w-1/3">
                        <SubscribeButton
                            username={content.video.user.username}
                            subscribed={content.isSubscribed}
                            userId={content.video.user.id}
                        />
                    </div>

                </header>
                <Link
                    href={`/dashboard/video?vid=${content.video.videoId}`}
                    passHref>
                    <div
                        className="aspect-w-16 aspect-h-9 bg-input w-full "
                        role="img"
                        aria-label={`Video thumbnail for ${content.video.title}`}
                    />
                </Link>
                <div>
                    <div className="flex flex-row justify-between">
                        <h3 className="w-[%90] font-semibold">{content.video.title}</h3>
                        {expandable && <button
                            aria-label={"Open Menu for More information"}
                            aria-haspopup="menu"
                            className={"hover:bg-[#d9d9d9] duration-500 bg-d-sidebar  p-1 bg-opacity-75 rounded-full"}
                            onClick={handleExpand}
                        >
                            <EllipsisVertical/>
                        </button>}
                    </div>
                    <p className="text-sm text-text-secondary">{content.video.views} views - {formattedDate}</p>
                </div>
            </section>
            <VideoCardExpanded expandable={expandable} isInLastColumn={isInLastColumn} isVisible={isVisible} videoId={content.video.videoId} />

        </article>

    )
}

