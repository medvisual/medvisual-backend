import { ApiProperty } from "@nestjs/swagger";
import { ArrayMaxSize, ArrayMinSize, IsArray, IsString } from "class-validator";

export class DiseasesInfoDto {
    /**
     * Array of presumed diseases (diseases categories) associated with the image
     */
    @ApiProperty()
    @IsArray()
    @IsString({ each: true })
    @ArrayMinSize(1)
    @ArrayMaxSize(5)
    presumedDiseases: string[];
}
