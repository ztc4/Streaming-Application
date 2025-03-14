import {cookies} from "next/headers";
import {NextRequest, NextResponse} from "next/server";
import { db } from '@/app/api/db/config';
import jwt from 'jsonwebtoken';
import {convertVideoProperFormat} from "@/app/api/functions/convertVideoProperFormat";
import {authUser} from "@/app/api/functions/authMiddleware";
import {makeIsLikedVideo} from "@/app/api/functions/isLiked";


export async function GET(req: NextRequest){
    try {
        const searchParams = req.nextUrl.searchParams;
        const authToken = (await cookies()).get("token")?.value
        const tokenClaims = authUser(authToken);
        const page = searchParams.get("page")  as number || 0;
        const pageSize = 10;
        if (!tokenClaims) {
            return new NextResponse("Unauthorized", {status: 401});
        }


        const videosLikedFeedback = await db.video_feedback.findMany({
            where: {
                user_id: tokenClaims.userId
            },
            select:{
              video_id: true
            },
            skip: page * pageSize,
            take: pageSize,
        })
        if (!videosLikedFeedback.length) {
            return new NextResponse("No liked videos found", { status: 404 });
        }

        // Put video_ids into Array
        const videoIds = videosLikedFeedback.map((feedback) => feedback.video_id);

        const videos = await db.videos.findMany({
            where: {
                video_id: { in: videoIds },
            },
            select: {
                video_id: true,
                title: true,
                user_id: true,
                views: true,
                created_at: true,
                users: true,
            },
        });

        const formattedVideos = await Promise.all(
            videos.map(async (video) => {
                const fVideo = convertVideoProperFormat(video, video.users);
                return makeIsLikedVideo(tokenClaims?.userId || null, fVideo);
            })
        );


        return NextResponse.json(formattedVideos,{status: 200})

    }
    catch(e) {
        console.log(e)
        return new NextResponse("Hello",{status: 500})
    }

}
