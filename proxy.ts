import { NextResponse, type NextRequest } from "next/server";
import { siteUrl } from "@/lib/site";
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
    if (locale === "en") {
      const publicUrl = new URL(siteUrl);
      publicUrl.pathname = url.pathname;
      publicUrl.search = url.search;
      return NextResponse.redirect(publicUrl, 308);
    }
    // Never expose admin/API/assets through locale-prefixed paths.
    if (/^\/(admin|api|_next|images|portfolio-media)(\/|$)/.test(url.pathname)) return new NextResponse(null, { status: 404 });
    // Keep the original origin so Next handles this as an internal rewrite.
    return NextResponse.rewrite(url, { request: { headers } });
  }
  return NextResponse.next({ request: { headers } });
}
export const config = { matcher: ["/((?!api(?:/|$)|admin(?:/|$)|_next(?:/|$)|images(?:/|$)|portfolio-media(?:/|$)|.*\\..*).*)"] };
