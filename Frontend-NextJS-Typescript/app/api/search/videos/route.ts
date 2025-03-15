import {NextRequest, NextResponse} from "next/server";
import {convertVideoProperFormat} from "@/app/api/functions/convertVideoProperFormat";
import { db } from '@/app/api/db/config';
import {authUser} from "@/app/api/functions/authMiddleware";
import {cookies} from "next/headers";
import {makeIsLikedVideo} from "@/app/api/functions/isLiked";
import {IVideoProps} from "@/app/interfaces/IVideoProps";


export async function GET(req: NextRequest){
    // variables
    const searchParams = req.nextUrl.searchParams;
    const title = searchParams.get("title") || undefined;
    const category = searchParams.get("category") as "EDUCATIONAL" | "GAMING"| "NONE"| "PROGRAMMING" | undefined;
    const username = searchParams.get("username") || undefined;
    const sortBy = searchParams.get("sortBy") || undefined;
    const order = searchParams.get("order") as "ascending" | "descending" | undefined;
    const page = searchParams.get("page")  as number || 0
    const myVideos = searchParams.get("myVideos") === "true";

    const authToken = (await cookies()).get("token")?.value
    const tokenClaims = authUser(authToken);
    if(myVideos && !tokenClaims?.userId){
        return new NextResponse("Can't get your videos! Currently not signed in", {status: 401})
    }


    // Fetch videos
    const pageSize = 10;
    const orderBy = sortBy ? { [sortBy]: order === "descending" ? "desc" : "asc" } : undefined;

    const where: any = {};
    if (title) where.title = { contains: title, mode: "insensitive" };
    if (category) where.category = category;
    if (myVideos ) where.users = { id: tokenClaims?.userId };
    if (username && !myVideos) where.users = { username: username};

    const videos = await db.videos.findMany({
        where,
        orderBy,
        skip: page * pageSize,
        take: pageSize,
        select:{
            video_id: true,
            title: true,
            user_id: false,
            views: true,
            created_at:  true,
            users: true,
        },
    });

    const formattedVideos: IVideoProps[] = videos.map((video) => convertVideoProperFormat(video, video.users))
    const videoWithExtraInfo = await Promise.all(formattedVideos.map(async (video) => {
        return makeIsLikedVideo(tokenClaims?.userId || null, video);
    }));


    return NextResponse.json(videoWithExtraInfo, { status: 200 });
}