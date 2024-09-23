import { UseFormRegister } from 'react-hook-form';
import { TaskFormData } from "@/types/index";

type TaskFormProps = {
    register: UseFormRegister<TaskFormData>
}

export default function TaskForm({ register }: TaskFormProps) {
    return (
        <>
            <div className="flex flex-col gap-5">
                <label
                    className="font-normal text-2xl"
                    htmlFor="name"
                >Nombre de la tarea</label>
                <input
                    id="name"
                    type="text"
                    placeholder="Nombre de la tarea"
                    className="w-full p-3  border-gray-300 border"
                    {
                        ...register("name", {
                            required: "El nombre de la tarea es obligatorio",
                        })
                    }
                />
            </div>

            <div className="flex flex-col gap-5">
                <label
                    className="font-normal text-2xl"
                    htmlFor="description"
                >Descripción de la tarea</label>
                <textarea
                    id="description"
                    placeholder="Descripción de la tarea"
                    className="w-full p-3  border-gray-300 border"
                    {
                        ...register("description", {
                            required: "La descripción de la tarea es obligatoria"
                        })
                    }
                />
            </div>
        </>
    )
}