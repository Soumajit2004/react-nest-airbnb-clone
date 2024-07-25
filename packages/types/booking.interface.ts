import {ListingInterface} from "./listing/listing.interface";
import {UserInterface} from "./user.interface";

export interface BookingInterface {
  id: string;

  startDate: string;

  endDate: string;

  listing: ListingInterface;

  user: UserInterface;
}