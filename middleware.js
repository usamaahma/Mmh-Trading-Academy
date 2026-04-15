import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
    function middleware(req) {
        const token = req.nextauth.token;
        const { pathname } = req.nextUrl;

        // 1. Admin Protection (Same rahegi)
        if (pathname.startsWith("/admin") && token?.role !== "ADMIN") {
            return NextResponse.json({ message: "Access Denied" }, { status: 403 });
            // Ya redirect: return NextResponse.redirect(new URL("/", req.url));
        }

        // 2. Specific Course Protection Logic
        // Hum check kar rahe hain agar URL kuch aisa hai: /courses/[id]
        if (pathname.startsWith("/courses/") && token?.role !== "ADMIN") {
            const pathSegments = pathname.split("/"); 
            const courseId = pathSegments[2]; // URL se ID nikalna

            // Agar student ke pas ye ID nahi hai enrolledCourses mein, to bahar nikalo
            const hasAccess = token?.enrolledCourses?.includes(courseId);

            if (!hasAccess) {
                // User ko "No Access" page ya home par bhej dein
                return NextResponse.redirect(new URL("/no-access", req.url));
            }
        }

        // 3. General Paid Routes (Signals etc.)
        const paidRoutes = ["/signals", "/Lot-size-calculator"];
        const isPaidRoute = paidRoutes.some((route) => pathname.startsWith(route));

        if (isPaidRoute && !token) {
            return NextResponse.redirect(new URL("/login", req.url));
        }
    },
    {
        callbacks: {
            authorized: ({ token }) => !!token,
        },
    }
);

export const config = {
    matcher: ["/admin/:path*", "/signals/:path*", "/courses/:path*", "/Lot-size-calculator"],
};