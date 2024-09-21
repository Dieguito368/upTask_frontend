import { useEffect, useMemo } from 'react';
import { useParams, Link, Navigate, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useQuery, useMutation } from '@tanstack/react-query';
import { getProjectById, updateProject } from '@/api/ProjectAPI';
import ProjectForm from '@/components/projects/ProjectForm';
import Error from '@/components/Error';
import { DraftProject } from '@/types/index';
import { toast } from 'react-toastify';

const EditProject = () => {
    const navigate = useNavigate();
    const params = useParams();
    const projectId = params.projectId!;

    const { data: project, isError } = useQuery({
        queryKey: ['editProject', projectId],
        queryFn: () => getProjectById(projectId),
        retry: false
    });

    const { register, handleSubmit, formState: { errors }, reset } = useForm({ defaultValues: {
        projectName: '',
        clientName: '',
        description: ''
    }});

    useEffect(() => {
        if(project) {
            reset({
                projectName: project.projectName,
                clientName: project.clientName,
                description: project.description
            });
        }
    }, [ project ]);

    const { mutate } = useMutation({
        mutationFn: updateProject,
        onError: (error) => {
            toast.error(error.message);
        }, 
        onSuccess: (res) => {
            toast.success(res);

            navigate('/')
        }
    });

    const handleForm = (formData: DraftProject) => {
        const data = {
            id: projectId,
            formData
        }

        mutate(data);
    }

    const isEmptyErrors = useMemo(() => Object.keys(errors).length > 0, [ errors ]);

    if(isError) return <Navigate to='/' />

    if(project) return (
        <>
            <div className='max-w-3xl mx-auto'>
                <h1 className='text-5xl font-black'>Editar Proyecto</h1>
                
                <p className='text-2xl font-light text-gray-500 mt-5'>Llena el siguiente formulario para editar un proyecto</p>

                <nav className='my-5'>
                    <Link 
                        className='bg-purple-400 hover:bg-purple-500 px-10 py-3 text-white text-xl font-bold cursor-pointer transition-colors' 
                        to='/'
                    >Volver a Proyectos</Link>
                </nav>
                
                <form 
                    action='#' 
                    className='mt-10 bg-white shadow-lg p-10 rounded-lg' 
                    noValidate
                    onSubmit={ handleSubmit(handleForm) }
                >
                    { isEmptyErrors  && <Error>Todos los campos son obligatorios</Error> }

                    <ProjectForm
                        register={ register }
                    />

                    <input
                        type='submit' 
                        value='Guardar cambios' 
                        className='bg-fuchsia-600 hover:bg-fuchsia-700 w-full text-white font-bold p-3 uppercase cursor-pointer transition-colors'
                    />
                </form>
            </div>
        </>
    )
}

export default EditProject;