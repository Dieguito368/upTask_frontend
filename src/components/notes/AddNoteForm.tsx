import { useLocation, useParams } from "react-router-dom";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import Error from "../Error";
import { createNote } from "@/api/NoteAPI";
import { NoteFormData } from "@/types/index";

const AddNoteForm = () => {
    const params = useParams();
    const location = useLocation();
    const queryClient = useQueryClient();

    const queryParams = new URLSearchParams(location.search);
    const initialValues : NoteFormData = {
        content: ''
    }
    const projectId = params.projectId!;
    const taskId = queryParams.get('viewTask')!;

    const { register, handleSubmit, formState: { errors }, reset } = useForm({ defaultValues: initialValues });

    const { mutate } = useMutation({
        mutationFn: createNote,
        onError: (error) => toast.error(error.message),
        onSuccess: () => {
            toast.success('Nota creada correctamente');

            queryClient.invalidateQueries({ queryKey: ['viewTask', taskId]});
            
            reset();
        }
    });

    const handleAddNote = (formData: NoteFormData) => mutate({ projectId, taskId, formData })

    return (
        <form 
            onSubmit={ handleSubmit(handleAddNote) }
            noValidate
        >
            <div className="flex flex-col">
                <label htmlFor="content" className="font-bold mb-3">Crear Nota</label>
                <input 
                    type="text" 
                    id="content"
                    placeholder="Contenido de la nota"
                    className="w-full border border-gray-300 p-3 outline-none"    
                    {
                        ...register('content', {
                            required: 'El contenido de la nota es obligatorio'
                        })
                    }
                />

                { errors.content && <Error>{ errors.content.message }</Error> }
            </div>

            <input 
                type="submit" 
                value="Crear Nota"
                className="bg-fuchsia-600 hover:bg-fuchsia-700 cursor-pointer w-40 text-white py-3 transition-colors font-bold uppercase text-xs rounded mt-8" 
            />
        </form>
    );
}

export default AddNoteForm