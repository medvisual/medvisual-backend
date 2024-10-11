import { IsString } from "class-validator";

export class UploadImageDto {
    @IsString()
    readonly diseaseCategory: string;
}
