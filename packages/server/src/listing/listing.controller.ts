import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

import { ListingService } from './listing.service';
import { CreateListingDto } from './dto/create-listing.dto';
import { User } from '../auth/user.entity';
import { GetUser } from '../auth/get-user.decorator';
import { Listing } from './listing.entity';

@Controller('listing')
@UseGuards(AuthGuard())
export class ListingController {
  constructor(private readonly listingService: ListingService) {}

  @Get()
  getListings(@GetUser() user: User): Promise<Listing[]> {
    return this.listingService.getListings(user);
  }

  @Post('/new')
  createListing(
    @Body() createListingDto: CreateListingDto,
    @GetUser() user: User,
  ): Promise<Listing> {
    return this.listingService.createListing(createListingDto, user);
  }
}
