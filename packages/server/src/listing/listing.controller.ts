import {
  Body,
  Controller,
  FileTypeValidator,
  Get,
  MaxFileSizeValidator,
  Param,
  ParseFilePipe,
  Patch,
  Post,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { FileInterceptor } from '@nestjs/platform-express';

import { ListingService } from './services/listing.service';
import { CreateListingDto } from './dto/create-listing.dto';
import { User } from '../auth/user.entity';
import { GetUser } from '../auth/get-user.decorator';
import { Listing } from './entities/listing.entity';
import { UpdateListingDto } from './dto/update-listing.dto';
import { ListingImageService } from './services/listing-image.service';
import { AddListingImageDto } from './dto/add-listing-image.dto';
import { ListingImage } from './entities/listing-image.entity';

@Controller('listing')
@UseGuards(AuthGuard())
export class ListingController {
  constructor(
    private readonly listingService: ListingService,
    private readonly listingImageService: ListingImageService,
  ) {}

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
  createListing(
    @Body()
    createListingDto: CreateListingDto,
    @GetUser() user: User,
  ): Promise<Listing> {
    return this.listingService.createListing(createListingDto, user);
  }

  @Patch('/:id')
  updateListing(
    @Param('id') listingId: string,
    @Body() updateListingDto: UpdateListingDto,
    @GetUser() user: User,
  ): Promise<Listing> {
    return this.listingService.updateListing(listingId, updateListingDto, user);
  }

  @Post('/:id/image/new')
  @UseInterceptors(FileInterceptor('image'))
  addImage(
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          new MaxFileSizeValidator({ maxSize: 5000000 }),
          new FileTypeValidator({ fileType: 'image/(jpeg|jpg)' }),
        ],
        fileIsRequired: false,
      }),
    )
    image: Express.Multer.File,
    @Param('id') listingId: string,
    @Body() addListingImageDto: AddListingImageDto,
    @GetUser() user: User,
  ): Promise<ListingImage> {
    return this.listingImageService.addListingImage(
      listingId,
      addListingImageDto,
      image,
      user,
    );
  }
}
