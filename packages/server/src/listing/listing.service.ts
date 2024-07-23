import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { CreateListingDto } from './dto/create-listing.dto';
import { User } from '../auth/user.entity';
import { ListingRepository } from './listing.repository';
import { Listing } from './listing.entity';
import { ListingUploadService } from '../common/upload/listing-upload.service';

@Injectable()
export class ListingService {
  logger = new Logger(ListingService.name);

  constructor(
    private readonly listingRepository: ListingRepository,
    private readonly listingUploadService: ListingUploadService,
  ) {}

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
    imageFiles: Express.Multer.File[],
    user: User,
  ): Promise<Listing> {
    const listing = await this.listingRepository.createListing(
      createListingDto,
      user,
    );

    await this.listingUploadService.uploadListingImages(listing.id, imageFiles);

    this.logger.verbose(`Listing ${listing.id} created by user ${user.id}`);

    return listing;
  }
}
