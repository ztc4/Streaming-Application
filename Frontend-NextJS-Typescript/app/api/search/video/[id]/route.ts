import {NextRequest, NextResponse} from "next/server";
import { db } from '@/app/api/db/config';
import {convertVideoProperFormat} from "@/app/api/functions/convertVideoProperFormat";
import {makeIsLikedVideo} from "@/app/api/functions/isLiked";
import {cookies} from "next/headers";
import {authUser} from "@/app/api/functions/authMiddleware";




export async function GET(req: NextRequest,  { params }: { params: { id: number } }){
    const { id } = await params; // Path Variable I
    const expanded: boolean | null = req.nextUrl.searchParams.get('expanded') === "true";
    const authToken = (await cookies()).get("token")?.value
    const tokenClaims = authUser(authToken);


    const video = await db.videos.findUnique({
        where:{
            video_id: id
        },
        select:{
            video_id: true,
            title: !expanded,
            user_id: !expanded,
            views: !expanded,
            created_at:  !expanded,
            description: expanded,
            category: expanded,
            likes: expanded,
            dislikes: expanded,
            users: !expanded,

        },
    })

    if (!video) {
        return NextResponse.json({ error: "Video not found" }, { status: 404 });
    }
    //
    const formattedVideo = convertVideoProperFormat(video, expanded ? undefined : video.users)
    if(!expanded){
        const  extraVideo = await makeIsLikedVideo( tokenClaims?.userId || null, formattedVideo)
        return  NextResponse.json( extraVideo ,{status:200})
    }

    return NextResponse.json(formattedVideo ,{status: 200});
}