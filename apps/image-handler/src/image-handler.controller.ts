import { MessagePattern, Payload } from "@nestjs/microservices";
import { Controller, UseInterceptors } from "@nestjs/common";
import { consola } from "consola";

import { ImageHandlerService } from "./image-handler.service";
import {
    GeminiVerdictDto,
    ImageUploadDto
} from "@medvisual/contracts/image-handler";
import { IMAGE_HANDLER_PATTERNS } from "@medvisual/contracts/image-handler";
import { ResponseValidationInterceptor } from "@medvisual/common/interceptors";

@Controller()
export class ImageHandlerController {
    constructor(private readonly imageHandlerService: ImageHandlerService) {}

    @MessagePattern(IMAGE_HANDLER_PATTERNS.HANDLE_IMAGE)
    @UseInterceptors(new ResponseValidationInterceptor(GeminiVerdictDto))
    handleImage(@Payload() imageUploadDto: ImageUploadDto) {
        consola.info(imageUploadDto);

        return this.imageHandlerService.analyzeImage(imageUploadDto);
    }
}
