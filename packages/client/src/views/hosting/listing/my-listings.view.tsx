import { ListingCard } from '../../../components/hosting/listing/listing-card.component.tsx';
import { useFetchMyListings } from '../../../hooks/api/hosting/listing.api.ts';
import { Listing } from '../../../types/listing/listing.type.ts';

export default function MyListingsView() {

  const { isFetched, data } = useFetchMyListings();

  const fetchedListings = data?.data as Listing[];

  return isFetched && (
    <div className={'mt-4'}>
      <h3 className={'text-3xl font-bold mb-10'}>Your listings</h3>

      <div className={'grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4'}>
        {fetchedListings.map((listing) => (
          <ListingCard listing={listing} to={`/hosting/listing/${listing.id}`} />
        ))}
      </div>
    </div>
  );

}