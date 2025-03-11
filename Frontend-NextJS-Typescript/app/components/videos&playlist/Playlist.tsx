"use client"

import PlaylistCard from "@/app/components/PlaylistCard";
import {useEffect, useState} from "react";
import {useInView} from "react-intersection-observer";
import {LoaderCircle} from "lucide-react";
import {usePlaylist} from "@/app/components/fetch/usePlaylist";

interface IPlaylistProps {
    fetchURL: string;
    active: boolean;
}


export default function Playlist({fetchURL, active}: IPlaylistProps) {

    const {playlists, isMore, isVisible, getPlaylist} = usePlaylist(fetchURL)

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { ref, inView } = useInView({ threshold: 0.5 });

    useEffect(() => {
        if (inView && isMore) {
            getPlaylist()
        }
    }, [inView, isMore, getPlaylist]);



    return(
        <div className={active ? " w-full" : "hidden w-full"}>

            <div className="grid grid-cols-12 mt-2 z-0 duration-1000  gap-2 min-h-screen">
                {playlists.map((current, index) => (
                    <PlaylistCard
                        content={current}
                        videosInPlaylist={1}
                        key={current.id +"-playlist"}

                    />
                ))}
            </div>
            { !isVisible && <div ref={ref} className="w-full h-12   flex items-center justify-center"/>}
            {isVisible && (
                <div className="mt-6 p-4 justify-center items-center text-text-primary flex flex-row gap-2">
                    <p>Loading</p>
                    <LoaderCircle className="animate-spin w-5 h-5"/>
                </div>
            )}

        </div>
    )

}