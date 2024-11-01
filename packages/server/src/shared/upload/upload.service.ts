import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Storage } from '@google-cloud/storage';

@Injectable()
export class UploadService {
  private readonly gcpStorage = new Storage({
    keyFilename: 'gcpServiceAccountKey.json',
    projectId: 'personal-projects-soumajit',
  });

  /**
   * Constructs a new instance of the UploadService class.
   * @param {ConfigService} configService - The configuration service.
   */
  constructor(private readonly configService: ConfigService) {}

  /**
   * Retrieves the Google Cloud Storage bucket.
   * @returns {Storage.Bucket} The Google Cloud Storage bucket.
   */
  getBucket() {
    return this.gcpStorage.bucket('airbnb_clone_dev');
  }
}