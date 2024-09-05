import { RouteObject } from 'react-router-dom';

import CreateListingView from '../views/listing/create-listing.view.tsx';

const listingRoutes: RouteObject[] = [
  {
    path: '/listing/new',
    element: <CreateListingView />,
  },
];
export default listingRoutes;