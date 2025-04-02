import {
    IsOptional,
    IsNumber,
    Min,
    IsDateString,
    IsString,
    MaxLength,
    Max,
  } from 'class-validator';
  import { Transform } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
  
  export class PaginationLinkRequest {
    @IsOptional()
    @IsDateString()
    @ApiProperty({ example: '2025-01-01' })
    initialDate?: string;
  
    @IsOptional()
    @IsDateString()
    @ApiProperty({ example: '2025-01-01' })
    finalDate?: string;
  
    @IsOptional()
    @Transform(({ value }) => parseInt(value, 10))
    @IsNumber()
    @Min(1)
    @ApiProperty({ example: 1 })
    page?: number = 1;
  
    @IsOptional()
    @Transform(({ value }) => parseInt(value, 10))
    @IsNumber()
    @Min(1)
    @Max(100)
    @ApiProperty({ example: 10 })
    limit?: number = 10;
    
  }
  