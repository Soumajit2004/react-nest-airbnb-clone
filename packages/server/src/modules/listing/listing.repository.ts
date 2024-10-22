import { Injectable } from '@nestjs/common';
import { Between, DataSource, Repository } from 'typeorm';
import { Listing } from './entities/listing.entity';
import { CreateListingDto } from './dto/CRUD/create-listing.dto';
import { User } from '../auth/user.entity';
import { UpdateListingDto } from './dto/CRUD/update-listing.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { ListingLocation } from './entities/listing-location.entity';
import { SearchAreaDto } from './dto/search-area.dto';

@Injectable()
export class ListingRepository extends Repository<Listing> {
  constructor(
    private dataSource: DataSource,
    @InjectRepository(ListingLocation)
    private listingLocationRepository: Repository<ListingLocation>,
  ) {
    super(Listing, dataSource.createEntityManager());
  }

  async findListingByLocation(searchAreaDto: SearchAreaDto) {
    const { lat, lng, searchRadius } = searchAreaDto;

    return await this.findBy({
      location: {
        lat: Between(lat - searchRadius, lat + searchRadius),
        lng: Between(lng - searchRadius, lat + searchRadius),
      },
    });
  }

  async createListing(
    createListingDto: CreateListingDto,
    user: User,
  ): Promise<Listing> {
    const { title, description, costing, location } = createListingDto;

    const listingLocation = this.listingLocationRepository.create({
      lat: location.lat,
      lng: location.lng,
    });
    const savedListingLocation =
      await this.listingLocationRepository.save(listingLocation);

    const listing = this.create({
      title,
      description,
      costing,
      host: user,
      location: savedListingLocation,
    });
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
