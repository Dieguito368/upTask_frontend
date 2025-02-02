import { isAxiosError } from "axios";
import api from "@/lib/axios";
import { UpdateCurrentUserPasswordFormData, UserEditFormData } from "../types";

export const updateProfile = async(formData: UserEditFormData) => {
    try {
        const { data } = await api.put<string>('/auth/profile', formData);

        return data;
    } catch (error) {
        if(isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error);
        }
    }
}

export const updatePassword = async(formData: UpdateCurrentUserPasswordFormData) => {
    try {
        const { data } = await api.post<string>('/auth/update-password', formData);

        return data;
    } catch (error) {
        if(isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error);
        }
    }
}
