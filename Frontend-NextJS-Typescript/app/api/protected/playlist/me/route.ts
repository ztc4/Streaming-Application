import {NextRequest, NextResponse} from "next/server";
import {cookies} from "next/headers";
import {authUser} from "@/app/api/functions/authMiddleware";
import {PrismaClient} from "@prisma/client";
import {convertBigIntToNumber} from "@/app/api/functions/convertBigIntToNumber";
const db = new PrismaClient();
//Get My Playlist
export async function GET(req: NextRequest){
    const url = new URL(req.url);
    const category = url.searchParams.get("category") as "EDUCATIONAL" | "GAMING"| "NONE"| "PROGRAMMING" | undefined;

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