import { MessagePattern } from "@nestjs/microservices";
import * as common from "@nestjs/common";
import { ImageHandlerService } from "./image-handler.service";
import { UploadImageDto } from "./dto/upload-image.dto";

@common.Controller()
export class ImageHandlerController {
    constructor(private readonly imageHandlerService: ImageHandlerService) {}

    @MessagePattern("image-handler.processImage")
    processImage(uploadImageDto: UploadImageDto) {
        return this.imageHandlerService.forwardImage(uploadImageDto);
    }
}
