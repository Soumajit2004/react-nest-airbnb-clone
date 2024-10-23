import { Listing } from '../../../../types/listing/listing.type.ts';
import placeHolderSVG from '../../../../assets/images/placeholder.svg';

function MapSearchListingCard({ listing }: {
  listing: Listing,
}) {
  return (
    <div className={'w-64 no-scrollbar flex flex-col gap-2'}>
      {
        (listing.images.length <= 0) ? (
          <img src={placeHolderSVG} alt={'placeholder'}
               className={'aspect-video object-cover w-full rounded-lg'} />
        ) : (
          <img src={listing.images[0].publicUrl} alt={'placeholder'}
               className={'aspect-video w-full rounded-lg'} />
        )
      }

      <div>
        <p className={'text-lg font-bold'}>{listing.title}</p>
        <p>{listing.description}</p>
      </div>

      <button
        className={'btn btn-primary text-primary-content btn-outline btn-sm rounded-full w-full'}>
        View
      </button>
    </div>
  )
    ;
}

export default MapSearchListingCard;