import { isAxiosError } from 'axios';
import api from '@/lib/axios';
import { Project, TaskFormData } from '../types';

type TaskAPI = {
    projectId: Project['_id'],
    formData: TaskFormData
}

export const createTask = async ({ projectId, formData} : TaskAPI) => {
    try {
        const { data } = await api.post<string>(`/projects/${projectId}/tasks`, formData);

        return data;
    } catch (error) {
        if(isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error)
        }
    }
}