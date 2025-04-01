import { IsNotEmpty, IsOptional, IsString, IsUrl } from 'class-validator';
import { PartialType } from '@nestjs/mapped-types';
import { CreateLinkDto } from './create-link.dto';

export class UpdateLinkDto extends PartialType(CreateLinkDto) {
  @IsNotEmpty()
  @IsString()
  @IsUrl()
  originalURL: string;
}

