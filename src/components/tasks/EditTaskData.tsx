import { Navigate, useLocation, useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { getTaskById } from '@/api/TaskAPI';
import EditTaskModal from './EditTaskModal';

const EditTaskData = () => {
    // Obtener el ID del Proyecto
    const params = useParams();
    const projectId = params.projectId!;

    //Obtener el ID de la Tarea
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const taskId = queryParams.get('taskId')!;

    // Consultar a la API con useQuery
    const { data: task, isError } = useQuery({
        queryKey: [ 'task', taskId ],
        queryFn: () => getTaskById({ projectId, taskId }),
        enabled: !!taskId,
        retry: false
    });

    if(isError) return <Navigate to={ location.pathname } />

    if(task) return <EditTaskModal task={ task } taskId={ taskId } />
}

export default EditTaskData;