import { z } from 'zod';
import { projectSchema } from '@/schemas/projectSchema';
import { taskSchema } from '@/schemas/taskSchema';

export type Project = z.infer<typeof projectSchema>
export type DraftProject = Pick<Project, 'clientName' | 'projectName' | 'description'>

export type Task = z.infer<typeof taskSchema>
export type TaskFormData = Pick<Task, 'name' | 'description'> 