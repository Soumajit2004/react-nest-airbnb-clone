import {UserInterface} from "./user.interface";
import {ListingInterface} from "./listing";

export interface BookingInterface {
  id: string;

  startDate: string;

  endDate: string;

  listing: ListingInterface;

  user: UserInterface;
}