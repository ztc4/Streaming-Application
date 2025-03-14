import {NextRequest, NextResponse} from "next/server";

import {PrismaClient} from "@prisma/client";
import {convertVideoProperFormat} from "@/app/api/functions/convertVideoProperFormat";
const db = new PrismaClient();


export async function GET(req:NextRequest){
    try {
        const searchParams = req.nextUrl.searchParams;
        const playlistId = searchParams.get("pId") as unknown as number;
        const playlistVideos = await db.playlist_videos.findMany({
            where: {
                playlist_id: playlistId
            },
            select:{
                video_id: true
            }
        })

        const videos = await Promise.all(playlistVideos.map(async (it) => {
            return db.videos.findUnique({
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
        }));
        const formattedVideos = videos.map(it => convertVideoProperFormat(it, it!!.users))

        console.log(4, videos)
        return  NextResponse.json(formattedVideos, {status: 200})
    }
    catch(err){
        console.log(err)
        return new NextResponse("Failed to delete video from playlist! ", {status: 300})
    }
}