import {createBrowserRouter, RouterProvider} from "react-router-dom";
import authRoute from "./views/auth/auth.route.tsx";
import AuthLayout from "./layout/auth.layout.tsx";

function App() {

  const router = createBrowserRouter([
    {
      path: "/auth",
      element: <AuthLayout/>,
      children: authRoute,
    },
  ]);

  return (
    <div>
      <RouterProvider router={router}/>
    </div>
  )

}

export default App
