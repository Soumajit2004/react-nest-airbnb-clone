import { useMutation } from '@tanstack/react-query';
import useAxiosPrivate from '../../../auth/useAxiosPrivate.ts';

const useDeleteListing = () => {
  const axiosPrivateInstance = useAxiosPrivate();

  const deleteListingFunction = async (listingId: string) => {
    return axiosPrivateInstance.delete(`listing/${listingId}`);
  };

  return useMutation({ mutationFn: deleteListingFunction });
};

export default useDeleteListing;