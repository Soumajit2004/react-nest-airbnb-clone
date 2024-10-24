import { useLoaderData, useSearchParams } from 'react-router-dom';
import { Listing } from '../../../types/listing/listing.type.ts';
import MapSearch from './components/map-search.component.tsx';
import { APIProvider } from '@vis.gl/react-google-maps';
import ListingSearchResultsComponent from './components/listing-search-results.component.tsx';

export default function SearchView() {

  const listingResults = useLoaderData();
  const [searchParams] = useSearchParams();

  const lat = parseFloat(searchParams.get('lat')!);
  const lng = parseFloat(searchParams.get('lng')!);
  // const lat = searchParams.get('lat');
  // const lat = searchParams.get('lat');

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-expect-error
  const listings = listingResults?.data as Listing[];

  if (listings.length <= 0) {
    return (
      <div className={'bg-base-200 h-56 flex rounded-xl justify-center items-center'}>
        <h1 className={'text-gray-500 font-bold text-xl'}>No listings found</h1>
      </div>
    );
  }

  return (
    <APIProvider apiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY}>
      <div className={'grid grid-cols-2 gap-4 mt-2'}>
        <ListingSearchResultsComponent filteredListings={listings} />

        <MapSearch centerCoordinates={{ lat, lng }} filteredListing={listings} />
      </div>
    </APIProvider>
  );
}