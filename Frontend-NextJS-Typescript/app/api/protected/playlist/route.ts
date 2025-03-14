import {NextRequest, NextResponse} from "next/server";
import {cookies} from "next/headers";
import {authUser} from "@/app/api/functions/authMiddleware";
import {PrismaClient} from "@prisma/client";
const db = new PrismaClient();

// PlaylistController
// Create Playlist
export async function POST(req: NextRequest){
    try{
        const { title } =  await req.json()
        const authToken = (await cookies()).get("token")?.value
        const tokenClaims = authUser(authToken);
        if(!tokenClaims){
            return new NextResponse("Unauthorized",{status: 401});
        }

        await db.playlist.create({
            data:{
                user_id: tokenClaims.userId,
                name: title,
                private: true,
                video_count: 0,
                category: "NONE"
            }
        })
        return new NextResponse("Successfully Created Playlist", {status: 200})
    }
    catch(err){
        console.log(err)
        return new NextResponse("Failed to Add Playlsit ", {status: 300})
    }


}

// Delete Playlist
export async function DELETE(req: NextRequest){
    try {
        const searchParams = req.nextUrl.searchParams;
        const playlistId = searchParams.get("id") as number;
        console.log(playlistId);
        const authToken = (await cookies()).get("token")?.value
        const tokenClaims = authUser(authToken);
        if (!tokenClaims) {
            return new NextResponse("Unauthorized", {status: 401});
        }
        await db.playlist.delete({
            where:{
                user_id: tokenClaims.userId,
                id: playlistId
            }
        })

        return new NextResponse("Successfully Created Playlist", {status: 200})
    }
    catch(err){
        console.log(err)
        return new NextResponse("Failed to Add Playlsit ", {status: 300})
    }
}

// Edit Playlist
export async function PUT(req: NextRequest){

    try{
        const body = await req.json()
        const title = body.title as string || undefined;
        const isPrivate = typeof body.private === 'boolean' ? body.private : undefined;

        const searchParams = req.nextUrl.searchParams;
        const playlistId = searchParams.get("id") as number;
        const authToken = (await cookies()).get("token")?.value
        const tokenClaims = authUser(authToken);
        if(!tokenClaims){
            return new NextResponse("Unauthorized",{status: 401});
        }
        const data: any = {};
        if (title) data.name = title;
        if (typeof isPrivate === 'boolean') data.private = isPrivate ;

        await db.playlist.update({
            where:{
                id: playlistId,
                user_id: tokenClaims.userId,
                category: "NONE"
            },
            data
        })

        return new NextResponse("Successfully Created Playlist", {status: 200})
    }
    catch(err){
        console.log(err)
        return new NextResponse("Failed to Add Playlsit ", {status: 300})
    }
}