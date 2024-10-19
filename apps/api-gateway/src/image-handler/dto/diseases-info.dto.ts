import { IsString, MaxLength, MinLength } from "class-validator";

export class DiseasesInfoDto {
    /**
     * Array of presumed diseases (diseases categories) associated with the image
     */
    @IsString()
    @MinLength(2)
    @MaxLength(200)
    presumedDiseases: string;
}
