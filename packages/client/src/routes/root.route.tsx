import { createBrowserRouter } from 'react-router-dom';
import authRoute from './auth.route.tsx';
import RequireAuthComponent from '../components/common/auth/RequireAuth.component.tsx';
import AuthLayout from '../layout/auth.layout.tsx';
import RootLayout from '../layout/root.layout.tsx';
import DashboardView from '../views/dashboard/dashboard.view.tsx';
import PersistenceLogin from '../components/common/auth/PersistenceLogin.component.tsx';
import { hostingRoutes } from './children/hosting.route.tsx';
import HostingRootLayout from '../layout/hosting.layout.tsx';


const router = createBrowserRouter([
  {
    path: '/auth',
    element: <AuthLayout />,
    children: authRoute,
  },
  {
    element: <PersistenceLogin />,
    children: [
      {
        element: <RequireAuthComponent />,
        children: [
          {
            element: <RootLayout />,
            children: [
              {
                path: '/',
                index: true,
                element: <DashboardView />,
              },
            ],
          },
          {
            path: 'hosting',
            element: <HostingRootLayout />,
            children: hostingRoutes,
          },

        ],
      },
    ],
  },

]);

export default router;