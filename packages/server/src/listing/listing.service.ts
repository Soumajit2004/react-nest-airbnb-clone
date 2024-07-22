import { Injectable, Logger } from '@nestjs/common';
import { CreateListingDto } from './dto/create-listing.dto';
import { User } from '../auth/user.entity';
import { ListingRepository } from './listing.repository';
import { Listing } from './listing.entity';

@Injectable()
export class ListingService {
  logger = new Logger();

  constructor(private readonly listingRepository: ListingRepository) {}

  getListings(user: User): Promise<Listing[]> {
    return this.listingRepository.findBy({ host: user });
  }

  async createListing(
    createListingDto: CreateListingDto,
    user: User,
  ): Promise<Listing> {
    const listing = await this.listingRepository.createListing(
      createListingDto,
      user,
    );

    this.logger.verbose(`Listing ${listing.id} created by user ${user.id}`);

    return listing;
  }
}
