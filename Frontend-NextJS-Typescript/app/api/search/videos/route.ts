import {NextRequest, NextResponse} from "next/server";
import {PrismaClient} from "@prisma/client";
import {convertVideoProperFormat} from "@/app/api/functions/convertVideoProperFormat";

const db = new PrismaClient();


export async function GET(req: NextRequest){
    // variables
    const url = new URL(req.url);
    const title = url.searchParams.get("title") || undefined;
    const category = url.searchParams.get("category") as "EDUCATIONAL" | "GAMING"| "NONE"| "PROGRAMMING" | undefined;
    const username = url.searchParams.get("username") || undefined;
    const sortBy = url.searchParams.get("sortBy") || undefined;
    const order = url.searchParams.get("order") as "ascending" | "descending" | undefined;
    const page = parseInt(url.searchParams.get("page") || "0", 10);
    const myVideos = url.searchParams.get("myVideos") === "true";

    // Authentication
    const authenticatedUsername = "JohnDoe";
    const effectiveUsername = myVideos ? authenticatedUsername : username;
    if (myVideos && !authenticatedUsername) {
        return NextResponse.json({ error: "User must be authenticated to view their videos." }, { status: 401 });
    }



    // Fetch videos
    const pageSize = 10;
    const orderBy = sortBy ? { [sortBy]: order === "descending" ? "desc" : "asc" } : undefined;

    const where: any = {};
    if (title) where.title = { contains: title, mode: "insensitive" };
    if (category) where.category = category;
    if (effectiveUsername) where.users = { username: effectiveUsername };

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

    const formattedVideos = videos.map((video) => convertVideoProperFormat(video, video.users))


    return NextResponse.json(formattedVideos, { status: 200 });
}