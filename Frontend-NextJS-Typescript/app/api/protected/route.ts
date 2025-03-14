import {cookies} from "next/headers";
import {authUser} from "@/app/api/functions/authMiddleware";
import {NextRequest, NextResponse} from "next/server";

export async function GET(req: NextRequest){
    const authToken = (await cookies()).get("token")?.value
    const tokenClaims = authUser(authToken);
    if(!tokenClaims){
        return new NextResponse("Unauthorized",{status: 401});
    }
    return "We have met here"
}