import {NextRequest, NextResponse} from "next/server";
import { PrismaClient } from "@prisma/client";
import { customJSON } from "@/app/api/functions/customJSON"
import {convertVideoProperFormat} from "@/app/api/functions/convertVideoProperFormat";

const db = new PrismaClient();


export async function GET(req: NextRequest,  { params }: { params: { id: number } }){
    const { id } = await params; // Path Variable I
    const expanded: boolean | null = req.nextUrl.searchParams.get('expanded') === "true";

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
    console.log(2, video)


    if (!video) {
        return NextResponse.json({ error: "Video not found" }, { status: 404 });
    }
    //
    const formattedVideo = convertVideoProperFormat(video, expanded ? undefined : video.users)

    return NextResponse.json(formattedVideo ,{status: 200});
}