import React from "react";
import VideoExtraFunctionality from "@/app/components/ui/VideoExtraFunctionality";
import SubscribeButton from "@/app/components/SubscribeButton";
import axios from "axios";
import {formatDistanceToNow} from "date-fns";
import VideoPlayer from "@/app/components/VideoPlayer";
import VideoActionFunctionality from "@/app/components/ui/VideoActionsFunctionality";



export default  async function VideoPage({ searchParams }: { searchParams: { vid?: string } }) {


    const videoID =  searchParams?.vid as number;
    if (!videoID) {
        return <h1>The requested video doesn't exist!</h1>;
    }


    const videoUrl = "https://hls-formatted.s3.us-east-1.amazonaws.com/2025-01-04_12-17-20/2025-01-04_12-17-20_hls.m3u8";
    let videoData = null;

    try {
        console.log(`here is the is -- ${videoID}`)
        const [video, expanded] = await Promise.all([
            axios.get(`http://localhost:3000/api/search/video/${videoID}`).then(response => response.data),
            axios.get(`http://localhost:3000/api/search/video/${videoID}?expanded=true`).then(response => response.data)
        ]);

        videoData = video; // Store the response data
        videoData.video = {...videoData.video, ...expanded}
        console.log("Fetched video data:", videoData);
    } catch (error) {
        console.log("Error fetching video data:", error);
    }

    if(videoData == null || !videoID) return <h1>The following Video doesn't exist!</h1>
    //
    const date = new Date(videoData.video.createdAt);
    const fDate = formatDistanceToNow(date, { addSuffix: true });

    return(
        <>
            <div className={"flex flex-col w-full h-full pt-12 px-8 pb-12  xl:px-12 cursor-default "}>

                <main className="flex flex-row my-2 gap-4 ">
                    <section className=" w-full  xl:w-[1000px] duration-500  xl:max-w-[1000px] flex-col gap-3">
                        <header
                            className={"flex flex-row justify-between w-full "}>
                            <div className="flex flex-col">
                                <h1 className={"text-2xl xl:text-3xl text-d-text font-bold max-w-[600px]"}>{videoData.video.title}</h1>
                                <div className="flex flex-row justify-between gap-2 ">
                                    <h2 className="text-text-secondary">@{videoData.video.user.username}</h2>
                                    <p className="text-text-secondary-2">{"red"}</p>
                                </div>

                            </div>

                            <div className="max-w-[145px]">
                                <SubscribeButton username={videoData.video.user.username} subscribed={true} userId={videoData.video.user.id} />
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
                                <p className="text-text text-lg tracking-wide">{videoData.video.description}</p>
                            </div>
                            <VideoActionFunctionality videoId={videoID}/>

                        </div>

                    </section>
                    <VideoExtraFunctionality videoId={videoID}/>
                </main>
            </div>
        </>
    )
}