import { Inject, Injectable } from "@nestjs/common";
import { ClientProxy } from "@nestjs/microservices";
import { consola } from "consola";

import { DiseaseInfoDto } from "./dto/disease-info.dto";
import { IMAGE_HANDLER_CLIENT } from "./constants";
import { IMAGE_HANDLER_PATTERNS } from "@medvisual/contracts";
import { ImageUploadDto as ClientImageUploadDto } from "@medvisual/contracts";

@Injectable()
export class ImageHandlerService {
    constructor(
        @Inject(IMAGE_HANDLER_CLIENT) private imageHandlerClient: ClientProxy
    ) {}

    processImage(image: Express.Multer.File, diseaseInfoDto: DiseaseInfoDto) {
        consola.info(diseaseInfoDto, diseaseInfoDto.diseaseCategory);

        return this.imageHandlerClient.send<JSON, ClientImageUploadDto>(
            IMAGE_HANDLER_PATTERNS.PROCESS_IMAGE,
            {
                image: image,
                data: diseaseInfoDto
            }
        );
    }
}
