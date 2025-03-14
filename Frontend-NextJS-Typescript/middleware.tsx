import { NextResponse, type NextRequest } from 'next/server';
import jwt from "jsonwebtoken";
import {cookies} from "next/headers";


// Middleware function
export async function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl; // Access the pathname
    console.log(4, pathname);


    if(pathname.startsWith('/api/protected')) {

    }


    if (pathname.startsWith('/login') || pathname.startsWith('/signup')) {

    }
    if (pathname.startsWith('/dashboard')) {
        console.log(request.url +2 );
        // return NextResponse.rewrite(new URL('/dashboard', request.url));
    }
    return null;
}


// See "Matching Paths" below to learn more
export const config = {
    matcher: ['/dashboard/:path', "/api/protected/:path*", '/login', '/signup', ],
};
