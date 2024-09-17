import { RouteObject } from 'react-router-dom';
import CreateListingView from '../../views/listing/create-listing.view.tsx';

export const hostingRoutes: RouteObject[] = [
  {
    path: 'become-a-host',
    element: <CreateListingView />,
  },
];