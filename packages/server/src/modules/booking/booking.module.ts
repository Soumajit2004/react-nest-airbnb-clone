import { Module } from '@nestjs/common';
import { BookingController } from './booking.controller';
import { BookingService } from './booking.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Booking } from './booking.entity';
import { ListingModule } from '../listing/listing.module';

@Module({
  imports: [TypeOrmModule.forFeature([Booking]), ListingModule],
  controllers: [BookingController],
  providers: [BookingService],
})
export class BookingModule {}