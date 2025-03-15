import {NextRequest, NextResponse} from "next/server";
import {cookies} from "next/headers";
import {authUser} from "@/app/api/functions/authMiddleware";
import { db } from '@/app/api/db/config';
import {convertBigIntToNumber} from "@/app/api/functions/convertBigIntToNumber";

//Get My Playlist
export async function GET(req: NextRequest){
    const url = new URL(req.url);
    const category = url.searchParams.get("category") as "EDUCATIONAL" | "GAMING"| "NONE"| "PROGRAMMING" | undefined;

    console.log(2, req)
    //verify auth
    const authToken = (await cookies()).get("token")?.value
    const tokenClaims = authUser(authToken);
    if(!tokenClaims){
        return new NextResponse("Unauthorized",{status: 401});
    }

    const where: any = {};
    if (category) where.category = category;
    where.user_id = tokenClaims.userId


    const playlist = await db.playlist.findMany({
        where,
    })

    const playlistsFormatted = playlist.map(it => convertBigIntToNumber(it))

    return  NextResponse.json(playlistsFormatted, {status: 200});
}