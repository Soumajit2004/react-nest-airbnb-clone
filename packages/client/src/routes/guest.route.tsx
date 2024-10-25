import { RouteObject } from 'react-router-dom';
import DashboardView from '../views/guest/dashboard.view.tsx';
import SearchView from '../views/guest/search/search.view.tsx';
import ListingView from '../views/guest/listing/listing.view.tsx';


export const guestRoutes: RouteObject[] = [
  {
    path: '/',
    element: <DashboardView />,
  },
  {
    path: '/search',
    element: <SearchView />,
  },
  {
    path: 'listing/:listingId',
    element: <ListingView />,
  },
];