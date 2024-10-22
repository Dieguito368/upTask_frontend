import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useMutation } from '@tanstack/react-query';
import Error from '@/components/Error';
import { createAccount } from '@/api/AuthAPI';
import { UserRegisterFormData } from '@/types/index';
import { toast } from 'react-toastify';

export default function RegisterView() {

    const initialValues: UserRegisterFormData = {
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
    }

    const { register, handleSubmit, watch, reset, formState: { errors } } = useForm<UserRegisterFormData>({ defaultValues: initialValues });

    const password = watch('password');

    const { mutate } = useMutation({
        mutationFn: createAccount,
        onError: (error) => {
            toast.error(error.message);
        }, 
        onSuccess: (data) => {
            toast.success(data);

            reset();
        }
    })

    const handleRegister = (formData: UserRegisterFormData) => {
        mutate(formData);
    }

    return (
        <>
            <h1 className="text-5xl font-black text-white">Crear Cuenta</h1>

            <p className="text-2xl font-light text-white mt-5">
                Llena el formulario para {''}
                <span className=" text-fuchsia-500 font-bold"> crear tu cuenta</span>
            </p>

            <form
                onSubmit={handleSubmit(handleRegister)}
                className="space-y-8 p-10  bg-white mt-10"
                noValidate
            >
                <div className="flex flex-col">
                    <label
                        className="font-normal text-2xl mb-3"
                        htmlFor="email"
                    >Email</label>

                    <input
                        id="email"
                        type="email"
                        placeholder="Ingresa tu Email"
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
                            <Error>{ errors.email.message }</Error>
                        )
                    }
                </div>

                <div className="flex flex-col">
                    <label
                        className="font-normal text-2xl mb-3"
                    >Nombre</label>

                    <input
                        type="name"
                        placeholder="Ingresa tu Nombre Completo"
                        className="w-full p-3  border-gray-300 border outline-none"
                        {
                            ...register("name", {
                                required: "El Nombre es obligatorio",
                            })
                        }
                    />
                    
                    {
                        errors.name && (
                            <Error>{ errors.name.message }</Error>
                        )
                    }
                </div>

                <div className="flex flex-col">
                    <label
                        className="font-normal text-2xl mb-3"
                    >Password</label>

                    <input
                        type="password"
                        placeholder="Ingresa tu Password"
                        className="w-full p-3  border-gray-300 border outline-none"
                        {
                            ...register("password", {
                                required: "El Password es obligatorio",
                                minLength: {
                                    value: 8,
                                    message: 'El Password debe ser mínimo de 8 caracteres'
                                }
                            })
                        }
                    />
                    
                    {
                        errors.password && (
                            <Error>{ errors.password.message }</Error>
                        )
                    }
                </div>

                <div className="flex flex-col">
                    <label
                        className="font-normal text-2xl mb-3"
                    >Repetir Password</label>

                    <input
                        id="password_confirmation"
                        type="password"
                        placeholder="Repite tu Password"
                        className="w-full p-3  border-gray-300 border outline-none"
                        {
                            ...register("password_confirmation", {
                                required: "Repetir Password es obligatorio",
                                validate: value => value === password || 'Los Passwords no son iguales'
                            })
                        }
                    />

                    {
                        errors.password_confirmation && (
                            <Error>{ errors.password_confirmation.message }</Error>
                        )
                    }
                </div>

                <input
                    type="submit"
                    value='Registrarme'
                    className="bg-fuchsia-600 hover:bg-fuchsia-700 w-full p-3  text-white font-black  text-xl cursor-pointer"
                />
            </form>

            <nav className='mt-10 flex flex-col space-y-4'>
                <p className='text-white text-center'>
                    ¿Ya tienes una cuenta? {}
                    <Link
                        to='/auth/login'
                        className='text-fuchsia-600 font-bold'
                    >Iniciar sesión</Link>
                </p>
            </nav>
        </>
    )
}