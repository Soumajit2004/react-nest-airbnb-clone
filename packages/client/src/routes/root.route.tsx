import { createBrowserRouter } from 'react-router-dom';
import authRoute from './auth.route.tsx';
import RequireAuthComponent from '../components/common/auth/RequireAuth.component.tsx';
import AuthLayout from '../layout/auth.layout.tsx';
import RootLayout from '../layout/root.layout.tsx';
import DashboardView from '../views/guest/dashboard.view.tsx';
import PersistenceLogin from '../components/common/auth/PersistenceLogin.component.tsx';
import { hostingRoutes } from './children/hosting.route.tsx';
import HostingRootLayout from '../layout/hosting.layout.tsx';
import SearchView from '../views/guest/search/search.view.tsx';
import { listingApi } from '../api/hosting/listing.api.ts';


const router = createBrowserRouter([
  {
    path: '/auth',
    element: <AuthLayout />,
    children: authRoute,
  },
  {
    element: <PersistenceLogin />,
    children: [
      {
        element: <RequireAuthComponent />,
        children: [
          {
            element: <RootLayout />,
            children: [
              {
                path: '/',
                index: true,
                element: <DashboardView />,
              },
              {
                path: '/search',
                element: <SearchView />,
                loader: async ({ request }) => {
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

                },
              },
            ],
          },
          {
            path: 'hosting',
            element: <HostingRootLayout />,
            children: hostingRoutes,
          },

        ],
      },
    ],
  },

]);

export default router;