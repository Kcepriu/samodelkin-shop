import { z } from "zod";

export const schemaUser = z.object({
  id: z.number(),
  username: z.number(),
  email: z.string(),
  provider: z.string(),
  confirmed: z.string(),
  blocked: z.string(),
  fullName: z.string(),
  isAdmin: z.string().optional(),
  createdAt: z.string().optional(),
  updatedAt: z.string().optional(),
  jwt: z.string(),
});

export const schemaResponseAuth = z.object({
  jwt: z.string(),
  user: schemaUser,
});
