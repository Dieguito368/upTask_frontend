import { isAxiosError } from "axios";
import api from "@/lib/axios";
import { NoteFormData, Project, Task } from "../types";

type NoteAPIType = {
    projectId: Project['_id']
    taskId: Task['_id']
    formData: NoteFormData
}

export const createNote = async({ projectId, taskId, formData } : NoteAPIType) => {
    try {
         
    } catch (error) {
        if(isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error);
        }
    }
}