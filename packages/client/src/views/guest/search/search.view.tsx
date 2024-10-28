import { Listing } from '../../../types/listing/listing.type.ts';
import MapSearch from './components/map-search.component.tsx';
import { APIProvider } from '@vis.gl/react-google-maps';
import ListingSearchResultsComponent from './components/listing-search-results.component.tsx';
import { useFetchSearchListings } from '../../../hooks/api/hosting/listing/fetchListingHooks.ts';
import useSearchLocationParam from '../../../hooks/search-params/useSearchLocationParams.hook.ts';
import { useEffect } from 'react';
import useBookingSearchParams from '../../../hooks/search-params/useBookingSearchParams.hook.ts';

export default function SearchView() {

  const { lat, lng } = useSearchLocationParam();
  const { checkInDate, checkOutDate } = useBookingSearchParams();

  useEffect(() => {
    if (!lat || !lng) {
      throw Error('Missing lat or lng');
    }

    if (!checkInDate || !checkOutDate) {
      throw Error('Missing check in or check out date');
    }
  }, [lat, lng, checkInDate, checkOutDate]);

  const { isFetched, isError, data } = useFetchSearchListings({
    lat: lat!,
    lng: lng!,
    searchRadius: 10,
  });
  const listings = data?.data as Listing[];

  if (isError) {
    throw Error('Failed to search listings');
  }

  if (isFetched && listings.length <= 0) {
    return (
      <div className={'bg-base-200 h-80 flex rounded-xl justify-center items-center'}>
        <h3 className={'text-gray-500 font-bold text-lg'}>No listings found</h3>
      </div>
    );
  }

  return (
    isFetched && (
      <APIProvider apiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY}>
        <div className={'grid grid-cols-2 gap-4 mt-2'}>
          <ListingSearchResultsComponent filteredListings={listings} />

          <MapSearch centerCoordinates={{ lat: lat!, lng: lng! }} filteredListing={listings} />
        </div>
      </APIProvider>
    )
  );
}