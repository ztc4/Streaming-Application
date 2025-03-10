import {useEffect, useRef, useState} from "react";
import {Check, ListVideo, Share2} from "lucide-react";
import {IPlaylistsProps} from "@/app/interfaces/IPlaylistsProps";
import axios from "axios";
import Cookies from "js-cookie";
import CreatePlaylistModal from "@/app/components/ui/CreatePlaylistModal";
import clsx from "clsx";
import {string} from "prop-types";


interface Props {
    id: number;
    activeMenuId: number  | null;
    setActiveMenuId: (id: number | null) => void;
    playlist: IPlaylistsProps
}

export default function PlaylistManage({ id, activeMenuId, setActiveMenuId, playlist }: Props) {
    const [title, setTitle] = useState(playlist.name);
    const [isEditing, setIsEditing] = useState<Boolean>(false);
    const menuRef = useRef<HTMLDivElement>(null);

    const handleSubmitTitle = async (e: React.FormEvent) => {
        e.preventDefault();
        const token = Cookies.get("token")
        try{
            await axios.put(`${process.env.NEXT_PUBLIC_API_FETCH_URL}/playlist/${playlist.id}`, {title: title}, {
                headers: {Authorization: `Bearer ${token}`, "Content-Type": "application/json"}
            });
        }catch (e) {
            alert("Failed to Update Title")
        }
        finally {
            console.log("I just submitted!");
            setIsEditing(false);
        }
    };


    const handleNavigateToPlaylist = () => {
        alert("Currently going to the playlist...");
    };

    const handleRightClick = async  (e: React.MouseEvent<HTMLDivElement>) => {
        e.preventDefault();
        setActiveMenuId(activeMenuId === id ? null : id);
    };



    return (
        <div  className="relative w-[296px]">
            <div
                onContextMenu={handleRightClick}
                onDoubleClick={handleNavigateToPlaylist}
                className="bg-d-secondary mx-auto flex flex-row items-center justify-between p-2 hover:bg-main hover:scale-105 duration-500 cursor-pointer rounded-2xl min-w-fit w-[296px] h-[60px] max-w-[300px]"
            >
                <div className="bg-d-main flex justify-center items-center size-9 rounded-full">
                    <ListVideo />
                </div>

                {!isEditing ? (
                    <div className="flex flex-row items-center w-full justify-between">
                        <p
                            onClick={() => setIsEditing(!isEditing)}
                            className="text-text font-normal w-4/5 min-h-8  text-center whitespace-nowrap truncate  text-lg tracking-wide overflow-ellipsis"
                        >
                            {title}
                        </p>
                        <div>

                        </div>
                    </div>
                ) : (
                    <form className="flex flex-row items-center justify-between" onSubmit={handleSubmitTitle}>
                        <input
                            onChange={(e) => setTitle(e.currentTarget.value)}
                            value={title}
                            type="text"
                            className="w-4/5 bg-transparent bg-inpu"
                        />
                        <button className="bg-d-main hover:bg-green-400 rounded-full p-1">
                            <Check />
                        </button>
                    </form>
                )}
            </div>
            <PlaylistManageExpanded activeMenuId={activeMenuId} menuRef={menuRef} id={id} playlistId={playlist.id} title={playlist.name} />
        </div>
    );
}

interface expandedProps{
    activeMenuId: number | null;
    id: number,
    playlistId: number;
    title: string;
    menuRef: React.RefObject<HTMLDivElement>;

}

function PlaylistManageExpanded({activeMenuId, id, playlistId, title, menuRef}: expandedProps){
    const [playlistExpanded, setPlaylistExpanded] = useState<IPlaylistExpandedProps | null>(null)

    const fetchData = async () => {
        const token = Cookies.get("token")
        try{
            const result = await axios
                .get(`${process.env.NEXT_PUBLIC_API_FETCH_URL}/playlist/${playlistId}?expanded=true`,{
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "application/json",
                    },
                });
            setPlaylistExpanded(result.data);
            console.log(result)
        }
        catch (e) {
            alert("Failed to Update Title")
        }
    }
    useEffect(() => {
        fetchData()
    }, []);
    const handleClickPrivate =  async (e: React.MouseEvent)=>{

        const token = Cookies.get("token")
        try{
            let response = await axios.put(`${process.env.NEXT_PUBLIC_API_FETCH_URL}/playlist/${playlistId}`, {private: !playlistExpanded?.private }, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json"
                },
            });
            setPlaylistExpanded(it => it ? { ...it, private: !it.private } : null);
        }catch (e) {
            alert("Failed to Update Title")
        }
        finally {
            console.log("I just submitted!");
        }

    }
    const handleDelete = async (e: React.MouseEvent) => {
        try{
            const token = Cookies.get("token");
            const result = await axios
                .delete(`${process.env.NEXT_PUBLIC_API_FETCH_URL}/playlist?pID=${playlistId}`,{
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "application/json",
                    },
                });
        }
        catch (e){
            console.error(e);
            alert(`Failed to delete playlist: ${e}`);
        }


    }



    if(activeMenuId != id) return null
    if(playlistExpanded == null) return null;

    return (
            <div id={`playlist-menu-${id}`} ref={menuRef} className="absolute left-1/2 z-20 -translate-x-1/2 bg-d-secondary flex flex-col w-full gap-2 p-3 mt-2 rounded-2xl">
                <div className="bg-d-secondary text-text-secondary flex flex-col items-start text-[12px] justify-between w-full">
                    <div className="flex flex-row items-center w-full justify-between">
                        <p className="text-text font-normal text-lg tracking-wide overflow-ellipsis">{title}</p>
                        <button className="bg-d-main hover:bg-b-main hover:text-b-secondary p-2 rounded-full">
                            <Share2 />
                        </button>
                    </div>
                    <p>Number of Videos - {playlistExpanded.videoCount}</p>
                    <p>Created At - {playlistExpanded.createdAt}</p>
                </div>
                <div className="p-2 bg-d-main flex flex-col gap-2 rounded-2xl">
                    <button
                        onClick={handleClickPrivate}
                        className={clsx("w-full p-2 bg-b-main text-b-secondary duration-300 hover:bg-d-sidebar hover:text-d-text rounded-2xl", !playlistExpanded.private && "bg-green-400")}>
                        Make {playlistExpanded.private ? "Public" : "Private"}
                    </button>
                    <button
                        onClick={handleDelete}
                        className="w-full p-2 bg-red-600 text-b-secondary duration-300 hover:bg-red-600 hover:text-d-text rounded-2xl">
                        Delete Playlist
                    </button>
                </div>
            </div>

    )

}
