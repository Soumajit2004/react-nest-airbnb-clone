import { Listing } from '../../../../types/listing/listing.type.ts';
import { ListingCard } from '../../../../components/hosting/listing/listing-card.component.tsx';

function ListingSearchResultsComponent({ filteredListings }: { filteredListings: Listing[] }) {
  return (
    <div className={''}>
      <div className="mb-4">
        <p className={'font-semibold text-lg'}>{filteredListings.length} found</p>
      </div>

      <div className="grid grid-cols-2 gap-4 overflow-y-scroll max-h-[76vh] no-scrollbar rounded-xl">
        <>
          {filteredListings.map((listing) => (
            <ListingCard listing={listing} openLinkInNewTab to={`/listing/${listing.id}`} />
          ))}
        </>
      </div>
    </div>

  );
}


export default ListingSearchResultsComponent;
