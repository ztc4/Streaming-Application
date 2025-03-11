import {IVideoProps} from "@/app/interfaces/IVideoProps";
import axios from "axios";
import {FormEvent, useState} from "react";
import Cookies from "js-cookie";

export default function VideoManage({createdAt,title, views, user,videoId}: IVideoProps){
    const [deleteInput, setDeleteInput] = useState<string>("");


    const handleDeleteVideo = async (e: FormEvent) => {
        e.stopPropagation()
        e.preventDefault()
        try{
            const token = Cookies.get("token");
            if(deleteInput != "DELETE") return alert("You need to type DELETE")
            const response = await axios.delete(`${process.env.NEXT_PUBLIC_API_FETCH_URL}/video/deleteVideo/${videoId}`,{
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
            });
            console.log(response)
        }catch(error){
            alert("Failed to delete video");
        }
    }

    return (
        <div className="w-full relative md:w-96">
            <div
                className="w-full sm:w-96 flex  flex-row justify-center border-text-secondary border-[1px] bg-d-secondary h-[100px] rounded-md">
                <div className=" w-1/3 h-full rounded-md bg-d-main"></div>
                <div className=" w-2/3 p-2 flex flex-col justify-between">
                    <h2 className="text-[16px] text-semibold">{title}</h2>
                    <div className="flex items-center justify-between text-[8px] ">
                        <p>Status ~ Failed ( Video Needed)</p>
                        <p>Created ~ {createdAt}</p>
                    </div>
                </div>
            </div>
            <div
                className="absolute left-1/2 z-20  -translate-x-1/2 bg-d-secondary flex flex-col w-full gap-2 p-3 mt-2 rounded-2xl">
                <div className="p-2 bg-d-main w-full flex flex-row flex-wrap gap-2 rounded-2xl">
                    <button
                        className="w-full p-2 bg-b-main text-b-secondary duration-300 hover:bg-d-sidebar hover:text-d-text rounded-2xl">
                        Add Video
                    </button>
                    <div className="flex flex-row gap-2 w-full h-fit">
                        <button
                            className="w-1/2 p-2 bg-green-200 text-b-secondary duration-300 hover:bg-green-600 hover:text-d-text rounded-2xl">
                            Edit Details
                        </button>
                        <button
                            className="w-1/2 p-2 bg-green-200 text-b-secondary duration-300 hover:bg-green-600 hover:text-d-text rounded-2xl">
                            Add Thumbnail
                        </button>
                    </div>

                </div>
                <div
                    className="bg-d-secondary w-full text-text-secondary flex flex-col items-start text-[13px] justify-between w-full">

                    <form className="w-full">
                        <p className="text-d-text text-base">Delete Your Video</p>
                        <input
                            onChange={ event => setDeleteInput(event.target.value)}
                            placeholder="Enter DELETE"
                            name="delete"
                            type="text"
                            className="bg-input outline-none rounded-3xl h-8 w-full text-text-secondary pl-2 sm:pl-12 focus:text-text  px-4"
                        />
                        <p className="text-[#FF0000] font-medium">Please Type DELETE into the following box!</p>
                        <button
                            onClick={handleDeleteVideo}
                            className="w-full p-2 mt-1 bg-[#FF1000] text-d-text duration-300 hover:bg-d-sidebar hover:text-d-text text-base font-semibold rounded-2xl">
                            Delete Video
                        </button>
                    </form>

                </div>
            </div>

        </div>
    )

}