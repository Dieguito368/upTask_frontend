import { useParams, Navigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { getProjectById } from '@/api/ProjectAPI';
import EditProjectForm from '@/components/projects/EditProjectForm';

const EditProject = () => {
    const params = useParams();
    const projectId = params.projectId!;

    const { data: project, isError } = useQuery({
        queryKey: [ 'editProject', projectId ],
        queryFn: () => getProjectById(projectId),
        retry: false
    });
    
    if(isError) return <Navigate to='/' />

    if(project) return  <EditProjectForm project={ project } projectId={ projectId } />
}

export default EditProject;