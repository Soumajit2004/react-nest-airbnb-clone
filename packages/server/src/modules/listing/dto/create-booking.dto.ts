import { IsDateString, IsString } from 'class-validator';

export class CreateBookingDto {
  @IsString()
  @IsDateString()
  startDate: string;

  @IsString()
  @IsDateString()
  endDate: string;
}
