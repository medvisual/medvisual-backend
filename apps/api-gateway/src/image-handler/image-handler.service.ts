import { Inject, Injectable } from "@nestjs/common";
import { ClientProxy } from "@nestjs/microservices";
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

    processImage(image: Express.Multer.File, diseaseInfoDto: DiseaseInfoDto) {
        consola.info(diseaseInfoDto, diseaseInfoDto.diseaseCategory);

        return this.imageHandlerClient.send<
            ClientVerdictDto,
            ClientImageUploadDto
        >(IMAGE_HANDLER_PATTERNS.PROCESS_IMAGE, {
            image: image,
            data: diseaseInfoDto
        });
    }
}
