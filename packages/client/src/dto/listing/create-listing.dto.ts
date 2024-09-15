import { LatLngLiteral } from '../../types/location.type.ts';

export type CreateListingDto = {
  title: string;
  description: string;
  costing: number
  location: LatLngLiteral,
}