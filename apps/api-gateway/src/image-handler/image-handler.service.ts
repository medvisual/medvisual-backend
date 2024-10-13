import { Inject, Injectable } from "@nestjs/common";
import { ClientProxy } from "@nestjs/microservices";
import { consola } from "consola";
import { map } from "rxjs";

import { DiseaseInfoDto } from "./dto/disease-info.dto";
import { IMAGE_HANDLER_CLIENT } from "./constants";
import { IMAGE_HANDLER_PATTERNS } from "@medvisual/contracts/image-handler";
import { ImageUploadDto as ClientImageUploadDto } from "@medvisual/contracts/image-handler";
import { GeminiVerdictDto } from "@medvisual/contracts/image-handler/dto/gemini-verdict.dto";
import { VerdictDto } from "./dto/verdict.dto";

@Injectable()
export class ImageHandlerService {
    constructor(
        @Inject(IMAGE_HANDLER_CLIENT) private imageHandlerClient: ClientProxy
    ) {}

    processImage(image: Express.Multer.File, diseaseInfoDto: DiseaseInfoDto) {
        consola.info(diseaseInfoDto, diseaseInfoDto.diseaseCategory);

        return this.imageHandlerClient
            .send<GeminiVerdictDto, ClientImageUploadDto>(
                IMAGE_HANDLER_PATTERNS.PROCESS_IMAGE,
                {
                    image: image,
                    data: diseaseInfoDto
                }
            )
            .pipe(map(this.mapGeminiVerdictDto));
    }

    private mapGeminiVerdictDto(verdictDto: GeminiVerdictDto): VerdictDto {
        return {
            disease: verdictDto.disease,
            verdict: verdictDto.verdict,
            probability: verdictDto.probability
        };
    }
}
