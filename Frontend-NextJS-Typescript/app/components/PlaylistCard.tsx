import {ListVideo} from "lucide-react";
import Link from "next/link";
import {IPlaylistsProps} from "@/app/interfaces/IPlaylistsProps";

interface IProps {
    videosInPlaylist: number;
    content: IPlaylistsProps;

}


export default function PlaylistCard({videosInPlaylist = 1, content}: IProps) {

    return(
        <Link  className="w-full h-fit   col-span-12 lg:col-span-6 xl:col-span-4 2xl:col-span-3  cursor-pointer group" href={`/video/pid=${content.id}`}  passHref>
            <div className="w-full h-fit   col-span-12 sm:col-span-6 md:col-span-4 lg:col-span-3 cursor-pointer group">
                <div className="aspect-video aspect-w-16 aspect-h-9 w-full h-full min-h-[195px] group-hover:bg-background-accent-yellow duration-500 relative rounded-3xl bg-input">
                    <div className=" absolute top-3/4 left-3/4 transform  bg-main text-d-text w-fit h-fit font-medium gap-1 rounded-lg flex flex-row  justify-center p-1 bg-opacity-50">
                        <ListVideo strokeWidth={2}/>
                        <span className="text-sm font-semibold flex items-center ">{videosInPlaylist} Videos</span>
                    </div>
                </div>
                <h3 className="text-lg mt-1 font-semibold ">{content.name}</h3>
            </div>
        </Link>
    )
}