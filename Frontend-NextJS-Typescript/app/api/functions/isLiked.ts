import { db } from '@/app/api/db/config';
import {IVideoCardProps} from "@/app/interfaces/IVideoCardProps";
import {IVideoProps} from "@/app/interfaces/IVideoProps";




export  async function makeIsLikedVideo(userId: number | null, video: IVideoProps): Promise<IVideoCardProps>{
    if(!userId){
        return {
            video: video,
            isLiked: false,
            isSubscribed: false
        }
    }

    const [likedRecord, subscribedRecord] = await Promise.all([
        db.video_feedback.findFirst({
            where: {
                video_id: video.videoId,
                user_id: userId,
            },
            select: {
                id: true
            }
        }),
        db.subscription.findFirst({
            where: {
                user_subscribed_to_id: video.user.id,
                subscriber_id: userId,
            },
            select: {
                subscription_id: true
            }
        })
    ]);

    const isLiked = likedRecord !== null || false;
    const isSubscribed = subscribedRecord !== null || false;

    return {
        video: video,
        isLiked: isLiked,
        isSubscribed: isSubscribed
    }


}