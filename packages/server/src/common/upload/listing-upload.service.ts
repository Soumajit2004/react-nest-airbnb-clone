import { UploadService } from './upload.service';
import { Injectable, Logger } from '@nestjs/common';

@Injectable()
export class ListingUploadService {
  static BASE_PATH = 'images/listing/';

  logger = new Logger(ListingUploadService.name);

  constructor(private readonly uploadService: UploadService) {}

  formatFileName(listingId: string, originalFileName: string) {
    const nl = originalFileName.split('.');

    return listingId + '.' + nl.pop();
  }

  async uploadListingImage(
    listingImageId: string,
    image: Express.Multer.File,
  ): Promise<{ bucketLocation: string; publicUrl: string }> {
    const bucket = this.uploadService.getBucket();

    const file = bucket.file(
      ListingUploadService.BASE_PATH +
        this.formatFileName(listingImageId, image.originalname),
    );
    file
      .createWriteStream({ resumable: false })
      .on('error', () => {
        this.logger.error(`Upload failed for listing image ${listingImageId}`);
      })
      .on('finish', async () => {
        this.logger.verbose(
          `Upload finished for listing image ${listingImageId}`,
        );

        await file.makePublic();
      })
      .end(image.buffer);

    return {
      publicUrl: `https://storage.googleapis.com/${bucket.name}/${file.name}`,
      bucketLocation: `gs://${bucket.name}/${file.name}`,
    };
  }
}
