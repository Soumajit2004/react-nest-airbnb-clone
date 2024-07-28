import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from '../../auth/user.entity';
import { ListingImage } from './listing-image.entity';
import { Booking } from '../../booking/booking.entity';
import { ListingInterface } from '@airbnb-clone/types';

@Entity()
export class Listing implements ListingInterface {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column({ nullable: true })
  description?: string;

  @Column()
  costing: number;

  @ManyToOne(() => User, (user) => user.listings)
  host: User;

  @OneToMany(() => ListingImage, (image) => image.listing, { eager: true })
  images: ListingImage[];

  @OneToMany(() => Booking, (booking) => booking.listing, { eager: true })
  bookings: Booking[];
}
