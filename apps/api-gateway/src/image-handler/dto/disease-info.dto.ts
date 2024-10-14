import { IsString } from "class-validator";

export class DiseaseInfoDto {
    @IsString()
    diseaseCategory: string;
}
