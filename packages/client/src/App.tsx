import { RouterProvider } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AuthProvider } from './context/AuthProvider.tsx';
import { ApiWatcherComponent } from './components/common/auth/ApiWatcher.component.tsx';
import router from './routes/root.route.tsx';

const queryClient = new QueryClient();

function App() {
  return (
    <AuthProvider>
      <ApiWatcherComponent />
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
        <ToastContainer />
      </QueryClientProvider>
    </AuthProvider>
  );
}

export default App;
