import {IVideoProps} from "@/app/interfaces/IVideoProps";

export interface IVideoCardProps {
    isSubscribed: boolean;
    isLiked: boolean;
    video: IVideoProps
}