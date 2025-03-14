import {NextRequest, NextResponse} from "next/server";
import {cookies} from "next/headers";
import {authUser} from "@/app/api/functions/authMiddleware";
import {PrismaClient} from "@prisma/client";
import { db } from '@/app/api/db/config';


// Create Video
export async function POST(req: NextRequest) {
   try {
       const body = await req.json()
       const title = body.title as string || undefined;
       const description = body.description as string || " ";
       const category = body?.category as "EDUCATIONAL" | "GAMING" | "NONE" | "PROGRAMMING" || "NONE"

       const authToken = (await cookies()).get("token")?.value
       const tokenClaims = authUser(authToken);
       if (!tokenClaims) {
           return new NextResponse("Unauthorized", {status: 401});
       }

       await db.videos.create({
           data: {
               title: title,
               description: description,
               category: category,
               likes: 0,
               dislikes: 0,
               created_at: new Date(),
               user_id: tokenClaims.userId,
               failed: true,
               views: 0
           }
       })
       return new NextResponse("Successfully create Video",{status:200})

   }
   catch (e) {
       console.log(e)
       return new NextResponse("Failed to Create the Video",{status: 200 })
   }

}


// Edit Video
export async function PUT(req: NextRequest) {
 try {
     const body = await req.json()
     const title = body.title as string || undefined;
     const description = body.description as string || undefined;
     const category = body.category as "EDUCATIONAL" | "GAMING" | "NONE" | "PROGRAMMING" || undefined
     const searchParams = req.nextUrl.searchParams;
     const videoId = searchParams.get("id") as number;
     const authToken = (await cookies()).get("token")?.value
     const tokenClaims = authUser(authToken);
     if (!tokenClaims) {
         return new NextResponse("Unauthorized", {status: 401});
     }

     const data: Record<string, string> = {};
     if (title) data.title = title;
     if (description) data.description = description;
     if (category) data.category = category;

     await db.videos.update({
         data,
         where: {
             video_id: videoId,
             user_id: tokenClaims.userId,
         }
     })

     return new NextResponse("Successfully Created the Video!",{status: 200})
 }
catch (e) {
        console.log(e)
        return new NextResponse("Failed to Create the Video",{status: 200 })
    }

}


// Delete Video by ID
export async function DELETE(req: NextRequest) {
   try {
       const searchParams = req.nextUrl.searchParams;
       const videoId = searchParams.get("id") as number;
       const authToken = (await cookies()).get("token")?.value
       const tokenClaims = authUser(authToken);
       if(!videoId) return new NextResponse("Video Id wasn't found",{status:  400})
       if (!tokenClaims) return new NextResponse("Unauthorized", {status: 401});
       await db.videos.delete({
           where:{
               user_id: tokenClaims.userId,
               video_id: videoId,
           }
       })

       return  new NextResponse( `Successfully deleted the video with Id of ${videoId} `, {status: 200})
   }
   catch (e) {
       console.log(e)
       return new NextResponse("Failed to Create the Video",{status: 200 })
   }
}