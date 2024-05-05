import { z } from "zod";

export const userCore = {
  email: z
    .string({
      required_error: "Email is required",
      invalid_type_error: "Email must be a string",
    })
    .email(),
  name: z.string(),
};

export const createUserSchema = z.object({
  ...userCore,
  password: z.string({
    required_error: "Password is required",
    invalid_type_error: "Password must be a string",
  }),
});

export const createUserResponseSchema = z.object({
  id: z.string().uuid(),
  ...userCore,
});

export const loginSchema = z.object({
  email: z
    .string({
      required_error: "Email is required",
      invalid_type_error: "Email must be a string",
    })
    .email(),
  password: z.string(),
});

export const loginResponseSchema = z.object({
  accessToken: z.string(),
});

export type CreateUserType = z.infer<typeof createUserSchema>;

export type LoginInput = z.infer<typeof loginSchema>;
