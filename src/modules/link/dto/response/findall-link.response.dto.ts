import { Link } from "../../entities/link.entity";


export class FindAllLinkResponseDTO {
    readonly current_page: number;
    readonly total_pages: number;
    readonly total_per_pages: number;
    readonly list: Link[];
    readonly totalItems: number;

    constructor(partial: Partial<FindAllLinkResponseDTO>) {
        Object.assign(this, partial);
    }
}
