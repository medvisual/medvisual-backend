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
import { JwtAuthGuard } from "../auth/guards/jwt-auth.guard";
import { ApiBody, ApiConsumes, ApiResponse } from "@nestjs/swagger";
import { ImageVerdictsDto } from "./dto/image-verdicts.dto";

@Controller("visual")
export class ImageHandlerController {
    constructor(private readonly imageHandlerService: ImageHandlerService) {}

    @Post("/create")
    @ApiConsumes("multipart/form-data")
    @ApiBody({
        type: "multipart/formdata"
    })
    @ApiResponse({ type: ImageVerdictsDto })
    @UseGuards(JwtAuthGuard)
    @UseInterceptors(FileInterceptor("image"))
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
