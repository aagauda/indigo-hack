
import { auth } from "@/auth"
import { NextResponse, NextRequest } from "next/server";


export async function middleware(request: NextRequest) {
  const currentPath = request.nextUrl.pathname; // getting the current path or the website;

  // here we are defining the path which are public

  let publicPaths = [
    "/",
    "/auth/login",
    "/auth/register",
    "/admin"
  ]
  const isPublic = publicPaths.includes(currentPath);


  // check if we have the token in cookies or not.
  // const token = req.cookies.get("token")?.value || "";
  const session = await auth();
  const isAuthenticated = !!session; // here we are checking if the session is authenticated or not


  if (isAuthenticated && isPublic) {
    if( session.user.email=="admin@indigo.com"){
      return NextResponse.redirect(new URL("/dashboard/admin/app", request.url));
    }
    return NextResponse.redirect(new URL("/dashboard/app", request.url));
  }

  // if the route is not public and we donot have the token then we will send it to the login page
  if (!isPublic && !isAuthenticated) {
    
    return NextResponse.redirect(new URL(publicPaths[0], request.url))
  }

  if (currentPath.startsWith("/dashboard")) {
    if( session.user.email=="admin@indigo.com"){
      return NextResponse.redirect(new URL("/admin/app", request.url));
    }
  }
  


  if (currentPath === "/dashboard") {
    if( session.user.email=="admin@indigo.com"){
      return NextResponse.redirect(new URL("/dashboard/admin/app", request.url));
    }
    return NextResponse.redirect(new URL("/dashboard/app", request.url));
  }

}

// // our middleware will affect these routes
export const config = {
  matcher: ["/", "/auth/(.*)", "/dashboard/(.*)", "/dashboard","/admin/(.*)"]
}