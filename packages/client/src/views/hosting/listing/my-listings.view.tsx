import { ListingCard } from '../../../components/hosting/listing/listing-card.component.tsx';
import { Listing } from '../../../types/listing/listing.type.ts';
import { useFetchMyListings } from '../../../hooks/apiHooks/hosting/listing/fetchListingHooks.ts';
import { Link } from 'react-router-dom';

export default function MyListingsView() {

  const { isFetched, data } = useFetchMyListings();

  const fetchedListings = data?.data as Listing[];

  return isFetched && (
    <div className={'mt-4'}>
      <h3 className={'text-3xl font-bold mb-10'}>Your listings</h3>

      {fetchedListings.length === 0 && (
        <div
          className={'bg-base-200 text-gray-500 font-bold h-96 rounded-xl flex flex-col gap-10 items-center justify-center'}>
          You have not created any listings yet. Click the button below to create your first listing.
          <Link className={'btn btn-outline btn-ghost'} to={'/hosting/become-a-host'}>Create New Listing</Link>
        </div>
      )}

      <div className={'grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4'}>
        {fetchedListings.map((listing) => (
          <ListingCard listing={listing} to={`/hosting/listing/${listing.id}`} />
        ))}
      </div>
    </div>
  );

}