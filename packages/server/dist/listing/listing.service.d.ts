import { CreateListingDto } from './dto/create-listing.dto';
import { User } from '../auth/user.entity';
import { ListingRepository } from './listing.repository';
import { Listing } from './listing.entity';
export declare class ListingService {
    private readonly listingRepository;
    constructor(listingRepository: ListingRepository);
    getListings(user: User): Promise<Listing[]>;
    createListing(createListingDto: CreateListingDto, user: User): Promise<Listing>;
}
