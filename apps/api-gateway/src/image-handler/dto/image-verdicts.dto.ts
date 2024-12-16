import { ApiProperty } from "@nestjs/swagger";
import { Exclude } from "class-transformer";
import {
    ArrayMinSize,
    IsArray,
    IsNumber,
    IsString,
    ValidateNested
} from "class-validator";

class DiseaseVerdictDto {
    /**
     * Title of a disease (disease category) passed to AI
     */
    @ApiProperty()
    @IsString()
    disease: string;

    /**
     * Brief diagnosis-like summary with the key points included
     */
    @ApiProperty()
    @IsString()
    verdict: string;

    /**
     * Probability that the assumption was right as a number in range from 0 to 1
     */
    @ApiProperty()
    @IsNumber()
    probability: number;

    /**
     * Advice to consult a qualified professional (not used)
     */
    @Exclude()
    advice: string;
}

export class ImageVerdictsDto {
    /**
     * Array of verdicts for each presumed disease associated with the image
     */
    @ApiProperty({ type: [DiseaseVerdictDto] })
    @IsArray()
    @ArrayMinSize(1)
    @ValidateNested({ each: true })
    verdicts: DiseaseVerdictDto[];
}
