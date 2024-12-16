import { OmitType } from "@nestjs/swagger";

import { DiseaseDto } from "./disease.dto";

export class CreateDiseaseDto extends OmitType(DiseaseDto, ["id"] as const) {}
