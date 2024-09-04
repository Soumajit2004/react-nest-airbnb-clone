import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


import authRoute from './routes/auth.route.tsx';

import AuthLayout from './layout/auth.layout.tsx';
import RootLayout from './layout/root.layout.tsx';
import { AuthProvider } from './context/AuthProvider.tsx';
import RequireAuthComponent from './components/common/RequireAuth.component.tsx';
import { ApiWatcher } from './ApiWatcher.tsx';


const queryClient = new QueryClient();


const router = createBrowserRouter([
  {
    path: '/auth',
    element: <AuthLayout />,
    children: authRoute,
  },
  {
    element: <RequireAuthComponent />,
    children: [
      {
        path: '/',
        index: true,
        element: <RootLayout />,
      },
    ],
  },

]);

function App() {
  return (
    <AuthProvider>
      <ApiWatcher />
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
        <ToastContainer />
      </QueryClientProvider>
    </AuthProvider>
  );
}

export default App;
