import { useDroppable  } from "@dnd-kit/core";

type DropTaskProps = {
    status: string
}

const DropTask = ({ status } : DropTaskProps) => {
    const { isOver, setNodeRef } = useDroppable({ id: status });

    const style = { opacity: isOver ? 0.4 : undefined }

    return (
        <div 
            ref={ setNodeRef }
            style={ style }
            className="text-xs font-semibold p-2 uppercase border-dashed border border-slate-500 mt-5 grid place-content-center text-slate-500"
        > 
            Soltar tarea aquí
        </div>
    )
}

export default DropTask;