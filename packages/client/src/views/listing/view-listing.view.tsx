import { useLoaderData } from 'react-router-dom';
import { Listing } from '../../types/listing/listing.type.ts';
import { ListingCard } from '../../components/listing/listing-card.component.tsx';

export default function ViewListingView() {

  const listings = useLoaderData() as Listing[];

  return (
    <>
      <h3 className={'text-3xl font-bold my-5'}>Listings</h3>

      <div className={'grid grid-cols-3 gap-4'}>
        {listings.map((listing) => (
          <ListingCard listing={listing} />
        ))}
      </div>
    </>
  );

}