import { createBrowserRouter } from 'react-router-dom';
import AppLayout from '@/layouts/AppLayout';
import DashboardView from '@/views/DashboardView';
import CreateProjectView from '@/views/projects/CreateProjectView';
import EditProject from './views/projects/EditProjectView';

const router = createBrowserRouter([
    {
        path: '/',
        element: <AppLayout />,
        children: [
            {
                index: true,
                element: <DashboardView />
            },
            {
                path: 'projects/create',
                element: <CreateProjectView />
            },
            {
                path: 'projects/:projectId/edit',
                element: <EditProject />
            }
        ]
    }
]);

export default router;