"use client"

import VideoCard from "@/app/components/VideoCard";


import {videoData} from "@/app/Test Data/VideoData"
import {ChevronDown, User} from "lucide-react";
import {IUser} from "@/app/interfaces/IUser";
import {useVideos} from "@/app/components/fetch/useVideos";
import {useEffect} from "react";
import SubscribeButton from "@/app/components/SubscribeButton";
import clsx from "clsx";
import Link from "next/link";

interface SubscriptionProps {
    expandable: boolean;
    isAvatar?: boolean;
    expandedIndex: number | null;
    index: number;
    handleExpandable: (index:number ) => void;
    user: IUser;
}

export default function Subscription({expandable, isAvatar, expandedIndex, index, handleExpandable, user}: SubscriptionProps) {

    if(!user) return <div>Failed to felt the page!</div>

    return(
        <div className="relative w-[296px]">
            <div
                onClick={()=> handleExpandable(index)}
                className="bg-d-secondary mx-auto flex flex-row items-center justify-between p-2 border-d-sidebar border-2 rounded-2xl min-w-fit w-[296px] h-[60px] max-w-[300px]">
                <div className="bg-input size-9 flex justify-center items-center text-text rounded-full">
                    {isAvatar ? <User />: ""}

                </div>
                <Link href={`/dashboard/profile?${user.id}`} className="text-text-secondary font-bold text-2xl">{user.username}</Link>
                <div>
                    <button className="">
                        <ChevronDown className={expandedIndex == index ? " rotate-180" : ""} />
                    </button>
                </div>
            </div>
            <ExpandedSubscription index={index} expandedIndex={expandedIndex} expandable={expandable} handleExpandable={handleExpandable} user={user}/>
        </div>
    )
}
export function ExpandedSubscription({index, expandedIndex, expandable, user}: SubscriptionProps) {


    const { video, getVideos } = useVideos(`/search/video/latest?id=${user.id}`, false)
    useEffect(()=>{

        if(expandedIndex == index && video == null){
            console.log("Fetching it Again!")
            getVideos()
        }
    },[expandedIndex])
    console.table(video)
    return(
        <div className={clsx(
            (expandedIndex == index && expandable) ? "absolute left-1/2 -translate-x-1/2 bg-d-secondary flex flex-col w-[296px] w-fill gap-2 p-3 mt-2 rounded-2xl" : "hidden" ,

        )}>
            <div
                className="bg-d-secondary text-text-secondary flex items-center text-[10px] justify-between w-full">
                <p>Number of Videos - 128</p>
                <p>Last Activity - 1 hours ago</p>
            </div>
            <div className="p-2 bg-d-main flex justify-center rounded-2xl">
                {video ?
                    <VideoCard index={1}
                               isGrid={false}
                               expandable={false}
                               expandedIndex={null}
                               onExpand={(index: number) => {}}
                               content={video}/> :
                    <h1>No Video</h1>
                }
            </div>
            <SubscribeButton username={user.username} subscribed={video?.isSubscribed || true} userId={user.id}/>


        </div>
    )
}
