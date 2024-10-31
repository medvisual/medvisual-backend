import { ArrayMaxSize, ArrayMinSize, IsArray, IsString } from "class-validator";

export class DiseasesInfoDto {
    /**
     * Array of presumed diseases (diseases categories) associated with the image
     */
    @IsArray()
    @IsString({ each: true })
    @ArrayMinSize(1)
    @ArrayMaxSize(5)
    presumedDiseases: string[];
}
