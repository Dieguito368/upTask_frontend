import { z } from 'zod';
import { userSchema } from './userSchema';
import { noteSchema } from './noteSchema';

export const taskStatusSchema = z.enum(['pending', 'onHold', 'inProgress', 'underReview', 'completed'])

export const taskSchema = z.object({
    _id: z.string(),
    name: z.string(),
    description: z.string(),
    status: taskStatusSchema,
    updatedBy: z.array(z.object({
        _id: z.string(),
        user: userSchema,
        status: taskStatusSchema
    })),
    notes: z.array(noteSchema),
    project: z.string(),
    createdAt: z.string(), 
    updatedAt: z.string()
});