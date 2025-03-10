"use client";
import {useCreateVideoContext} from "@/app/context/CreateVideoContext";
import {ChevronRight, Upload} from "lucide-react";
import { useState} from "react";
import { useRouter } from "next/navigation";
import clsx from "clsx";

export default function  CreateVideoPage(){
    const router = useRouter();

    const {videoPage} = useCreateVideoContext();
    const {handleVideoUpload, video} = videoPage
    const [isSubmitting, setIsSubmitting] = useState<boolean| "failed">(false);




    console.log(process.env.NEXT_PUBLIC_API_FETCH_URL)
    const submitForm = (e: React.FormEvent)=>{
        e.preventDefault();
        //navigate to different page
        router.push("/dashboard/upload/add-video/uploading")
    }


    return (
            <div className="max-w-screen-md mx-auto ">
                <h1 className="text-4xl font-medium ">Add Video </h1>

                <form className={"grid grid-cols-12 col-span-12 mt-8 gap-8"} onSubmit={submitForm}>
                    <label
                        title="Upload Video"
                        className={clsx(
                            video != null && "bg-[#33D01B]",
                            "col-span-12 bg-[#D9D9D9] border-2 duration-500 transition-all flex gap-8 flex-col cursor-pointer justify-between items-center aspect-w-16 rounded-2xl aspect-h-9 bg-opacity-40")}
                        htmlFor="image-upload">

                            <div className={"w-full h-full py-4 flex flex-col items-center justify-between"}>
                            <span/>
                            <div
                                className={" size-32 aspect-square flex justify-center items-center p-10 rounded-full bg-[#D9D9D9] opacity-40"}>
                                <Upload className={"w-full opacity-100 h-full  text-color-[#000]"}/>
                            </div>
                            <div className={clsx( video != null &&  " flex-col items-center justify-center", "flex z-0 flex-row justify-center items-center text-lg gap-3")}>
                               { video == null ?
                                   <p className={"font-medium"}>Drop Your Video Here</p> :
                                   <div className={" flex flex-col items-center justify-center"}>
                                       <p className={"font-medium"}>The following video is successfully selected</p>
                                       <p className={"font-bold"}>{video.name}</p>
                                   </div>
                               }
                                <span className={"font-bold"}> -OR-</span>
                                <div
                                    title={"Select File"}
                                    className={"bg-[#0A0A0A] rounded-3xl text-white hover:bg-background-accent-blue  duration-500 cursor-pointer px-4 py-1"}>
                                    { video == null ? "Select File" :  "Reselect Video "}
                                </div>
                            </div>
                        </div>
                        <input
                            onChange={handleVideoUpload}
                            className=" hidden z-10"
                            id="image-upload"
                            type="file"
                            accept="video/*"
                            required
                        />
                    </label>


                    <div className="col-span-12 flex gap-2  justify-end mt-8">
                        <div className={"flex flex-col h-full justify-center items-center text-lg "}>
                            <p className={"text-base font-semibold "}>Attempt Upload the File</p>
                            <p className={" font-light text-sm text-[#A71A1A]"}>Do not exit until it is finished!</p>
                        </div>
                        <button
                            type="submit"
                            className="flex flex-row items-center text-lg justify-between p-2  bg-blue-500  hover:bg-blue-600 text-white rounded-full size-[66px]">
                            <ChevronRight className={"size-full"}/>
                        </button>
                    </div>
                </form>
            </div>
    )
}