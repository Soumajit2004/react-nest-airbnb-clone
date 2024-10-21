import {
  forwardRef,
  Inject,
  Injectable,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { CreateListingDto } from '../dto/create-listing.dto';
import { User } from '../../auth/user.entity';
import { ListingRepository } from '../repositories/listing.repository';
import { Listing } from '../entities/listing.entity';
import { UpdateListingDto } from '../dto/update-listing.dto';
import { ListingImageService } from './listing-image.service';

@Injectable()
export class ListingService {
  logger = new Logger(ListingService.name);

  constructor(
    @Inject(forwardRef(() => ListingImageService))
    private readonly listingImageService: ListingImageService,
    private readonly listingRepository: ListingRepository,
  ) {}

  getListings(user: User): Promise<Listing[]> {
    return this.listingRepository.findBy({ host: user });
  }

  async getListingById(listingId: string, user: User): Promise<Listing> {
    try {
      return await this.listingRepository.findOneByOrFail({
        id: listingId,
        host: user,
      });
    } catch (err) {
      throw new NotFoundException(`Listing with id:${listingId} not found.`);
    }
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

  async deleteListing(listingId: string, user: User) {
    const listing = await this.getListingById(listingId, user);

    for (const image of listing.images) {
      await this.listingImageService.deleteListingImage(
        listingId,
        image.id,
        user,
      );
    }

    await this.listingRepository.remove(listing);

    this.logger.verbose(`Deleted listing with id: ${listingId}`);
  }
}
