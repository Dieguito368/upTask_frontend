import { z } from 'zod';
import { userSchema } from './userSchema';
import { taskProjectSchema } from './taskSchema';

export const projectSchema = z.object({
    _id: z.string(),
    projectName: z.string(),
    clientName: z.string(),
    description: z.string(),
    tasks: z.array(taskProjectSchema),
    manager: z.string(userSchema.pick({ _id: true })),
    team: z.array(z.string(userSchema.pick({ _id: true }))),
});

export const projectsSchema = z.array(
    projectSchema.pick({
        _id: true,
        projectName: true,
        clientName: true,
        description: true,
        manager: true,
    })
);

export const editProjectSchema = projectSchema.pick({
    projectName: true,
    clientName: true,
    description: true,
});