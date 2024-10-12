import { Injectable } from "@nestjs/common";
import { ImageHandlerService } from "./image-handler/image-handler.service";
import { DiseaseInfoDto } from "apps/image-handler/src/dto/disease-info.dto";
import { consola } from "consola";

@Injectable()
export class ApiGatewayService {
    constructor(private imageHandlerService: ImageHandlerService) {}

    forwardImageToHandler(
        image: Express.Multer.File,
        diseaseInfoDto: DiseaseInfoDto
    ) {
        consola.info(diseaseInfoDto, diseaseInfoDto.diseaseCategory);

        return this.imageHandlerService.processImage(image, diseaseInfoDto);
    }
}
