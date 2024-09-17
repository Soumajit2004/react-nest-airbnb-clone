import { LatLngLiteral } from '../location.type.ts';
import { ListingImage } from './listing-image.type.ts';
import { User } from '../user/user.type.ts';

export type Listing = {
  id: string;

  title: string;

  description?: string;

  costing: number;

  location: { id: string } & LatLngLiteral;

  host: User;

  images: ListingImage[];
}