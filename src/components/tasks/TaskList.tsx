import { Task } from "@/types/index";
import TaskCard from "./TaskCard";

type TaskListProps = {
    tasks: Task[]
}


const initialStatusGroups : { [key: string]: Task[] } = {
    pending: [],
    onHold: [],
    inProgress: [],
    underReview: [],
    completed: []
}

const statusTranslations : { [key: string] : string } = {
    pending: 'Pendiente',
    onHold: 'En Espera',
    inProgress: 'En Progreso',
    underReview: 'En Revisión',
    completed: 'Completado'
}

const statusColors : { [key: string] : string } = {
    pending: 'border-t-slate-500',
    onHold: 'border-t-red-500',
    inProgress: 'border-t-blue-500',
    underReview: 'border-t-amber-500',
    completed: 'border-t-emerald-500'
}

const TaskList = ({ tasks } : TaskListProps) => {
    const groupedTasks = tasks.reduce((acc, task) => {
        let currentGroup = acc[task.status] ? [ ...acc[task.status] ] : [];
        currentGroup = [ ...currentGroup, task ]
        return { ...acc, [task.status]: currentGroup };
    }, initialStatusGroups);

    return (
        <>
            <h2 className="text-5xl font-black my-10">Tareas</h2>

            <div className='flex gap-5 overflow-x-scroll 2xl:overflow-auto pb-32'>
                {
                    Object.entries(groupedTasks).map(([status, tasks]) => (
                        <div 
                            key={ status } 
                            className='min-w-[300px] 2xl:min-w-0 2xl:w-1/5'
                        >
                            <h3     
                                className={ `capitalize text-xl fnt-ligth border ${statusColors[status]} bg-white p-3 border-t-8` }
                            >{ statusTranslations[status] }</h3>
                            <ul className='mt-5 space-y-5'>
                                {
                                    tasks.length === 0 ? (
                                        <li 
                                            className="text-gray-500 text-center pt-3"
                                        >No Hay tareas</li>
                                    ) : (
                                        tasks.map(task => <TaskCard key={ task._id } task={ task } />)
                                    )
                                }
                            </ul>
                        </div>
                    ))
                }
            </div>
        </>
    )
}

export default TaskList;