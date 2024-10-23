import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useMutation } from '@tanstack/react-query';
import Error from '@/components/Error';
import { UserLoginFormData } from '@/types/index';
import { autenthicateUser } from '@/api/AuthAPI';
import { toast } from 'react-toastify';

export default function LoginView() {
    const navigate = useNavigate();

    const initialValues: UserLoginFormData = {
        email: '',
        password: '',
    }

    const { register, handleSubmit, formState: { errors } } = useForm<UserLoginFormData>({ defaultValues: initialValues });

    const { mutate } = useMutation({
        mutationFn: autenthicateUser,
        onError: (error) => {
            toast.error(error.message);
        },
        onSuccess: () => {
            navigate('/');
        }
    });

    const handleLogin = (formData: UserLoginFormData) => mutate(formData)

    return (
        <>
            <form
                onSubmit={ handleSubmit(handleLogin) }
                className="space-y-8 p-10 bg-white"
                noValidate
            >
                <div className="flex flex-col">
                    <label
                        className="font-normal text-2xl mb-3"
                    >Email</label>

                    <input
                        id="email"
                        type="email"
                        placeholder="Email de Registro"
                        className="w-full p-3  border-gray-300 border outline-none"
                        {
                            ...register("email", {
                                required: "El Email es obligatorio",
                                pattern: {
                                    value: /\S+@\S+\.\S+/,
                                    message: "E-mail no válido",
                                },
                            })
                        }
                    />

                    {
                        errors.email && (
                            <Error>{errors.email.message}</Error>
                        )
                    }
                </div>

                <div className="flex flex-col">
                    <label
                        className="font-normal text-2xl mb-3"
                    >Password</label>

                    <input
                        type="password"
                        placeholder="Password de Registro"
                        className="w-full p-3  border-gray-300 border outline-none"
                        {
                            ...register("password", {
                                required: "El Password es obligatorio",
                            })
                    }
                    />

                    {
                        errors.password && (
                            <Error>{errors.password.message}</Error>
                        )
                    }
                </div>

                <input
                    type="submit"
                    value='Iniciar Sesión'
                    className="bg-fuchsia-600 hover:bg-fuchsia-700 w-full p-3  text-white font-black  text-xl cursor-pointer"
                />
            </form>

            <nav className='mt-10 flex flex-col space-y-4'>
                <p className='text-white text-center'>
                    ¿No tienes una cuenta? {}
                    <Link
                        to='/auth/register'
                        className='text-fuchsia-600 font-bold'
                    >Crear una</Link>
                </p>
            </nav>
        </>
    )
}