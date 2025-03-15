"use client"
import Playlist from "@/app/components/videos&playlist/Playlist"
import {useState} from "react";
import VideosExpandableGrid from "@/app/components/videos&playlist/VideosExpandableGrid";

export default function PlaylistPage(){


    const [visibleContent, setVisibleContent] = useState<"videos" | "playlist">("videos");
    const toggleContent = () => {
        setVisibleContent(prev => (prev === "videos" ? "playlist" : "videos"));
    };

    return (
        <section className={"w-full my-8"}>
            <div className={"flex flex-row gap-2 border-b-2 justify-between"}>
                <div className={"flex flex-row font-semibold text-2xl gap-2"}>
                    <button className={visibleContent === "videos" ? " text-blue":"" } onClick={toggleContent}>Videos</button>
                    <button className={visibleContent === "playlist" ? " text-blue":"" } onClick={toggleContent}>Playlist</button>
                </div>
                <fieldset className="flex gap-2 items-center">
                    <span className="text-sm font-medium">Sort:</span>

                    <label className="flex items-center gap-1">
                        <input type="radio" name="sort" value="recent" className="accent-blue-500"/>
                        <span>Recent</span>
                    </label>

                    <label className="flex items-center gap-1">
                        <input type="radio" name="sort" value="likes" className="accent-blue-500"/>
                        <span>Likes</span>
                    </label>

                    <label className="flex items-center gap-1">
                        <input type="radio" name="sort" value="views" className="accent-blue-500"/>
                        <span>Views</span>
                    </label>
                </fieldset>
            </div>

            <Playlist fetchURL={"/protected/playlist/me?"} active={visibleContent === "playlist" }/>
            <VideosExpandableGrid
                fetchURL={"/search/videos?myVideos=true"}
                expandable={true}
                oneTime={false}
                active={visibleContent === "videos"}/>
        </section>
    )
}