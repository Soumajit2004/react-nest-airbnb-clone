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

@Entity()
export class Listing {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column({ nullable: true })
  description?: string;

  @ManyToOne(() => User, (user) => user.listings)
  host: User;

  @OneToMany(() => ListingImage, (image) => image.listing, { eager: true })
  images: ListingImage[];

  @OneToMany(() => Booking, (booking) => booking.listing, { eager: true })
  bookings: Booking[];
}
