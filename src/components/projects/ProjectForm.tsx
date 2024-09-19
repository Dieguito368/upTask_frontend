import { UseFormRegister } from 'react-hook-form';
import { DraftProject } from 'types';

type ProjectFormProps = {
    register: UseFormRegister<DraftProject> 
}

export default function ProjectForm({ register } : ProjectFormProps) {
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
            </div>
        </>
    )
}