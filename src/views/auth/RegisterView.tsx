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
            <h1 className="text-3xl font-black text-white text-center">Crear Cuenta</h1>

            <p className="text-lg text-center mb-8 font-light text-white mt-5">
                Unete y empieza a colaborar en proyectos, gestionando tareas y {''}
                <span className=" text-fuchsia-500 font-bold">miembros fácilmente</span>
            </p>

            <form
                onSubmit={ handleSubmit(handleRegister) }
                className="p-10 bg-white mt-10 rounded"
                noValidate
            >
                <div className="flex flex-col mb-5">
                    <label
                        className="font-normal mb-1"
                        htmlFor="email"
                    >Email</label>

                    <input
                        id="email"
                        type="email"
                        placeholder="Ingresa tu Email"
                        className="w-full p-3 border-gray-300 border outline-none text-sm"
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

                <div className="flex flex-col mb-5">
                    <label
                        className="font-normal mb-1"
                    >Nombre</label>

                    <input
                        type="name"
                        placeholder="Ingresa tu Nombre Completo"
                        className="w-full p-3  border-gray-300 border outline-none text-sm"
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

                <div className="flex flex-col mb-5">
                    <label
                        className="font-normal mb-1"
                    >Password</label>

                    <input
                        type="password"
                        placeholder="Ingresa tu Password"
                        className="w-full p-3  border-gray-300 border outline-none text-sm"
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

                <div className="flex flex-col mb-5">
                    <label
                        className="font-normal mb-1"
                    >Repetir Password</label>

                    <input
                        id="password_confirmation"
                        type="password"
                        placeholder="Repite tu Password"
                        className="w-full p-3  border-gray-300 border outline-none text-sm"
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
                    className="bg-fuchsia-600 hover:bg-fuchsia-700 w-full p-3 text-white font-black text-sm cursor-pointer mt-3"
                />
            </form>

            <nav className='mt-10 flex flex-col space-y-4'>
                <p className='font-light text-white text-center'>
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