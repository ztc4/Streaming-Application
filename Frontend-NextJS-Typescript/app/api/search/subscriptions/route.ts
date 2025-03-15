import { NextResponse} from "next/server";
import {cookies} from "next/headers";
import {authUser} from "@/app/api/functions/authMiddleware";
import { db } from '@/app/api/db/config';
import { convertUserProperFormat } from "@/app/api/functions/convertUserProperFormat"

// searchController/ Subscriptions
export async function GET(){

    try {
        const authToken = (await cookies()).get("token")?.value
        const tokenClaims = authUser(authToken);
        if(!tokenClaims){
            return new NextResponse("Unauthorized",{status: 401});
        }
        const subscriptions = await db.subscription.findMany({
            where: {
                subscriber_id: tokenClaims.userId
            },
            select: {
                user_subscribed_to_id: true
            }
        })
        const userIds: number[] = subscriptions.map( it => Number(it.user_subscribed_to_id))
        const users = await  db.users.findMany({
            where: {
                id:{in: userIds}
            }
        })
        const formattedUsers = users.map(user =>  convertUserProperFormat(user))

        return NextResponse.json(formattedUsers,{status:200 })

    }catch (e) {
        console.log(e)
        return new NextResponse("Failed to Find Subscriptions!",{status:400 })
    }
}