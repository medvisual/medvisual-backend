import { IsEnum, IsInt, IsOptional, IsString, Max, Min } from "class-validator";
import { Type } from "class-transformer";
import { ApiPropertyOptional } from "@nestjs/swagger";

import { SortOrder } from "../../enums/sort-order.enum";

export class PageOptionsDto {
    @ApiPropertyOptional()
    @IsInt()
    @Min(1)
    @IsOptional()
    @Type(() => Number)
    readonly page?: number = 1;

    @ApiPropertyOptional()
    @IsInt()
    @Min(1)
    @Max(100)
    @IsOptional()
    @Type(() => Number)
    readonly pageSize?: number = 10;

    @ApiPropertyOptional()
    @IsString()
    @IsOptional()
    readonly orderBy?: string;

    @ApiPropertyOptional({
        enum: SortOrder
    })
    @IsEnum(SortOrder)
    @IsOptional()
    readonly sortOrder?: SortOrder = SortOrder.ASCENDING;

    get skip(): number {
        return (this.page - 1) * this.pageSize;
    }
}
