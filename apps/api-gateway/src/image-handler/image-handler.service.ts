import { Inject, Injectable } from "@nestjs/common";
import { ClientProxy } from "@nestjs/microservices";
import { consola } from "consola";
import * as fs from "fs";

import { IMAGE_HANDLER_CLIENT_NAME } from "./constants/constants";
import { IMAGE_HANDLER_PATTERNS } from "@medvisual/contracts/image-handler";
import {
    GeminiVerdictDto as ClientVerdictDto,
    ImageUploadDto as ClientImageUploadDto
} from "@medvisual/contracts/image-handler";

@Injectable()
export class ImageHandlerService {
    constructor(
        @Inject(IMAGE_HANDLER_CLIENT_NAME)
        private readonly imageHandlerClient: ClientProxy
    ) {}

    analyzeImage(imageData: Express.Multer.File, presumedDiseases: string[]) {
        consola.info(`Presumed diseases: ${presumedDiseases.join(", ")}`);

        // File is read because unable to get buffer from the multer file in this context
        // Or perhaps should look into MemoryStorage in the future
        const imageBuffer = fs.readFileSync(imageData.path);
        consola.success(
            `Read file from ${imageData.path}: ${imageBuffer.length} bytes`
        );

        return this.imageHandlerClient.send<
            ClientVerdictDto,
            ClientImageUploadDto
        >(IMAGE_HANDLER_PATTERNS.HANDLE_IMAGE, {
            image: {
                name: imageData.filename,
                // Serialize the image buffer to base64 string
                buffer: imageBuffer.toString("base64"),
                mimetype: imageData.mimetype
            },
            presumedDiseases: presumedDiseases
        });
    }
}
