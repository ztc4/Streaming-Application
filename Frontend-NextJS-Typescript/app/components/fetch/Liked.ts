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
            const token = Cookies.get('token')
            let response :AxiosResponse<any,any>
            if(isLiked){
                response = await axios.delete(`${process.env.NEXT_PUBLIC_API_FETCH_URL}/action/unlikeVideo/${videoId}`,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                            "Content-Type": "application/json",
                        },
                    }
                );
            }
            else{
                response =  await axios.post(`${process.env.NEXT_PUBLIC_API_FETCH_URL}/action/likeVideo/${videoId}`, {},
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                            'Content-Type': 'application/json'
                        },
                    }
                )

            }
            setIsLiked(prev => !prev);
        }
        catch(err){
            alert(err)
        }
    }

    return {isLiked , handleLike}
}