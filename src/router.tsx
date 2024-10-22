import { createBrowserRouter, Navigate } from 'react-router-dom';
import AppLayout from '@/layouts/AppLayout';
import DashboardView from '@/views/DashboardView';
import CreateProjectView from '@/views/projects/CreateProjectView';
import EditProject from './views/projects/EditProjectView';
import ProjectDetailsView from './views/projects/ProjectDetailsView';
import AuthLayout from './layouts/AuthLayout';
import LoginView from './views/auth/LoginView';
import RegisterView from './views/auth/RegisterView';
import ConfirmAccountView from './views/auth/ConfirmAccountView';

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
            },
            {
                path: 'projects/:projectId',
                element: <ProjectDetailsView />
            }
        ]
    },
    {
        path: '/auth',
        element: <AuthLayout />,
        children: [
            {
                index: true, 
                element: <Navigate to="/auth/login" replace />
            },
            {
                path: 'login',
                element: <LoginView />
            },
            {
                path: 'register',
                element: <RegisterView />
            },
            {
                path: 'confirm-account',
                element: <ConfirmAccountView />
            },
            
        ]
    }
]);

export default router;