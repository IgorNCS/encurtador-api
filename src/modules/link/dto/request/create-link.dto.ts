import { IsString, IsNotEmpty, IsUrl } from 'class-validator';

export class CreateLinkDto {
    @IsUrl({ protocols: ['http', 'https'] })
    @IsNotEmpty()
    url: string;
}