import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Listing } from './listing.entity';
import { Exclude } from 'class-transformer';
import { ListingImageInterface } from '@airbnb-clone/types';

export enum ListingImageCategory {
  EXTERIOR = 'exterior',
  BEDROOM = 'bedroom',
  BATHROOM = 'bathroom',
  COMMON_AREA = 'common_area',
}

@Entity()
export class ListingImage implements ListingImageInterface {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  @Exclude({ toPlainOnly: true })
  bucketLocation: string;

  @Column()
  publicUrl: string;

  @Column({ nullable: true })
  label: string;

  @Column({ enum: ListingImageCategory })
  category: ListingImageCategory;

  @ManyToOne(() => Listing, (listing) => listing.images)
  listing: Listing;
}
