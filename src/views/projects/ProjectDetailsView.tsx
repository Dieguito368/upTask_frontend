import { useQuery } from '@tanstack/react-query';
import { getFullProjectById } from '@/api/ProjectAPI';
import { useParams, useLocation, useNavigate, Navigate, Link } from 'react-router-dom';
import AddTaskModal from '@/components/tasks/AddTaskModal';
import TaskList from '@/components/tasks/TaskList';
import EditTaskData from '@/components/tasks/EditTaskData';
import TaskModalDetails from '@/components/tasks/TaskModalDetails';
import { useAuth } from '@/hooks/useAuth';
import { isManager } from '@/utils/policies';
import { useMemo } from 'react';

const ProjectDetailsView = () => {
    const { user } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();
    const params  = useParams();
    const projectId = params.projectId!;
    const { data: project, isError } = useQuery({
        queryKey: [ 'project', projectId ],
        queryFn: () => getFullProjectById(projectId),
        retry: false
    });

    const canEdit = useMemo(() => user?._id === project?.manager, [ user, project ]);

    if(isError) return <Navigate to='/' />

    if(project && user) return (
        <>
            <h1 className='text-3xl font-black mb-2'>{ project.projectName }</h1>
            <p className='text-base font-light text-gray-500 text-justify'>{ project.description }</p>

            {
                isManager(user?._id, project.manager) && 
                    <nav className='my-5 flex gap-3'>
                        <button 
                            type='button' 
                            className='bg-purple-400 hover:bg-purple-500 px-8 py-2 font-bold text-white text-sm cursor-pointer transition-colors'
                            onClick={ () => navigate(`${location.pathname}?newTask=true`)}
                        >Agregar Tarea</button>

                        <Link 
                            to='team'
                            className='bg-fuchsia-400 hover:bg-fuchsia-500 px-8 py-2 font-bold text-white text-sm cursor-pointer transition-colors'
                        >Colaboradores</Link>
                    </nav>
            }

            <TaskList tasks={ project.tasks } canEdit={ canEdit } />

            <AddTaskModal />

            <EditTaskData />

            <TaskModalDetails />
        </>
    )
}

export default ProjectDetailsView;