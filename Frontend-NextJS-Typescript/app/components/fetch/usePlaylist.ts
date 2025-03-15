"use client"
import {useEffect, useRef, useState} from "react";
import Cookies from "js-cookie";
import axios from "axios";
import {IPlaylistsProps} from "@/app/interfaces/IPlaylistsProps";


export function usePlaylist(fetchURL: string) {
    const [playlists, setPlaylists] = useState<Array<IPlaylistsProps>>([])
    const [isMore, setIsMore] = useState<Boolean>(true)
    const [isVisible,setIsVisible] = useState<Boolean>(false)
    const page = useRef<number>(0)


    const getPlaylist = async () => {
        if(isVisible) return
        try {
            setIsVisible(true);
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
            setPlaylists((current) => [...current, ...(response.data.content || response.data)]);
            response.data.length < 10 ? setIsMore(false) : (page.current += 1);
        }
        catch (error) {
            setIsMore(false)
            console.log("error Fetching the Playlist : ", error)
        }
        finally {
            setIsVisible(false);
        }
    }
    useEffect(() => {


        return () => {
            page.current = 0;
            setPlaylists([]);
        };
    }, []);


    return {playlists, isMore, isVisible, getPlaylist};

}