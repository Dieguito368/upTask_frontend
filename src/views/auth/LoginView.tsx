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
            <h1 className="text-3xl font-black text-white text-center">Iniciar Sesión</h1>

            <p className="text-lg text-center mb-8 font-light text-white mt-5">
                Bienvenido de nuevo, mantén el enfoque y la productividad de {''}
                <span className=" text-fuchsia-500 font-bold">tu equipo</span>
            </p>

            <form
                onSubmit={ handleSubmit(handleLogin) }
                className="p-10 mt-10 bg-white rounded"
                noValidate
            >
                <div className="flex flex-col mb-5">
                    <label
                        className="font-normal mb-1"
                        htmlFor='email'
                    >Email</label>

                    <input
                        id="email"
                        type="email"
                        placeholder="Email de Registro"
                        className="w-full p-3 text-sm border-gray-300 border outline-none"
                        autoComplete='email'
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
                        className="font-normal mb-1"
                        htmlFor='password'
                    >Password</label>

                    <input
                        id='password'
                        type="password"
                        placeholder="Password de Registro"
                        className="w-full text-sm p-3  border-gray-300 border outline-none"
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
                    className="bg-fuchsia-600 hover:bg-fuchsia-700 w-full px-3 py-2  text-white font-black cursor-pointer mt-8"
                />
            </form>

            <nav className='mt-10 flex flex-col space-y-4'>
                <p className='font-light text-white text-center'>

                    ¿No tienes una cuenta? {}
                    <Link
                        to='/auth/register'
                        className='text-fuchsia-600 font-bold'
                    >Crear una</Link>
                </p>

                <p className='font-light text-white text-center'>
                    ¿Olvidaste tu contraseña? {}
                    <Link
                        to='/auth/forgot-password'
                        className='text-fuchsia-600 font-bold'
                    >Restablecer</Link>
                </p>
            </nav>
        </>
    )
}