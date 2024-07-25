import {ListingInterface} from "./listing";
import {BookingInterface} from "./booking.interface";

export interface UserInterface {
  id: string;

  email: string;

  listings: ListingInterface[];

  bookings: BookingInterface[];
}

