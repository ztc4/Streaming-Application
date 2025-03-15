import {NextRequest, NextResponse} from "next/server";
import { db } from '@/app/api/db/config';
import {convertVideoProperFormat} from "@/app/api/functions/convertVideoProperFormat";
import {makeIsLikedVideo} from "@/app/api/functions/isLiked";
import {cookies} from "next/headers";
import {authUser} from "@/app/api/functions/authMiddleware";


export async function GET(req: NextRequest){
    try{
        const searchParams = req.nextUrl.searchParams;
        const id = searchParams.get("id") as number;
        const authToken = (await cookies()).get("token")?.value
        const tokenClaims = authUser(authToken);

        const latestVideo = await db.videos.findFirst({
            select:{
                video_id: true,
                title: true,
                user_id: true,
                views: true,
                created_at:  true,
                users: true,
            },
            orderBy: {
                created_at: 'desc',
            },
            where:{
                user_id: Number(id),
            }
        })

        if(!latestVideo)return new NextResponse("No latest video found by the user!", {status: 404})

        const formattedLatestVideo = convertVideoProperFormat(latestVideo, latestVideo.users)
        const video = await makeIsLikedVideo(tokenClaims?.userId || null, formattedLatestVideo);
        return  NextResponse.json(video,{status:200})
    }
    catch(e){
        console.log(e)
        return new NextResponse("Failed to get the Video", {status:500 })
    }
}