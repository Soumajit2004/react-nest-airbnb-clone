import { Listing } from '../listing/listing.type.ts';
import { User } from '../user/user.type.ts';

export type Booking = {
  id: string;

  checkInDate: string;

  checkOutDate: string;

  listing: Listing;

  user: User;
}