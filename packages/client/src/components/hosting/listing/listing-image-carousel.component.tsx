import placeHolderSVG from '../../../assets/images/placeholder.svg';
import { ListingImage } from '../../../types/listing/listing-image.type.ts';

export default function ListingImageCarousel({ listingImages }: { listingImages: ListingImage[] }) {
  return (
    <div className="carousel rounded-box w-full aspect-square">
      {
        listingImages.length > 0 ?
          (
            listingImages.map((image, index) => (
              <div key={image.id} className="carousel-item w-full">
                <img
                  key={index}
                  src={image.publicUrl}
                  className="w-full object-cover"
                  alt={`image-${index}`} />
              </div>
            ))
          ) :
          (
            <img src={placeHolderSVG} alt={'placeholder'}
                 className={'aspect-square rounded-xl'} />
          )
      }

    </div>

  );
}