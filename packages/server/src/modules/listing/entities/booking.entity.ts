import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Listing } from './listing.entity';
import { User } from '../../auth/user.entity';

@Entity()
export class Booking {
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
