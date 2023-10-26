import { boolean } from "joi";
import NextAuth, { DefaultSession, DefaultUser } from "next-auth";

declare module "next-auth" {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface Session {
    user: {
      /** The user's postal address. */
      id: string;
      fullName: string;
      isAdmin: boolean;
    } & DefaultSession["user"];
  }
}

interface UserWithField extends DefaultUser {
  id: string;
  fullName: string;
  isAdmin: boolean;
}
