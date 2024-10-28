import { Listing } from '../../../../types/listing/listing.type.ts';
import { ListingCard } from '../../../../components/hosting/listing/listing-card.component.tsx';
import useBookingSearchParams from '../../../../hooks/search-params/useBookingSearchParams.hook.ts';

function ListingSearchResultsComponent({ filteredListings }: { filteredListings: Listing[] }) {

  const { checkInDate, checkOutDate } = useBookingSearchParams();

  return (
    <div className={''}>
      <div className="mb-4">
        <p className={'font-semibold text-lg'}>{filteredListings.length} places found</p>
      </div>

      <div className="grid grid-cols-2 gap-4 overflow-y-scroll max-h-[76vh] no-scrollbar rounded-xl">
        <>
          {filteredListings.map((listing) => (
            <ListingCard key={listing.id} listing={listing} openLinkInNewTab
                         to={`/listing/${listing.id}?checkIn=${checkInDate?.toISOString()}&checkOut=${checkOutDate?.toISOString()}`} />
          ))}
        </>
      </div>
    </div>

  );
}


export default ListingSearchResultsComponent;
