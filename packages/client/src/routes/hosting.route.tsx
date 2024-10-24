import { RouteObject } from 'react-router-dom';
import CreateListingView from '../views/hosting/listing/create-listing.view.tsx';
import AllListingsView from '../views/hosting/listing/all-listings.view.tsx';
import HostingListingView from '../views/hosting/listing/hostingListingView.tsx';

const hostingRoutes: RouteObject[] = [
  {
    path: 'become-a-host',
    element: <CreateListingView />,
  },
  {
    path: 'listings',
    element: <AllListingsView />,
  },
  {
    path: 'listing/:listingId',
    element: <HostingListingView />,
  },
];

export default hostingRoutes;