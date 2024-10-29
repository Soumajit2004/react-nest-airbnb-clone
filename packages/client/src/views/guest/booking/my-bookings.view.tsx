import useFetchMyBookings from '../../../hooks/api/booking/useFetchMyBookings.hook.ts';
import { Booking } from '../../../types/booking/booking.type.ts';
import MyBookingCard from '../../../types/booking/componenets/my-booking-card.component.tsx';

function MyBookingsView() {

  const { data, isFetched } = useFetchMyBookings();

  const bookings: Booking[] = data?.data;

  return isFetched && (
    <div className={'flex flex-col gap-4'}>
      <h1 className={'text-2xl font-bold mb-4 mt-4'}>My Bookings</h1>

      <div className="flex flex-col gap-4">
        <>
          {
            bookings.map((booking) => (
              <MyBookingCard key={booking.id} booking={booking} />
            ))
          }
        </>
      </div>
    </div>
  );
}

export default MyBookingsView;