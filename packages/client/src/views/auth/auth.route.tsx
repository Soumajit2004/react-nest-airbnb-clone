import {RouteObject} from "react-router-dom";

import SignUp from "./signup.view.tsx";
import SignIn from "./signin.view.tsx";

const authRoutes: RouteObject[] = [
  {path: "register", element: <SignUp/>},
  {path: "login", element: <SignIn/>}
]
export default authRoutes