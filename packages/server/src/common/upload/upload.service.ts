import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Storage } from '@google-cloud/storage';

@Injectable()
export class UploadService {
  private readonly gcpStorage = new Storage({
    keyFilename: 'gcpServiceAccountKey.json',
    projectId: 'personal-projects-soumajit',
  });

  constructor(private readonly configService: ConfigService) {}

  getBucket() {
    return this.gcpStorage.bucket('airbnb_clone_dev');
  }
}
