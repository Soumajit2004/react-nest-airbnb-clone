import {
  BadRequestException,
  Injectable,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { BookingRepository } from '../repositories/booking.repository';
import { User } from '../../auth/user.entity';
import { CreateBookingDto } from '../dto/create-booking.dto';
import { ListingRepository } from '../repositories/listing.repository';
import { Listing } from '../entities/listing.entity';

@Injectable()
export class BookingService {
  logger = new Logger(BookingService.name);

  constructor(
    private readonly bookingRepository: BookingRepository,
    private readonly listingRepository: ListingRepository,
  ) {}

  async createBooking(
    listingId: string,
    createBookingDto: CreateBookingDto,
    user: User,
  ): Promise<Listing> {
    const { startDate, endDate } = createBookingDto;

    const listing = await this.listingRepository.findOne({
      where: { id: listingId },
    });

    if (!listing) {
      throw new NotFoundException(`Listing with id ${listingId} not found`);
    }

    const previousBooking = listing.bookings;

    previousBooking.forEach((booking) => {
      if (
        (startDate >= booking.startDate && startDate <= booking.endDate) ||
        (endDate >= booking.startDate && endDate <= booking.endDate)
      ) {
        throw new BadRequestException(
          `Listing with id ${listingId} is already booked for the selected dates`,
        );
      }
    });

    const booking = await this.bookingRepository.createBooking(
      listing,
      createBookingDto,
      user,
    );

    this.logger.verbose(`Booking ${booking.id} created by user ${user.id}`);

    return this.listingRepository.findOne({
      where: { id: listingId },
    });
  }
}
