import { IsString } from "class-validator";
import { PartialType } from "@nestjs/mapped-types";
import { UserDto } from "./user.dto";

export class CreateUserDto extends PartialType(UserDto) {
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
