import { ProjectSchema } from 'shemas/projectSchema';
import { z } from 'zod';

export type Project = z.infer<typeof ProjectSchema>
export type DraftProject = Pick<Project, 'clientName' | 'projectName' | 'description'>
