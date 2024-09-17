import api from './api.ts';
import { CreateListingMetadataDto, UploadListingImageDto } from '../dto/listing/create-listing.dto.ts';

const URLS = {
  allListings: 'listing',
  newListings: 'listing/new',
  uploadListingImage: (listingId: string) => `listing/${listingId}/image/new`,
};

const fetchAll = () => {
  return api.get(URLS.allListings);
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
  fetchAll, createListing, uploadListingImage,
};