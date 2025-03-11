import {IUser} from "@/app/interfaces/IUser";
import {IVideoProps} from "@/app/interfaces/IVideoProps";

export interface IPlaylistsProps {
    id: number;
    name: string;
    category: string;
    user: IUser;
    // videos: Array<IVideoProps>
}