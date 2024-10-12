import { DiseaseInfoDto } from "./disease-info.dto";

export class ImageUploadDto {
    readonly image: Express.Multer.File;
    readonly data: DiseaseInfoDto;
}
