import { IsJWT, IsNotEmptyObject, ValidateNested } from "class-validator";
import { ITokenPayload } from "../interfaces/token-payload.interface";

export class RefreshAuthDto {
    /**
     * JWT refresh token
     */
    @IsJWT()
    refreshToken: string;

    /**
     * JWT payload
     */
    @IsNotEmptyObject()
    @ValidateNested()
    tokenPayload: ITokenPayload;
}
