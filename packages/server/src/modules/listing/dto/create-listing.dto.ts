import {
  IsInt,
  IsOptional,
  IsString,
  Max,
  MaxLength,
  Min,
  MinLength,
} from 'class-validator';
import { Transform } from 'class-transformer';

export class CreateListingDto {
  @IsString()
  @MinLength(4)
  @MaxLength(50)
  title: string;

  @IsString()
  @MaxLength(200)
  @IsOptional()
  description?: string;

  @Transform((params) => parseInt(params.value, 10))
  @IsInt()
  @Min(1)
  @Max(1000000)
  costing: number;
}
