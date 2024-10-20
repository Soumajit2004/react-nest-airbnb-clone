import { Listing } from '../../types/listing/listing.type.ts';
import placeHolderSVG from '../../assets/images/placeholder.svg';
import { Link } from 'react-router-dom';

export function ListingCard({ listing }: { listing: Listing }) {
  const { id, title, costing, images } = listing;

  return (
    <Link to={`/hosting/listing/${id}`}>
      <div className={' flex flex-col gap-4 py-4 rounded-xl'}>

        {/*image carousel*/}
        <div className="carousel rounded-box w-full aspect-square">
          {
            images.length > 0 ?
              (
                images.map((image, index) => (
                  <div className="carousel-item w-full">
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


        <div className="flex flex-col gap-1">
          <h6 className={'font-bold text-lg'}>{title}</h6>

          <p>${costing} / day</p>
        </div>

      </div>
    </Link>

  );
}