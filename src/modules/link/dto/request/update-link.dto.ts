import { IsNotEmpty, IsOptional, IsString, IsUrl } from 'class-validator';
import { PartialType } from '@nestjs/mapped-types';
import { CreateLinkDto } from './create-link.dto';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateLinkDto extends PartialType(CreateLinkDto) {
  @IsNotEmpty()
  @IsString()
  @IsUrl()
  @ApiProperty({ example: 'http://novaurl.com' })
  originalURL: string;
}

