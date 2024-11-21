import { DiseaseDto } from "./disease.dto";
import { IsOptional, ValidateNested } from "class-validator";
import { PageOptionsDto } from "@medvisual/common/database";
import { Type } from "class-transformer";
import { PartialType } from "@nestjs/mapped-types";

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
