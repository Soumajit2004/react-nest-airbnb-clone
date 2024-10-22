import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import DatePicker from 'react-datepicker';
import { Autocomplete, useJsApiLoader } from '@react-google-maps/api';
import { useRef } from 'react';
import { AutoCompleteType, PlacesResult } from '../../../../../types/location.type.ts';
import { useNavigate } from 'react-router-dom';

const includedLibs = ['places'];

type SearchInputs = {
  location: PlacesResult,
  checkIn: Date,
  checkOut: Date,
};

export default function RootNavbarSearch() {

  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    libraries: includedLibs,
  });
  const { control, handleSubmit } = useForm<SearchInputs>();
  const navigate = useNavigate();

  const locationSearchRef = useRef<AutoCompleteType>();

  /**
   * Handles form submission.
   * @param data - The form data containing location, check-in, and check-out dates.
   */
  const onSubmit: SubmitHandler<SearchInputs> = (data) => {
    const { checkIn, checkOut, location } = data;

    const coordinates = location.geometry?.location;

    navigate(`/search?lat=${coordinates?.lat()}&lng=${coordinates?.lng()}&checkIn=${checkIn.toISOString()}&checkOut=${checkOut.toISOString()}`);
  };

  if (!isLoaded) {
    return (
      <div className="skeleton h-32 w-full" />
    );
  }

  return (
    <form className={'flex'} onSubmit={handleSubmit(onSubmit)}>

      <Controller
        control={control}
        name="location"
        render={({ field }) => (
          <Autocomplete
            onLoad={(autocomplete) => {
              locationSearchRef.current = autocomplete;
            }}
            onPlaceChanged={() => {
              field.onChange(locationSearchRef.current?.getPlace());
            }}
          >
            <input className="input  input-bordered w-56 rounded-l-full input-md bg-white rounded-r-none"
                   placeholder={'Search Destinations'}
                   type="text" />
          </Autocomplete>)} />

      <Controller
        control={control}
        name="checkIn"
        render={({ field }) => (
          <DatePicker
            className="input input-bordered w-28 input-md bg-white rounded-none border-x-0"
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