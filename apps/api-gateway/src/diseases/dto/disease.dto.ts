import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { IsNumber, IsOptional, IsString } from "class-validator";

export class DiseaseDto {
    /**
     * Id of the disease
     */
    @ApiProperty()
    @IsNumber()
    id: number;

    /**
     * Name of the disease
     */
    @ApiProperty()
    @IsString()
    name: string;

    /**
     * Description of the disease
     */
    @ApiPropertyOptional()
    @IsString()
    @IsOptional()
    description?: string;

    /**
     * Department responsible for the disease
     */
    @ApiProperty()
    @IsString()
    department: string;
}
