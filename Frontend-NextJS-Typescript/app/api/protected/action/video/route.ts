import {NextRequest, NextResponse} from "next/server";
import { db } from '@/app/api/db/config';
import {cookies} from "next/headers";
import {authUser} from "@/app/api/functions/authMiddleware";


export async function POST(req: NextRequest){
    try{
        const searchParams = req.nextUrl.searchParams;
        const videoId = searchParams.get("id") as number
        const authToken = (await cookies()).get("token")?.value
        const tokenClaims = authUser(authToken);
        if (!tokenClaims) return new NextResponse("Unauthorized", {status: 401});
        await db.video_feedback.create({
            data:{
                user_id: tokenClaims.userId,
                video_id: videoId,
                created_at: new Date(),
            }
        })
        return new NextResponse("Successfully create the Video", {status: 200})

    }catch(e){
        console.log(e)
        return new NextResponse("Failed to create video", {status: 400})
    }
}

export async function DELETE(req: NextRequest){
    try{
        const searchParams = req.nextUrl.searchParams;
        const videoId = searchParams.get("id") as number
        const authToken = (await cookies()).get("token")?.value
        const tokenClaims = authUser(authToken);
        if (!tokenClaims) return new NextResponse("Unauthorized", {status: 401});
        console.log(tokenClaims, videoId);
        await db.video_feedback.deleteMany({
           where:{
               user_id: Number(tokenClaims.userId),
               video_id: Number(videoId)
           }
        })

        return NextResponse.json("Successfully create the Video", {status: 200})

    }catch(e){
        console.log(e)
        return new NextResponse("Failed to create video", {status: 400})
    }
}