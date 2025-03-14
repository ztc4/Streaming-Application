import {NextRequest, NextResponse} from "next/server";
import {cookies} from "next/headers";
import {authUser} from "@/app/api/functions/authMiddleware";



// Create Video
export async function POST(req: NextRequest) {
    const authToken = (await cookies()).get("token")?.value
    const tokenClaims = authUser(authToken);
    if(!tokenClaims){
        return new NextResponse("Unauthorized",{status: 401});
    }

}


// Edit Video
export async function PUT(req: NextRequest) {
    const authToken = (await cookies()).get("token")?.value
    const tokenClaims = authUser(authToken);
    if(!tokenClaims){
        return new NextResponse("Unauthorized",{status: 401});
    }
}


// Delete Video by ID
export async function DELETE(req: NextRequest) {
    const authToken = (await cookies()).get("token")?.value
    const tokenClaims = authUser(authToken);
    if(!tokenClaims){
        return new NextResponse("Unauthorized",{status: 401});
    }

}