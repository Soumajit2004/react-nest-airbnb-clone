import { useLoaderData } from 'react-router-dom';
import { Listing } from '../../../types/listing/listing.type.ts';
import ListingImageCarousel from '../../../components/hosting/listing/listing-image-carousel.component.tsx';
import sadFaceSVG from '../../../assets/images/sad-circle.svg';

export default function ListingView() {

  const fetchedListing = useLoaderData() as Listing;

  return (
    <div className="grid w-full grid-cols-3 gap-4">

      <div className={'flex flex-col gap-6'}>
        <ListingImageCarousel listingImages={fetchedListing.images} />

        <div>
          <h3 className={'text-xl font-bold'}>
            {fetchedListing.title}
          </h3>
          <p className={'text-base-300 '}>{fetchedListing.description}</p>
        </div>
      </div>

      <div className={'col-span-2'}>
        <div className={'bg-base-200 w-full rounded-xl p-4'}>
          <h3 className={'text-xl font-bold mb-4'}>Reservations</h3>

          <div
            className={'border-4 border-dashed border-base-300 py-12 flex items-center justify-center text-gray-500 font-bold gap-4 rounded-xl'}>
            <img src={sadFaceSVG} alt={'sad-face'} className={"aspect-square h-20"}/>
            <p>No reservations found</p>
          </div>
        </div>
      </div>
    </div>);
}