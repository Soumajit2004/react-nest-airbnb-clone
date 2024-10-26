import { Listing } from '../../../../types/listing/listing.type.ts';
import { ListingCard } from '../../../../components/hosting/listing/listing-card.component.tsx';
import { useSearchParams } from 'react-router-dom';

function ListingSearchResultsComponent({ filteredListings }: { filteredListings: Listing[] }) {

  const [searchParams] = useSearchParams();

  const checkIn = searchParams.get('checkIn');
  const checkOut = searchParams.get('checkOut');

  return (
    <div className={''}>
      <div className="mb-4">
        <p className={'font-semibold text-lg'}>{filteredListings.length} places found</p>
      </div>

      <div className="grid grid-cols-2 gap-4 overflow-y-scroll max-h-[76vh] no-scrollbar rounded-xl">
        <>
          {filteredListings.map((listing) => (
            <ListingCard key={listing.id} listing={listing} openLinkInNewTab
                         to={`/listing/${listing.id}?checkIn=${checkIn}&checkOut=${checkOut}`} />
          ))}
        </>
      </div>
    </div>

  );
}


export default ListingSearchResultsComponent;
