import {NextRequest, NextResponse} from "next/server";
import { db } from '@/app/api/db/config';

export async function GET(req: NextRequest,  context: { params: { id: number } }){
    try{
        const searchParams = req.nextUrl.searchParams;
        const { id } = await context.params; // Await the params Promise
        const expanded = searchParams.get('expanded') === 'true';

        console.log(expanded, id)
        const playlist = await db.playlist.findUnique({
            where:{
                id: Number(id),
                private: false
            },
            select:{
                id: true,
                category: !expanded,
                name: !expanded,
                users: !expanded,
                private: expanded,
                created_at: expanded,
                video_count: expanded
            },
        })
        console.log(2, playlist)


        if (!playlist) {
            return NextResponse.json({ error: "Video not found" }, { status: 404 });
        }


        return NextResponse.json("Playlist was retrieved" ,{status: 200});
    }catch (e) {
        console.log(e)
        return new NextResponse("Failed to get the Video",{status: 400})
    }

}