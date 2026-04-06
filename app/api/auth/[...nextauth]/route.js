// app/api/auth/[...nextauth]/route.js
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import dbConnect from "@/lib/dbConnect";
import User from "@/models/User";
import bcrypt from "bcryptjs";

// 👇 1. Pehle authOptions ko alag se variable mein rakh kar EXPORT karein
export const authOptions = {
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                username: { label: "Username", type: "text" },
                password: { label: "Password", type: "password" }
            },
            async authorize(credentials) {
                await dbConnect();

                // 1. Check if user exists (By Username)
                const user = await User.findOne({ username: credentials.username.toLowerCase() });
                if (!user) throw new Error("Invalid Username or Password");

                // 2. Check Password
                const isPasswordCorrect = await bcrypt.compare(credentials.password, user.password);
                if (!isPasswordCorrect) throw new Error("Invalid Username or Password");

                // 3. Return User with Role
                return { id: user._id, name: user.username, role: user.role };
            }
        })
    ],
    callbacks: {
        async jwt({ token, user }) {
            if (user) token.role = user.role;
            return token;
        },
        async session({ session, token }) {
            if (token) {
                if (!session.user) session.user = {}; // Safety check
                session.user.role = token.role;
            }
            return session;
        }
    },
    pages: {
        signIn: "/login",
    },
    session: { strategy: "jwt" },
    secret: process.env.NEXTAUTH_SECRET,
};

// 👇 2. Phir NextAuth handler ko is variable ke sath initialize karein
const handler = NextAuth(authOptions);

// 👇 3. GET aur POST methods ko export karein
export { handler as GET, handler as POST };