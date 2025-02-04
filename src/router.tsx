import { createBrowserRouter, Navigate } from 'react-router-dom';
import AuthLayout from './layouts/AuthLayout';
import LoginView from './views/auth/LoginView';
import RegisterView from './views/auth/RegisterView';
import ConfirmAccountView from './views/auth/ConfirmAccountView';
import RequestNewCodeView from './views/auth/RequestNewCodeView';
import ForgotPasswordView from './views/auth/ForgotPasswordView';
import NewPasswordView from './views/auth/NewPasswordView';
import AppLayout from '@/layouts/AppLayout';
import DashboardView from '@/views/DashboardView';
import CreateProjectView from '@/views/projects/CreateProjectView';
import EditProject from './views/projects/EditProjectView';
import ProjectDetailsView from './views/projects/ProjectDetailsView';
import ProjectTeamView from './views/projects/ProjectTeamView';
import ProfileView from './views/profile/ProfileView';
import ChangePasswordView from './views/profile/ChangePasswordView';
import ProfileLayout from './layouts/ProfileLayout';
import NotFound from './views/404/NotFound';

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
            },
            {
                path: 'projects/:projectId/team',
                element: <ProjectTeamView />
            },
            {
                path: 'profile',
                element: <ProfileLayout />,
                children: [
                    {
                        index: true,
                        element: <ProfileView />
                    },
                    {
                        path: 'change-password',
                        element: <ChangePasswordView />
                    }
                ]
            },
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
            {
                path: 'request-code',
                element: <RequestNewCodeView />
            },
            {
                path: 'forgot-password',
                element: <ForgotPasswordView />
            },
            {
                path: 'new-password',
                element: <NewPasswordView />
            },
        ]
    },
    {
        element: <AuthLayout />,
        children: [
            {
                path: '*',
                element: <NotFound />
            }
        ]
    }
]);

export default router;