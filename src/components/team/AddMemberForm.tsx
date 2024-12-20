import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import SearchResult from "./SearchResult";
import Error from "../Error";
import Spinner from "../Spinner";
import { findUserByEmail } from "@/api/TeamAPI";
import { TeamMemberFormData } from "@/types/index";

export default function AddMemberForm() {
    const initialValues: TeamMemberFormData = {
        email: ''
    }
    const params = useParams()
    const projectId = params.projectId!

    const { register, handleSubmit, watch, reset: resetForm , formState: { errors } } = useForm({ defaultValues: initialValues })

    const mutation = useMutation({ mutationFn: findUserByEmail })

    const handleSearchUser = async (formData: TeamMemberFormData) => mutation.mutate({ projectId, formData });

    const reset = () => {
        resetForm(),
        mutation.reset();
    }

    const emailValue = watch("email");
    useEffect(() => {
        mutation.reset();
    }, [ emailValue ]);

    return (
        <>

            <form
                className="mt-10 space-y-8"
                onSubmit={ handleSubmit(handleSearchUser) }
                noValidate
            >

                <div className="flex flex-col">
                    <label
                        className="font-normal mb-2"
                        htmlFor="name"
                    >Email de Usuario</label>

                    <input
                        id="name"
                        type="text"
                        placeholder="E-mail del usuario a Agregar"
                        className="w-full p-3  border-gray-300 border text-sm outline-none"
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

                    { errors.email && <Error>{errors.email.message}</Error> }
                </div>

                <input
                    type="submit"
                    className=" bg-fuchsia-600 hover:bg-fuchsia-700 w-full py-2 px-2  text-white font-black cursor-pointer"
                    value='Buscar Usuario'
                />
            </form>

            { mutation.isPending && <Spinner /> }

            { mutation.isError && <div className="mt-10"><Error>{ mutation.error.message }</Error></div> }

            { mutation.data && <SearchResult user={ mutation.data } reset={ reset } /> }
        </>
    )
}