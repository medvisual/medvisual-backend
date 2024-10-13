export class VerdictDto {
    /**
     * Title of a disease (disease category) passed to AI
     */
    readonly disease: string;
    /**
     * Brief diagnosis-like summary with the key points included
     */
    readonly verdict: string;
    /**
     * Verdict confidence level as a number in range from 0 to 1
     */
    readonly probability: number;
}
