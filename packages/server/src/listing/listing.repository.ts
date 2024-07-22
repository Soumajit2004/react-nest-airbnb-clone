import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { Listing } from './listing.entity';
import { CreateListingDto } from './dto/create-listing.dto';
import { User } from '../auth/user.entity';

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
}
