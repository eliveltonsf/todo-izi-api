import z from "zod";

export const decodeTokenJWT = z.object({
  email: z.string(),
  sub: z.string(),
  iat: z.number()
});