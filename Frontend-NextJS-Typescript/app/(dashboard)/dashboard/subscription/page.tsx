"use client"

import {useEffect, useState} from "react";
import PlaylistManage from "@/app/components/PlaylistManage";
import {useSubscription} from "@/app/components/fetch/useSubscriptions";
import {useInView} from "react-intersection-observer";
import Subscription from "@/app/components/Subscription";

export default function SubscriptionPage(){
    const {subscriptions, isMore, loading, getSubscriptions} = useSubscription("/search/subscriptions?")

    const [expandedIndex, setExpandedIndex] = useState<number | null>(null);
    const { ref, inView } = useInView({ threshold: 0.5, triggerOnce: true });
    const handleExpand = (index: number) => {
        setExpandedIndex(expandedIndex === index ? null : index);
    };


    useEffect(() => {
        if (inView && isMore && !loading  ) {
            getSubscriptions();
        }
    }, [inView, isMore, getSubscriptions, loading]);
    return (
        <div className={"flex flex-row flex-wrap   w-full h-full pt-12  gap-6  px-8 cursor-default "}>

                {subscriptions.map((user, index) => (
                    <Subscription
                        key={index}
                        index={index}
                        expandable={true}
                        isAvatar={true}
                        user={user}
                        expandedIndex={expandedIndex}
                        handleExpandable={handleExpand}
                         />)
                )}
            {!loading && <div ref={ref} className="w-full h-24 flex items-center justify-center"/>}
        </div>
    )
}