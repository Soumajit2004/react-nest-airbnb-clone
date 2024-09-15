import { CreateListingDto } from '../dto/listing/create-listing.dto.ts';
import { listingApi } from '../api/listing.api.ts';


const createListing = async (createListingDto: CreateListingDto) => {
  const response = await listingApi.createListing(createListingDto);

  console.log(response);
};

export const listingService = {
  createListing,
};