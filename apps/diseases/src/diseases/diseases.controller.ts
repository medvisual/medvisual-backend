import { Controller } from "@nestjs/common";
import { MessagePattern, Payload } from "@nestjs/microservices";

import { DiseasesService } from "./diseases.service";
import {
    CreateDiseaseDto,
    UpdateDiseaseDto,
    GetDiseasesDto,
    DISEASES_PATTERNS
} from "@medvisual/contracts/diseases";

@Controller()
export class DiseasesController {
    constructor(private readonly diseasesService: DiseasesService) {}

    @MessagePattern(DISEASES_PATTERNS.CREATE)
    create(@Payload() createDiseaseDto: CreateDiseaseDto) {
        return this.diseasesService.create(createDiseaseDto);
    }

    // Deprecated
    @MessagePattern(DISEASES_PATTERNS.FIND_ALL)
    findAll() {
        return this.diseasesService.findAll();
    }

    @MessagePattern(DISEASES_PATTERNS.FIND_ONE)
    findOne(@Payload() id: number) {
        return this.diseasesService.findOne(id);
    }

    @MessagePattern(DISEASES_PATTERNS.FIND_MANY)
    findAllPaginated(@Payload() findDiseasesDto: GetDiseasesDto) {
        return this.diseasesService.findAllPaginated(
            findDiseasesDto.where,
            findDiseasesDto.pagination
        );
    }

    @MessagePattern(DISEASES_PATTERNS.UPDATE)
    update(@Payload() updateDiseaseDto: UpdateDiseaseDto) {
        return this.diseasesService.update(
            updateDiseaseDto.id,
            updateDiseaseDto
        );
    }

    @MessagePattern(DISEASES_PATTERNS.REMOVE)
    remove(@Payload() id: number) {
        return this.diseasesService.remove(id);
    }
}
