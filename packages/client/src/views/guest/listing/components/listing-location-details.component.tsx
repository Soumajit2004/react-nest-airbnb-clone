import { ListingLocation } from '../../../../types/listing/listing-location.type.ts';
import useReverseGeoEncoding from '../../../../hooks/external-api-hooks/google-maps/useReverseGeoEncoding.ts';
import { useEffect } from 'react';

const ListingLocationDetails = ({ listingLocation }: { listingLocation: ListingLocation }) => {

  const { data, isFetched } = useReverseGeoEncoding(listingLocation);

  useEffect(() => {
    console.log(data);
  }, [isFetched]);

  return isFetched && (
    <h3 className={'text-xl font-semibold mb-2'}>Stay in {data['results'][0]['formatted_address']}</h3>
  );

};

export default ListingLocationDetails;