import { RouterProvider } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import router from './routes/root.route.tsx';

const queryClient = new QueryClient();

function App() {
  return (
    <div className={'font-sans'}>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
        <ToastContainer position={'bottom-center'} />
      </QueryClientProvider>
    </div>

  );
}

export default App;
