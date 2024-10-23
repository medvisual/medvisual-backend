import { Controller } from "@nestjs/common";
import { MessagePattern, Payload } from "@nestjs/microservices";

import { DiseasesService } from "./diseases.service";
import {
    CreateDiseaseDto,
    UpdateDiseaseDto,
    DISEASES_PATTERNS
} from "@medvisual/contracts/diseases";

@Controller()
export class DiseasesController {
    constructor(private readonly diseasesService: DiseasesService) {}

    @MessagePattern(DISEASES_PATTERNS.CREATE)
    create(@Payload() createDiseaseDto: CreateDiseaseDto) {
        return this.diseasesService.create(createDiseaseDto);
    }

    @MessagePattern(DISEASES_PATTERNS.FIND_ALL)
    async findAll() {
        return await this.diseasesService.findAll();
    }

    @MessagePattern(DISEASES_PATTERNS.FIND_ONE)
    async findOne(@Payload() id: number) {
        return await this.diseasesService.findOne(id);
    }

    @MessagePattern(DISEASES_PATTERNS.UPDATE)
    async update(@Payload() updateDiseaseDto: UpdateDiseaseDto) {
        return await this.diseasesService.update(
            updateDiseaseDto.id,
            updateDiseaseDto
        );
    }

    @MessagePattern(DISEASES_PATTERNS.REMOVE)
    async remove(@Payload() id: number) {
        return await this.diseasesService.remove(id);
    }
}
