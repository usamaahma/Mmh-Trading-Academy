// middleware.js
import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
    function middleware(req) {
        const token = req.nextauth.token;
        const { pathname } = req.nextUrl;

        // Admin Protection
        if (pathname.startsWith("/admin") && token?.role !== "ADMIN") {
            return NextResponse.redirect(new URL("/", req.url));
        }

        // Student Protection
        const paidRoutes = ["/signals", "/courses", "/Lot-size-calculator"];
        const isPaidRoute = paidRoutes.some((route) => pathname.startsWith(route));

        if (isPaidRoute && !token) {
            return NextResponse.redirect(new URL("/login", req.url));
        }
    },
    {
        callbacks: {
            // Agar token hai to middleware function chalega
            authorized: ({ token }) => !!token,
        },
    }
);

// Ye define karta hai middleware kin pages par chalay
export const config = {
    matcher: ["/admin/:path*", "/signals/:path*", "/courses/:path*", "/Lot-size-calculator"],
};