import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import DatePicker from 'react-datepicker';
import { useLocation, useNavigate } from 'react-router-dom';
import ReactGoogleAutocomplete from 'react-google-autocomplete';
import useBookingSearchParams from '../../../../../hooks/search-params/useBookingSearchParams.hook.ts';

type SearchInputs = {
  location: google.maps.places.PlaceResult,
  checkIn: Date,
  checkOut: Date,
};

export default function RootNavbarSearch() {

  const { checkInDate, checkOutDate } = useBookingSearchParams();

  const navigate = useNavigate();
  const routeLocation = useLocation();

  const { control, handleSubmit, watch } = useForm<SearchInputs>({
    defaultValues: {
      location: undefined,
      checkIn: checkInDate ? new Date(checkInDate) : undefined,
      checkOut: checkOutDate ? new Date(checkOutDate) : undefined,
    },
  });

  /**
   * Handles form submission.
   * @param data - The form data containing location, check-in, and check-out dates.
   */
  const onSubmit: SubmitHandler<SearchInputs> = (data) => {
    const { checkIn, checkOut, location } = data;

    const coordinates = location.geometry?.location;

    navigate(`/search?lat=${coordinates?.lat()}&lng=${coordinates?.lng()}&checkIn=${checkIn.toISOString()}&checkOut=${checkOut.toISOString()}`);

    if (routeLocation.pathname == '/search') {
      window.location.reload();
    }
  };

  return (
    <form className={'flex drop-shadow hover:drop-shadow-xl'} onSubmit={handleSubmit(onSubmit)}>

      <Controller
        control={control}
        name="location"
        render={({ field }) => (
          <ReactGoogleAutocomplete
            apiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY}
            className="input  input-bordered w-56 rounded-l-full input-md bg-white rounded-r-none"
            placeholder={'Search Destinations'}
            options={{ types: ['locality', 'sublocality', 'landmark', 'street_address'] }}
            onPlaceSelected={(place) => {
              field.onChange(place);
            }}
          />
        )} />

      <Controller
        control={control}
        name="checkIn"
        render={({ field }) => (
          <DatePicker
            portalId={'checkInDatePicker'}
            dateFormat={'dd/MM/yyyy'}
            className="input input-bordered w-28 input-md bg-white rounded-none border-x-0"
            popperClassName={'z-50'}
            placeholderText={'Check In'}
            selected={field.value}
            onChange={(date) => field.onChange(date)}
            selectsStart
            startDate={watch('checkIn')}
            endDate={watch('checkOut')}
          />)}
      />

      <Controller
        control={control}
        name="checkOut"
        render={({ field }) => (
          <DatePicker
            portalId={'checkOutDatePicker'}
            dateFormat={'dd/MM/yyyy'}
            className="input input-bordered w-28 input-md bg-white rounded-none"
            calendarClassName={'z-50'}
            popperClassName={'calender-popout'}
            placeholderText={'Check Out'}
            selected={field.value}
            onChange={(date) => field.onChange(date)}
            selectsEnd
            startDate={watch('checkIn')}
            endDate={watch('checkOut')}
            minDate={watch('checkIn')}
          />)}
      />

      <button className={'btn btn-primary rounded-l-none rounded-r-full'} type={'submit'}><span
        className={'material-symbols-rounded'}>search</span>
      </button>
    </form>
  );
}