import { Link } from 'react-router-dom';

export default function DashboardView() {
  return (
    <Link to={'/listing/new'}> New Listing</Link>
  );
}