import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { Listing } from './entities/listing.entity';
import { CreateListingDto } from './dto/create-listing.dto';
import { User } from '../auth/user.entity';
import { UpdateListingDto } from './dto/update-listing.dto';

@Injectable()
export class ListingRepository extends Repository<Listing> {
  constructor(private dataSource: DataSource) {
    super(Listing, dataSource.createEntityManager());
  }

  async createListing(
    createListingDto: CreateListingDto,
    user: User,
  ): Promise<Listing> {
    const { title, description } = createListingDto;

    const listing = this.create({ title, description, host: user });
    return this.save(listing);
  }

  async updateListing(listingId: string, updateListingDto: UpdateListingDto) {
    const { title, description } = updateListingDto;

    const listing = await this.findOne({ where: { id: listingId } });

    if (title) {
      listing.title = title;
    }
    if (description) {
      listing.description = description;
    }

    return await this.save(listing);
  }
}
