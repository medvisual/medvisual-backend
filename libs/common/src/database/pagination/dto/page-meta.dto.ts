import { PageMetaDtoParameters } from "../interfaces/page-meta-dto-parameters.interface";

export class PageMetaDto {
    readonly page: number;

    readonly pageSize: number;

    readonly itemCount: number;

    readonly pageCount: number;

    readonly hasPreviousPage: boolean;

    readonly hasNextPage: boolean;

    constructor({ pageOptionsDto, itemCount }: PageMetaDtoParameters) {
        this.page = pageOptionsDto.page;
        this.pageSize = pageOptionsDto.pageSize;
        this.itemCount = itemCount;
        this.pageCount = Math.ceil(this.itemCount / this.pageSize);
        this.hasPreviousPage = this.page > 1;
        this.hasNextPage = this.page < this.pageCount;
    }
}
