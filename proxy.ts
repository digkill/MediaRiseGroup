import { NextResponse, type NextRequest } from "next/server";
import { isLocale } from "@/lib/i18n/config";
export function proxy(request: NextRequest) {
  const segment = request.nextUrl.pathname.split("/")[1];
  const locale = isLocale(segment) ? segment : "en";
  const headers = new Headers(request.headers);
  // Always replace client-supplied locale headers; the URL is authoritative.
  headers.set("x-site-locale", locale);
  if (isLocale(segment)) {
    const url = request.nextUrl.clone();
    url.pathname = request.nextUrl.pathname.slice(segment.length + 1) || "/";
    if (locale === "en") return NextResponse.redirect(url, 308);
    // Never expose admin/API/assets through locale-prefixed paths.
    if (/^\/(admin|api|_next|images|portfolio-media)(\/|$)/.test(url.pathname)) return new NextResponse(null, { status: 404 });
    return NextResponse.rewrite(url, { request: { headers } });
  }
  return NextResponse.next({ request: { headers } });
}
export const config = { matcher: ["/((?!api(?:/|$)|admin(?:/|$)|_next(?:/|$)|images(?:/|$)|portfolio-media(?:/|$)|.*\\..*).*)"] };
