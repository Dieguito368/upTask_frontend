import { useMemo } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useMutation } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import ProjectForm from '@/components/projects/ProjectForm';
import Error from '@/components/Error';
import { createProject } from '@/api/ProjectAPI';
import { DraftProject } from '@/types/index';

const CreateProjectView = () => {
    const navigate = useNavigate();

    const initialValues: DraftProject = {
        projectName: '',
        clientName: '',
        description: '' 
    }
    const { register, handleSubmit, formState: { errors } } = useForm({ defaultValues: initialValues });
    const { mutate } = useMutation({
        mutationFn: createProject,
        onError:  (error) => {
            toast.error(error.message);
        },
        onSuccess: (res) => {
            toast.success(res);

            navigate('/');
        }
    });

    const handleForm = (data: DraftProject) => mutate(data);

    const isEmptyErrors = useMemo(() => Object.keys(errors).length > 0, [ errors ]);

    return (
        <>
            <div className='max-w-3xl mx-auto'>
                <h1 className='text-5xl font-black'>Crear Proyecto</h1>
                
                <p className='text-2xl font-light text-gray-500 mt-5'>Llena el siguiente formulario para crear un proyecto</p>

                <nav className='my-5'>
                    <Link 
                        className='bg-purple-400 hover:bg-purple-500 px-10 py-3 text-white text-xl font-bold cursor-pointer transition-colors' 
                        to='/'
                    >Volver a Proyectos</Link>
                </nav>
                
                <form 
                    action='#' 
                    className='mt-10 bg-white shadow-lg p-10 rounded-lg' 
                    onSubmit={ handleSubmit(handleForm) } 
                    noValidate
                >
                    { isEmptyErrors  && <Error>Todos los campos son obligatorios</Error> }

                    <ProjectForm 
                        register={ register }
                    />

                    <input
                        type='submit' 
                        value='Crear Proyecto' 
                        className='bg-fuchsia-600 hover:bg-fuchsia-700 w-full text-white font-bold p-3 uppercase cursor-pointer transition-colors'
                    />
                </form>
            </div>
        </>
    )
}

export default CreateProjectView;