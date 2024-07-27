import { IsOptional, IsString, MaxLength, MinLength } from 'class-validator';

export class CreateListingDto {
  @IsString()
  @MinLength(4)
  @MaxLength(50)
  title: string;

  @IsString()
  @MaxLength(200)
  @IsOptional()
  description?: string;
}
