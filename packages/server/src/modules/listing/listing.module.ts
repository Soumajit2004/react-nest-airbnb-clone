import { Module } from '@nestjs/common';
import { ListingController } from './listing.controller';
import { ListingService } from './services/listing.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Listing } from './entities/listing.entity';
import { AuthModule } from '../auth/auth.module';
import { ListingRepository } from './repositories/listing.repository';
import { ListingImage } from './entities/listing-image.entity';
import { ListingImageService } from './services/listing-image.service';
import { UploadModule } from '../../shared/upload/upload.module';
import { ListingLocation } from './entities/listing-location.entity';
import { Booking } from './entities/booking.entity';
import { BookingService } from './services/booking.service';
import { BookingRepository } from './repositories/booking.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([Listing, ListingImage, ListingLocation, Booking]),
    AuthModule,
    UploadModule,
  ],
  controllers: [ListingController],
  providers: [
    ListingService,
    ListingImageService,
    BookingService,
    ListingRepository,
    BookingRepository,
  ],
  exports: [ListingService],
})
export class ListingModule {}
