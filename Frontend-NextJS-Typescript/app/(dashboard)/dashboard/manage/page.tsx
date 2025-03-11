"use client"

import PlaylistManage from "@/app/components/PlaylistManage";
import {useEffect, useState} from "react";
import clsx from "clsx";
import {Info, Plus, Share2} from "lucide-react";
import VideoManage from "@/app/components/VideoManage";
import {usePlaylist} from "@/app/components/fetch/usePlaylist";
import CreatePlaylistModal from "@/app/components/ui/CreatePlaylistModal";
import {useVideos} from "@/app/components/fetch/useVideos";
export default function ManageVideosPage(){
    const [activeMenuId, setActiveMenuId] = useState<number | null>(null);
    const {playlists, isMore, isVisible, getPlaylist} = usePlaylist("/playlist/me?")
    const {videoList, isMore: isMoreVideos , loading, getVideos} = useVideos("/search/videos?myVideos=true")
    const [isActive, setisActive] = useState<boolean>(false);

    useEffect(() => {
        if(isMore){
            getPlaylist()
            getVideos()
        }
    }, []);
    console.log(3, videoList)


    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            // Ensure that the clicked element is not inside an active PlaylistManage component
            if (activeMenuId !== null) {
                const activeMenuElement = document.getElementById(`playlist-menu-${activeMenuId}`);
                if (activeMenuElement && activeMenuElement.contains(e.target as Node)) {
                    return; // Click inside the menu, so don't close it
                }
                setActiveMenuId(null); // Click outside, close the menu
            }else{}
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [activeMenuId]);
    const toggleCreatePlaylistModal = () => {
        setisActive(it => !it)
    }

    return (
        <div className={"flex flex-col flex-wrap bg-d-main   w-full min-h-screen py-12  gap-12  px-8 cursor-default "}>
            <CreatePlaylistModal isOpen={isActive} onClose={toggleCreatePlaylistModal} />
            <section className="   ">
                <header className="flex justify-between py-4 min-w-fit  items-center">
                    <h1 className="text-3xl text-d-text">Playlist</h1>
                    <div className="flex items-center gap-4">
                        <input
                            type="text"
                            placeholder="Filter By Playlist Title... "
                            className="bg-input outline-none rounded-3xl h-12 text-text-secondary pl-2 sm:pl-12 focus:text-text min-w-56 w-[345px] px-4"

                        />
                        <div className="group relative">
                            <button
                                className=" outline rounded-full  bg-d-secondary size-12 flex justify-center items-center text-d-text">
                                <Info className="bg-d-sidebar"/>
                            </button>
                            <div className="hidden absolute bg-d-secondary left-1/2 -translate-x-1/2 w-56 p-2 rounded-2xl  group-hover:flex justify-center items-center text-d-text">
                                <ol >
                                    <li >- Double Click to Go to Playlist</li>
                                    <li>- Click To Change the Title</li>
                                    <li>- Right Click to Open More Details</li>
                                </ol>
                            </div>
                        </div>

                        <button
                            onClick={toggleCreatePlaylistModal}
                            className=" outline o rounded-2xl  bg-d-secondary size-12 flex justify-center items-center text-d-text">
                            <Plus/>
                        </button>
                    </div>
                </header>
                <div
                    className={"flex flex-row flex-wrap    w-full  pt-12   gap-3 cursor-default "}>
                    {playlists.map((playlist, index) => (
                        <div key={index} className={clsx( (index % 3 == 0) && "px-6 " , index % 2 == 0 ? "px-12 ": "px-8")}>
                            <PlaylistManage
                                key={index}
                                id={index}
                                activeMenuId={activeMenuId}
                                playlist={playlist}
                                setActiveMenuId={setActiveMenuId}
                            />
                        </div>
                    ))}
                </div>
            </section>
            <section className="py-4">
                <header className="flex justify-between py-4 min-w-fit  items-center">
                    <h1 className="text-3xl text-d-text">Videos</h1>
                    <div className="flex items-center gap-4">
                        <input
                            type="text"
                            placeholder="Filter By Video Title "
                            className="bg-input outline-none rounded-3xl h-12 text-text-secondary pl-2 sm:pl-12 focus:text-text min-w-56 w-[345px] px-4"

                        />
                    </div>
                </header>
                <div
                    className={"flex flex-row   flex-nowrap  min-h-[400px] bg-blue mb-20   w-full  pt-12  gap-3 cursor-default "}>
                    {videoList.map(it => {
                            return (
                                <VideoManage
                                    key={it.video.videoId}
                                    createdAt={it.video.createdAt}
                                    user={it.video.user}
                                    title={it.video.title}
                                    videoId={it.video.videoId}
                                    views={it.video.views}/>
                            )
                        }
                    )}

                </div>

            </section>
        </div>

    )
}

