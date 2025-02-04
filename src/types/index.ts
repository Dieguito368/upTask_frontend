import { z } from 'zod';
import { projectSchema } from '@/schemas/projectSchema';
import { taskSchema, taskStatusSchema } from '@/schemas/taskSchema';
import { authSchema } from '@/schemas/authSchema';
import { userSchema } from '@/schemas/userSchema';
import { teamMemberSchema } from '@/schemas/teamSchema';
import { noteSchema } from '@/schemas/noteSchema';

/** Projects **/
export type Project = z.infer<typeof projectSchema>
export type DraftProject = Pick<Project, 'clientName' | 'projectName' | 'description'>



/** Tasks **/
export type Task = z.infer<typeof taskSchema>
export type TaskFormData = Pick<Task, 'name' | 'description'> 
export type TaskStatus = z.infer<typeof taskStatusSchema>



/** Notes **/
export type Note = z.infer<typeof noteSchema>
export type NoteFormData = Pick<Note, 'content'>



/** Team Member **/
export type TeamMember = z.infer<typeof teamMemberSchema>
export type TeamMemberFormData = Pick<TeamMember, 'email'>



/** Auth & Users **/
export type Auth = z.infer<typeof authSchema>
export type UserLoginFormData = Pick<Auth, 'email' | 'password'>
export type UserRegisterFormData = Pick<Auth, 'name' | 'email' | 'password' | 'password_confirmation'>
export type RequestConfirmationCodeFormData = Pick<Auth, 'email'>
export type ConfirmToken = Pick<Auth, 'token'>
export type ForgotPasswordFormData = Pick<Auth, 'email'>
export type NewPasswordFormData = Pick<Auth, 'password' | 'password_confirmation'>
export type UpdateCurrentUserPasswordFormData = Pick<Auth, 'current_password' | 'password' | 'password_confirmation'>
export type CheckPasswordFormData = Pick<Auth, 'password'>

export type User = z.infer<typeof userSchema>
export type UserEditFormData = Pick<User, 'name' | 'email'>