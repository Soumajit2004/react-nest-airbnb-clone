import {createBrowserRouter, RouterProvider} from "react-router-dom";
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";
import {ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';


import authRoute from "./routes/auth.route.tsx";

import AuthLayout from "./layout/auth.layout.tsx";


const queryClient = new QueryClient()


const router = createBrowserRouter([
  {
    path: "/auth",
    element: <AuthLayout/>,
    children: authRoute,
  },
]);

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router}/>
      <ToastContainer/>
    </QueryClientProvider>
  )
}

export default App
