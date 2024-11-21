import { IsEnum, IsInt, IsOptional, IsString, Max, Min } from "class-validator";
import { SortOrder } from "../../enums/sort-order.enum";

export class PageOptionsDto {
    @IsInt()
    @Min(1)
    @IsOptional()
    readonly page?: number = 1;

    @IsInt()
    @Min(1)
    @Max(100)
    @IsOptional()
    readonly pageSize?: number = 10;

    @IsString()
    @IsOptional()
    readonly orderBy?: string;

    @IsEnum(SortOrder)
    @IsOptional()
    readonly sortOrder?: SortOrder = SortOrder.ASCENDING;

    get skip(): number {
        return (this.page - 1) * this.pageSize;
    }
}
