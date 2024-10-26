import { ListingImage } from './listing-image.type.ts';
import { User } from '../user/user.type.ts';
import { ListingLocation } from './listing-location.type.ts';

export type Listing = {
  id: string;

  title: string;

  description?: string;

  costing: number;

  location: ListingLocation;

  host: User;

  images: ListingImage[];
}