import {
  Body,
  Controller,
  FileTypeValidator,
  Get,
  MaxFileSizeValidator,
  Param,
  ParseFilePipe,
  Post,
  UploadedFiles,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { FilesInterceptor } from '@nestjs/platform-express';

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

  @Get('/:id')
  getListingById(
    @Param('id') listingId: string,
    @GetUser() user: User,
  ): Promise<Listing> {
    return this.listingService.getListingById(listingId, user);
  }

  @Post('/new')
  @UseInterceptors(FilesInterceptor('images', 20))
  createListing(
    @UploadedFiles(
      new ParseFilePipe({
        validators: [
          new MaxFileSizeValidator({ maxSize: 5000000 }),
          new FileTypeValidator({ fileType: 'image/(jpeg|jpg)' }),
        ],
        fileIsRequired: false,
      }),
    )
    images: Array<Express.Multer.File>,
    @Body() createListingDto: CreateListingDto,
    @GetUser() user: User,
  ): Promise<Listing> {
    return this.listingService.createListing(createListingDto, images, user);
  }
}
