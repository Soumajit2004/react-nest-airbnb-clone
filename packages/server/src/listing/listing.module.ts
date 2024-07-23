import { Module } from '@nestjs/common';
import { ListingController } from './listing.controller';
import { ListingService } from './listing.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Listing } from './entities/listing.entity';
import { AuthModule } from '../auth/auth.module';
import { ListingRepository } from './listing.repository';
import { UploadModule } from '../common/upload/upload.module';
import { ListingImage } from './entities/listing-image.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Listing, ListingImage]),
    AuthModule,
    UploadModule,
  ],
  controllers: [ListingController],
  providers: [ListingService, ListingRepository],
})
export class ListingModule {}
