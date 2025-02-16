import { Fragment } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { Dialog, DialogPanel, DialogTitle, Transition, TransitionChild } from '@headlessui/react';
import { useForm } from 'react-hook-form';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import TaskForm from './TaskForm';
import Error from '../Error';
import { TaskFormData } from '@/types/index';
import { createTask } from '@/api/TaskAPI';
import { toast } from 'react-toastify';

export default function AddTaskModal() {
    const params = useParams();
    const navigate = useNavigate();
    const location = useLocation();
    const queryClient = useQueryClient();

    const queryParams = new URLSearchParams(location.search);
    const modalTask = queryParams.get('newTask'); 
    const show = modalTask ? true : false;
    
    const projectId = params.projectId!;
    
    const initialValues : TaskFormData = {
        name: '',
        description: ''
    }

    const { register, handleSubmit, reset, formState: { errors } } = useForm({ defaultValues: initialValues });

    const isEmptyErrors = () => Object.values(errors).length > 0;
    
    const { mutate } = useMutation({
        mutationFn: createTask,
        onError: error => toast.error(error.message),
        onSuccess: data => {
            queryClient.invalidateQueries({ queryKey: ['project', projectId] })
            toast.success(data);
            reset();
            navigate(location.pathname)
        }
    });

    const handleForm = (formData: TaskFormData) => {
        const data = { projectId, formData }

        mutate(data);
    }
    
    return (
        <>
            <Transition appear show={ show } as={ Fragment }>
                <Dialog as="div" className="relative z-10" onClose={() => navigate(location.pathname) }>
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
                                        className="font-black text-4xl  my-5"
                                    >
                                        Nueva Tarea
                                    </DialogTitle>

                                    <p className="text-xl font-bold">Llena el formulario y crea  {''}
                                        <span className="text-fuchsia-600">una tarea</span>
                                    </p>

                                    <form 
                                        className='mt-10 space-y-3'
                                        onSubmit={ handleSubmit(handleForm) }
                                        noValidate
                                    >
                                        {  isEmptyErrors() && <Error>Todos los campos son obligatorios</Error> }

                                        <TaskForm register={ register } />

                                        <input
                                            type='submit' 
                                            value='Crear Tarea' 
                                            className='bg-fuchsia-600 hover:bg-fuchsia-700 w-full text-white font-bold p-3 uppercase cursor-pointer transition-colors'
                                        />
                                    </form>
                                </DialogPanel>
                            </TransitionChild>
                        </div>
                    </div>
                </Dialog>
            </Transition>
        </>
    )
}