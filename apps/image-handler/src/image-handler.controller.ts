import { MessagePattern } from "@nestjs/microservices";
import { Controller } from "@nestjs/common";
import { ImageHandlerService } from "./image-handler.service";
import { ImageUploadDto } from "./dto/image-upload.dto";
import { consola } from "consola";

@Controller()
export class ImageHandlerController {
    constructor(private readonly imageHandlerService: ImageHandlerService) {}

    @MessagePattern("image-handler.processImage")
    processImage(imageUploadDto: ImageUploadDto) {
        consola.info(imageUploadDto);

        return this.imageHandlerService.forwardImage(imageUploadDto);
    }
}
