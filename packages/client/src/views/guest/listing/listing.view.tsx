import { useParams } from 'react-router-dom';
import { useFetchListingByID } from '../../../hooks/api-hooks/hosting/listing/fetchListingHooks.ts';
import { Listing } from '../../../types/listing/listing.type.ts';
import ListingBentoGrid from './components/listing-images-grid.component.tsx';
import ListingLocationDetails from './components/listing-location-details.component.tsx';


function ListingView() {

  const { listingId } = useParams();
  const { data, isFetched } = useFetchListingByID(listingId as string);

  const fetchedListing = data?.data as Listing;

  return isFetched && (
    <div className={'grid grid-cols-5 gap-8 mt-4'}>
      <div className={'col-span-5 flex justify-between'}>
        <h2 className={'font-semibold text-3xl'}>{fetchedListing.title}</h2>
      </div>

      <div className={'col-span-5'}>
        <ListingBentoGrid listingImages={fetchedListing.images} />
      </div>

      <div className={'col-span-3'}>

        <div className={'flex flex-col gap-4'}>
          <ListingLocationDetails listingLocation={fetchedListing.location} />

          <div className="divider my-0" />

          <div id="description">
            <h3 className={'text-xl font-bold mb-2'}>About this place</h3>
            <p className={'text-gray-500'}>{fetchedListing.description}</p>
          </div>
        </div>


      </div>

    </div>
  );
}

export default ListingView;