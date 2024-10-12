import { Inject, Injectable } from "@nestjs/common";
import { ClientProxy } from "@nestjs/microservices";
import { consola } from "consola";

import { DiseaseInfoDto } from "apps/image-handler/src/dto/disease-info.dto";

@Injectable()
export class ImageHandlerService {
    constructor(
        @Inject("IMAGE_HANDLER_CLIENT") private imageHandlerClient: ClientProxy
    ) {}

    processImage(image: Express.Multer.File, diseaseInfoDto: DiseaseInfoDto) {
        consola.info(diseaseInfoDto, diseaseInfoDto.diseaseCategory);

        return this.imageHandlerClient.send("image-handler.processImage", {
            image,
            data: diseaseInfoDto
        });
    }
}
