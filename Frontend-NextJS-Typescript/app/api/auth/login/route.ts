import {NextRequest, NextResponse} from "next/server";
import { db } from '@/app/api/db/config';
import jwt from "jsonwebtoken";



const customJSON = (data: any) =>
    JSON.stringify(data, (_, value) =>
        typeof value === "bigint" ? value.toString() : value
    );

export async function POST(req: NextRequest) {
    try {
        const { email } = await req.json();
        console.log(email)
        const user = await db.users_private.findUnique({
            where:{
                email: email
            },
            select:{
                user_id: true,
                email: true,
            }
        })
        if(user == null){
            throw Error("User not found");
        }
        const token = jwt.sign(
            {
              userId:  user.user_id.toString(),
              email:   email
            },
            process.env.JWT_SECRET,
            { expiresIn: "24h" } // Token expires in 1 hour
        );

        const cookieOptions = {
            httpOnly: true, // Ensures the cookie is not accessible via JavaScript
            secure: process.env.NODE_ENV === "production", // Use secure cookies in production
            sameSite: "Strict", // Prevents cross-site request forgery
            path: "/", // Cookie is accessible throughout the app
            maxAge: 60 * 60 * 24, // 1 hour -> now 1 day
        };

        const response = new NextResponse(customJSON({ message: "Hello from Next.js!", user }), {
            headers: {
                "Content-Type": "application/json",
            },
        });

        // Set the cookie in the response header
        response.cookies.set("token", token, cookieOptions);

        return response;
    } catch (error) {
        console.error("Error fetching user:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}

