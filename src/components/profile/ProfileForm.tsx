import { useForm } from "react-hook-form"
import Error from "../Error"
import { User, UserEditFormData } from "@/types/index"
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateProfile } from "@/api/ProfileAPI";
import { toast } from "react-toastify";

type ProfileDataProps = {
    data: User;
}

function ProfileForm({ data } : ProfileDataProps) {
    const queryClient = useQueryClient();

    const { register, handleSubmit, formState: { errors } } = useForm({ defaultValues: data });

    const { mutate } = useMutation({
        mutationFn: updateProfile,
        onError: error => toast.error(error.message),
        onSuccess: data => { 
            toast.success(data);
            
            queryClient.invalidateQueries({ queryKey: [ 'user' ] });
        }
    }) 

    const handleEditProfile = (formData: UserEditFormData) => mutate(formData)

    return (
        <>
            <div className="mx-auto max-w-3xl g">
                <h1 className="text-5xl font-black ">Mi Perfil</h1>
                <p className="text-2xl font-light text-gray-500 mt-5">Aquí puedes actualizar tu información</p>

                <form
                    onSubmit={ handleSubmit(handleEditProfile) }
                    className=" mt-14 space-y-5 bg-white shadow-lg p-10 rounded-l"
                    noValidate
                >
                    <div className="mb-5">
                        <label
                            className="text-sm uppercase font-bold block mb-2"
                            htmlFor="name"
                        >Nombre</label>
                        
                        <input
                            id="name"
                            type="text"
                            placeholder="Tu Nombre"
                            className="w-full p-3 border border-gray-200 focus:border-gray-200 focus:ring-0"
                            {
                                ...register("name", {
                                    required: "Nombre de usuario es obligatoro",
                                })
                            }
                        />

                        { errors.name && <Error>{errors.name.message}</Error> }
                    </div>

                    <div className="mb-5">
                        <label
                            className="text-sm uppercase font-bold block mb-2"
                            htmlFor="password"
                        >E-mail</label>

                        <input
                            id="text"
                            type="email"
                            placeholder="Tu Email"
                            className="w-full p-3 border border-gray-200 focus:border-gray-200 focus:ring-0"
                            {
                                ...register("email", {
                                    required: "El e-mail es obligatorio",
                                    pattern: {
                                        value: /\S+@\S+\.\S+/,
                                        message: "E-mail no válido",
                                    },
                                })
                            }
                        />
                        { errors.email && <Error>{ errors.email.message }</Error> }
                    </div>

                    <input
                        type="submit"
                        value='Guardar Cambios'
                        className="bg-fuchsia-600 w-full p-3 text-white uppercase text-sm font-bold hover:bg-fuchsia-700 cursor-pointer transition-colors"
                    />
                </form>
            </div>
        </>
    )
}

export default ProfileForm;