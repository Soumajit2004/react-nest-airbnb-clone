import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import DatePicker from 'react-datepicker';
import { useNavigate } from 'react-router-dom';
import ReactGoogleAutocomplete from 'react-google-autocomplete';

type SearchInputs = {
  location: google.maps.places.PlaceResult,
  checkIn: Date,
  checkOut: Date,
};

export default function RootNavbarSearch() {

  const navigate = useNavigate();

  const { control, handleSubmit } = useForm<SearchInputs>();

  /**
   * Handles form submission.
   * @param data - The form data containing location, check-in, and check-out dates.
   */
  const onSubmit: SubmitHandler<SearchInputs> = (data) => {
    const { checkIn, checkOut, location } = data;

    const coordinates = location.geometry?.location;

    navigate(`/search?lat=${coordinates?.lat()}&lng=${coordinates?.lng()}&checkIn=${checkIn.toISOString()}&checkOut=${checkOut.toISOString()}`);
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
            className="input input-bordered w-28 input-md bg-white rounded-none border-x-0 z"
            placeholderText={'Check In'}
            selected={field.value}
            onChange={(date) => field.onChange(date)}
          />)}
      />

      <Controller
        control={control}
        name="checkOut"
        render={({ field }) => (
          <DatePicker
            className="input input-bordered w-28 input-md bg-white rounded-none"
            calendarClassName={'z-50'}
            placeholderText={'Check Out'}
            selected={field.value}
            onChange={(date) => field.onChange(date)}
          />)}
      />

      <button className={'btn btn-primary rounded-l-none rounded-r-full'} type={'submit'}><span
        className={'material-symbols-rounded'}>search</span>
      </button>
    </form>
  );
}