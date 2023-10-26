import { AuthOptions, User } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import Credentials from "next-auth/providers/credentials";
import httpServices from "@/services/http";

export const authConfigs: AuthOptions = {
  providers: [
    // GoogleProvider({
    //   clientId: process.env.GOOGLE_CLIENT_ID || "",
    //   clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
    // }),
    Credentials({
      credentials: {
        email: { label: "email", type: "email", required: true },
        password: { label: "password", type: "password", required: true },
      },

      async authorize(credentials) {
        if (!credentials) return null;

        const response = await httpServices.logIn(
          credentials.email,
          credentials.password
        );

        if (!response) return null;

        const { jwt, user } = response;

        return {
          ...user,
          id: String(user.id),
          name: user.username,
          email: credentials.email,
          jwt: jwt,
        } as User;
      },
    }),
  ],
  secret: "g9qj1bBK4GuXIteSC+bLGgVavKhdZlk21ce0q0LzHLc=",
  session: {
    strategy: "jwt",
  },

  jwt: {
    // The maximum age of the NextAuth.js issued JWT in seconds.
    // Defaults to `session.maxAge`.
    maxAge: 60 * 60 * 24 * 30,
    // You can define your own encode/decode functions for signing and encryption
  },
  // callbacks
  callbacks: {
    session: async ({ session, token, user }) => {
      if (token) {
        session.user.id = (token?.id as string) || "";
        session.user.fullName = (token?.fullName as string) || "";
        session.user.isAdmin = (token?.isAdmin as boolean) || false;
      }

      return session;
    },

    jwt: async ({ token, user, account, profile }) => {
      if (user) {
        if (account?.provider === "credentials") {
          token.jwt = (user as any).jwt;
          token.fullName = (user as any).fullName;
          token.id = user.id;
        } else {
          const response = await fetch(
            `${process.env.BACKEND_URL}/auth/${
              account?.provider || "google"
            }/callback?access_token=${account?.access_token}`
          );

          const data = await response.json();
          token.jwt = data.jwt;
          token.id = data.user.id;
        }
      }

      return Promise.resolve(token);
    },
  },
};
