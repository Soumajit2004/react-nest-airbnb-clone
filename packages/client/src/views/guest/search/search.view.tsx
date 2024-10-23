import { useLoaderData, useSearchParams } from 'react-router-dom';
import { Listing } from '../../../types/listing/listing.type.ts';
import MapSearch from './components/map-search.component.tsx';
import { APIProvider } from '@vis.gl/react-google-maps';

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

  return (
    <APIProvider apiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY}>
      <div className={'grid grid-cols-2'}>
        <div>{`${listings.length} places found`}</div>

        <MapSearch centerCoordinates={{ lat, lng }} filteredListing={listings} />

      </div>
    </APIProvider>
  );
}