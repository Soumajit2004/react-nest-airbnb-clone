import {createBrowserRouter, RouterProvider} from "react-router-dom";

function App() {

  const router = createBrowserRouter([
    {
      path: "/",
      element: <div>Big Cow</div>,
    },
  ]);

  return (
    <div>
      <RouterProvider router={router}/>
    </div>
  )

}

export default App
