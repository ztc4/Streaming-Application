"use client"

import {ArrowRight, ThumbsDown, ThumbsUp} from "lucide-react";
import React from "react";
import {Liked} from "@/app/components/fetch/Liked";

interface props{
    videoId: number;
}
export default function VideoActionFunctionality({videoId}: props) {

    const { handleLike} = Liked({ videoId: videoId, liked: false})
    return (
        <div className="w-full flex flex-wrap gap-2  justify-between ">
            <button className="px-4 py-2 bg-b-main text-b-secondary font-bold rounded-2xl">
                Watch Later
            </button>
            <div
                className="flex font-semibold bg-d-secondary border border-opacity-45  rounded-full">
                <button
                    onClick={handleLike}
                    className="rounded-l-full group  px-4 py-2 gap-2 flex">
                    <ThumbsUp className="text-black group-hover:text-white duration-500"/>
                    Like
                </button>
                <div className="h-4/5 w-[0.5px] my-auto bg-white"/>
                <button className="rounded-l-full group px-4 py-2 gap-2 flex">
                    <ThumbsDown className="text-black group-hover:text-white duration-500"/>
                    Dislike
                </button>

            </div>
            <button
                className="flex gap-3 px-4 py-2  self-end font-semibold hover:bg-d-secondary ">
                <p>Share</p>
                <ArrowRight className="bg-b-main rounded-sm text-b-secondary"/>
            </button>
        </div>
    )
}