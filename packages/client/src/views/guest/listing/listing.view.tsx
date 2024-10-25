import { useParams } from 'react-router-dom';
import { useFetchListingByID } from '../../../hooks/apiHooks/hosting/listing/fetchListingHooks.ts';
import { Listing } from '../../../types/listing/listing.type.ts';
import { ListingImage } from '../../../types/listing/listing-image.type.ts';
import placeHolderImage from '../../../assets/images/placeholder.svg';
import classNames from 'classnames';

const ListingBentoGrid = ({ listingImages }: { listingImages: ListingImage[] }) => {

  const FallBackSafeImage = ({ listingImage, className }: {
    listingImage: ListingImage | null;
    className: string;
  }) => {
    if (listingImage) {
      return (
        <img src={listingImage.publicUrl} className={classNames(className, 'w-full h-full animate-fade-in')}
             alt={listingImage.label} />
      );
    }

    return (
      <img src={placeHolderImage} className={classNames(className, ' w-full h-full animate-fade-in')}
           alt={'placeholder-image'} />
    );
  };

  return (
    <div className="grid h-96 grid-cols-4 gap-2 grid-rows-2">
      <FallBackSafeImage listingImage={listingImages[0]}
                         className={'col-span-2 row-span-2 object-cover rounded-l-xl'} />
      <FallBackSafeImage listingImage={listingImages[1]}
                         className={'col-span-1 row-span-1 object-cover'} />
      <FallBackSafeImage listingImage={listingImages[2]}
                         className={'col-span-1 row-span-1 object-cover rounded-tr-xl'} />
      <FallBackSafeImage listingImage={listingImages[3]}
                         className={'col-span-1 row-span-1 object-cover'} />
      <FallBackSafeImage listingImage={listingImages[4]}
                         className={'col-span-1 row-span-1 object-cover rounded-br-xl'} />
    </div>);

};

function ListingView() {

  const { listingId } = useParams();
  const { data, isFetched } = useFetchListingByID(listingId as string);

  const fetchedListing = data?.data as Listing;

  return isFetched && (
    <div className={'grid grid-cols-5 gap-8 mt-4'}>
      <div className={'col-span-5 flex justify-between'}>
        <h2 className={'font-semibold text-3xl'}>{fetchedListing.title}</h2>
      </div>

      <div className={'col-span-5'}>
        <ListingBentoGrid listingImages={fetchedListing.images} />
      </div>

      <div className={'col-span-3'}>

        <div className={'flex flex-col gap-4'}>

          <div className="divider my-0" />

          <div id="description">
            <h3 className={'text-xl font-bold mb-2'}>About this place</h3>
            <p className={"text-gray-500"}>{fetchedListing.description}</p>
          </div>
        </div>


      </div>

    </div>
  );
}

export default ListingView;