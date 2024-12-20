import { isAxiosError } from "axios";
import api from "@/lib/axios";
import { teamMemberSchema, teamMembersSchema } from "@/schemas/teamSchema";
import { Project, TeamMember, TeamMemberFormData } from "../types"

type FindUserByEmailParams  = {
    projectId: Project['_id'],
    formData: TeamMemberFormData
}

export const findUserByEmail = async ({ projectId, formData } : FindUserByEmailParams) => {
    try {
        const { data } = await api.post(`/projects/${projectId}/team/find`, formData);
    
        const result = teamMemberSchema.safeParse(data);
    
        if(result.success) return result.data
    } catch (error) {
        if(isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error);
        }        
    }
}

type addUserToProjectParams  = {
    projectId: Project['_id'],
    userId: TeamMember['_id']
}

export const addUserToProject = async ({ projectId, userId }: addUserToProjectParams) => {
    try {
        const { data } = await api.post<string>(`/projects/${projectId}/team`, { id: userId });
        
        return data;
    } catch (error) {
        if(isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error);
        }        
    }
}

export const getProjectTeam = async (projectId: Project['_id']) => {
    try {
        const { data } = await api(`/projects/${projectId}/team`);

        const result = teamMembersSchema.safeParse(data);

        if(result.success) return result.data;
    } catch (error) {
        if(isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error);
        }        
    }
}

type removeMemberParams  = {
    projectId: Project['_id'],
    userId: TeamMember['_id']
}

export const removeMemberFromProject = async ({ projectId, userId }: removeMemberParams) => {
    try {
        const { data } = await api.delete<string>(`/projects/${projectId}/team/${userId}`);
        
        return data;
    } catch (error) {
        if(isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error);
        }        
    }
}