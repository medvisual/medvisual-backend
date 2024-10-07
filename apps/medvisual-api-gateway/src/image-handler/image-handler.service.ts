import { Inject, Injectable } from "@nestjs/common";
import { ClientProxy } from "@nestjs/microservices";
import { UploadImageDto } from "apps/image-handler/src/dto/upload-image.dto";

@Injectable()
export class ImageHandlerService {
    constructor(
        @Inject("IMAGE_HANDLER_CLIENT") private imageHandlerClient: ClientProxy
    ) {}

    processImage(uploadImageDto: UploadImageDto) {
        console.log(uploadImageDto);

        return this.imageHandlerClient.send(
            "image-handler.processImage",
            uploadImageDto
        );
    }
}
