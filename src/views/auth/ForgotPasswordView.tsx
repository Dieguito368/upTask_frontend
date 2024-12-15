import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { ForgotPasswordFormData } from "../../types";
import Error from "@/components/Error";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { forgotPassword } from "@/api/AuthAPI";

export default function ForgotPasswordView() {
    const initialValues: ForgotPasswordFormData = {
        email: ''
    }
    const { register, handleSubmit, formState: { errors }, reset } = useForm({ defaultValues: initialValues });

    const { mutate } = useMutation({
        mutationFn: forgotPassword,
        onError: (error) => {
            toast.error(error.message);
        },
        onSuccess: (data) => {
            toast.success(data);
            reset();
        } 
    });

    const handleForgotPassword = (formData: ForgotPasswordFormData) => { mutate(formData) }

    return (
        <>
            <h1 className="text-3xl font-black text-white text-center">¿Olvidaste tu contraseña?</h1>

            <p className="text-lg text-center mb-8 font-light text-white mt-5">
                Te enviaremos un correo electrónico con las instrucciones para  {''}
                <span className=" text-fuchsia-500 font-bold">recuperar tu contraseña</span>
            </p>

            <form
                onSubmit={ handleSubmit(handleForgotPassword) }
                className="space-y-8 p-10 bg-white rounded"
                noValidate
            >
                <div className="flex flex-col">
                    <label
                        className="font-normal"
                        htmlFor="email"
                    >Email</label>
                    <input
                        id="email"
                        type="email"
                        placeholder="Email de Registro"
                        className="w-full p-3  border-gray-300 border text-sm outline-none mt-2"
                        {
                            ...register("email", {
                                required: "El Email de registro es obligatorio",
                                pattern: {
                                    value: /\S+@\S+\.\S+/,
                                    message: "Email no válido",
                                },
                            })
                        }
                    />

                    { errors.email && <Error>{errors.email.message}</Error> }
                </div>

                <input
                    type="submit"
                    value='Enviar Instrucciones'
                    className="bg-fuchsia-600 hover:bg-fuchsia-700 rounded w-full p-2 text-white font-black cursor-pointer text-sm"
                />
            </form>

            <nav className="mt-10 flex flex-col space-y-4">
                <p className='font-light text-white text-center'>
                    ¿Ya tienes una cuenta? {}
                    <Link
                        to='/auth/login'
                        className='text-fuchsia-600 font-bold'
                    >Iniciar sesión</Link>
                </p>

                <p className='font-light text-white text-center'>
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