import {NextRequest, NextResponse} from "next/server";
import { db } from '@/app/api/db/config';
import {cookies} from "next/headers";
import {authUser} from "@/app/api/functions/authMiddleware";


export async function POST(req: NextRequest){
    try{
        const searchParams = req.nextUrl.searchParams;
        const userId = searchParams.get("id") as number
        const authToken = (await cookies()).get("token")?.value
        const tokenClaims = authUser(authToken);
        if (!tokenClaims) return new NextResponse("Unauthorized", {status: 401});
        await db.subscription.create({
            data: {
                user_subscribed_to_id: userId,
                subscriber_id: tokenClaims.userId,
            }
        })
        return new NextResponse("Successfully create the Video", {status: 200})

    }catch(e){
        console.log(e)
        return new NextResponse("Failed to create video", {status: 400})
    }
}

export async function DELETE(req: NextRequest){
    try{
        const searchParams = req.nextUrl.searchParams;
        const userId = searchParams.get("id") as number || undefined
        const authToken = (await cookies()).get("token")?.value
        const tokenClaims = authUser(authToken);
        if(!userId) return new NextResponse("User ID not passed in to subscribe to!",{status: 400});
        if (!tokenClaims) return new NextResponse("Unauthorized", {status: 401});
        await db.subscription.deleteMany({
            where: {
                user_subscribed_to_id: userId,
                subscriber_id: tokenClaims.userId,
            }
        })
        return new NextResponse("Successfully Added the Subscription", {status: 200})

    }catch(e){
        console.log(e)
        return new NextResponse("Failed to Subscribe!", {status: 400})
    }
}