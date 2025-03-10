"use client"

import VideoCard from "@/app/components/VideoCard";

interface SubscriptionProps {
    expandable: boolean;
    isAvatar: boolean;
    expandedIndex: number | null;
    index: number;
    handleExpandable: (index:number ) => void;
    user: IUser;
}
import {videoData} from "@/app/Test Data/VideoData"
import {ChevronDown, User} from "lucide-react";
import {IUser} from "@/app/interfaces/IUser";
import {useVideos} from "@/app/components/fetch/useVideos";
import {useEffect} from "react";
import SubscribeButton from "@/app/components/SubscribeButton";


export default function Subscription({expandable, isAvatar, expandedIndex, index, handleExpandable, user}: SubscriptionProps) {
    const { video, getVideos } = useVideos(`/search/video/latest/${user.id}?`, false)
    useEffect(()=>{
        getVideos()
    },[])


    // const content = videoData[0]
    return(
        <div className="relative w-[296px]">
            <div
                onClick={()=> handleExpandable(index)}
                className="bg-d-secondary mx-auto flex flex-row items-center justify-between p-2 border-d-sidebar border-2 rounded-2xl min-w-fit w-[296px] h-[60px] max-w-[300px]">
                <div className="bg-input size-9 flex justify-center items-center text-text rounded-full">
                    {isAvatar ? <User />: ""}

                </div>
                <p className="text-text-secondary font-bold text-2xl">{user.username || "@123Randy"}</p>
                <div>
                    <button className="">
                        <ChevronDown className={expandedIndex == index ? " rotate-180" : ""} />
                    </button>
                </div>
            </div>
            {(expandedIndex == index && expandable) && <div className="absolute left-1/2 -translate-x-1/2 bg-d-secondary flex flex-col w-fill gap-2 p-3 mt-2 rounded-2xl">
                <div
                    className="bg-d-secondary text-text-secondary flex items-center text-[10px] justify-between w-full">
                    <p>Number of Videos - 128</p>
                    <p>Last Activity - 1 hours ago</p>
                </div>
                <div className="p-2 bg-d-main rounded-2xl">
                    {video ?
                        <VideoCard index={1}
                                   isGrid={false}
                                   expandable={false}
                                   expandedIndex={null}
                                   onExpand={(index: number) => {}}
                                   content={video}/> :
                        <h1>No Vid</h1>
                    }
                </div>
                <SubscribeButton username={user.username} subscribed={video?.isSubscribed || false} userId={user.id}/>


            </div>}

        </div>
    )
}
