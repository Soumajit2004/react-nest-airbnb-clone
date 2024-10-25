import { CreateListingDto, SearchListingsDto } from './dto/listing.dto.ts';
import useAxiosPrivate from '../../useAxiosPrivate.ts';
import { useMutation, useQuery } from '@tanstack/react-query';

const URLS = {
  fetchListings: 'listing',
  fetchListingByID: (listingId: string) => `listing/${listingId}`,
  searchListings: 'listing/search',
  newListings: 'listing/new',
  uploadListingImage: (listingId: string) => `listing/${listingId}/image/new`,
};

export const useFetchSearchListings = (searchListingDto: SearchListingsDto) => {
  const axiosPrivateInstance = useAxiosPrivate();

  return useQuery({
    queryKey: ['search'],
    queryFn: () => (axiosPrivateInstance.get(URLS.searchListings, { params: searchListingDto })),
  });
};

export const useFetchMyListings = () => {
  const axiosPrivateInstance = useAxiosPrivate();

  return useQuery({
    queryKey: ['my-listings'],
    queryFn: () => (axiosPrivateInstance.get(URLS.fetchListings)),
  });
};

export const useFetchListingByID = (listingId: string) => {
  const axiosPrivateInstance = useAxiosPrivate();

  return useQuery({
    queryKey: ['listing'],
    queryFn: () => axiosPrivateInstance.get(URLS.fetchListingByID(listingId)),
  });
};

export const useMutateCreateListing = ({
                                         onSuccess = () => {

                                         },
                                       }: { onSuccess?: () => void }) => {
  const axiosPrivateInstance = useAxiosPrivate();

  const mutateFunction = async (createListingDto: CreateListingDto) => {
    const response = await axiosPrivateInstance.post(URLS.newListings, createListingDto.metadata);
    const listingId: string = response.data.id;

    for (const image of createListingDto.images) {
      const formData = new FormData();
      formData.append('image', image.imageFile);
      formData.append('category', image.category);

      await axiosPrivateInstance.post(URLS.uploadListingImage(listingId), formData);
    }

    return response;
  };

  return useMutation({
    mutationFn: mutateFunction,
    onSuccess,
  });
};
