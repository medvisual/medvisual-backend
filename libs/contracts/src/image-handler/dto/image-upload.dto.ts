import {
    IsBase64,
    IsMimeType,
    IsNotEmpty,
    IsString,
    ValidateNested
} from "class-validator";
import { DiseaseInfoDto } from "./disease-info.dto";

class File {
    /**
     * Original name of the file
     */
    @IsString()
    name: string;

    /**
     * Base64 string containing the file data
     */
    @IsBase64()
    @IsNotEmpty()
    buffer: string;

    /**
     * MIME type of the file
     */
    @IsMimeType()
    mimetype: string;
}

export class ImageUploadDto {
    /**
     * The image file (x-ray, for instance) to be uploaded
     */
    @ValidateNested()
    image: File;

    /**
     * Additional information about the disease
     */
    @ValidateNested()
    data: DiseaseInfoDto;
}
