import { createBrowserRouter } from 'react-router-dom';
import AppLayout from './layouts/AppLayout';
import DashboardView from './views/DashboardView';

const router = createBrowserRouter([
    {
        path: '/',
        element: <AppLayout />,
        children: [
            {
                index: true,
                element: <DashboardView />
            }
        ]
    }
]);

export default router;