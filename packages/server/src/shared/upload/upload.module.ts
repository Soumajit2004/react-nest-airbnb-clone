import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { UploadService } from './upload.service';
import { ListingUploadService } from './listing-upload.service';
import { GoogleCloudModule } from '../google-cloud/google-cloud.module';

@Module({
  imports: [ConfigModule, GoogleCloudModule],
  providers: [UploadService, ListingUploadService],
  exports: [ListingUploadService],
})
export class UploadModule {
}
