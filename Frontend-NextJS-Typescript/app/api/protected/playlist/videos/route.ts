import {NextRequest, NextResponse} from "next/server";
import {cookies} from "next/headers";
import {authUser} from "@/app/api/functions/authMiddleware";
import {PrismaClient} from "@prisma/client";
const db = new PrismaClient();

// Add video to Playlist
export async function POST(req:NextRequest){
    try{
        const searchParams = req.nextUrl.searchParams;
        const playlistId = searchParams.get("pId") as number;
        const videoId = searchParams.get("vId") as number;
        const authToken = (await cookies()).get("token")?.value
        const tokenClaims = authUser(authToken);
        if(!tokenClaims){
            return new NextResponse("Unauthorized",{status: 401});
        }

        // Check If Playlist is Owned by User
        const playlist = await db.playlist.findUniqueOrThrow({
            where: {
                id: playlistId,
                user_id: tokenClaims.userId,
            },
            select: { user_id: true, id: true},
        });

        // Add the Video
        await db.playlist_videos.create({
            data: {
                playlist_id: Number(playlist.id), video_id: videoId, position: 0, added_at: new Date(), // Current timestamp
            },
        });

        // Update Count in Videos
        await db.playlist.update({
            where: { id: Number(playlist.id), },
            data: {
                video_count: {increment: 1},
            },
        });

        return new NextResponse("Added Video to the Playlist", {status: 200})
    }
    catch (e) {
        console.log(err)
        return new NextResponse("Failed to Add Playlsit ", {status: 300})
    }
}

// Delete Video from Playlist
export async function DELETE(req:NextRequest){
    console.log("hit the following!")
    try{
        const searchParams = req.nextUrl.searchParams;
        const playlistId = searchParams.get("pId")  as number;
        const videoId = searchParams.get("vId")  as number;
        console.log(searchParams)
        const authToken = (await cookies()).get("token")?.value
        const tokenClaims = authUser(authToken);
        if(!tokenClaims){
            return new NextResponse("Unauthorized",{status: 401});
        }

        // Check If Playlist is Owned by User
        const playlist = await db.playlist.findUniqueOrThrow({
            where: {
                id: playlistId,
                user_id: tokenClaims.userId,
            },
            select: { user_id: true, id: true},
        });

        console.log(playlist)
        // Add the Video
        await db.playlist_videos.deleteMany({
            where:{
                playlist_id: Number(playlist.id),
                video_id: videoId
            }
        })

        // Update Count in Videos
        await db.playlist.update({
            where: { id: Number(playlist.id), },
            data: {
                video_count: {decrement: 1},
            },
        });

        return new NextResponse("Video was deleted form Playlist!", {status: 200})
    }
    catch (e) {
        console.log(err)
        return new NextResponse("Failed to delete video from playlist! ", {status: 300})
    }


}
