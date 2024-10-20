import { Listing } from '../../../types/listing/listing.type.ts';
import { Link } from 'react-router-dom';
import ListingImageCarousel from './listing-image-carousel.component.tsx';

export function ListingCard({ listing }: { listing: Listing }) {
  const { id, title, costing, images } = listing;

  return (
    <Link to={`/hosting/listing/${id}`}>
      <div className={' flex flex-col gap-4 py-4 rounded-xl'}>

        {/*image carousel*/}
        <ListingImageCarousel listingImages={images} />

        <div className="flex flex-col gap-1">
          <h6 className={'font-bold text-lg'}>{title}</h6>

          <p>${costing} / day</p>
        </div>

      </div>
    </Link>

  );
}