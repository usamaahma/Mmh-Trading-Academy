import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
    function middleware(req) {
        const token = req.nextauth.token;
        const { pathname } = req.nextUrl;

        // 1. Admin Protection
        // Agar /admin par ja raha hai aur role ADMIN nahi hai toh block
        if (pathname.startsWith("/admin") && token?.role !== "ADMIN") {
            return NextResponse.redirect(new URL("/", req.url));
        }

        // 2. Specific Course Protection
        // Sirf /courses/:id ko check karega
        if (pathname.startsWith("/courses/") && pathname !== "/courses") {
            // Agar Admin hai toh allow karein
            if (token?.role === "ADMIN") return NextResponse.next();

            const pathSegments = pathname.split("/"); 
            const courseId = pathSegments[2]; 

            // Check access
            const hasAccess = token?.enrolledCourses?.includes(courseId);

            if (!hasAccess) {
                // Course access nahi hai toh redirect
                return NextResponse.redirect(new URL("/no-access", req.url));
            }
        }

        // 3. Signals & Calculator
        // Yahan humne koi extra check nahi lagaya, 
        // Matlab agar user logged in hai (jo niche authorized callback check kar raha hai),
        // Toh wo in pages ko dekh sakta hai.
        return NextResponse.next();
    },
    {
        callbacks: {
            // !!token ka matlab hai user logged in hona chahiye bas.
            // Signals, Calculator aur Courses sab ke liye login zaroori hai.
            authorized: ({ token }) => !!token,
        },
    }
);

export const config = {
    // Ye middleware in paths par trigger hoga
    matcher: [
        "/admin/:path*", 
        "/signals/:path*", 
        "/courses/:path*", 
        "/Lot-size-calculator"
    ],
};