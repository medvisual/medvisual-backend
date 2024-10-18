import { Inject, Injectable } from "@nestjs/common";
import { ClientProxy } from "@nestjs/microservices";
import { lastValueFrom } from "rxjs";
import { consola } from "consola";

import { DiseaseInfoDto } from "./dto/disease-info.dto";
import { IMAGE_HANDLER_CLIENT } from "./constants/constants";
import { IMAGE_HANDLER_PATTERNS } from "@medvisual/contracts/image-handler";
import {
    GeminiVerdictDto as ClientVerdictDto,
    ImageUploadDto as ClientImageUploadDto
} from "@medvisual/contracts/image-handler";

@Injectable()
export class ImageHandlerService {
    constructor(
        @Inject(IMAGE_HANDLER_CLIENT)
        private readonly imageHandlerClient: ClientProxy
    ) {}

    async onApplicationBootstrap() {
        await this.imageHandlerClient.connect().catch((err) => {
            consola.error(err);
        });
    }

    async analyzeImage(
        imageData: Express.Multer.File,
        imageBuffer: Buffer,
        diseaseInfoDto: DiseaseInfoDto
    ) {
        consola.info(diseaseInfoDto, diseaseInfoDto.diseaseCategory);

        return await lastValueFrom(
            this.imageHandlerClient.send<
                ClientVerdictDto,
                ClientImageUploadDto
            >(IMAGE_HANDLER_PATTERNS.PROCESS_IMAGE, {
                image: {
                    name: imageData.filename,
                    // Serialize the image buffer to base64 string
                    buffer: imageBuffer.toString("base64"),
                    mimetype: imageData.mimetype
                },
                data: diseaseInfoDto
            })
        );
    }
}
