import { useForm } from "react-hook-form";
import Error from "../Error";
import { NoteFormData } from "@/types/index";

const AddNoteForm = () => {
    const initialValues : NoteFormData = {
        content: ''
    }

    const { register, handleSubmit, formState: { errors } } = useForm({ defaultValues: initialValues });

    const handleAddNote = (formData: NoteFormData) => {

    }

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