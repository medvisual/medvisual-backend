import {
    Body,
    Controller,
    Post,
    UploadedFile,
    UseInterceptors
} from "@nestjs/common";
import { FileInterceptor } from "@nestjs/platform-express";
import { Express } from "express";

import { ApiGatewayService } from "./api-gateway.service";
import { DiseaseInfoDto } from "./image-handler/dto/disease-info.dto";

@Controller("/api")
export class ApiGatewayController {
    constructor(private readonly apiGatewayService: ApiGatewayService) {}

    @Post("/upload-image")
    @UseInterceptors(FileInterceptor("image"))
    forwardImageToHandler(
        @UploadedFile() image: Express.Multer.File,
        @Body() diseaseInfoDto: DiseaseInfoDto
    ) {
        return this.apiGatewayService.forwardImageToHandler(
            image,
            diseaseInfoDto
        );
    }
}
