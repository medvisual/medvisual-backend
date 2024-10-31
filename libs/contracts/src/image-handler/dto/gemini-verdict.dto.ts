import {
    ArrayMinSize,
    IsArray,
    IsNumber,
    IsString,
    ValidateNested
} from "class-validator";

class GeminiDiseaseVerdictDto {
    /**
     * Title of a disease (disease category) passed to Gemini
     */
    @IsString()
    disease: string;

    /**
     * Brief diagnosis-like summary with the key points included
     */
    @IsString()
    verdict: string;

    /**
     * Probability that the disease assumption was right as a number in range from 0 to 1
     */
    @IsNumber()
    probability: number;

    /**
     * Advice to consult a qualified professional
     */
    @IsString()
    advice: string;
}

export class GeminiVerdictDto {
    /**
     * Array of verdicts for each presumed disease associated with the image
     */
    @IsArray()
    @ArrayMinSize(1)
    @ValidateNested({ each: true })
    verdicts: GeminiDiseaseVerdictDto[];
}
