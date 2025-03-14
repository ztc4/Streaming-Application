import {NextRequest, NextResponse} from "next/server";
import {cookies} from "next/headers";
import {authUser} from "@/app/api/functions/authMiddleware";
import { db } from '@/app/api/db/config';

// searchController/ Subscriptions
export async function GET(req: NextRequest){

    try {
        const authToken = (await cookies()).get("token")?.value
        const tokenClaims = authUser(authToken);
        if(!tokenClaims){
            return new NextResponse("Unauthorized",{status: 401});
        }
        const subscriptions = await db.subscription.findMany({
            where: {
                subscriber_id: tokenClaims.userId
            }
        })

        
        console.log(subscriptions)
        return new NextResponse("Found Your Subscriptions",{status:200 })

    }catch (e) {
        console.log(e)
        return new NextResponse("Failed to Find Subscriptions!",{status:400 })
    }
}