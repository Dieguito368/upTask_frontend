import api from '@/lib/axios';
import { isAxiosError } from 'axios';
import { CheckPasswordFormData, ConfirmToken, ForgotPasswordFormData, NewPasswordFormData, RequestConfirmationCodeFormData, UserLoginFormData, UserRegisterFormData } from '../types';
import { userSchema } from '@/schemas/userSchema';

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

export const autenthicateUser = async(formData: UserLoginFormData) => {
    try {
        const { data } = await api.post<string>('/auth/login', formData);

        localStorage.setItem('AUTH_TOKEN', data);

        return data;
    } catch (error) {
        if(isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error);
        }
    }
}

export const forgotPassword = async (FormData: ForgotPasswordFormData) => {
    try {
        const { data } = await api.post<string>('/auth/forgot-password', FormData);

        return data;
    } catch (error) {
        if(isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error);
        }
    }
}

export const validateToken = async (formData: ConfirmToken) => {
    try {
        const { data } = await api.post<string>('/auth/validate-token', formData);

        return data;
    } catch (error) {
        if(isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error);
        }
    }
}

type UpdatePasswordWithTokenProps = {
    token: ConfirmToken['token'],
    formData: NewPasswordFormData
}

export const updatePasswordWithToken = async ({ token, formData }: UpdatePasswordWithTokenProps) => {
    try {
        const { data } = await api.post<string>(`/auth/update-password/${token}`, formData);

        return data;
    } catch (error) {
        if(isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error);
        }
    }
} 

export const getUser = async () => {
    try {
        const { data } = await api('/auth/user');

        const result = userSchema.safeParse(data);

        if(result.success) return result.data;
    } catch (error) {
        if(isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error);
        }
    }
}

export const checkPassword = async (formData: CheckPasswordFormData) => {
    try {
        const { data } = await api.post<string>('/auth/check-password', formData);

        return data;
    } catch (error) {
        if(isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error);
        }
    }
}   