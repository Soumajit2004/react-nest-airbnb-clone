import { useLoaderData } from 'react-router-dom';
import { Listing } from '../../../types/listing/listing.type.ts';
import { ListingCard } from '../../../components/hosting/listing/listing-card.component.tsx';

export default function AllListingsView() {

  const fetchedListings = useLoaderData() as Listing[];

  return (
    <>
      <h3 className={'text-3xl font-bold my-5'}>Listings</h3>

      <div className={'grid grid-cols-3 gap-4'}>
        {fetchedListings.map((listing) => (
          <ListingCard listing={listing} />
        ))}
      </div>
    </>
  );

}