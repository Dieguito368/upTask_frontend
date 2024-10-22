import api from '@/lib/axios';
import { isAxiosError } from 'axios';
import { ConfirmToken, RequestConfirmationCodeFormData, UserRegisterFormData } from '../types';

export const createAccount = async (formData: UserRegisterFormData) => {
    try {
        const { data } = await api.post<string>('/auth/create-account', formData);

        return data
    } catch (error) {
        if(isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error);
        }
    }
}

export const confirmAccount = async (token: ConfirmToken) => {
    try {
        const { data } = await api.post<string>('/auth/confirm-account', token);

        return data;
    } catch (error) {
        if(isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error);
        }
    }
} 

export const requestConfirmationCode = async(formData: RequestConfirmationCodeFormData) => {
    try {
        const { data } = await api.post<string>('/auth/request-code', formData);

        return data;
    } catch (error) {
        if(isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error);
        }
    }
}