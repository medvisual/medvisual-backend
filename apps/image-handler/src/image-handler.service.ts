import { Injectable } from "@nestjs/common";

import { GeminiClientService } from "./gemini-client/gemini-client.service";
import { ImageUploadDto } from "@medvisual/contracts/image-handler";

@Injectable()
export class ImageHandlerService {
    constructor(private geminiClientService: GeminiClientService) {}

    analyzeImage(imageUploadDto: ImageUploadDto) {
        return this.geminiClientService.getDiseaseInfoFromImage(imageUploadDto);
    }
}
