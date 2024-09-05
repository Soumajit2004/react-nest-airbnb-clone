import api from './api.ts';

const URLS = {
  allListings: 'listing',
};

export const fetchAllListings = () => {
  return api.get(URLS.allListings);
};