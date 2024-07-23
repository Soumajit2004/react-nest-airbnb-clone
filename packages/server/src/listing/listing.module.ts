import { Module } from '@nestjs/common';
import { ListingController } from './listing.controller';
import { ListingService } from './listing.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Listing } from './listing.entity';
import { AuthModule } from '../auth/auth.module';
import { ListingRepository } from './listing.repository';
import { UploadModule } from '../common/upload/upload.module';

@Module({
  imports: [TypeOrmModule.forFeature([Listing]), AuthModule, UploadModule],
  controllers: [ListingController],
  providers: [ListingService, ListingRepository],
})
export class ListingModule {}
