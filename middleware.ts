import { NextResponse, type NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  // Markdown content negotiation — when agents request text/markdown, serve our markdown endpoint
  const accept = request.headers.get("accept") || "";
  if (accept.includes("text/markdown")) {
    const { pathname } = request.nextUrl;
    const url = request.nextUrl.clone();
    url.pathname = "/api/agent/markdown";
    url.searchParams.set("path", pathname);
    return NextResponse.rewrite(url, {
      headers: { "Vary": "Accept" },
    });
  }

  const secFetchDest = request.headers.get("sec-fetch-dest");
  const isIframe = secFetchDest === "iframe";
  const hasCookie = request.cookies.has("sanity-preview");

  // Only treat as Presentation if loaded in an iframe AND the referrer
  // is the Studio (same origin /studio path). This prevents stega from
  // leaking to the public site when browsers use sec-fetch-dest: iframe
  // for other purposes (e.g. preloading).
  const referer = request.headers.get("referer") || "";
  const isFromStudio =
    referer.includes("/studio") || referer.includes("/presentation");

  if (isIframe && isFromStudio && !hasCookie) {
    const requestHeaders = new Headers(request.headers);
    requestHeaders.set("x-sanity-preview", "true");
    const response = NextResponse.next({
      request: { headers: requestHeaders },
    });
    response.cookies.set("sanity-preview", "1", {
      httpOnly: true,
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
      maxAge: 60 * 60,
    });
    return response;
  }

  if (hasCookie) {
    if (secFetchDest === "document" && !isFromStudio) {
      const response = NextResponse.next();
      response.cookies.delete("sanity-preview");
      return response;
    }
    const requestHeaders = new Headers(request.headers);
    requestHeaders.set("x-sanity-preview", "true");
    return NextResponse.next({
      request: { headers: requestHeaders },
    });
  }
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico|studio).*)"],
};
