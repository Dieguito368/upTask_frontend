import { Fragment } from "react";
import { useNavigate, useLocation } from 'react-router-dom';
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { Dialog, DialogTitle, DialogPanel, Transition, TransitionChild } from '@headlessui/react';
import Error from '../Error';
import { CheckPasswordFormData } from "@/types/index";
import { deleteProject } from "@/api/ProjectAPI";
import { toast } from "react-toastify";
import { checkPassword } from "@/api/AuthAPI";

const DeleteProjectModal = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const queryClient = useQueryClient();
    
    const initialValues = {
        password: ''
    }
    const queryParams = new URLSearchParams(location.search);
    const deleteProjectId = queryParams.get('deleteProject')!;
    const show = deleteProjectId ? true : false

    const { register, handleSubmit, formState: { errors }, reset } = useForm({ defaultValues: initialValues });

    const checkPasswordMutation = useMutation({
        mutationFn: checkPassword,
        onError: (error) => toast.error(error.message)
    });

    const deleteProjectMutation = useMutation({
        mutationFn: deleteProject,
        onError: error => toast.error(error.message),
        onSuccess: res => {
            toast.success(res);

            queryClient.invalidateQueries({ queryKey: [ 'projects' ] });

            reset();

            navigate(location.pathname, { replace: true })
        } 
    });

    const handleForm = async (formData: CheckPasswordFormData) => {
        await checkPasswordMutation.mutateAsync(formData);

        await deleteProjectMutation.mutateAsync(deleteProjectId);
    }

    return (
        <Transition appear show={ show } as={ Fragment }>
            <Dialog as="div" className="relative z-10" onClose={ () => navigate(location.pathname, { replace: true }) }>
                <TransitionChild
                    as={ Fragment }
                    enter="ease-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <div className="fixed inset-0 bg-black/60" />
                </TransitionChild>

                <div className="fixed inset-0 overflow-y-auto">
                    <div className="flex min-h-full items-center justify-center p-4 text-center">
                        <TransitionChild
                            as={ Fragment }
                            enter="ease-out duration-300"
                            enterFrom="opacity-0 scale-95"
                            enterTo="opacity-100 scale-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100 scale-100"
                            leaveTo="opacity-0 scale-95"
                        >
                            <DialogPanel className="w-full max-w-4xl transform overflow-hidden rounded-2xl bg-white text-left align-middle shadow-xl transition-all p-16">

                                <DialogTitle
                                    as="h3"
                                    className="font-black text-3xl  my-5"
                                >Eliminar Proyecto</DialogTitle>

                                <p className="text-lg font-bold">Confirma la eliminación del proyecto { '' }
                                    <span className="text-fuchsia-600">colocando tu password</span>
                                </p>

                                <form
                                    className="mt-10 space-y-5"
                                    onSubmit={ handleSubmit(handleForm) }
                                    noValidate
                                >

                                    <div className="flex flex-col">
                                        <label
                                            className="font-normal text-xl mb-3"
                                            htmlFor="password"
                                        >Password</label>

                                        <input
                                            id="password"
                                            type="password"
                                            placeholder="Password Inicio de Sesión"
                                            className="w-full p-3  border-gray-300 border focus:border-gray-300 focus:ring-0"
                                            {
                                                ...register("password", {
                                                    required: "El password es obligatorio",
                                                })
                                            }
                                        />

                                        {
                                            errors.password && (
                                                <Error>{ errors.password.message }</Error>
                                            )
                                        }
                                    </div>

                                    <input
                                        type="submit"
                                        className=" bg-fuchsia-600 hover:bg-fuchsia-700 w-full p-3 text-white font-black text-sm cursor-pointer uppercase transition-colors"
                                        value='Eliminar Proyecto'
                                    />
                                </form>
                            </DialogPanel>
                        </TransitionChild>
                    </div>
                </div>
            </Dialog>
        </Transition>
    );
}

export default DeleteProjectModal;