import { NextRequest, NextResponse } from "next/server";
"hi"
export const config = {
  matcher: ["/dashboard/:path*", "/login/:path*", "/register"],
};
export async function middleware(request) {
  let cookiename = "OurSiteJWT";
  let cookie = cookiename + "=" + request.cookies.get(cookiename);
  let url = request.nextUrl.origin + "/api/auth/cook";
  let obj;
  const valid = await fetch(url, {
    headers: {
      cookie: cookie,
    },
  });
  console.log(request.nextUrl.pathname);
  obj = await valid.json();
  if (request.nextUrl.pathname.includes("/login")) {
    if (obj.Message == !false) {
      return NextResponse.redirect(new URL("/dashboard", request.url));
    } else {
      return NextResponse.next();
    }
  }
  if (request.nextUrl.pathname.includes("/register")) {
    if (obj.Message == !false) {
      return NextResponse.redirect(new URL("/dashboard", request.url));
    } else {
      return NextResponse.next();
    }
  }
  if (obj.Message == false) {
    const logins = NextResponse.redirect(new URL("/login", request.url));
    logins.cookies.set(cookiename, null, { maxAge: 0 });
    return logins;
  }
}
