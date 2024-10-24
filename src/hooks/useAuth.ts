import { useQuery } from '@tanstack/react-query';
import { getUser } from '@/api/AuthAPI';

export const useAuth = () => {
    const { data: user, isError, isLoading } = useQuery({
        queryKey: ['user'],
        queryFn: getUser,
        retry: 1,
        refetchOnWindowFocus: false 
    }) ;

    return { user, isError, isLoading };
}