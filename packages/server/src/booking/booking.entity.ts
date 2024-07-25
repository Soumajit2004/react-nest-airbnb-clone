import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Listing } from '../listing/entities/listing.entity';
import { User } from '../auth/user.entity';
import { BookingInterface } from '@airbnb-clone/types';

@Entity()
export class Booking implements BookingInterface {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  startDate: string;

  @Column()
  endDate: string;

  @ManyToOne(() => Listing, (listing) => listing.bookings)
  listing: Listing;

  @ManyToOne(() => User, (user) => user, { eager: true })
  user: User;
}
