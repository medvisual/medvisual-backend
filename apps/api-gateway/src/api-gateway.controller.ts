import {
    Body,
    Controller,
    Post,
    UploadedFile,
    UseInterceptors
} from "@nestjs/common";
import { ApiGatewayService } from "./api-gateway.service";
import { FileInterceptor } from "@nestjs/platform-express";
import { DiseaseInfoDto } from "apps/image-handler/src/dto/disease-info.dto";
import { Express } from "express";

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
