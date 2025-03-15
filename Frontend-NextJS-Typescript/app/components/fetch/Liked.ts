"use client"

import {useState} from "react";
import Cookies from "js-cookie";
import axios, {AxiosResponse} from "axios";

interface ISubscribeButtonProps {
    liked: boolean;
    videoId: number;
}

export function Liked ({videoId, liked}: ISubscribeButtonProps) {

    const [isLiked, setIsLiked] = useState(liked);
    const handleLike = async () => {
        try{
            if(isLiked){
                await axios.delete(`${process.env.NEXT_PUBLIC_API_FETCH_URL}/protected/action/video?id=${videoId}`);
            }
            else{
                await axios.post(`${process.env.NEXT_PUBLIC_API_FETCH_URL}/protected/action/video?id=${videoId}`, {},)
            }
            setIsLiked(prev => !prev);
        }
        catch(err){
            alert(err)
        }
    }

    return {isLiked , handleLike}
}