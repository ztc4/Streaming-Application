"use client"
import {useEffect, useRef, useState} from "react";
import axios from "axios";
import {IUser} from "@/app/interfaces/IUser";


export function useSubscription( fetchURL : string) {

    const [subscriptions, setSubscriptions] = useState<Array<IUser>>([]);
    const [isMore, setIsMore] = useState<boolean>(true);
    const [loading, setLoading] = useState<boolean>(false);
    const page = useRef<number>(0);


    const getSubscriptions = async () => {
        if (loading || !isMore) return;
        setLoading(true);
        try {

            const response = await axios.get(`${process.env.NEXT_PUBLIC_API_FETCH_URL}${fetchURL}&page=${page.current}`);
            console.log("Fetch URL is " + fetchURL , response);

            setSubscriptions((current) => [...current, ...(response.data?.content || response.data)]);
            response?.data?.last || response.data.length < 10 ? setIsMore(false) : (page.current += 1);
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
