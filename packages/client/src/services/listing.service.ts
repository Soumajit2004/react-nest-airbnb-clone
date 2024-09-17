import { CreateListingDto } from '../dto/listing/create-listing.dto.ts';
import { listingApi } from '../api/listing.api.ts';
import { Listing } from '../types/listing/listing.type.ts';


const createListing = async (createListingWithImageDto: CreateListingDto) => {
  const { metadata, images } = createListingWithImageDto;

  const response = await listingApi.createListing(metadata);

  const listingData: Listing = response.data;

  images.map(async (image) => {
    await listingApi.uploadListingImage({ listingId: listingData.id, uploadListingImageDto: image });
  });
};

export const listingService = {
  createListing,
};