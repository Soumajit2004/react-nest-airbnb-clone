import { LoaderFunction, RouteObject } from 'react-router-dom';
import DashboardView from '../views/guest/dashboard.view.tsx';
import SearchView from '../views/guest/search/search.view.tsx';
import { listingApi } from '../api/hosting/listing.api.ts';
import ListingView from '../views/guest/listing/listing.view.tsx';

const searchLoader: LoaderFunction = async ({ request }) => {
  const url = new URL(request.url);

  const lat = url.searchParams.get('lat');
  const lng = url.searchParams.get('lng');
  const checkIn = url.searchParams.get('checkIn');
  const checkOut = url.searchParams.get('checkOut');

  if (!lat || !lng || !checkIn || !checkOut) {
    throw new Error('Invalid search query');
  }

  return await listingApi.searchListings({
    lat: parseFloat(lat),
    lng: parseFloat(lng),
    searchRadius: 10,
    checkIn, checkOut,
  });

};

export const guestRoutes: RouteObject[] = [
  {
    path: '/',
    index: true,
    element: <DashboardView />,
  },
  {
    path: '/search',
    element: <SearchView />,
    loader: searchLoader,
  },
  {
    path: 'listing/:listingId',
    element: <ListingView />,
  },
];