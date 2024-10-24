import React from 'react';
import { LatLngLiteral } from '../../../../../../../types/location.type.ts';
import ReactGoogleAutocomplete from 'react-google-autocomplete';
import { AdvancedMarker, APIProvider, Map } from '@vis.gl/react-google-maps';

type LocationSelectorInputProps = {
  location: LatLngLiteral | null;
  setLocation: React.Dispatch<React.SetStateAction<LatLngLiteral | null>>;
}

export default function LocationSelectorInput({ location, setLocation }: LocationSelectorInputProps) {

  return (
    <>
      <ReactGoogleAutocomplete
        apiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY}
        className={'input input-bordered'}
        onPlaceSelected={(place) => {
          if (place) {
            setLocation({
              lat: place.geometry?.location?.lat() || 0,
              lng: place.geometry?.location?.lng() || 0,
            });
          }
        }}
      />

      {
        location && (
          <APIProvider apiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY}>
            <Map mapId={import.meta.env.VITE_GOOGLE_MAP_MAP_ID} className={'h-48'} defaultCenter={location}
                 defaultZoom={15} minZoom={14} maxZoom={18}
            >
              <AdvancedMarker position={location} onDragStart={(event) => {
                console.log(event);
              }} />
            </Map>
          </APIProvider>
        )
      }

      {/*{*/
      }
      {/*  location && (*/
      }
      {/*    <GoogleMap center={location} zoom={17}*/
      }
      {/*               mapContainerClassName={'width-full h-80 rounded-lg'}*/
      }
      {/*               options={{ streetViewControl: false, mapTypeControl: false, clickableIcons: false }}*/
      }
      {/*               onLoad={(map) => {*/
      }
      {/*                 mapRef.current = map;*/
      }
      {/*               }}*/
      }
      {/*               onClick={(mapsClickEvent) => {*/
      }
      {/*                 setLocation({*/
      }
      {/*                   lat: mapsClickEvent.latLng?.lat() || 0,*/
      }
      {/*                   lng: mapsClickEvent.latLng?.lng() || 0,*/
      }
      {/*                 });*/
      }
      {/*                 mapRef.current?.panTo(location);*/
      }
      {/*               }}>*/
      }


      {/*      <MarkerF position={location} onDrag={(event) => {*/
      }
      {/*        setLocation({*/
      }
      {/*          lat: event.latLng?.lat() || 0,*/
      }
      {/*          lng: event.latLng?.lng() || 0,*/
      }
      {/*        });*/
      }
      {/*      }} />*/
      }
      {/*    </GoogleMap>*/
      }
      {/*  )*/
      }
      {/*}*/
      }

    </>
  )
    ;
}