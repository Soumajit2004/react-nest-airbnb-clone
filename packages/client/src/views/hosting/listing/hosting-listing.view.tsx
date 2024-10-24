import { Link, useParams } from 'react-router-dom';
import ListingImageCarousel from '../../../components/hosting/listing/listing-image-carousel.component.tsx';
import ReservationCardComponent from './components/reservation-card.component.tsx';
import { useFetchListingByID } from '../../../hooks/api/hosting/listing.api.ts';

function HostingListingView() {

  const { listingId } = useParams();
  const { isFetched, data } = useFetchListingByID(listingId as string);

  const fetchedListing = data?.data;

  return isFetched && (
    <div className="grid w-full grid-cols-3 gap-4">

      <div className={'flex flex-col gap-6'}>
        <ListingImageCarousel listingImages={fetchedListing.images} />

        <div className="flex justify-between">
          <div>
            <h3 className={'text-xl font-bold'}>
              {fetchedListing.title}
            </h3>
            <p className={'text-base-300 '}>{fetchedListing.description}</p>
          </div>

          <details className="dropdown dropdown-end">
            <summary className="btn btn-circle">
              <span className="material-symbols-rounded">more_vert</span>
            </summary>
            <ul className="menu dropdown-content bg-base-200 rounded-box z-[1] w-52 p-2 shadow mt-2">
              <li>
                <Link to={'edit'}>Edit Listing</Link>
              </li>
              <li>
                <button className="btn-danger">
                  Delete Listing
                </button>
              </li>
            </ul>
          </details>
        </div>

      </div>

      <div className={'flex flex-col gap-4 col-span-2'}>
        <ReservationCardComponent />
      </div>
    </div>);
}

export default HostingListingView;