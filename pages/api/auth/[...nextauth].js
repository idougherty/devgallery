import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import GithubProvider from "next-auth/providers/github";
import { findUser } from "pages/api/db";

export default NextAuth({
    session: {
        jwt: true,
    },
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        }),
        GithubProvider({
            clientId: process.env.GITHUB_CLIENT_ID,
            clientSecret: process.env.GITHUB_CLIENT_SECRET,
        }),
    ],
    callbacks: {
        jwt: async ({ token, user }) => {
            if(user) 
                token.user = user;

            return token;
        },
        session: async ({ session, token }) => {
            if(token?.user) {
                const userData = await findUser(token.user);

                if(userData) {
                    token.user = {
                        ...token.user,
                        ...userData,
                        valid: true
                    };
                }
            }

            session.user = token.user;
            return session;
        },
    }
})