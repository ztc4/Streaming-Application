import {IUser} from "@/app/interfaces/IUser";
import {IVideoProps} from "@/app/interfaces/IVideoProps";


interface Video {
    createdAt?: string;
    title?: string;
    views?: number;
    user?: IUser;
    videoId: number,
    category?: "EDUCATIONAL" | "GAMING"| "NONE"| "PROGRAMMING";
    description?: string;
    dislikes?: number;
    likes?: number;
}

export function convertVideoProperFormat(video: any, user: any): IVideoProps | IVideoExpanded {

    return {
        videoId: Number(video.video_id),
        title : video.title || undefined,
        views : Number(video.views) || undefined,
        createdAt: video.created_at|| undefined,
        likes: Number(video.likes) || undefined,
        dislikes: Number(video.dislikes) || undefined,
        category: video.category || undefined,
        description : video.description || undefined,
        user: user
            ? {  // Only include user if it exists
                username: String(user.username),
                id: Number(user.id),
                subscribersCount: Number(user.subscribers_count),
            }
            : undefined ,
    }
}