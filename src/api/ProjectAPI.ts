import { DraftProject, Project } from '@/types/index';
import api from '@/lib/axios';
import { isAxiosError } from 'axios';
import { projectSchema, projectsSchema } from '@/schemas/projectSchema';

export const createProject = async (formData: DraftProject) => {
    try {
        const { data } = await api.post('/projects', formData);

        return data;
    } catch (error) {
        if(isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error);
        } 
    }
}

export const getProjectsAll = async () => {
    try {
        const { data } = await api('/projects');

        const result = projectsSchema.safeParse(data);

        if(result.success) return result.data;
    } catch (error) {
        if(isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error);
        }
    }
}

export const getProjectById = async (id: Project['_id']) => {
    try {
        const { data } = await api(`/projects/${id}`);

        const result = projectSchema.safeParse(data);

        if(result.success) return result.data
    } catch (error) {
        if(isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error);
        }
    }
}