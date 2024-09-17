import { DraftProject } from '@/types/index';
import api from '@/lib/axios';

export const createProject = async (formData: DraftProject) => {
    try {
        const data = await api.post('/projects', formData);

        console.log(data);
    } catch (error) {
        console.log(error);
        
    }
}