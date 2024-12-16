import { IsOptional, ValidateNested } from "class-validator";
import { Type } from "class-transformer";
import { PartialType } from "@nestjs/mapped-types";
import { ApiPropertyOptional } from "@nestjs/swagger";

import { DiseaseDto } from "./disease.dto";
import { PageOptionsDto } from "@medvisual/common/database";

export class GetDiseasesDto {
    // TODO: Document query object parameters properly
    // See https://github.com/nestjs/swagger/issues/90
    @ApiPropertyOptional({
        type: DiseaseDto
    })
    @ValidateNested()
    @IsOptional()
    @Type(() => PartialType(DiseaseDto))
    where?: Partial<DiseaseDto>;

    @ApiPropertyOptional()
    @ValidateNested()
    @IsOptional()
    @Type(() => PageOptionsDto)
    pagination?: PageOptionsDto = new PageOptionsDto();
}
