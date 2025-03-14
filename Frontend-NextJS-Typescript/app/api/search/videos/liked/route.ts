import {cookies} from "next/headers";
import {NextRequest, NextResponse} from "next/server";
import {PrismaClient} from "@prisma/client";
import jwt from 'jsonwebtoken';
import {convertVideoProperFormat} from "@/app/api/functions/convertVideoProperFormat";
const db = new PrismaClient();

export async function GET(req: NextRequest){
    const url = new URL(req.url);
    const userToken = (await cookies()).get("token")?.value;
    const page = parseInt(url.searchParams.get("page") || "0", 10);
    const pageSize = 10;


    if (!userToken) {
        return new NextResponse("Your currently, not logged in!",{status: 500})
    }
    try {
        const {email, userId} = jwt.verify(userToken, process.env.JWT_SECRET);


        const videosLikedFeedback = await db.video_feedback.findMany({
            where: {
                user_id: userId,
            },
            skip: page * pageSize,
            take: pageSize,
        })
        const videos = await Promise.all(videosLikedFeedback.map(async (it) => {
            const video = await db.videos.findUnique({
                where: {
                    video_id: it.video_id,
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

            // If no video found, return null or handle accordingly
            if (!video) {
                return null;
            }

            return convertVideoProperFormat(video, video.users);
        }));




        return NextResponse.json(videos,{status: 200})

    }
    catch(err) {
        return new NextResponse("Hello",{status: 500})
    }

}
