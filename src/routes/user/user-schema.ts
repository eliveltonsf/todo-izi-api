import { z } from 'zod';

export const userCore = {
    email: z.string({
        required_error: 'Email is required',
        invalid_type_error: 'Email must be a string'
    }).email(),
    name: z.string(),
}

export const createUserSchema = z.object({
    ...userCore,
    password: z.string({
        required_error: 'Password is required',
        invalid_type_error: 'Password must be a string'
    })
});

export const createUserResponseSchema = z.object({
    201: z.object({id: z.string().uuid()}),
    ...userCore
})

export type CreateUserType = z.infer<typeof createUserSchema>


