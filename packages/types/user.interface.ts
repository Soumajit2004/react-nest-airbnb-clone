import {ListingInterface} from "./listing/listing.interface";
import {BookingInterface} from "./booking.interface";

export interface UserInterface {
  id: string;

  email: string;

  listings: ListingInterface[];

  bookings: BookingInterface[];
}