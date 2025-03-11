"use client"

import axios from "axios";
import Cookies from "js-cookie";
import { useState} from "react";

interface PlaylistAddVideo {
    videoId: number;
    playlistId: number | null;
    category: "LATER" | "ACTIVITY" | null;
}

export  function AddVideoToPlaylist({category, videoId, playlistId}: PlaylistAddVideo) {
    const [isError, setIsError] = useState(false);



    const handleAddVideo = async ()=>{
        try{
            const token = Cookies.get('token');
            axios.put(`${process.env.NEXT_PUBLIC_API_FETCH_URL}/playlist/add?${ !category ? null : `category=${category}`}&${ !playlistId ? null : `pID=${playlistId}`}&vID=${videoId}`, {},
                {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                    },
                }
            )
        }
        catch(e){
            alert(e)
        }
    }

    return { handleAddVideo, isError };

}
