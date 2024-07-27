import { Module } from '@nestjs/common';
import { ListingController } from './listing.controller';
import { ListingService } from './services/listing.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Listing } from './entities/listing.entity';
import { AuthModule } from '../auth/auth.module';
import { ListingRepository } from './listing.repository';
import { ListingImage } from './entities/listing-image.entity';
import { ListingImageService } from './services/listing-image.service';
import { UploadModule } from '../../shared/upload/upload.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Listing, ListingImage]),
    AuthModule,
    UploadModule,
  ],
  controllers: [ListingController],
  providers: [ListingService, ListingImageService, ListingRepository],
  exports: [ListingService],
})
export class ListingModule {}
