import { forwardRef, Inject, Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as uuid from 'uuid';

import { ListingService } from './listing.service';
import { User } from '../../auth/user.entity';
import { ListingImage } from '../entities/listing-image.entity';
import { Repository } from 'typeorm';
import { AddListingImageDto } from '../dto/add-listing-image.dto';
import { ListingUploadService } from '../../../shared/upload/listing-upload.service';

@Injectable()
export class ListingImageService {
  logger = new Logger(ListingImageService.name);

  constructor(
    @Inject(forwardRef(() => ListingService))
    private readonly listingService: ListingService,
    private readonly listingUploadService: ListingUploadService,
    @InjectRepository(ListingImage)
    private listingImageRepository: Repository<ListingImage>,
  ) {}

  async addListingImage(
    listingId: string,
    addListingImageDto: AddListingImageDto,
    image: Express.Multer.File,
    user: User,
  ): Promise<ListingImage> {
    const { label, category } = addListingImageDto;

    const listing = await this.listingService.getListingById(listingId, user);

    const listingImageId = uuid.v4();
    // Uploading image to bucket
    const { bucketLocation, publicUrl } =
      await this.listingUploadService.uploadListingImage(listingImageId, image);

    // Saving reference in database
    const listingImageReference = this.listingImageRepository.create({
      id: listingImageId,
      bucketLocation,
      publicUrl,
      label,
      category,
      listing,
    });
    return await this.listingImageRepository.save(listingImageReference);
  }

  async deleteListingImage(
    listingId: string,
    listingImageId: string,
    user: User,
  ): Promise<void> {
    const listing = await this.listingService.getListingById(listingId, user);

    for (const image of listing.images) {
      if (image.id == listingImageId) {
        // Deleting image from storage
        await this.listingUploadService.deleteListingImage(image);
        // Deleting File Reference
        await this.listingImageRepository.remove(image);
      }
    }
  }
}
