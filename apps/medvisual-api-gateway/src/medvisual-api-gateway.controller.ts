import { Body, Controller, Post } from "@nestjs/common";
import { MedvisualApiGatewayService } from "./medvisual-api-gateway.service";
//import { FileInterceptor } from "@nestjs/platform-express";
import { UploadImageDto } from "apps/image-handler/src/dto/upload-image.dto";

@Controller("/api")
export class MedvisualApiGatewayController {
    constructor(
        private readonly medvisualApiGatewayService: MedvisualApiGatewayService
    ) {}

    @Post("/upload-image")
    //@UseInterceptors(FileInterceptor("image"))
    forwardImageToHandler(@Body() uploadImageDto: UploadImageDto) {
        return this.medvisualApiGatewayService.forwardImageToHandler(
            uploadImageDto
        );
    }
}
