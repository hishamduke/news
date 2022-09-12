import { NextRequest, NextResponse } from "next/server";

export const config = {
  matcher: ["/dashboard/:path*", "/login/:path*", "/register"],
};
export async function middleware(request) {
  let cookiename = "OurSiteJWT";
  let cookie = cookiename + "=" + request.cookies.get(cookiename);
  let url = request.nextUrl.origin + "/api/auth/cook";
  let obj;

  console.log("one");
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
  if (valid.Message == false) {
    const logins = NextResponse.redirect(new URL("/login", request.url));
    logins.cookies.set(cookiename, null, { maxAge: 0 });
    return logins;
  }

  // console.log(valid);
}
