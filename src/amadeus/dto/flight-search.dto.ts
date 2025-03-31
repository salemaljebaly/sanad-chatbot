import {
  IsString,
  IsNumber,
  IsOptional,
  IsEnum,
  IsBoolean,
  IsNumberString,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class FlightSearchDto {
  @ApiProperty({ required: true, description: 'Origin location code' })
  @IsString()
  originLocationCode: string;

  @ApiProperty({ required: true, description: 'Destination location code' })
  @IsString()
  destinationLocationCode: string;

  @ApiProperty({ required: true, description: 'Departure date' })
  @IsString()
  departureDate: string;

  @ApiProperty({ required: true, description: 'Number of adult passengers' })
  @IsNumberString()
  adults: number;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsNumber()
  max?: number;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  returnDate?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsNumber()
  children?: number;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsNumber()
  infants?: number;

  @ApiProperty({
    required: false,
    enum: ['ECONOMY', 'PREMIUM_ECONOMY', 'BUSINESS', 'FIRST'],
  })
  @IsOptional()
  @IsEnum(['ECONOMY', 'PREMIUM_ECONOMY', 'BUSINESS', 'FIRST'])
  travelClass?: 'ECONOMY' | 'PREMIUM_ECONOMY' | 'BUSINESS' | 'FIRST';

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  includedAirlineCodes?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  excludedAirlineCodes?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsBoolean()
  nonStop?: boolean;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  currencyCode?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsNumber()
  maxPrice?: number;
}
