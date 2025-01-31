import { isAxiosError } from 'axios';
import api from '@/lib/axios';
import { Project, Task, TaskFormData } from '../types';
import { taskSchema } from '@/schemas/taskSchema';

type TaskAPI = {
    projectId: Project['_id']
    formData: TaskFormData
    taskId: Task['_id']
    status: Task['status']
}

export const createTask = async ({ projectId, formData } : Pick<TaskAPI, 'projectId' | 'formData'>) => {
    try {
        const { data } = await api.post<string>(`/projects/${projectId}/tasks`, formData);

        return data;
    } catch (error) {
        if(isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error);
        }
    }
}

export const getTaskById = async ({ projectId, taskId } : Pick<TaskAPI, 'projectId' | 'taskId'>) => {
    try {
        const { data } = await api(`/projects/${projectId}/tasks/${taskId}`);

        const result = taskSchema.safeParse(data);

        if(result.success) return result.data
    } catch (error) {
        if(isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error);
        }
    }
}

export const updateTask = async ({ projectId, taskId, formData } :  Pick<TaskAPI, 'projectId' | 'taskId' | 'formData'>) => {
    try {
        const { data } = await api.put<string>(`/projects/${projectId}/tasks/${taskId}`, formData);

        return data;
    } catch (error) {
        if(isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error);
        }
    }
}

export const updateStatus = async ({ projectId, taskId, status } : Pick<TaskAPI, 'projectId' | 'taskId' | 'status'>) => {
    try {
        const { data } = await api.patch<string>(`/projects/${projectId}/tasks/${taskId}`, { status });

        return data;
    } catch (error) {
        if(isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error);
        }
    }
}

export const deleteTask = async ({ projectId, taskId } : Pick<TaskAPI, 'projectId' | 'taskId'>) => {
    try {
        const { data } = await api.delete<string>(`/projects/${projectId}/tasks/${taskId}`);

        return data;
    } catch (error) {
        console.log(error);
        
        if(isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error);
        }
    }
}
