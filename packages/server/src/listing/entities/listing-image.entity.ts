import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Listing } from './listing.entity';
import { Exclude } from 'class-transformer';
import {
  ListingImageCategory,
  ListingImageInterface,
} from '@airbnb-clone/types';

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
