import { Link, useParams } from 'react-router-dom';
import useFetchBookingByID from '../../../hooks/api/booking/useFetchBooking.hook.ts';
import { Booking } from '../../../types/booking/booking.type.ts';
import ListingImageCarousel from '../../../components/hosting/listing/listing-image-carousel.component.tsx';

function BookingDetailsCard({ booking }: { booking: Booking }) {
  return (
    <div className={'w-full gap-4 grid grid-cols-4'}>
      <div className="col-span-4">
        <h1 className={'font-bold text-xl'}>Booking Details</h1>

      </div>

      <div className={'col-span-2 h-56 border-2 rounded-xl border-base-300 p-4'}>
        <h3 className={'font-bold text-lg'}>Cost Breakdown</h3>
        <p>${booking.listing.costing}</p>
      </div>

      <div className={'h-56 border-2 rounded-xl border-base-300 p-4'}>
        <h3 className={'font-bold text-lg'}>Check In</h3>
        <p className={'text-gray-500'}>{new Date(booking.checkInDate).toDateString()}</p>
      </div>

      <div className={'h-56 border-2 rounded-xl border-base-300 p-4'}>
        <h3 className={'font-bold text-lg'}>Check Out</h3>
        <p className={'text-gray-500'}>{new Date(booking.checkOutDate).toDateString()}</p>
      </div>

      <div />
    </div>
  );
}

function BookingDetailsView() {

  const { bookingId } = useParams();

  const { data, isFetched } = useFetchBookingByID(bookingId!);
  const booking: Booking = data?.data;

  if (!isFetched) {
    return <div>Loading...</div>;
  }

  return isFetched && (
    <div className={'grid grid-cols-4 gap-4 my-4'}>
      <div className={'flex flex-col gap-4'}>
        <ListingImageCarousel listingImages={booking.listing.images} />
        <div>
          <h3 className="font-bold text-xl">{booking.listing.title}</h3>
          <p className="text-gray-500 mt-2">{booking.listing.description}</p>
        </div>

        <Link className={'btn w-full btn-ghost btn-outline'} to={`/listing/${booking.listing.id}`}>
          View Listing
        </Link>
      </div>

      <div className="col-span-3 flex flex-col gap-4">
        <BookingDetailsCard booking={booking} />

        <div className="flex flex-col gap-4">
          <h3 className="text-xl font-bold">Need help with this booking?</h3>

          <ul className={"list-disc ml-6"}>
            <li>
              <button className="link text-gray-500">Cancel booking</button>
            </li>
          </ul>

        </div>
      </div>
    </div>
  );
}

export default BookingDetailsView;