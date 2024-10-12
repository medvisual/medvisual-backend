import { IsString } from "class-validator";

export class DiseaseInfoDto {
    @IsString()
    readonly diseaseCategory: string;
}
