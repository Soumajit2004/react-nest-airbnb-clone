import { AdvancedMarker, Map, Pin, Marker } from '@vis.gl/react-google-maps';
import { Listing } from '../../../../types/listing/listing.type.ts';
import { LatLngLiteral } from '../../../../types/location.type.ts';


export default function MapSearch({ centerCoordinates, filteredListing }: {
  centerCoordinates: LatLngLiteral,
  filteredListing: Listing[]
}) {

  return (
    <Map
      className={'rounded-lg h-[83vh]'}
      defaultCenter={centerCoordinates}
      defaultZoom={15}
    >
      <>
        {
          filteredListing.map((listing: Listing) => {

            return (
              <Marker
                position={{
                  lat: parseFloat(String(listing.location.lat)),
                  lng: parseFloat(String(listing.location.lng)),
                }}>
              </Marker>
            );
          })
        }
      </>
    </Map>
  );
}