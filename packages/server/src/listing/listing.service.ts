import { Injectable } from '@nestjs/common';
import { CreateListingDto } from './dto/create-listing.dto';
import { User } from '../auth/user.entity';
import { ListingRepository } from './listing.repository';
import { Listing } from './listing.entity';

@Injectable()
export class ListingService {
  constructor(private readonly listingRepository: ListingRepository) {}

  getListings(user: User): Promise<Listing[]> {
    return this.listingRepository.findBy({ host: user });
  }

  createListing(
    createListingDto: CreateListingDto,
    user: User,
  ): Promise<Listing> {
    return this.listingRepository.createListing(createListingDto, user);
  }
}
