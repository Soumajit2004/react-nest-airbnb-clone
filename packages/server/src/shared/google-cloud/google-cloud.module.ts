import { Module } from '@nestjs/common';
import { GoogleCloudService } from './google-cloud.service';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [ConfigModule],
  providers: [GoogleCloudService],
  exports: [GoogleCloudService],
})
export class GoogleCloudModule {
}
