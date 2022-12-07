import { NextRequest, NextResponse } from "next/server";

export const config = {
  matcher: [
    "/dashboard/:path*",
    "/login/",
    "/register",
    "/logout",
    "/employees/:path*",
  ],
};

export async function middleware(request) {
  console.log("inside middleware");

  let cookiename = "OurSiteJWT";
  let cookie = cookiename + "=" + request.cookies.get(cookiename);
  let url = request.nextUrl.origin + "/api/userrole";

  if (request.nextUrl.pathname.includes("/employees/dashboard")) {
    let url = request.nextUrl.origin + "/api/employees/validcookie";
    console.log(url);
    const userRole = await fetch(url, {
      headers: {
        cookie: cookie,
      },
    }).then((response) => response.json());
    const valid = userRole.success ? true : false;

    console.log(userRole);
    if (!valid) return NextResponse.redirect(new URL("/logout", request.url));
    return NextResponse.next();
  }

  if (request.nextUrl.pathname.includes("/employees/login")) {
    let url = request.nextUrl.origin + "/api/employees/validcookie";
    console.log(url);
    const userRole = await fetch(url, {
      headers: {
        cookie: cookie,
      },
    }).then((response) => response.json());
    const valid = userRole.success ? true : false;

    console.log(userRole);
    if (valid)
      return NextResponse.redirect(
        new URL("/employees/dashboard", request.url)
      );
    return NextResponse.next();
  }

  const userRole = await fetch(url, {
    headers: {
      cookie: cookie,
    },
  }).then((response) => response.json());
  const valid = userRole.error ? false : true;
  // console.log(valid);
  if (valid) {
    if (request.nextUrl.pathname.includes("/login")) {
      return NextResponse.redirect(new URL("/dashboard", request.url));
    }
    if (request.nextUrl.pathname.includes("/register")) {
      return NextResponse.redirect(new URL("/dashboard", request.url));
    }
    if (request.nextUrl.pathname.includes("/admin/")) {
      console.log("here");
      if (userRole != "ADMIN")
        return NextResponse.redirect(new URL("/dashboard", request.url));
    }
  }

  // if (request.nextUrl.pathname.includes("/logout")) {
  //   console.log("Inside logout middleware");
  //   const response = NextResponse.next();
  //   response.cookies.delete(cookiename);
  //   response.cookies.clear();
  //   return response;
  // }

  if (!valid) {
    if (request.nextUrl.pathname.includes("/dashboard")) {
      return NextResponse.redirect(new URL("/logout", request.url));
    }

    if (!request.nextUrl.pathname.includes("/logout")) {
      return NextResponse.next();
    }
  }
}
