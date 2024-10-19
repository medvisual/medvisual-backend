import {
    ArrayMaxSize,
    ArrayMinSize,
    IsArray,
    IsBase64,
    IsMimeType,
    IsNotEmpty,
    IsString,
    ValidateNested
} from "class-validator";

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
     * Array of presumed diseases (diseases categories) associated with the image
     */
    @IsArray()
    @ArrayMinSize(1)
    @ArrayMaxSize(10)
    @IsString({ each: true })
    presumedDiseases: string[];
}
