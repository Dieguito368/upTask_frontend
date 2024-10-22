import { z } from 'zod';
import { projectSchema } from '@/schemas/projectSchema';
import { taskSchema, taskStatusSchema } from '@/schemas/taskSchema';
import { authSchema } from '@/schemas/authSchema';

/** Projects **/
export type Project = z.infer<typeof projectSchema>
export type DraftProject = Pick<Project, 'clientName' | 'projectName' | 'description'>



/** Tasks **/
export type Task = z.infer<typeof taskSchema>
export type TaskFormData = Pick<Task, 'name' | 'description'> 
export type TaskStatus = z.infer<typeof taskStatusSchema>


/** Auth & Users **/
export type Auth = z.infer<typeof authSchema>
export type UserLoginFormData = Pick<Auth, 'email' | 'password'>
export type UserRegisterFormData = Pick<Auth, 'name' | 'email' | 'password' | 'password_confirmation'>
export type ConfirmToken = Pick<Auth, 'token'>