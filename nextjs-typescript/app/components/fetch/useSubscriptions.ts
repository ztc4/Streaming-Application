"use client"
import {useEffect, useRef, useState} from "react";

import Cookies from "js-cookie";
import axios from "axios";
import {IUser} from "@/app/interfaces/IUser";
interface ISubscriptions{
    subscriptionId: number;
    subscriber: IUser,
    userSubscribedTo: IUser

}

export function useSubscription( fetchURL : String) {

    const [subscriptions, setSubscriptions] = useState<Array<ISubscriptions>>([]);
    const [isMore, setIsMore] = useState<boolean>(true);
    const [loading, setLoading] = useState<boolean>(false);
    const page = useRef<number>(0);


    const getSubscriptions = async () => {
        if (loading || !isMore) return;
        setLoading(true);
        try {
            const token = Cookies.get("token");
            const response = await axios.get(
                `${process.env.NEXT_PUBLIC_API_FETCH_URL}/search${fetchURL}&page=${page.current}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "application/json",
                    },
                }
            );
            console.log("Fetch URL is " + fetchURL , response);

            setSubscriptions((current) => [...current, ...(response.data?.content || response.data)]);
            // response.data.last ? setIsMore(false) : (page.current += 1);
            setIsMore(false)
        } catch (error) {

            alert("Error fetching Subscriptions:", error);
            setIsMore(false)
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {

        return () => {
            page.current = 0;
            setSubscriptions([]);
        };
    }, []);

    return { subscriptions, isMore, loading, getSubscriptions };
}
