import { RouteObject } from 'react-router-dom';
import CreateListingView from '../../views/hosting/listing/create-listing.view.tsx';
import AllListingsView from '../../views/hosting/listing/all-listings.view.tsx';
import { listingApi } from '../../api/hosting/listing.api.ts';
import ListingView from '../../views/hosting/listing/listing.view.tsx';

export const hostingRoutes: RouteObject[] = [
  {
    path: 'become-a-host',
    element: <CreateListingView />,
  },
  {
    path: 'listings',
    element: <AllListingsView />,
    loader: async () => {
      return (await listingApi.fetchListings()).data;
    },
  },
  {
    path: 'listing/:listingId',
    element: <ListingView />,
    loader: async ({ params }) => {
      return (await listingApi.fetchListingByID(params.listingId || '')).data;
    },
  },
];