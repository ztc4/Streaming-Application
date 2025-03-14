import {NextRequest, NextResponse} from "next/server";
import {cookies} from "next/headers";
import {authUser} from "@/app/api/functions/authMiddleware";
import { db } from '@/app/api/db/config';


// Delete Your Account
export async function DELETE(req:NextRequest){
    const authToken = (await cookies()).get("token")?.value
    const tokenClaims = authUser(authToken);
    if(!tokenClaims){
        return new NextResponse("Unauthorized",{status: 401});
    }
}

