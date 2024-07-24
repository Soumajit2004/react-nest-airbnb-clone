import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { CreateListingDto } from '../dto/create-listing.dto';
import { User } from '../../auth/user.entity';
import { ListingRepository } from '../listing.repository';
import { Listing } from '../entities/listing.entity';
import { UpdateListingDto } from '../dto/update-listing.dto';

@Injectable()
export class ListingService {
  logger = new Logger(ListingService.name);

  constructor(private readonly listingRepository: ListingRepository) {}

  getListings(user: User): Promise<Listing[]> {
    return this.listingRepository.findBy({ host: user });
  }

  async getListingById(listingId: string, user: User): Promise<Listing> {
    const found = await this.listingRepository.findOne({
      where: { id: listingId, host: user },
    });

    if (!found) {
      throw new NotFoundException(`Listing with id:${listingId} not found.`);
    }

    return found;
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

  async updateListing(
    listingId: string,
    updateListingDto: UpdateListingDto,
    user: User,
  ): Promise<Listing> {
    const listing = await this.getListingById(listingId, user);

    return this.listingRepository.updateListing(listing.id, updateListingDto);
  }
}
