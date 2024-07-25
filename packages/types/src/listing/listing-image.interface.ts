import {ListingInterface} from "./listing.interface";

export interface ListingImageInterface {
  id: string;

  bucketLocation: string;

  publicUrl: string;

  label: string;

  category: string;

  listing: ListingInterface;
}