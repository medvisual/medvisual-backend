import { Injectable } from "@nestjs/common";
import * as fs from "node:fs";
import { consola } from "consola";

import { ImageHandlerService } from "./image-handler/image-handler.service";
import { DiseasesInfoDto } from "./image-handler/dto/diseases-info.dto";

@Injectable()
export class ApiGatewayService {
    constructor(private imageHandlerService: ImageHandlerService) {}

    forwardImageToHandler(
        imageData: Express.Multer.File,
        diseasesInfoDto: DiseasesInfoDto
    ) {
        // File is read because unable to get buffer from the multer file in this context
        // Or perhaps should look into MemoryStorage in the future
        const imageBuffer = fs.readFileSync(imageData.path);
        consola.success(
            `Read file from ${imageData.path}: ${imageBuffer.length} bytes`
        );

        return this.imageHandlerService.analyzeImage(
            imageData,
            imageBuffer,
            diseasesInfoDto.presumedDiseases.split(", ")
        );
    }
}
