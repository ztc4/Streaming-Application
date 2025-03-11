"use client"

import {useEffect, useRef, useState} from "react";
import {Check, CheckCircle, ChevronDown, ListVideo, Share, Share2} from "lucide-react";
import clsx from "clsx";
import VideoCard from "@/app/components/VideoCard";
import Subscription from "@/app/components/Subscription";
import PlaylistManage from "@/app/components/PlaylistManage";
import VideoManage from "@/app/components/VideoManage";

export default function dashboard() {
    return(
        <>
            <div className="w-full flex mt-4 gap-6 duration-1000 flex-wrap flex-row">

                <PlaylistManage id={1} activeMenuId={1} setActiveMenuId={(index: number | null)=> {}}/>




            </div>
            <div className="grid mt-4 grid-cols-12 grid-rows-2 gap-3">

            </div>
            <div>


            </div>

        </>
    )
}

