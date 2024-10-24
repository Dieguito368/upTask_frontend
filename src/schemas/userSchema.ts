import { z } from 'zod';

export const userSchema = z.object({
    _id: z.string(),
    name: z.string(),
    email: z.string().email()
});