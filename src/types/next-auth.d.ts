import { boolean } from "joi";
import NextAuth, { DefaultSession, DefaultUser } from "next-auth";
import { JWT, DefaultJWT } from "next-auth/jwt";

declare module "next-auth" {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface Session {
    user: {
      /** The user's postal address. */
      id: string;
      jwt: string;
      fullName: string;
      isAdmin: boolean;
    } & DefaultSession["user"];
  }
  interface User extends DefaultUser {
    id: string;
    jwt: string;
    fullName: string;
    isAdmin: boolean;
  }
}
declare module "next-auth/jwt" {
  interface JWT extends DefaultJWT {
    id: string;
    jwt: string;
    fullName: string;
    isAdmin: boolean;
  }
}

interface UserWithField extends DefaultUser {
  id: string;
  fullName: string;
  isAdmin: boolean;
}
