import { z } from 'zod';
import { projectSchema } from '@/schemas/projectSchema';
import { taskSchema, taskStatusSchema } from '@/schemas/taskSchema';

/** Projects **/
export type Project = z.infer<typeof projectSchema>
export type DraftProject = Pick<Project, 'clientName' | 'projectName' | 'description'>



/** Tasks **/
export type Task = z.infer<typeof taskSchema>
export type TaskFormData = Pick<Task, 'name' | 'description'> 
export type TaskStatus = z.infer<typeof taskStatusSchema>