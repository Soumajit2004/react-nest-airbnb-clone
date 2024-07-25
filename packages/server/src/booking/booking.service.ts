import { Injectable } from '@nestjs/common';
import { ListingService } from '../listing/services/listing.service';

@Injectable()
export class BookingService {
  constructor(private readonly listingService: ListingService) {}
}
