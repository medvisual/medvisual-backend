import { MessagePattern } from "@nestjs/microservices";
import { Controller } from "@nestjs/common";
import { consola } from "consola";

import { ImageHandlerService } from "./image-handler.service";
import { ImageUploadDto } from "@medvisual/contracts/image-handler";
import { IMAGE_HANDLER_PATTERNS } from "@medvisual/contracts/image-handler";

@Controller()
export class ImageHandlerController {
    constructor(private readonly imageHandlerService: ImageHandlerService) {}

    @MessagePattern(IMAGE_HANDLER_PATTERNS.PROCESS_IMAGE)
    processImage(imageUploadDto: ImageUploadDto) {
        consola.info(imageUploadDto);

        return this.imageHandlerService.forwardImage(imageUploadDto);
    }
}
