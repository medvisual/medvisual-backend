import { Injectable } from "@nestjs/common";
import { UploadImageDto } from "./dto/upload-image.dto";

@Injectable()
export class ImageHandlerService {
    forwardImage(uploadImageDto: UploadImageDto) {
        return "test " + uploadImageDto.diseaseCategory;
    }
}
