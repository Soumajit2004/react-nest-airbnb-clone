import { UploadService } from './upload.service';
import { Injectable, Logger } from '@nestjs/common';

@Injectable()
export class ListingUploadService {
  static BASE_PATH = 'images/listing/';

  logger = new Logger(ListingUploadService.name);

  constructor(private readonly uploadService: UploadService) {}

  async uploadListingImages(
    listingId: string,
    images: Express.Multer.File[],
  ): Promise<void> {
    const bucket = this.uploadService.getBucket();

    images.map(async (image) => {
      bucket
        .file(ListingUploadService.BASE_PATH + image.originalname)
        .createWriteStream({ resumable: false })
        .on('error', () => {
          this.logger.error(`Image Upload failed for listing ${listingId}`);
        })
        .on('finish', () => {
          this.logger.verbose(`Image upload finished for listing ${listingId}`);
        })
        .end(image.buffer);
    });
  }
}
