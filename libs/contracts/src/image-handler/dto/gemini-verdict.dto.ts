import { IsNumber, IsString } from "class-validator";

export class GeminiVerdictDto {
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