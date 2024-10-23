import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import { GetUser } from '../auth/get-user.decorator';
import { User } from '../auth/user.entity';
import { CreateBookingDto } from '../listing/dto/CRUD/create-booking.dto';
import { BookingService } from './booking.service';
import { JwtGuard } from '../auth/guards/jwt-auth.guard';
import { Booking } from './booking.entity';

@Controller('booking')
@UseGuards(JwtGuard)
export class BookingController {
  constructor(private readonly bookingService: BookingService) {}

  @Get('/my-bookings')
  getBookings(@GetUser() user: User): Promise<Booking[]> {
    return this.bookingService.getBookingsByUser(user);
  }

  @Post('/:listingId')
  createBooking(
    @Param('listingId') listingId: string,
    @Body()
    createBookingDto: CreateBookingDto,
    @GetUser() user: User,
  ): Promise<Booking> {
    return this.bookingService.createBooking(listingId, createBookingDto, user);
  }

  @Delete('/:bookingId')
  deleteBooking(
    @Param('bookingId') bookingId: string,
    @GetUser() user: User,
  ): Promise<void> {
    return this.bookingService.deleteBooking(bookingId, user);
  }
}
