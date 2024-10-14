import { IsNotEmptyObject, ValidateNested } from "class-validator";
import { DiseaseInfoDto } from "./disease-info.dto";

export class ImageUploadDto {
    /**
     * The image file (x-ray, for instance) to be uploaded
     */
    @IsNotEmptyObject()
    image: Express.Multer.File;

    /**
     * Additional information about the disease
     */
    @ValidateNested()
    data: DiseaseInfoDto;
}
