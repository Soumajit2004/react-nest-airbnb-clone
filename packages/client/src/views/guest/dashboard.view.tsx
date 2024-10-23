import { Link } from 'react-router-dom';

export default function DashboardView() {
  return (
    <>
      <Link to={'/hosting/become-a-host'}> New Listing</Link>
      <Link to={'/hosting/listings'}>My Listing</Link>;
    </>
  );
}