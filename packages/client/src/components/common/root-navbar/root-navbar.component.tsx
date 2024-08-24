import fullLogo from "../../../assets/logo/airbnb-full-logo.svg"
import RootNavbarSearch from "./root-navbar-search.component.tsx";

export default function RootNavbar() {
  return (
    <>
      <nav className="navbar container mx-auto my-2">
        <div className="navbar-start">
          <img src={fullLogo} alt={"airbnb-logo"} className={"w-28"}/>
        </div>

        <div className="navbar-center">
          <RootNavbarSearch/>
        </div>

        <div className="navbar-end">

        </div>
      </nav>
      <div className="divider my-0"/>
    </>
  )
}