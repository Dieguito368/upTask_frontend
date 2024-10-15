import { Fragment, ChangeEvent } from 'react';
import { Navigate, useLocation, useNavigate, useParams } from 'react-router-dom';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Dialog, DialogPanel, DialogTitle, Transition, TransitionChild } from '@headlessui/react';
import { getTaskById, updateStatus } from '@/api/TaskAPI';
import { formatDate } from '@/utils/index';
import { statusTranslations } from '@/locales/es';
import { toast } from 'react-toastify';
import { TaskStatus } from '@/types/index';

export default function TaskModalDetails() {
    // Obtener el ID del Proyecto
    const params = useParams();
    const projectId = params.projectId!;

    const navigate = useNavigate();

    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const taskId = queryParams.get('viewTask')!;
    const show = taskId ? true : false;

    const { data: task, isError } = useQuery({
        queryKey: [ 'viewTask', taskId ],
        queryFn: () => getTaskById({ projectId, taskId }),
        enabled: !!taskId,
        retry: false,
    });

    const queryClient = useQueryClient();
    const { mutate } = useMutation({
        mutationFn: updateStatus,
        onError: (error) => {
            toast(error.message);
        },
        onSuccess: (data) => {
            queryClient.invalidateQueries({ queryKey: ['project', projectId]});
            queryClient.invalidateQueries({ queryKey: ['viewTask', taskId]});
            toast.success(data);
        }
    });

    const handleChange = (e: ChangeEvent<HTMLSelectElement>) => {
        const status = e.target.value as TaskStatus;

        const data = { projectId, taskId, status }

        mutate(data);
    }

    if(isError) return <Navigate to={ location.pathname } />
    
    if(task) return (
        <>
            <Transition appear show={ show } as={ Fragment }>
                <Dialog as="div" className="relative z-10" onClose={ () => navigate(location.pathname) }>
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
                                    <p className='text-sm text-slate-400'>Agregada el: { formatDate(task.createdAt) }</p>
                                    <p className='text-sm text-slate-400'>Última actualización: { formatDate(task.updatedAt) }</p>
                                    
                                    <DialogTitle
                                        as="h3"
                                        className="font-black text-4xl text-slate-600 my-5"
                                    >{ task.name }</DialogTitle>
                                    <p className='text-lg text-slate-500 mb-2'>{ task.description }</p>
                                    
                                    <div className='my-5 space-y-3'>
                                        <label className='font-bold'>Estado Actual:</label>

                                        <select 
                                            name="" 
                                            id=""
                                            className='w-full p-3 bg-white border border-gray-300'
                                            defaultValue={ task.status }
                                            onChange={ handleChange }
                                        >
                                            {
                                                Object.entries(statusTranslations).map(([ key, value ]) => (
                                                    <option key={ key } value={ key }>{ value }</option>
                                                ))
                                            }
                                        </select>
                                    </div>
                                </DialogPanel>
                            </TransitionChild>
                        </div>
                    </div>
                </Dialog>
            </Transition>
        </>
    )
}