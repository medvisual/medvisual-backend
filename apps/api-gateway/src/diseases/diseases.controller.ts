import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Patch,
    Post
} from "@nestjs/common";

import { DiseasesService } from "./diseases.service";
import { CreateDiseaseDto } from "./dto/create-disease.dto";
import { UpdateDiseaseDto } from "./dto/update-disease.dto";

@Controller("/api/diseases")
export class DiseasesController {
    constructor(private readonly diseasesService: DiseasesService) {}

    @Post()
    createDisease(@Body() createDiseaseDto: CreateDiseaseDto) {
        return this.diseasesService.createDisease(createDiseaseDto);
    }

    @Get()
    getDiseases() {
        return this.diseasesService.getDiseases();
    }

    @Get("/:id")
    getDisease(@Param("id") id: number) {
        return this.diseasesService.getDisease(id);
    }

    @Patch("/:id")
    updateDisease(
        @Param("id") id: number,
        @Body() updateDiseaseDto: UpdateDiseaseDto
    ) {
        updateDiseaseDto.id = id;
        return this.diseasesService.updateDisease(updateDiseaseDto);
    }

    @Delete("/:id")
    deleteDisease(@Param("id") id: number) {
        return this.diseasesService.deleteDisease(id);
    }
}
