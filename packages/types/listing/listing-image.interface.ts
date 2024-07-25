import {ListingInterface} from "./listing.interface";

export enum ListingImageCategory {
  EXTERIOR = 'exterior',
  BEDROOM = 'bedroom',
  BATHROOM = 'bathroom',
  COMMON_AREA = 'common_area',
}

export interface ListingImageInterface {
  id: string;

  bucketLocation: string;

  publicUrl: string;

  label: string;

  category: ListingImageCategory;

  listing: ListingInterface;
}