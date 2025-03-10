
import VideosExpandableGrid from "@/app/components/videos&playlist/VideosExpandableGrid";

export default function LikedVideosPage(){
    return (
        <div className={"ml-auto flex w-full  h-full justify-start "}>
            <VideosExpandableGrid  expandable={false} fetchURL={"/search/videos/liked?"} active={true} oneTime={false} /> {/* ?page=0&order=ascending */}

        </div>
    )
}