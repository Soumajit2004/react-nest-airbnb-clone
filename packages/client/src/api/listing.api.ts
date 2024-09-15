import api from './api.ts';
import { CreateListingDto } from '../dto/listing/create-listing.dto.ts';

const URLS = {
  allListings: 'listing',
  newListings: 'listing/new',
};

const fetchAll = () => {
  return api.get(URLS.allListings);
};

const createListing = (createListingDto: CreateListingDto) => {
  return api.post(URLS.newListings, createListingDto);
};

export const listingApi = {
  fetchAll, createListing,
};