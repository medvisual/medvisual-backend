import { PartialType } from "@nestjs/mapped-types";
import { Type } from "class-transformer";
import { IsOptional, ValidateNested } from "class-validator";

import { DiseaseDto } from "./disease.dto";
import { PageOptionsDto } from "@medvisual/common/database";

export class GetDiseasesDto {
    @ValidateNested()
    @IsOptional()
    @Type(() => PartialType(DiseaseDto))
    where?: Partial<DiseaseDto>;

    @ValidateNested()
    @IsOptional()
    @Type(() => PageOptionsDto)
    pagination?: PageOptionsDto = new PageOptionsDto();
}
