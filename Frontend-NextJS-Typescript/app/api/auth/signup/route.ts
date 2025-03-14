import {NextRequest, NextResponse} from "next/server";
import { PrismaClient } from "@prisma/client";
import jwt from "jsonwebtoken";

const db = new PrismaClient();

const customJSON = (data: any) =>
    JSON.stringify(data, (_, value) =>
        typeof value === "bigint" ? value.toString() : value
    );

export async function POST(req: NextRequest) {
    try {
        const {username, email, password , firstName, lastName, phoneNumber} = await req.json();

        const user = await db.users.create({
            data: {
                username: username,
                subscribers_count :0
            },
        });

        const userPrivate = await db.users_private.create({
            data: {
                password: password,
                email: email,
                first_name: firstName,
                last_name: lastName,
                phone_number: phoneNumber,
                user_id: user.id
            },
        });
        const token = jwt.sign(
            {
                userId:  userPrivate.user_id.toString(),
                email:   userPrivate.email
            },
            process.env.JWT_SECRET,
            { expiresIn: "1h" } // Token expires in 1 hour
        );
        const cookieOptions = {
            httpOnly: true, // Ensures the cookie is not accessible via JavaScript
            secure: process.env.NODE_ENV === "production", // Use secure cookies in production
            sameSite: "Strict", // Prevents cross-site request forgery
            path: "/", // Cookie is accessible throughout the app
            maxAge: 60 * 60, // 1 hour
        };

        const response = new NextResponse(customJSON({ message: "Hello from Next.js!", user, token }), {
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

