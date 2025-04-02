import { Link } from "../../entities/link.entity";
import { ApiProperty } from '@nestjs/swagger';


export class LinkResponseDTO {

    @ApiProperty({ example: 1 })
    readonly current_page: number;

    @ApiProperty({ example: 1 })
    readonly total_pages: number;

    @ApiProperty({ example: 10 })
    readonly total_per_pages: number;

    @ApiProperty({ type: [Link] })
    readonly list: Link[];

    @ApiProperty({ example: 1 })
    readonly totalItems: number;

    constructor(partial: Partial<LinkResponseDTO>) {
        Object.assign(this, partial);
    }
}

