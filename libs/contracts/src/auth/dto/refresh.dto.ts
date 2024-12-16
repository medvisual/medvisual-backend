import { IsDateString, IsJWT, IsNotEmptyObject } from "class-validator";
import { TokenPayload } from "../interfaces/token-payload.interface";

export class RefreshDto {
    /**
     * JWT refresh token
     */
    @IsJWT()
    refreshToken: string;

    /**
     * JWT payload
     */
    @IsNotEmptyObject()
    tokenPayload: TokenPayload;

    /**
     * Token expiration time
     */
    @IsDateString()
    tokenExpiresAt: Date;
}
