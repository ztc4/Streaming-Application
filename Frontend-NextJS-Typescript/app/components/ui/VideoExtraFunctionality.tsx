"use client"

import videoData from "@/app/Test Data/VideoData";
import chatData from "@/app/Test Data/chatData";
import VideoCard from "@/app/components/VideoCard";
import React, {FormEvent, useEffect, useState} from "react";
import {IUser} from "@/app/interfaces/IUser";
import {Send} from "lucide-react";
import clsx from "clsx";
import {useUser} from "@/app/components/fetch/useUser";
import {format, formatDistanceToNow} from "date-fns";

interface IChat{
    message: string;
    timestamp: string;
    user: IUser;
}
interface props{
    videoId: number;
}

export default function VideoExtraFunctionality({videoId}:props) {
    const {user, getUser} = useUser("/search/user?me=true")
    const [currentPage, setCurrentPage] = React.useState<"Recommended"  | "Chat" | "Meeting">("Chat");
    const [chat, setChat] = React.useState<IChat[]>([]);
    const [socket, setSocket] = useState<WebSocket| null>(null);
    const [message, setMessage] = React.useState<IChat>({
        message: "",
        timestamp:"",
        user:{
            id: 1,
            username: "Guest",
            subscribersCount: 45
        }
    });

    useEffect(() => {
        // Deal with Websocket
        if(!videoId) return  
        getUser()
        const ws = new WebSocket(`wss://1ny54ad977.execute-api.us-east-1.amazonaws.com/production?vid=${videoId}`);
        setSocket(ws);
        ws.onmessage = (event) => {
            const {message} = JSON.parse(event.data);
            const jsonMessage = JSON.parse(message);
            setChat( it => [...it, jsonMessage]);

        };

        ws.onopen = () => {
            console.log('WebSocket connected');
        };

        ws.onclose = () => {
            console.log('WebSocket disconnected');
        };

        return () => {
            ws.close();
        };
    }, []);
    useEffect(() => {
        if(user == null){
            getUser()
        }
        if(user != null ) {
            setMessage( it => ({...it, user: {...user}, }))
        }
    }, [user]);
    console.log(message)


    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setMessage( it => ({ ...it, [event.target.name]: event.target.value }) );
    }
    const sendMessage = (e: FormEvent  ) => {
        e.preventDefault();

        if (socket && socket.readyState === WebSocket.OPEN) {
            socket.send(JSON.stringify( {...message, timestamp: new Date() }) );
        }
        setMessage( it => ({ ...it, message: "" }) );
    }
    return (
        <section className="w-fit duration-700 flex-grow flex flex-col  h-full gap-4 rounded-lg  ">
            <div className="w-full px-2 flex justify-between text-lg font-bold">
                <button onClick={()=>setCurrentPage("Recommended")}>Recommended</button>
                <button onClick={()=>setCurrentPage("Chat")}>Join Chat</button>
                <button onClick={()=>setCurrentPage("Meeting")}>Meeting</button>
            </div>
            {currentPage == "Recommended" &&
                <div className="w-full bg-d-secondary max-h-screen h-full px-4 py-2 flex flex-col overflow-y-scroll">
                    {videoData.map((content, index) => (
                        <VideoCard
                            key={index + "-Here it goes"}
                            isGrid={false}
                            index={index}
                            expandable={false}
                            expandedIndex={1}
                            content={content}
                        />
                    ))}
                </div>
            }
            { currentPage == "Chat" &&
                <div className="w-full  max-h-screen h-full px-4 py-2 flex flex-col gap-4 overflow-y-scroll">
                    <form
                        onSubmit={sendMessage}
                        className="flex flex-row">
                        <input
                            className=" min-h-fit rounded-2xl px-2 border border-text-secondary bg-transparent flex-grow"
                            placeholder="Enter Your Message"
                            type={"text"}
                            name="message"
                            onChange={handleChange}
                            value={message.message}/>
                        <button
                            type="submit"
                            className="flex justify-center items-center p-2 rounded-full">
                            <Send/>
                        </button>
                    </form>
                    <div className="flex flex-col w-full   gap-2">
                        {chat.map((content, index) => {

                            const date = new Date(content.timestamp);
                            const fDate =  format(date, 'h:mm a');

                            return (
                                <div key={content.timestamp}
                                     className={clsx("w-10/12 p-3 bg-secondary  min-h-8 flex rounded-lg  gap-2 ", content.user.id == (user?.id) || content.user.username == "Guest" ? "self-end" : "self-start")}>
                                    <div className="size-6 bg-d-sidebar rounded-full"/>
                                    <div className=" flex-grow">
                                        <div className="flex flex-row justify-between">
                                            <p className="text-d-text text-sm">@{

                                                content.user.username

                                            }</p>
                                            <p className="text-text-secondary text-sm">{fDate}</p>

                                        </div>
                                        <p className="text-d-text text-base">{content.message}</p>
                                    </div>

                                </div>
                            )
                        })}
                    </div>
            </div>
            }
            {currentPage == "Meeting" &&
                <div
                    className="w-full bg-d-secondary  flex flex-col  max-h-screen h-full px-4 py-2 gap-6 overflow-y-scroll">
                    <div
                        className="w-full min-h-[200px]   p-2 row-span-1 flex flex-col gap-4 h-fit justify-between rounded-2xl bg-blue">
                        <div className="flex flex-row bg-input justify-between size-8"/>
                        <div className="self-end justify-self-end">
                            <p className="font-semibold text-lg">Quick Meeting</p>
                            <p>Quick Create a Link to share for meeting</p>
                        </div>

                    </div>
                    <div
                        className="w-full min-h-[200px]   p-2 row-span-1 flex flex-col gap-4 h-fit justify-between rounded-2xl bg-orange">
                        <div className="flex flex-row bg-input justify-between size-8"/>
                        <div className="self-end justify-self-end">
                            <p className="font-semibold text-lg">Quick Meeting</p>
                            <p>Quick Create a Link to share for meeting</p>
                        </div>

                    </div>
                    <div
                        className="w-full min-h-[200px]   p-2 row-span-1 flex flex-col gap-4 h-fit justify-between rounded-2xl bg-orange">
                        <div className="flex flex-row bg-input justify-between size-8"/>
                        <div className="self-end justify-self-end">
                            <p className="font-semibold text-lg">Quick Meeting</p>
                            <p>Quick Create a Link to share for meeting</p>
                        </div>

                    </div>
                </div>
            }


        </section>
    )
}