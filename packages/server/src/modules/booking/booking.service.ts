import {
  BadRequestException,
  Injectable,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { BookingRepository } from './booking.repository';
import { User } from '../auth/user.entity';
import { CreateBookingDto } from '../listing/dto/create-booking.dto';
import { ListingRepository } from '../listing/listing.repository';
import { Booking } from './booking.entity';

@Injectable()
export class BookingService {
  logger = new Logger(BookingService.name);

  constructor(
    private readonly bookingRepository: BookingRepository,
    private readonly listingRepository: ListingRepository,
  ) {}

  getBookingsByUser(user: User): Promise<Booking[]> {
    return this.bookingRepository.find({
      where: { user },
    });
  }

  /**
   * Creates a new booking for a listing.
   * @param listingId - The ID of the listing to book.
   * @param createBookingDto - The booking details.
   * @param user - The user creating the booking.
   * @returns The updated listing with the new booking.
   * @throws NotFoundException if the listing is not found.
   * @throws BadRequestException if the listing is already booked for the selected dates.
   */
  async createBooking(
    listingId: string,
    createBookingDto: CreateBookingDto,
    user: User,
  ): Promise<Booking> {
    const { startDate, endDate } = createBookingDto;

    // Find the listing by ID
    const listing = await this.listingRepository.findOne({
      where: { id: listingId },
    });

    if (!listing) {
      throw new NotFoundException(`Listing with id ${listingId} not found`);
    }

    // Check for overlapping bookings
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

    // Create the new booking
    const booking = await this.bookingRepository.createBooking(
      listing,
      createBookingDto,
      user,
    );

    this.logger.verbose(`Booking ${booking.id} created by user ${user.id}`);

    // Return the updated listing
    return booking;
  }

  /**
   * Deletes a booking.
   * @param bookingId - The ID of the booking to delete.
   * @param user - The user attempting to delete the booking.
   * @throws NotFoundException if the booking is not found.
   * @throws BadRequestException if the user is not authorized to delete the booking.
   */
  async deleteBooking(bookingId: string, user: User): Promise<void> {
    // Find the booking by ID
    const booking = await this.bookingRepository.findOne({
      where: { id: bookingId },
    });

    if (!booking) {
      throw new NotFoundException(`Booking with id ${bookingId} not found`);
    }

    // Check if the user is authorized to delete the booking
    if (user.id !== booking.user.id) {
      throw new BadRequestException(
        `You are not authorized to delete booking with id ${bookingId}`,
      );
    }

    // Delete the booking
    await this.bookingRepository.remove(booking);
  }
}
