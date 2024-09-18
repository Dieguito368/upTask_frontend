import { z } from 'zod';

export const projectSchema = z.object({
    _id: z.string(),
    projectName: z.string(),
    clientName: z.string(),
    description: z.string(),
});

export const projectsSchema = z.array(
    projectSchema .pick({
        _id: true,
        projectName: true,
        clientName: true,
        description: true
    })
);