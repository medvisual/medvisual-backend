import { Injectable } from "@nestjs/common";
import { GeminiClientService } from "./gemini-client/gemini-client.service";
import { ImageUploadDto } from "./dto/image-upload.dto";

@Injectable()
export class ImageHandlerService {
    constructor(private geminiClientService: GeminiClientService) {}

    forwardImage(imageUploadDto: ImageUploadDto) {
        return this.geminiClientService.getDiseaseInfoFromImage(imageUploadDto);
    }
}
