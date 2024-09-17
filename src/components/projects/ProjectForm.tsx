import { UseFormRegister, FieldErrors } from 'react-hook-form';
import Error from '@/components/Error';
import { DraftProject } from 'types';

type ProjectFormProps = {
    register: UseFormRegister<DraftProject> 
    errors: FieldErrors<DraftProject> 
}

export default function ProjectForm({ register, errors } : ProjectFormProps) {
    return (
        <>
            <div className="mb-5">
                <label htmlFor="projectName" className="text-sm uppercase font-bold block mb-2">
                    Nombre del Proyecto
                </label>
                <input
                    id="projectName"
                    className="w-full p-3 border border-gray-200 outline-none"
                    type="text"
                    placeholder="Nombre del Proyecto"
                    {
                        ...register("projectName", {
                            required: "El Nombre del Proyecto es obligatorio",
                        })
                    }
                />

                { 
                    errors.projectName && <Error>{ errors.projectName.message }</Error>
                }
            </div>

            <div className="mb-5    ">
                <label htmlFor="clientName" className="text-sm uppercase font-bold block mb-2">
                    Nombre Cliente
                </label>
                <input
                    id="clientName"
                    className="w-full p-3 border border-gray-200 outline-none"
                    type="text"
                    placeholder="Nombre del Cliente"
                    {
                        ...register("clientName", {
                            required: "El Nombre del Cliente es obligatorio",
                        })
                }
                />

                {
                    errors.clientName && <Error>{ errors.clientName.message }</Error>
                }
            </div>

            <div className="mb-5">
                <label htmlFor="description" className="text-sm uppercase font-bold block mb-2">
                    Descripción
                </label>
                <textarea
                    id="description"
                    className="w-full p-3 border border-gray-200 outline-none"
                    placeholder="Descripción del Proyecto"
                    {
                        ...register("description", {
                            required: "La descripción del proyecto es obligatoria"
                        })
                    }
                />

                {
                    errors.description && <Error>{ errors.description.message }</Error>
                }
            </div>
        </>
    )
}