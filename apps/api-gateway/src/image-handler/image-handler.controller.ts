import {
    Body,
    Controller,
    Post,
    UploadedFile,
    UseGuards,
    UseInterceptors
} from "@nestjs/common";
import { FileInterceptor } from "@nestjs/platform-express";
import { Express } from "express";

import { ImageHandlerService } from "./image-handler.service";
import { DiseasesInfoDto } from "./dto/diseases-info.dto";
import { ResponseValidationInterceptor } from "@medvisual/common/interceptors";
import { ImageVerdictsDto } from "./dto/image-verdicts.dto";
import { JwtAuthGuard } from "../auth/guards/jwt-auth.guard";

@Controller("/api/visual")
export class ImageHandlerController {
    constructor(private readonly imageHandlerService: ImageHandlerService) {}

    @Post("/create")
    @UseGuards(JwtAuthGuard)
    @UseInterceptors(
        FileInterceptor("image"),
        // No specific transformations are needed right now, this should work just fine
        new ResponseValidationInterceptor(ImageVerdictsDto)
    )
    analyzeImage(
        @UploadedFile() imageData: Express.Multer.File,
        @Body() diseasesInfoDto: DiseasesInfoDto
    ) {
        return this.imageHandlerService.analyzeImage(
            imageData,
            diseasesInfoDto.presumedDiseases
        );
    }
}
