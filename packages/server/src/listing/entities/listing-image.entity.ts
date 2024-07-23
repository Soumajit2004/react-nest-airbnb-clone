import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Listing } from './listing.entity';

export enum ListingImageCategory {
  EXTERIOR = 'exterior',
  BEDROOM = 'bedroom',
  BATHROOM = 'bathroom',
  COMMON_AREA = 'common_area',
}

@Entity()
export class ListingImage {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  index: number;

  @Column()
  location: string;

  @Column({ nullable: true })
  label: string;

  @Column()
  category: ListingImageCategory;

  @ManyToOne(() => Listing, (listing) => listing.images)
  listing: Listing;
}
