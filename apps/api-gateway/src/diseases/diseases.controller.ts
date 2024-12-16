import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Patch,
    Post,
    Query
} from "@nestjs/common";

import { DiseasesService } from "./diseases.service";
import { CreateDiseaseDto } from "./dto/create-disease.dto";
import { UpdateDiseaseDto } from "./dto/update-disease.dto";
import { GetDiseasesDto } from "./dto/get-diseases.dto";

@Controller("diseases")
export class DiseasesController {
    constructor(private readonly diseasesService: DiseasesService) {}

    @Post()
    createDisease(@Body() createDiseaseDto: CreateDiseaseDto) {
        return this.diseasesService.createDisease(createDiseaseDto);
    }

    @Get()
    getManyDiseases(@Query() getDiseasesDto: GetDiseasesDto) {
        return this.diseasesService.getManyDiseases(
            getDiseasesDto.where,
            getDiseasesDto.pagination
        );
    }

    // For debug purposes
    @Get("/all")
    getAllDiseases() {
        return this.diseasesService.getAllDiseases();
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
        return this.diseasesService.updateDisease(id, updateDiseaseDto);
    }

    @Delete("/:id")
    deleteDisease(@Param("id") id: number) {
        return this.diseasesService.deleteDisease(id);
    }
}
