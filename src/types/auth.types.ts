import { z } from "zod";
import { schemaUser, schemaResponseAuth } from "@/schemesZod/auth.scheme";

export type TUser = z.infer<typeof schemaUser>;

export type TResponseAuth = z.infer<typeof schemaResponseAuth>;

// interface IResponseAuth {
//   jwt: string;
//   user: IUser;
// }

// interface IUser {
//   id: number;
//   username: string;
//   email: string;
//   provider: string;
//   confirmed: boolean;
//   blocked: boolean;
//   fullName: string;
//   isAdmin?: boolean;
//   createdAt?: string;
//   updatedAt?: string;
//   jwt?: string;
// }
