import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import GithubProvider from "next-auth/providers/github";
import { findUser, createUser } from "pages/api/db";
import { compare } from "bcryptjs";
import { ObjectId } from "mongodb";

export default NextAuth({
    session: {
        jwt: true,
    },
    // pages: {
    //     signIn: "/auth/login",
    // },
    providers: [
        CredentialsProvider({
            async authorize(credentials) {
                const user = await findUser(null, credentials.email, credentials.email);

                if(!user) 
                    return null;

                const checkPassword = await compare(credentials.password, user.password);

                if(!checkPassword) 
                    return null;

                delete user.password;
                return user;
            }
        }),
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
            session.user = token.user;
            return session;
        },
        signIn: async ({ account, user }) => {
            // id key is unique to google's auth object
            // if(account.provider == "google" && user._id) {
            //     const newUser = await createUser(user);
            //     console.log(newUser);
            // }
            // if(account.provider == "github" && user._id) {
            //     const newUser = await createUser(user);
            //     console.log(newUser);
            // }

            return true;
        }
    }
})