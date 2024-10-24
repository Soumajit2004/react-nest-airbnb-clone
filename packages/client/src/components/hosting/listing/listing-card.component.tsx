import { Listing } from '../../../types/listing/listing.type.ts';
import { Link } from 'react-router-dom';
import ListingImageCarousel from './listing-image-carousel.component.tsx';

type ListingCardProps = { listing: Listing, to: string, openLinkInNewTab?: boolean }

export function ListingCard({ listing, to, openLinkInNewTab = false }: ListingCardProps) {
  const { title, costing, images } = listing;

  return (
    <Link to={to} target={openLinkInNewTab ? '_blank' : undefined}>
      <div className={'flex flex-col gap-2 rounded-xl'}>

        {/*image carousel*/}
        <ListingImageCarousel listingImages={images} />

        <div className="flex flex-col gap-0.5">
          <h6 className={'font-semibold text-lg'}>{title}</h6>
          <p className={'text-sm text-gray-500'}>${costing} per night</p>
        </div>

      </div>
    </Link>

  );
}