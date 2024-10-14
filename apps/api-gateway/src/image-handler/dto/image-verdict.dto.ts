import { Exclude } from "class-transformer";
import { IsNumber, IsString } from "class-validator";

export class ImageVerdictDto {
    /**
     * Title of a disease (disease category) passed to AI
     */
    @IsString()
    disease: string;

    /**
     * Brief diagnosis-like summary with the key points included
     */
    @IsString()
    verdict: string;

    /**
     * Probability that the assumption was right as a number in range from 0 to 1
     */
    @IsNumber()
    probability: number;

    /**
     * Advice to consult a qualified professional (not used)
     */
    @Exclude()
    advice: string;
}
