import api from '../api.ts';
import { CreateListingMetadataDto, UploadListingImageDto } from '../../dto/listing/create-listing.dto.ts';

const URLS = {
  fetchListings: 'listing',
  newListings: 'listing/new',
  uploadListingImage: (listingId: string) => `listing/${listingId}/image/new`,
};

const fetchListings = () => {
  return api.get(URLS.fetchListings);
};

const createListing = (createListingMetadataDto: CreateListingMetadataDto) => {
  return api.post(URLS.newListings, createListingMetadataDto);
};

const uploadListingImage = (
  { listingId, uploadListingImageDto }: {
    listingId: string,
    uploadListingImageDto: UploadListingImageDto
  }) => {
  const { imageFile, category } = uploadListingImageDto;

  const formData = new FormData();
  formData.append('image', imageFile);
  formData.append('category', category);

  return api.post(URLS.uploadListingImage(listingId), formData);
};

export const listingApi = {
  fetchListings, createListing, uploadListingImage,
};