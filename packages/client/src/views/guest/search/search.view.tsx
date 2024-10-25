import { useSearchParams } from 'react-router-dom';
import { Listing } from '../../../types/listing/listing.type.ts';
import MapSearch from './components/map-search.component.tsx';
import { APIProvider } from '@vis.gl/react-google-maps';
import ListingSearchResultsComponent from './components/listing-search-results.component.tsx';
import { useFetchSearchListings } from '../../../hooks/api/hosting/listing.api.ts';

export default function SearchView() {

  const [searchParams] = useSearchParams();

  const lat = parseFloat(String(searchParams.get('lat')));
  const lng = parseFloat(String(searchParams.get('lng')));
  const checkIn = searchParams.get('checkIn') || new Date().toISOString();
  const checkOut = searchParams.get('checkOut') || new Date().toISOString();

  const { isFetched, data } = useFetchSearchListings({ lat, lng, checkIn, checkOut, searchRadius: 10 });
  const listings = data?.data as Listing[];

  if (isFetched && listings.length <= 0) {
    return (
      <div className={'bg-base-200 h-56 flex rounded-xl justify-center items-center'}>
        <h1 className={'text-gray-500 font-bold text-xl'}>No listings found</h1> const listingResults = useLoaderData();
      </div>
    );
  }

  return (
    isFetched && (
      <APIProvider apiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY}>
        <div className={'grid grid-cols-2 gap-4 mt-2'}>
          <ListingSearchResultsComponent filteredListings={listings} />

          <MapSearch centerCoordinates={{ lat, lng }} filteredListing={listings} />
        </div>
      </APIProvider>
    )
  );
}