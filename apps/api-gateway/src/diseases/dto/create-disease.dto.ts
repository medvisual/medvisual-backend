import { IsString } from "class-validator";

export class CreateDiseaseDto {
    /**
     * Name of the disease
     */
    @IsString()
    name: string;

    /**
     * Description of the disease
     */
    @IsString()
    description: string;

    /**
     * Department responsible for the disease
     */
    @IsString()
    department: string;
}
