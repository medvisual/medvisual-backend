import { IsNumber, IsOptional, IsString } from "class-validator";

export class DiseaseDto {
    /**
     * Id of the disease
     */
    @IsNumber()
    id: number;

    /**
     * Name of the disease
     */
    @IsString()
    name: string;

    /**
     * Description of the disease
     */
    @IsString()
    @IsOptional()
    description?: string;

    /**
     * Department responsible for the disease
     */
    @IsString()
    department: string;
}
