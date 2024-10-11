import { Injectable } from "@nestjs/common";
import { UploadImageDto } from "./dto/upload-image.dto";
import { GeminiClientService } from "./gemini-client/gemini-client.service";

@Injectable()
export class ImageHandlerService {
    constructor(private geminiClientService: GeminiClientService) {}

    forwardImage(uploadImageDto: UploadImageDto) {
        return this.geminiClientService.makeRequest(
            uploadImageDto.diseaseCategory
        );
    }
}
