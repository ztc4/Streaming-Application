import {IUser} from "@/app/interfaces/IUser";

export interface IVideoProps{

    createdAt: string;
    title: string;
    videoId: number;
    views: number;
    user: IUser;
}