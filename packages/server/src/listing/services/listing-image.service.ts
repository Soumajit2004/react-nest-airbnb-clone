import { Injectable, Logger } from '@nestjs/common';
import { ListingUploadService } from '../../common/upload/listing-upload.service';
import { ListingService } from './listing.service';
import { User } from '../../auth/user.entity';
import { ListingImage } from '../entities/listing-image.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AddListingImageDto } from '../dto/add-listing-image.dto';

@Injectable()
export class ListingImageService {
  logger = new Logger(ListingImageService.name);

  constructor(
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
  ) {
    const { label, category } = addListingImageDto;

    const listing = await this.listingService.getListingById(listingId, user);

    // Uploading image to bucket
    const imageUrl = await this.listingUploadService.uploadListingImage(
      listing.id,
      image,
    );

    // Saving reference in database
    const listingImageReference = this.listingImageRepository.create({
      imageUrl,
      label,
      category,
      listing,
    });
    return await this.listingImageRepository.save(listingImageReference);
  }
}
