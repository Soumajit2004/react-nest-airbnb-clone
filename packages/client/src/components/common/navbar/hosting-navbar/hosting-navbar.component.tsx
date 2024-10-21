import HamburgerUserAvatarBtn from '../root-navbar/hamburger-user-avatar-btn.component.tsx';
import { Link } from 'react-router-dom';
import NavbarLogo from '../navbar-logo.component.tsx';

export default function HostingNavbar() {

  return (
    <>
      <nav className="navbar container mx-auto my-2">
        <div className="navbar-start">
          <NavbarLogo/>
        </div>

        <div className="navbar-center">
          <ul className="menu menu-horizontal px-1 text-md font-semibold gap-2 text-gray-500">
            <li><Link to={'/hosting'}>Reservations</Link></li>
            <li><Link to={'/hosting/listings'}>Listings</Link></li>
            <li>
              <details>
                <summary>Menu</summary>
                <ul className="p-1.5 m-1 w-48 border-2">
                  <li><Link to={'/hosting/earnings'}>Earnings</Link></li>
                  <li><Link to={'/hosting/become-a-host'}>Create New Listing</Link></li>
                </ul>
              </details>
            </li>
          </ul>
        </div>

        <div className="navbar-end">
          <HamburgerUserAvatarBtn />
        </div>
      </nav>
      <div className="divider my-0" />
    </>
  );
}