import { projectSchema } from '@/schemas/projectSchema';
import { z } from 'zod';

export type Project = z.infer<typeof projectSchema>
export type DraftProject = Pick<Project, 'clientName' | 'projectName' | 'description'>
