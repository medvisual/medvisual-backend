import { IsNotEmptyObject } from "class-validator";

import { TokenPayload } from "../interfaces/token-payload.interface";

export class SignInDto {
    @IsNotEmptyObject()
    tokenPayload: TokenPayload;
}
