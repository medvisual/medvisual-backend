import { IsString } from "class-validator";

export class CreateUserDto {
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
}
