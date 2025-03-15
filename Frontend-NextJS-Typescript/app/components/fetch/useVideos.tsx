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


    useEffect(() => {
        return () => {
            setVideoList([]);
            setVideo(null)
            setIsMore(true)
            setLoading(false)
            page.current = 0
        }
    }, []);


    const getVideos = async () => {
        if (loading || !isMore) return;
        setLoading(true);
        try {
            const response = await axios.get(
                `${process.env.NEXT_PUBLIC_API_FETCH_URL}${fetchURL}&page=${page.current}`,
            );

            if(pageable){
                setVideoList((current) => [...current, ...( response.data.content || response.data)]);
                response.data.length < 10 ? setIsMore(false) : page.current += 1;
            }else{
                setVideo(response.data)
            }
        } catch (error: unknown) {
            setIsMore(false)
            if (error instanceof Error) {
                // console.log("Error fetching videos: " + error.message);
            } else {
                // console.log("An unknown error occurred.");
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
