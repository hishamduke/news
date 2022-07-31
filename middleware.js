import { NextRequest, NextResponse } from "next/server";

export async function middleware(request) {
  let cookiename = "OurSiteJWT";
  let cookie = cookiename + "=" + request.cookies.get(cookiename);
  let url = request.nextUrl.origin + "/api/auth/cook";
  let obj;
  const res = await fetch(url, {
    headers: {
      cookie: cookie,
    },
  });
  obj = await res.json();
  console.log(obj.Message);
  if (obj.Message == false) {
    return NextResponse.redirect(new URL("/login", request.url));
  }
}
export const config = {
  matcher: ["/dashboard/:path*"],
};
