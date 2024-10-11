import { Body, Controller, Post } from "@nestjs/common";
import { ApiGatewayService } from "./api-gateway.service";
//import { FileInterceptor } from "@nestjs/platform-express";
import { UploadImageDto } from "apps/image-handler/src/dto/upload-image.dto";

@Controller("/api")
export class ApiGatewayController {
    constructor(private readonly apiGatewayService: ApiGatewayService) {}

    @Post("/upload-image")
    //@UseInterceptors(FileInterceptor("image"))
    forwardImageToHandler(@Body() uploadImageDto: UploadImageDto) {
        return this.apiGatewayService.forwardImageToHandler(uploadImageDto);
    }
}
