import { useParams } from 'react-router-dom';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { DndContext, DragEndEvent, MouseSensor, TouchSensor, useSensor, useSensors } from '@dnd-kit/core';
import TaskCard from "@/components/tasks/TaskCard";
import DropTask from "@/components/tasks/DropTask";
import { statusTranslations } from "@/locales/es";
import { Project, TaskProject, TaskStatus } from "@/types/index";
import { updateStatus } from '@/api/TaskAPI';
import { toast } from 'react-toastify';

type TaskListProps = {
    tasks: TaskProject[]
    canEdit?: boolean
}

const initialStatusGroups : { [key: string]: TaskProject[] } = {
    pending: [],
    onHold: [],
    inProgress: [],
    underReview: [],
    completed: []
}

const statusColors : { [key: string] : string } = {
    pending: 'border-t-slate-500',
    onHold: 'border-t-red-500',
    inProgress: 'border-t-blue-500',
    underReview: 'border-t-amber-500',
    completed: 'border-t-emerald-500'
}

const TaskList = ({ tasks, canEdit } : TaskListProps) => {
    const queryClient = useQueryClient();
    const params = useParams();

    const projectId = params.projectId!;

    const groupedTasks = tasks.reduce((acc, task) => {
        let currentGroup = acc[task.status] ? [ ...acc[task.status] ] : [];
        currentGroup = [ ...currentGroup, task ]
        return { ...acc, [task.status]: currentGroup };
    }, initialStatusGroups);

    const mouseSensor = useSensor(MouseSensor, {
        activationConstraint: {
            distance: 10,
        },
    });
     
    const touchSensor = useSensor(TouchSensor, {
        activationConstraint: {
            delay: 250,
            tolerance: 5,
        },
    });
    
    const sensors = useSensors(mouseSensor, touchSensor);

    const { mutate } = useMutation({
        mutationFn: updateStatus,
        onError: (error) => toast(error.message),
        onSuccess: (data) => {
            queryClient.invalidateQueries({ queryKey: ['project', projectId] });

            toast.success(data);
        }
    });

    const  handleDragEnd = (e: DragEndEvent) => {
        const { over, active } = e;

        if(over && over.id) {
            const taskId = active.id.toString();
            const status = over.id as TaskStatus;

            mutate({ projectId, taskId, status });

            queryClient.setQueryData([ 'project', projectId ], (prevData: Project) => {
                const updatedTasks = prevData.tasks.map(task => {
                    if(task._id === taskId) {
                        return { ...task, status };
                    }

                    return task;
                });

                return {
                    ...prevData,
                    tasks: updatedTasks
                }
            });
        }
    }

    return (
        <>
            <h2 className="text-2xl font-black mt-10 my-5">Tareas</h2>

            <div className='flex gap-5 overflow-x-scroll 2xl:overflow-auto pb-32'>
                <DndContext 
                    sensors={ sensors }
                    onDragEnd={ handleDragEnd } 
                >
                    {
                        Object.entries(groupedTasks).map(([status, tasks]) => (
                            <div 
                                key={ status } 
                                className='min-w-[200px] 2xl:min-w-0 2xl:w-1/5'
                            >
                                <h3     
                                    className={ `capitalize fnt-ligth border ${statusColors[status]} bg-white p-3 border-t-8` }
                                >{ statusTranslations[status] }</h3>

                                <DropTask status={ status } />

                                <ul className='mt-5 space-y-5'>
                                    {
                                        tasks.length === 0 ? (
                                            <li 
                                                className="text-gray-500 text-center pt-3"
                                            >No Hay tareas</li>
                                        ) : (
                                            tasks.map(task => <TaskCard key={ task._id } task={ task } canEdit={ canEdit } />)
                                        )
                                    }
                                </ul>
                            </div>
                        ))
                    }
                </DndContext>
            </div>
        </>
    )
}

export default TaskList;