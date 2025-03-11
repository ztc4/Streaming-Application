import { NextResponse } from 'next/server'



// This function can be marked `async` if using `await` inside
export function middleware(request){
  
  const { pathname } = request.nextUrl; // Access the pathname
  const url = request.nextUrl.href; // Full URL (including query parameters)
  
  console.log("I was here!")
  console.log(pathname)
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
    console.log(requestUrl)
    return NextResponse.rewrite(new URL('/dashboard', request.url))
  }
    return null
};

function authUser(req) { 
  
    console.log("Checking Authorization of the User")
    try{
      //Getting and checking cooking
      console.log(req.cookies)
      let authToken = req.cookies.get("token");
      console.log(`This is the authToken: ${authToken}`)

      if(!authToken){
          throw new Error("No cookie exist for the following")
      }
      console.log(1 + ":" + authToken)
      // fetch request && conditional to stay or route to different page
      return NextResponse.redirect(new URL('/dashboard', req.url))
    }
    catch{
      console.log("Token doesn't exist")
      return null
    }

  
}

// See "Matching Paths" below to learn more
export const config = {
  matcher:['/','/login','/signup','/landing' ],
}; 