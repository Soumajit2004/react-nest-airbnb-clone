import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Bucket, Storage } from '@google-cloud/storage';
import { GoogleCloudService } from '../google-cloud/google-cloud.service';

@Injectable()
export class UploadService {
  /**
   * Constructs a new instance of the UploadService class.
   * @param {ConfigService} configService - The configuration service.
   * @param googleCloudService
   */
  constructor(private readonly configService: ConfigService,
              private readonly googleCloudService: GoogleCloudService) {
  }

  /**
   * Retrieves the Google Cloud Storage bucket.
   * @returns {Storage.Bucket} The Google Cloud Storage bucket.
   */
  getBucket(): Bucket {
    return this.googleCloudService.getStorage().bucket(this.configService.get('GCP_BUCKET'));
  }
}