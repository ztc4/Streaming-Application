import {IUser} from "@/app/interfaces/IUser";


interface Video {
    createdAt?: string;
    title: string;

    views: number;
    user?: IUser;
    videoId: number,
    category?: "EDUCATIONAL" | "GAMING"| "NONE"| "PROGRAMMING";
    description?: string;
    dislikes?: number;
    likes?: number;
}

export function convertVideoProperFormat(video: any, user: any): Video {

    return {
        title : String(video.title),
        views : Number(video.views),
        createdAt: String(video.created_at),
        videoId: Number(video.video_id),
        likes: Number(video.likes) ,
        dislikes: Number(video.dislikes) ,
        category: String(video.category),
        description : String(video.description) ,
        user: user
            ? {  // Only include user if it exists
                username: String(user.username),
                id: Number(user.id),
                subscribersCount: Number(user.subscribersCount),
            }
            : undefined ,
    }
}