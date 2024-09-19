import { RouteObject } from 'react-router-dom';
import CreateListingView from '../../views/listing/create-listing.view.tsx';
import ViewListingView from '../../views/listing/view-listing.view.tsx';
import { listingApi } from '../../api/listing.api.ts';

export const hostingRoutes: RouteObject[] = [
  {
    path: 'become-a-host',
    element: <CreateListingView />,
  },
  {
    path: 'listings',
    element: <ViewListingView />,
    loader: async () => {
      return (await listingApi.fetchAll()).data;
    },
  },
];