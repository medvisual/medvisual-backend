import { PartialType } from "@nestjs/mapped-types";
import { IsString } from "class-validator";
import { DiseaseDto } from "./disease.dto";

export class CreateDiseaseDto extends PartialType(DiseaseDto) {
    /**
     * Name of the disease
     */
    @IsString()
    name: string;

    /**
     * Description of the disease
     */
    @IsString()
    description: string;

    /**
     * Department responsible for the disease
     */
    @IsString()
    department: string;
}
