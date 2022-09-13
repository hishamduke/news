import { NextRequest, NextResponse } from "next/server";

export const config = {
  matcher: ["/dashboard/:path*", "/login/:path*", "/register", "/logout"],
};
export async function middleware(request) {
  let cookiename = "OurSiteJWT";
  let cookie = cookiename + "=" + request.cookies.get(cookiename);
  let url = request.nextUrl.origin + "/api/auth/cook";
  const valid = await fetch(url, {
    headers: {
      cookie: cookie,
    },
  }).then((response) => response.json());

  if (request.nextUrl.pathname.includes("/login")) {
    if (valid.Message == !false) {
      return NextResponse.redirect(new URL("/dashboard", request.url));
    } else {
      return NextResponse.next();
    }
  }
  if (request.nextUrl.pathname.includes("/register")) {
    if (valid.Message == !false) {
      return NextResponse.redirect(new URL("/dashboard", request.url));
    } else {
      return NextResponse.next();
    }
  }
  if (request.nextUrl.pathname.includes("/logout")) {
    const response = NextResponse.next();
    response.cookies.delete(cookiename);
    response.cookies.clear();
    return response;
  }
  if (valid.Message == false) {
    return NextResponse.redirect(new URL("/logout", request.url));
  }
}
