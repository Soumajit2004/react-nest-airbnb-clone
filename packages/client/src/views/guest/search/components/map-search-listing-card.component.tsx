import { Listing } from '../../../../types/listing/listing.type.ts';
import placeHolderSVG from '../../../../assets/images/placeholder.svg';

function MapSearchListingCard({ listing }: {
  listing: Listing
}) {
  return (
    <div className={'w-28 no-scrollbar flex flex-col gap-2'}>
      {
        (listing.images.length <= 0) ? (
          <img src={placeHolderSVG} alt={'placeholder'}
               className={'aspect-square w-full rounded-xl'} />
        ) : (
          <img src={listing.images[0].publicUrl} alt={'placeholder'}
               className={'aspect-square w-full rounded-xl'} />
        )
      }

      <div>
        <p className={'text-lg font-bold'}>{listing.title}</p>
        <p>{listing.description}</p>
      </div>
    </div>
  )
    ;
}

export default MapSearchListingCard;