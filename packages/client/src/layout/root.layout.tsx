import {Outlet} from "react-router-dom";
import RootNavbar from "../components/common/root-navbar/root-navbar.component.tsx";

export default function RootLayout() {

  return (
    <main>
      <RootNavbar/>

      <Outlet/>
    </main>
  )
}