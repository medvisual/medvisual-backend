import { IsEmail, IsString } from "class-validator";

export class ValidateUserDto {
    /**
     * User's email
     */
    @IsEmail()
    email: string;

    /**
     * User's password
     */
    @IsString()
    password: string;
}
