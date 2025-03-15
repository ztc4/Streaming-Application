"use client"

import {useState} from "react";
import Cookies from "js-cookie";
import axios, {AxiosResponse} from "axios";

interface ISubscribeButtonProps {
    username?: String;
    subscribed: boolean;
    userId:number;
}

export function Subscribed ({username, subscribed, userId}: ISubscribeButtonProps) {

    const [isSubscribed, setIsSubscribed] = useState(subscribed);
    const handleSubscribe = async () => {
        console.log(userId)
        try{
            const token = Cookies.get('token')
            let response :AxiosResponse<any,any>
            if(isSubscribed){
                response = await axios.delete(`${process.env.NEXT_PUBLIC_API_FETCH_URL}/protected/action/subscription?id=${userId}`,);
            }
            else{
                response = await axios.post(`${process.env.NEXT_PUBLIC_API_FETCH_URL}/protected/action/subscription?id=${userId}`, {},)

            }
            setIsSubscribed(prev => !prev);
        }
        catch(err){
            console.log(err)
        }
    }

    return {isSubscribed , handleSubscribe}
}