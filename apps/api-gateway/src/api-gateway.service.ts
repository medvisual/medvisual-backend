import { Injectable } from "@nestjs/common";
import { ImageHandlerService } from "./image-handler/image-handler.service";
import { UploadImageDto } from "apps/image-handler/src/dto/upload-image.dto";

@Injectable()
export class ApiGatewayService {
    constructor(private imageHandlerService: ImageHandlerService) {}

    forwardImageToHandler(uploadImageDto: UploadImageDto) {
        return this.imageHandlerService.processImage(uploadImageDto);
    }
}
