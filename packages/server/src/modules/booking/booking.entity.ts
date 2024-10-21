import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Listing } from '../listing/entities/listing.entity';
import { User } from '../auth/user.entity';
import { Exclude } from 'class-transformer';

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
  @Exclude({ toPlainOnly: true })
  user: User;
}
