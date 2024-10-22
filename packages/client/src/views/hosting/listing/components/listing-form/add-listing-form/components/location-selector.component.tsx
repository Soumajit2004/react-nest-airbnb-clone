import { Autocomplete, GoogleMap, MarkerF, useJsApiLoader } from '@react-google-maps/api';
import React, { useRef } from 'react';
import { AutoCompleteType, LatLngLiteral, MapType } from '../../../../../../../types/location.type.ts';
import DashedBox from '../../../../../../../components/common/dashed-box.component.tsx';

type LocationSelectorInputProps = {
  location: LatLngLiteral | null;
  setLocation: React.Dispatch<React.SetStateAction<LatLngLiteral | null>>;
}

const includedLibs = ['places'];

export default function LocationSelectorInput({ location, setLocation }: LocationSelectorInputProps) {

  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    libraries: includedLibs,
  });

  const mapRef = useRef<MapType>();
  const searchInputRef = useRef<AutoCompleteType>();

  const handelPlacesChanged = () => {
    const searchLocation = searchInputRef.current?.getPlace();

    setLocation({
      lat: searchLocation?.geometry?.location?.lat() || 0,
      lng: searchLocation?.geometry?.location?.lng() || 0,
    });
  };

  if (!isLoaded) {
    return (
      <div className="skeleton h-32 w-full"/>
    );
  }

  return (
    <DashedBox>
      <h4 className={'font-bold text-xl'}>Location</h4>

      <Autocomplete
        onLoad={(element) => {
          searchInputRef.current = element;
        }}
        onPlaceChanged={handelPlacesChanged}>
        <input type="text" placeholder="Search location here" className="input input-bordered w-full" />
      </Autocomplete>

      {
        location && (
          <GoogleMap center={location} zoom={17}
                     mapContainerClassName={'width-full h-80 rounded-lg'}
                     options={{ streetViewControl: false, mapTypeControl: false, clickableIcons: false }}
                     onLoad={(map) => {
                       mapRef.current = map;
                     }}
                     onClick={(mapsClickEvent) => {
                       setLocation({
                         lat: mapsClickEvent.latLng?.lat() || 0,
                         lng: mapsClickEvent.latLng?.lng() || 0,
                       });
                       mapRef.current?.panTo(location);
                     }}>


            <MarkerF position={location} onDrag={(event) => {
              console.log(event);
              setLocation({
                lat: event.latLng?.lat() || 0,
                lng: event.latLng?.lng() || 0,
              });
            }} />
          </GoogleMap>
        )
      }
    </DashedBox>


  );
}