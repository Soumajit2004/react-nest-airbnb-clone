import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { Booking } from './booking.entity';
import { CreateBookingDto } from '../listing/dto/create-booking.dto';
import { User } from '../auth/user.entity';
import { Listing } from '../listing/entities/listing.entity';

@Injectable()
export class BookingRepository extends Repository<Booking> {
  constructor(private dataSource: DataSource) {
    super(Booking, dataSource.createEntityManager());
  }

  createBooking(
    listing: Listing,
    createBookingDto: CreateBookingDto,
    user: User,
  ): Promise<Booking> {
    const { startDate, endDate } = createBookingDto;

    const booking = this.create({
      startDate,
      endDate,
      listing,
      user,
    });

    return this.save(booking);
  }
}
