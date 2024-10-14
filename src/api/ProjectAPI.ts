import { isAxiosError } from 'axios';
import api from '@/lib/axios';
import { DraftProject, Project } from '@/types/index';
import { projectSchema, projectsSchema } from '@/schemas/projectSchema';

export const createProject = async (formData: DraftProject) => {
    try {
        const { data } = await api.post<string>('/projects', formData);

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

export const getProjectById = async (projectId: Project['_id']) => {
    try {
        const { data } = await api(`/projects/${projectId}`);

        return data;
    } catch (error) {
        if(isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error);
        }
    }
}

export const updateProject = async ({ projectId, formData } : { projectId: Project['_id'], formData: DraftProject }) => {
    try {
        const { data } = await api.put<string>(`/projects/${projectId}`, formData);

        return data;
    } catch (error) {
        if(isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error);
        }
    }
}

export const deleteProject = async (projectId: Project['_id']) => {
    try {
        const { data } = await api.delete<string>(`/projects/${projectId}`);

        return data;
    } catch (error) {
        if(isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error);
        }
    }
}