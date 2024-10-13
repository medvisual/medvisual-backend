import { Injectable } from "@nestjs/common";

import { ImageHandlerService } from "./image-handler/image-handler.service";
import { DiseaseInfoDto } from "./image-handler/dto/disease-info.dto";

@Injectable()
export class ApiGatewayService {
    constructor(private imageHandlerService: ImageHandlerService) {}

    forwardImageToHandler(
        image: Express.Multer.File,
        diseaseInfoDto: DiseaseInfoDto
    ) {
        return this.imageHandlerService.processImage(image, diseaseInfoDto);
    }
}
