"use client"
import { useState, useRef, useEffect } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import {IVideoCardProps} from "@/app/interfaces/IVideoCardProps";



export function useVideos( fetchURL : String, pageable :boolean = true) {

    const [videoList, setVideoList] = useState<Array<IVideoCardProps>>([]);
    const [video,setVideo] = useState<IVideoCardProps | null>(null);
    const [isMore, setIsMore] = useState<boolean>(true);
    const [loading, setLoading] = useState<boolean>(false);
    const page = useRef<number>(0);


    const getVideos = async () => {
        if (loading || !isMore) return;
        setLoading(true);
        try {
            const token = Cookies.get("token");
            const response = await axios.get(
                `${process.env.NEXT_PUBLIC_API_FETCH_URL}${fetchURL}&page=${page.current}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "application/json",
                    },
                }
            );

            console.log("Fetch URL is " + fetchURL , response);
            if(pageable){
                setVideoList((current) => [...current, ...response.data.content]);
                response.data.last ? setIsMore(false) : page.current += 1;
            }else{
                console.log("Here is your response", response)
                setVideo(response.data)
            }
        } catch (error: unknown) {
            setIsMore(false)
            if (error instanceof Error) {
                alert("Error fetching videos: " + error.message);
            } else {
                alert("An unknown error occurred.");
            }
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        return () => {

            page.current = 0;
            setVideoList([]);
        };
    }, []);

    return { videoList, video, isMore, loading, getVideos};
}
