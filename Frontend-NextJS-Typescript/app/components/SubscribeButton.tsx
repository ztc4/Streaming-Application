"use client"

import clsx from "clsx";
import {Subscribed} from "@/app/components/fetch/Subscribed";
interface ISubscribeButtonProps {
    username: String;
    subscribed: boolean;
    userId:number;
}

export default function SubscribeButton({username, subscribed, userId}: ISubscribeButtonProps) {
    const {isSubscribed,handleSubscribe} = Subscribed({username, subscribed, userId});

    return(
        <button
        className={clsx("font-semibold w-full flex justify-center items-center text-sm  self-end ml-auto duration-500  z-[80] 0 h-[25px] px-3 py-4 rounded-3xl", isSubscribed ? " bg-b-main text-b-secondary text-[#EFF]" :"bg-red-500 " )}
        onClick={handleSubscribe} // Prevent link activation
        aria-label={`Subscribe to the ${username} channel`}
        >
            {isSubscribed ? "Unsubscribe": "Subscribe"}
        </button>
    )
}