import { IsNumber } from "class-validator";
import { ITokenPayload } from "../interfaces/token-payload.interface";

export class SignInDto implements ITokenPayload {
    /**
     * User id from the token payload
     */
    @IsNumber()
    userId: number;
}
