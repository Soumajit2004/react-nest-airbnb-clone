import { ListingService } from './listing.service';
import { CreateListingDto } from './dto/create-listing.dto';
import { User } from '../auth/user.entity';
import { Listing } from './listing.entity';
export declare class ListingController {
    private readonly listingService;
    constructor(listingService: ListingService);
    getListings(user: User): Promise<Listing[]>;
    createListing(createListingDto: CreateListingDto, user: User): Promise<Listing>;
}
