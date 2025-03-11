import React from "react";
import {ArrowRight, ThumbsDown, ThumbsUp} from "lucide-react";

import VideoExtraFunctionality from "@/app/components/ui/VideoExtraFunctionality";

import SubscribeButton from "@/app/components/SubscribeButton";
import axios from "axios";
import {formatDistanceToNow} from "date-fns";
import VideoPlayer from "@/app/components/VideoPlayer";



export default  async function VideoPage({ searchParams }: { searchParams: { vid?: string } }) {

    const videoID = searchParams?.vid;
    const videoUrl = "https://hls-formatted.s3.us-east-1.amazonaws.com/2025-01-04_12-17-20/2025-01-04_12-17-20_hls.m3u8";
    let videoData = null;
    try {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_API_FETCH_URL}/search/video/${videoID}`);
        videoData = response.data; // Store the response data
        console.log("Fetched video data:", videoData);
    } catch (error) {
        console.log("Error fetching video data:", error);
    }

    if(videoData == null) return <h1>The following Video doesn't exist!</h1>

    const date = new Date(videoData.createdAt);
    const fDate = formatDistanceToNow(date, { addSuffix: true });

    return(
        <>
            <div className={"flex flex-col w-full h-full pt-12 px-8 pb-12  xl:px-12 cursor-default "}>

                <main className="flex flex-row my-2 gap-4 ">
                    <section className=" w-full  xl:w-[1000px] duration-500  xl:max-w-[1000px] flex-col gap-3">
                        <header
                            className={"flex flex-row justify-between w-full "}>
                            <div className="flex flex-col">
                                <h1 className={"text-2xl xl:text-3xl text-d-text font-bold max-w-[600px]"}>{videoData.title}</h1>
                                <div className="flex flex-row justify-between gap-2 ">
                                    <h2 className="text-text-secondary">@{videoData.user.username}</h2>
                                    <p className="text-text-secondary-2">{fDate}</p>
                                </div>

                            </div>

                            <div className="max-w-[145px]">
                                <SubscribeButton username={videoData.user.username} subscribed={true} userId={videoData.user.id} />
                            </div>
                        </header>
                        {/*Video*/}
                        <div className="w-full aspect-w-16 aspect-h-9 bg-input">
                            <VideoPlayer videoSrc={videoUrl}/>
                        </div>

                        {/*Information*/}
                        <div className="flex flex-col gap-6">
                            <div>
                                <label className=" text-text-secondary font-bold text-lg">Description: </label>
                                <p className="text-text text-lg tracking-wide">{videoData.description}</p>
                            </div>
                            <div className="w-full flex flex-wrap gap-2  justify-between ">
                                <button className="px-4 py-2 bg-b-main text-b-secondary font-bold rounded-2xl">
                                    Watch Later
                                </button>
                                <div
                                    className="flex font-semibold bg-d-secondary border border-opacity-45  rounded-full">
                                    <button className="rounded-l-full group  px-4 py-2 gap-2 flex">
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
                                    className="flex gap-3 px-4 py-2 ml-auto self-end font-semibold hover:bg-d-secondary ">
                                    <p>Share</p>
                                    <ArrowRight className="bg-b-main rounded-sm text-b-secondary"/>
                                </button>
                            </div>

                        </div>

                    </section>
                    <VideoExtraFunctionality videoId={videoID}/>
                </main>
            </div>
        </>
    )
}