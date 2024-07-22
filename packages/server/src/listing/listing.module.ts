import { Module } from '@nestjs/common';
import { ListingController } from './listing.controller';
import { ListingService } from './listing.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Listing } from './listing.entity';
import { AuthModule } from '../auth/auth.module';
import { ListingRepository } from './listing.repository';

@Module({
  imports: [TypeOrmModule.forFeature([Listing]), AuthModule],
  controllers: [ListingController],
  providers: [ListingService, ListingRepository],
})
export class ListingModule {}
