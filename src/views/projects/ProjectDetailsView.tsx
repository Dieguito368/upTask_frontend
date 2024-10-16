import { useQuery } from '@tanstack/react-query';
import { getProjectById } from '@/api/ProjectAPI';
import { useParams, useLocation, useNavigate, Navigate } from 'react-router-dom';
import AddTaskModal from '@/components/tasks/AddTaskModal';
import TaskList from '@/components/tasks/TaskList';
import EditTaskData from '@/components/tasks/EditTaskData';
import TaskModalDetails from '@/components/tasks/TaskModalDetails';

const ProjectDetailsView = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const params  = useParams();
    const projectId = params.projectId!;
    const { data: project, isError } = useQuery({
        queryKey: ['project', projectId],
        queryFn: () => getProjectById(projectId),
        retry: false
    });
    
    if(isError) return <Navigate to='/' />
    
    if(project) return (
        <>
            <h1 className='text-3xl font-black'>{ project.projectName }</h1>
            <p className='text-base font-light text-gray-500 text-justify'>{ project.description }</p>

            <nav className='my-5 flex gap-3'>
                <button 
                    type='button' 
                    className='bg-purple-400 hover:bg-purple-500 px-8 py-2 font-bold text-white text-sm cursor-pointer transition-colors'
                    onClick={ () => navigate(`${location.pathname}?newTask=true`)}
                >Agregar Tarea</button>
            </nav>

            <TaskList tasks={ project.tasks }/>

            <AddTaskModal />

            <EditTaskData />

            <TaskModalDetails />
        </>
    )
}

export default ProjectDetailsView;