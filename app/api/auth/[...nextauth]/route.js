import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import dbConnect from "@/lib/dbConnect";
import User from "@/models/User";
import bcrypt from "bcryptjs";

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

                const user = await User.findOne({
                    username: credentials.username.toLowerCase()
                });

                if (!user) throw new Error("Invalid Username or Password");

                const isPasswordCorrect = await bcrypt.compare(credentials.password, user.password);
                if (!isPasswordCorrect) throw new Error("Invalid Username or Password");

                // 👇 Yahan enrolledCourses return karna zaroori hai
                return {
                    id: user._id.toString(),
                    name: user.username,
                    role: user.role,
                    enrolledCourses: user.enrolledCourses || []
                };
            }
        })
    ],
    callbacks: {
        async jwt({ token, user }) {
            // Jab user login karega, user object available hoga
            if (user) {
                token.id = user.id;
                token.role = user.role;
                token.enrolledCourses = user.enrolledCourses;
            }
            return token;
        },
        async session({ session, token }) {
            // Token se data nikal kar session mein daalna
            if (token) {
                session.user.id = token.id;
                session.user.role = token.role;
                session.user.enrolledCourses = token.enrolledCourses;
            }
            return session;
        }
    },
    pages: {
        signIn: "/login",
    },
    session: {
        strategy: "jwt",
        maxAge: 2 * 60 * 60,
    },
    secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };