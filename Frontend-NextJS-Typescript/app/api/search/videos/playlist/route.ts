import {NextRequest, NextResponse} from "next/server";
import { db } from '@/app/api/db/config';;
import {convertVideoProperFormat} from "@/app/api/functions/convertVideoProperFormat";
import {makeIsLikedVideo} from "@/app/api/functions/isLiked";
import {cookies} from "next/headers";
import {authUser} from "@/app/api/functions/authMiddleware";

export async function GET(req:NextRequest){
    try {
        const searchParams = req.nextUrl.searchParams;
        const playlistId = searchParams.get("pId") as unknown as number;
        const authToken = (await cookies()).get("token")?.value
        const tokenClaims = authUser(authToken);

        const playlistVideos = await db.playlist_videos.findMany({
            where: {
                playlist_id: playlistId
            },
            select:{
                video_id: true
            }
        })

        const videos = await Promise.all(playlistVideos.map(async (it) => {
            const video = await db.videos.findUnique({
                where: {video_id: Number(it.video_id)},
                select:{
                    video_id: true,
                    title: true,
                    user_id: false,
                    views: true,
                    created_at:  true,
                    users: true,
                },
            });
            const formattedVideos= convertVideoProperFormat(video, video.users)
            return  makeIsLikedVideo(tokenClaims?.userId || null, formattedVideos);
        }));


        console.log(4, videos)
        return  NextResponse.json(videos, {status: 200})
    }
    catch(err){
        console.log(err)
        return new NextResponse("Failed to delete video from playlist! ", {status: 300})
    }
}