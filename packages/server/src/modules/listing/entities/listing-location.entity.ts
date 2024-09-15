import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class ListingLocation {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('decimal')
  lat: number;

  @Column('decimal')
  lng: number;
}
