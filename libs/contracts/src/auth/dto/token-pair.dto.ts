import { IsJWT } from "class-validator";

export class TokenPairDto {
    @IsJWT()
    accessToken: string;

    @IsJWT()
    refreshToken: string;
}
