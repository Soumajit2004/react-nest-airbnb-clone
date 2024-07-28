import {UserInterface} from "../user.interface";
import {ListingImageInterface} from "./listing-image.interface";
import {BookingInterface} from "../booking.interface";

export interface ListingInterface {
  id: string;

  title: string;

  description?: string;

  costing: number;

  host: UserInterface;

  images: ListingImageInterface[];

  bookings: BookingInterface[];
}