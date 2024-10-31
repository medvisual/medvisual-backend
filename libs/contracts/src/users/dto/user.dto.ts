import { IsJWT, IsNumber, IsString } from "class-validator";

/**
 * User object returned by the microservice
 */
export class UserDto {
    /**
     * Id of the user
     */
    @IsNumber()
    id: number;

    /**
     * User display name
     */
    @IsString()
    username: string;

    /**
     * User email address
     */
    @IsString()
    email: string;

    /**
     * User password
     */
    @IsString()
    password: string;

    /**
     * Refresh JWT
     */
    @IsJWT()
    refreshToken: string;
}
