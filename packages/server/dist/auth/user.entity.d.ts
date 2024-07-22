import { Listing } from '../listing/listing.entity';
export declare class User {
    id: string;
    email: string;
    password: string;
    listings: Listing[];
}
