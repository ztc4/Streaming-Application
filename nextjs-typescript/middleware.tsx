import { NextResponse, type NextRequest } from 'next/server';

// Middleware function
export function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl; // Access the pathname
    if (pathname.startsWith('/login') || pathname.startsWith('/signup')) {
        return authUser(request);
    }
    if (pathname.startsWith('/dashboard')) {
        // console.log(request.url +2 );
        // return NextResponse.rewrite(new URL('/dashboard', request.url));
    }
    return null;
}

// Function to authenticate user
function authUser(req: NextRequest): NextResponse | null {
    console.log("Checking Authorization of the User");
    try {
        const authToken = req.cookies.get("token")?.value; // Get cookie value safely
        if (!authToken) {
            throw new Error("No cookie exists for the user");
        }
        return NextResponse.redirect(new URL('/dashboard', req.url));
    } catch (error) {
        console.log("Token doesn't exist");
        return null;
    }
}

// See "Matching Paths" below to learn more
export const config = {
    matcher: ['/dashboard/:path*', '/login', '/signup', ],
};
