import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsString, IsOptional, IsNotEmpty } from 'class-validator';

export class EsimDTO {
  @ApiPropertyOptional({
    example: 'IT',
    description: 'The location code (ISO country code)',
  })
  @IsString()
  @IsNotEmpty()
  locationCode?: string;

  @ApiPropertyOptional({
    example: '',
    description: 'Type of the eSIM package (optional)',
  })
  @IsString()
  @IsOptional()
  type?: string;

  @ApiPropertyOptional({
    example: 'NA-3_1_7',
    description: 'Slug for the eSIM package (optional)',
  })
  @IsString()
  @IsOptional()
  slug?: string;

  @ApiPropertyOptional({
    example: '',
    description: 'Package code for the eSIM (optional)',
  })
  @IsString()
  @IsOptional()
  packageCode?: string;

  @ApiPropertyOptional({
    example: '',
    description: 'ICCID of the eSIM (optional)',
  })
  @IsString()
  @IsOptional()
  iccid?: string;
}
