import Cookies from 'js-cookie'
import { NextResponse } from 'next/server'
import { NextRequest } from 'next/server'


// This function can be marked `async` if using `await` inside
export function middleware(request){
 
  if (request.nextUrl.pathname.startsWith('/login')) {
    return authUser(request)
  }
  if (request.nextUrl.pathname.startsWith('/signup')) {
    return authUser(request)
  }
  if(request.nextUrl.pathname.startsWith('/')){
    return NextResponse.rewrite(new URL('/landing', request.url))
  }
 
  if (request.nextUrl.pathname.startsWith('/dashboard')) {
    return NextResponse.rewrite(new URL('/dashboard/user', request.url))
  }
    return null
};

function authUser(req) { 
  
    console.log("Checking Authorization of the User")
    try{
      //Getting and checking cooking
      let authToken = request.cookies.get("token");

      if(!authToken){
          throw new Error("No cookie exist for the following")
      }
      console.log(1 + ":" + authToken)
      // fetch request && conditional to stay or route to different page
      return NextResponse.redirect(new URL('/dashboard', req.url))
    }
    catch{
      return null
    }

  
}

// See "Matching Paths" below to learn more
export const config = {
  matcher:["/","/login","/signup","/landing"],
}; 