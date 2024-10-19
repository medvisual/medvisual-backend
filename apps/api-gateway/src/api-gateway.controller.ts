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
import { DiseasesInfoDto } from "./image-handler/dto/diseases-info.dto";
import { ResponseValidationInterceptor } from "@medvisual/common";
import { ImageVerdictDto } from "./image-handler/dto/image-verdict.dto";

@Controller("/api")
export class ApiGatewayController {
    constructor(private readonly apiGatewayService: ApiGatewayService) {}

    @Post("/upload-image")
    @UseInterceptors(
        FileInterceptor("image"),
        // No specific transformations are needed right now, this should work just fine
        new ResponseValidationInterceptor(ImageVerdictDto)
    )
    forwardImageToHandler(
        @UploadedFile() imageData: Express.Multer.File,
        @Body() diseasesInfoDto: DiseasesInfoDto
    ) {
        return this.apiGatewayService.forwardImageToHandler(
            imageData,
            diseasesInfoDto
        );
    }
}
